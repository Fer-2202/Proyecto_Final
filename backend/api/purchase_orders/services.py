from django.db import transaction
from django.core.exceptions import ValidationError
from .models import PurchaseOrders
from ..tickets_purchase.models import TicketsPurchaseOrder
from ..payments.models import Payments
from ..visits.models import Visits
from ..tickets.models import Tickets
import uuid
import logging

logger = logging.getLogger(__name__)

class PurchaseService:
    """
    Servicio centralizado para el manejo de compras de tickets.
    Implementa transacciones atómicas para garantizar consistencia de datos.
    
    === CÓMO USAR ===
    
    1. CREAR COMPRA BÁSICA:
        service = PurchaseService()
        order = service.create_purchase_with_tickets(
            email="cliente@example.com",
            visit_id=1,
            user_id=1,
            tickets_data=[
                {"ticket_id": 1, "quantity": 2},  # 2 tickets adulto
                {"ticket_id": 2, "quantity": 1}   # 1 ticket niño
            ],
            payment_method="CARD"
        )
    
    2. VALIDAR DISPONIBILIDAD:
        is_available = service.validate_ticket_availability(
            visit_id=1,
            tickets_data=[{"ticket_id": 1, "quantity": 5}]
        )
    
    3. CANCELAR ORDEN:
        service.cancel_order(order_id=123, reason="Cliente canceló")
    
    === MÉTODOS DE PAGO SOPORTADOS ===
    - "CARD": Tarjeta de crédito/débito
    - "PAYPAL": PayPal
    - "CASH": Efectivo (solo en sitio)
    
    === ESTADOS DE ORDEN ===
    - "PENDING": Pendiente de pago
    - "PAID": Pagada exitosamente
    - "CANCELLED": Cancelada
    - "FAILED": Falló el pago
    """
    
    @transaction.atomic
    def create_purchase_with_tickets(self, email, visit_id, user_id, tickets_data, payment_method):
        """
        Crea una orden de compra completa con tickets y pago de forma atómica.
        
        Args:
            email (str): Email del comprador
            visit_id (int): ID de la visita
            user_id (int): ID del usuario
            tickets_data (list): Lista de diccionarios con ticket_id y quantity
            payment_method (str): Método de pago (CARD, PAYPAL, CASH)
            
        Returns:
            PurchaseOrders: La orden de compra creada
            
        Raises:
            ValidationError: Si hay errores de validación
            ValueError: Si no hay cupos suficientes
        """
        try:
            # 1. Validar que la visita existe
            visit = Visits.objects.get(id=visit_id)
            
            # 2. Calcular total de tickets y validar stock
            total_tickets = 0
            total_price_crc = 0
            total_price_usd = 0
            
            for ticket_data in tickets_data:
                ticket = Tickets.objects.get(id=ticket_data['ticket_id'])
                quantity = ticket_data['quantity']
                
                # Validar stock disponible
                if ticket.stock < quantity:
                    raise ValidationError(f"Stock insuficiente para el ticket {ticket.name}. Disponible: {ticket.stock}, Solicitado: {quantity}")
                
                total_tickets += quantity
                
                # Calcular precios por moneda
                if ticket.currency == 'CRC':
                    total_price_crc += ticket.price * quantity
                else:
                    total_price_usd += ticket.price * quantity
            
            # 3. Validar cupos disponibles en la visita
            if not visit.has_available_slots(total_tickets):
                raise ValueError(f"No hay cupos suficientes. Disponibles: {visit.available_slots}, Solicitados: {total_tickets}")
            
            # 4. Crear la orden de compra
            purchase_order = PurchaseOrders.objects.create(
                email=email,
                visit=visit,
                user_id=user_id,
                total_crc=total_price_crc,
                total_usd=total_price_usd,
                total_price=total_price_crc + total_price_usd,  # Simplificado, se puede mejorar con conversión
                status="PENDING"
            )
            
            # 5. Crear los tickets de compra y reducir stock
            for ticket_data in tickets_data:
                ticket = Tickets.objects.get(id=ticket_data['ticket_id'])
                quantity = ticket_data['quantity']
                
                # Crear ticket de compra
                TicketsPurchaseOrder.objects.create(
                    purchase_order=purchase_order,
                    ticket=ticket,
                    amount=quantity,
                    subtotal=ticket.price * quantity
                )
                
                # Reducir stock
                ticket.stock -= quantity
                ticket.save()
            
            # 6. Ocupar cupos en la visita
            if not visit.occupy_slots(total_tickets):
                raise ValueError("Error al ocupar cupos en la visita")
            
            # 7. Crear el registro de pago pendiente
            payment = Payments.objects.create(
                purchase_order=purchase_order,
                payment_method=payment_method,
                transaction_id=str(uuid.uuid4()),
                status="PENDING"  # Se actualizará cuando se procese el pago
            )
            
            logger.info(f"Orden de compra creada exitosamente: {purchase_order.id}")
            return purchase_order
            
        except Exception as e:
            logger.error(f"Error al crear orden de compra: {str(e)}")
            raise
    
    @transaction.atomic
    def cancel_purchase(self, purchase_order_id, reason="Cancelación manual"):
        """
        Cancela una orden de compra y libera todos los recursos.
        
        Args:
            purchase_order_id (int): ID de la orden a cancelar
            reason (str): Razón de la cancelación
            
        Returns:
            bool: True si se canceló exitosamente
        """
        try:
            purchase_order = PurchaseOrders.objects.get(id=purchase_order_id)
            
            if purchase_order.status in ["CANCELLED", "FAILED"]:
                logger.warning(f"La orden {purchase_order_id} ya está cancelada")
                return True
            
            # 1. Restaurar stock de tickets
            for ticket_purchase in purchase_order.tickets_purchase_order.all():
                ticket = ticket_purchase.ticket
                ticket.stock += ticket_purchase.amount
                ticket.save()
            
            # 2. Marcar orden como cancelada (esto libera cupos automáticamente)
            purchase_order.mark_as_cancelled()
            
            # 3. Actualizar pago si existe
            if hasattr(purchase_order, 'payment'):
                purchase_order.payment.status = "FAILED"
                purchase_order.payment.save()
            
            logger.info(f"Orden {purchase_order_id} cancelada exitosamente. Razón: {reason}")
            return True
            
        except PurchaseOrders.DoesNotExist:
            logger.error(f"Orden de compra {purchase_order_id} no encontrada")
            return False
        except Exception as e:
            logger.error(f"Error al cancelar orden {purchase_order_id}: {str(e)}")
            raise
    
    def validate_purchase_data(self, email, visit_id, tickets_data):
        """
        Valida los datos de una compra antes de procesarla.
        
        Args:
            email (str): Email del comprador
            visit_id (int): ID de la visita
            tickets_data (list): Lista de tickets a comprar
            
        Returns:
            dict: Resultado de la validación con errores si los hay
        """
        errors = []
        
        # Validar email
        if not email or '@' not in email:
            errors.append("Email inválido")
        
        # Validar visita
        try:
            visit = Visits.objects.get(id=visit_id)
        except Visits.DoesNotExist:
            errors.append("Visita no encontrada")
            return {"valid": False, "errors": errors}
        
        # Validar tickets
        if not tickets_data or len(tickets_data) == 0:
            errors.append("Debe seleccionar al menos un ticket")
        
        total_tickets = 0
        for ticket_data in tickets_data:
            try:
                ticket = Tickets.objects.get(id=ticket_data['ticket_id'])
                quantity = ticket_data['quantity']
                
                if quantity <= 0:
                    errors.append(f"Cantidad inválida para {ticket.name}")
                
                if ticket.stock < quantity:
                    errors.append(f"Stock insuficiente para {ticket.name}")
                
                total_tickets += quantity
                
            except Tickets.DoesNotExist:
                errors.append(f"Ticket {ticket_data['ticket_id']} no encontrado")
        
        # Validar cupos disponibles
        if not visit.has_available_slots(total_tickets):
            errors.append(f"No hay cupos suficientes. Disponibles: {visit.available_slots}")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "total_tickets": total_tickets
        }