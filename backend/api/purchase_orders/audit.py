from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import PurchaseOrders
from ..payments.models import Payments
import logging
import json
from datetime import datetime

# Configurar logger específico para auditoría
audit_logger = logging.getLogger('purchase_audit')

User = get_user_model()

class AuditLogger:
    """
    Clase para manejar el logging de auditoría de compras y pagos.
    
    Registra todos los cambios importantes en las órdenes de compra y pagos
    para trazabilidad y debugging.
    """
    
    @staticmethod
    def log_event(event_type, model_name, instance_id, changes=None, user=None, extra_data=None):
        """
        Registra un evento de auditoría.
        
        Args:
            event_type (str): Tipo de evento (CREATE, UPDATE, DELETE, etc.)
            model_name (str): Nombre del modelo afectado
            instance_id (int): ID de la instancia
            changes (dict): Cambios realizados (para UPDATE)
            user (User): Usuario que realizó la acción
            extra_data (dict): Datos adicionales
        """
        log_data = {
            'timestamp': datetime.now().isoformat(),
            'event_type': event_type,
            'model': model_name,
            'instance_id': instance_id,
            'user_id': user.id if user else None,
            'user_email': user.email if user else None,
            'changes': changes or {},
            'extra_data': extra_data or {}
        }
        
        audit_logger.info(f"AUDIT: {json.dumps(log_data, ensure_ascii=False)}")

# Signals para PurchaseOrders
@receiver(pre_save, sender=PurchaseOrders)
def purchase_order_pre_save(sender, instance, **kwargs):
    """
    Captura el estado anterior de la orden antes de guardar.
    """
    if instance.pk:
        try:
            instance._original = PurchaseOrders.objects.get(pk=instance.pk)
        except PurchaseOrders.DoesNotExist:
            instance._original = None
    else:
        instance._original = None

@receiver(post_save, sender=PurchaseOrders)
def purchase_order_post_save(sender, instance, created, **kwargs):
    """
    Registra la creación o actualización de órdenes de compra.
    """
    if created:
        # Nueva orden creada
        AuditLogger.log_event(
            event_type='CREATE',
            model_name='PurchaseOrders',
            instance_id=instance.id,
            extra_data={
                'email': instance.email,
                'visit_id': instance.visit.id,
                'visit_date': instance.visit.day.isoformat(),
                'total_price': float(instance.total_price),
                'status': instance.status
            }
        )
    else:
        # Orden actualizada
        changes = {}
        if hasattr(instance, '_original') and instance._original:
            original = instance._original
            
            # Detectar cambios en campos importantes
            if original.status != instance.status:
                changes['status'] = {
                    'from': original.status,
                    'to': instance.status
                }
            
            if original.total_price != instance.total_price:
                changes['total_price'] = {
                    'from': float(original.total_price),
                    'to': float(instance.total_price)
                }
            
            if changes:
                AuditLogger.log_event(
                    event_type='UPDATE',
                    model_name='PurchaseOrders',
                    instance_id=instance.id,
                    changes=changes,
                    extra_data={
                        'email': instance.email,
                        'visit_id': instance.visit.id
                    }
                )

@receiver(post_delete, sender=PurchaseOrders)
def purchase_order_post_delete(sender, instance, **kwargs):
    """
    Registra la eliminación de órdenes de compra.
    """
    AuditLogger.log_event(
        event_type='DELETE',
        model_name='PurchaseOrders',
        instance_id=instance.id,
        extra_data={
            'email': instance.email,
            'visit_id': instance.visit.id,
            'status': instance.status
        }
    )

# Signals para Payments
@receiver(pre_save, sender=Payments)
def payment_pre_save(sender, instance, **kwargs):
    """
    Captura el estado anterior del pago antes de guardar.
    """
    if instance.pk:
        try:
            instance._original = Payments.objects.get(pk=instance.pk)
        except Payments.DoesNotExist:
            instance._original = None
    else:
        instance._original = None

@receiver(post_save, sender=Payments)
def payment_post_save(sender, instance, created, **kwargs):
    """
    Registra la creación o actualización de pagos.
    """
    if created:
        # Nuevo pago creado
        AuditLogger.log_event(
            event_type='CREATE',
            model_name='Payments',
            instance_id=instance.id,
            extra_data={
                'purchase_order_id': instance.purchase_order.id,
                'payment_method': instance.payment_method,
                'transaction_id': instance.transaction_id,
                'status': instance.status,
                'buyer_email': instance.purchase_order.email
            }
        )
    else:
        # Pago actualizado
        changes = {}
        if hasattr(instance, '_original') and instance._original:
            original = instance._original
            
            # Detectar cambios en el estado del pago
            if original.status != instance.status:
                changes['status'] = {
                    'from': original.status,
                    'to': instance.status
                }
                
                # Log especial para cambios críticos de estado
                if instance.status == 'SUCCESS':
                    AuditLogger.log_event(
                        event_type='PAYMENT_SUCCESS',
                        model_name='Payments',
                        instance_id=instance.id,
                        changes=changes,
                        extra_data={
                            'purchase_order_id': instance.purchase_order.id,
                            'transaction_id': instance.transaction_id,
                            'payment_method': instance.payment_method,
                            'buyer_email': instance.purchase_order.email
                        }
                    )
                elif instance.status == 'FAILED':
                    AuditLogger.log_event(
                        event_type='PAYMENT_FAILED',
                        model_name='Payments',
                        instance_id=instance.id,
                        changes=changes,
                        extra_data={
                            'purchase_order_id': instance.purchase_order.id,
                            'transaction_id': instance.transaction_id,
                            'payment_method': instance.payment_method,
                            'buyer_email': instance.purchase_order.email
                        }
                    )
            
            if changes:
                AuditLogger.log_event(
                    event_type='UPDATE',
                    model_name='Payments',
                    instance_id=instance.id,
                    changes=changes,
                    extra_data={
                        'purchase_order_id': instance.purchase_order.id,
                        'transaction_id': instance.transaction_id
                    }
                )

@receiver(post_delete, sender=Payments)
def payment_post_delete(sender, instance, **kwargs):
    """
    Registra la eliminación de pagos.
    """
    AuditLogger.log_event(
        event_type='DELETE',
        model_name='Payments',
        instance_id=instance.id,
        extra_data={
            'purchase_order_id': instance.purchase_order.id,
            'transaction_id': instance.transaction_id,
            'status': instance.status
        }
    )

# Funciones de utilidad para consultar auditoría
def get_purchase_audit_log(purchase_order_id, limit=50):
    """
    Obtiene el log de auditoría para una orden específica.
    
    Args:
        purchase_order_id (int): ID de la orden de compra
        limit (int): Límite de registros a retornar
        
    Returns:
        list: Lista de eventos de auditoría
    """
    # Esta función requeriría implementar un sistema de almacenamiento
    # de logs más sofisticado (base de datos, Elasticsearch, etc.)
    # Por ahora, es un placeholder para futuras mejoras
    pass

def get_payment_audit_log(payment_id, limit=50):
    """
    Obtiene el log de auditoría para un pago específico.
    
    Args:
        payment_id (int): ID del pago
        limit (int): Límite de registros a retornar
        
    Returns:
        list: Lista de eventos de auditoría
    """
    # Placeholder para futuras mejoras
    pass