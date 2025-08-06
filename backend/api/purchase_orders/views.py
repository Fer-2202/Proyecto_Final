from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import PurchaseOrders
from .serializers import Purchase_Orders_Serializer, CreatePurchaseSerializer
from .services import PurchaseService
from api.permissions import IsAuthenticatedAndRole
import logging

logger = logging.getLogger(__name__)

class Purchase_Orders_ViewSet(viewsets.ModelViewSet):
    """
    ViewSet mejorado para órdenes de compra con transacciones atómicas.
    
    Funcionalidades:
    - CRUD básico con validaciones mejoradas
    - Creación atómica de órdenes con tickets
    - Cancelación de órdenes con liberación de recursos
    - Filtrado por usuario y rol
    - Cache para consultas frecuentes
    """
    queryset = PurchaseOrders.objects.select_related('visit', 'user').prefetch_related('tickets_purchase_order__ticket')
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Filtra las órdenes según el rol del usuario.
        """
        queryset = super().get_queryset()
        user = self.request.user
        
        # Los administradores pueden ver todas las órdenes
        if hasattr(user, 'role') and user.role == 'admin':
            return queryset
        
        # Los usuarios normales solo ven sus propias órdenes
        return queryset.filter(user=user)
    
    def get_serializer_class(self):
        """
        Usa diferentes serializers según la acción.
        """
        if self.action == 'create_with_tickets':
            return CreatePurchaseSerializer
        return self.serializer_class
    
    @transaction.atomic
    def perform_create(self, serializer):
        """
        Crea una orden de compra con validaciones mejoradas.
        """
        try:
            serializer.save(user=self.request.user)
            logger.info(f"Orden creada exitosamente por usuario {self.request.user.id}")
        except ValidationError as e:
            logger.error(f"Error de validación al crear orden: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error inesperado al crear orden: {str(e)}")
            raise
    
    @action(detail=False, methods=['post'], url_path='create-with-tickets')
    @transaction.atomic
    def create_with_tickets(self, request):
        """
        Endpoint especializado para crear órdenes con tickets usando el servicio centralizado.
        
        Body esperado:
        {
            "email": "user@example.com",
            "visit_id": 1,
            "tickets_data": [
                {"ticket_id": 1, "quantity": 2},
                {"ticket_id": 2, "quantity": 1}
            ],
            "payment_method": "CARD"
        }
        """
        serializer = CreatePurchaseSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                purchase_order = serializer.save(user=request.user)
                response_serializer = Purchase_Orders_Serializer(purchase_order)
                
                logger.info(f"Orden con tickets creada exitosamente: {purchase_order.id}")
                return Response(
                    {
                        'message': 'Orden creada exitosamente',
                        'purchase_order': response_serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            except ValidationError as e:
                logger.error(f"Error de validación: {str(e)}")
                return Response(
                    {'error': 'Error de validación', 'details': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                logger.error(f"Error inesperado: {str(e)}")
                return Response(
                    {'error': 'Error interno del servidor'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'], url_path='cancel')
    @transaction.atomic
    def cancel_order(self, request, pk=None):
        """
        Cancela una orden de compra y libera todos los recursos.
        """
        try:
            purchase_order = self.get_object()
            
            # Verificar permisos
            if purchase_order.user != request.user and not (hasattr(request.user, 'role') and request.user.role == 'admin'):
                return Response(
                    {'error': 'No tienes permisos para cancelar esta orden'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Verificar que se pueda cancelar
            if purchase_order.status in ['CANCELLED', 'FAILED']:
                return Response(
                    {'error': 'La orden ya está cancelada'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Usar el servicio para cancelar
            service = PurchaseService()
            reason = request.data.get('reason', 'Cancelación por usuario')
            
            if service.cancel_purchase(purchase_order.id, reason):
                logger.info(f"Orden {purchase_order.id} cancelada por usuario {request.user.id}")
                return Response(
                    {'message': 'Orden cancelada exitosamente'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'No se pudo cancelar la orden'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except Exception as e:
            logger.error(f"Error al cancelar orden {pk}: {str(e)}")
            return Response(
                {'error': 'Error interno del servidor'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['get'], url_path='summary')
    @method_decorator(cache_page(60 * 5))  # Cache por 5 minutos
    def order_summary(self, request, pk=None):
        """
        Retorna un resumen detallado de la orden.
        """
        try:
            purchase_order = self.get_object()
            
            # Verificar permisos
            if purchase_order.user != request.user and not (hasattr(request.user, 'role') and request.user.role == 'admin'):
                return Response(
                    {'error': 'No tienes permisos para ver esta orden'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            summary = {
                'order_id': purchase_order.id,
                'status': purchase_order.status,
                'email': purchase_order.email,
                'visit_date': purchase_order.visit.day,
                'total_tickets': purchase_order.get_total_tickets(),
                'total_price_crc': purchase_order.total_crc,
                'total_price_usd': purchase_order.total_usd,
                'tickets': [
                    {
                        'name': tp.ticket.name,
                        'quantity': tp.amount,
                        'price': tp.ticket.price,
                        'currency': tp.ticket.currency,
                        'subtotal': tp.subtotal
                    }
                    for tp in purchase_order.tickets_purchase_order.all()
                ],
                'payment': {
                    'method': purchase_order.payment.payment_method if hasattr(purchase_order, 'payment') else None,
                    'status': purchase_order.payment.status if hasattr(purchase_order, 'payment') else None,
                    'transaction_id': purchase_order.payment.transaction_id if hasattr(purchase_order, 'payment') else None
                } if hasattr(purchase_order, 'payment') else None
            }
            
            return Response(summary, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error al obtener resumen de orden {pk}: {str(e)}")
            return Response(
                {'error': 'Error interno del servidor'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class Purchase_Orders_DetailViewSet(viewsets.ModelViewSet):
    """
    ViewSet legacy mantenido por compatibilidad.
    Se recomienda usar Purchase_Orders_ViewSet.
    """
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def perform_create(self, serializer):
        """
        Crea una orden con transacción atómica.
        """
        logger.info(f"Creando orden via DetailViewSet - Usuario: {self.request.user.id}")
        serializer.save(user=self.request.user)

@api_view(['GET'])
def validate_qr(request):
    """
    Valida un código QR de una orden de compra.
    
    Parámetros:
        data (str): Datos del código QR escaneado
        
    Retorna:
        Response con el estado de la orden y detalles relevantes
        
    Formatos de QR soportados:
        - "Order ID: 123 | Email: user@example.com"
        - "123" (solo ID)
        
    Estados posibles:
        - PAID: Orden pagada y válida
        - PENDING: Orden válida pero pendiente de pago
        - CANCELLED: Orden cancelada
        - FAILED: Orden fallida
    """
    try:
        # Obtener datos del QR
        data = request.query_params.get('data')
        if not data:
            logger.warning("Intento de validación QR sin datos")
            return Response(
                {'detail': 'No se recibió ningún dato de QR.', 'valid': False}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Extraer ID de la orden del QR
        order_id = None
        try:
            if 'Order ID:' in data:
                # Formato: "Order ID: 123 | Email: ..."
                order_id = int(data.split('Order ID:')[1].split('|')[0].strip())
            else:
                # Formato simple: "123"
                order_id = int(data.strip())
        except (ValueError, IndexError) as e:
            logger.warning(f"Formato de QR inválido: {data}")
            return Response(
                {'detail': 'Formato de QR no válido.', 'valid': False}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Buscar la orden
        try:
            order = PurchaseOrders.objects.select_related('visit', 'user').get(id=order_id)
        except PurchaseOrders.DoesNotExist:
            logger.warning(f"Orden no encontrada para QR: {order_id}")
            return Response(
                {'detail': 'Orden no encontrada.', 'valid': False}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Preparar respuesta base
        base_response = {
            'order_id': order.id,
            'email': order.email,
            'visit_date': order.visit.day.isoformat(),
            'purchase_date': order.purchase_date.isoformat(),
            'total_tickets': order.get_total_tickets(),
            'total_price_crc': float(order.total_crc),
            'total_price_usd': float(order.total_usd)
        }
        
        # Validar según el estado de la orden
        if order.status == 'PAID':
            logger.info(f"QR válido para orden pagada: {order.id}")
            return Response({
                'detail': 'QR válido. Orden pagada correctamente.',
                'valid': True,
                'status': 'PAID',
                'access_granted': True,
                **base_response
            }, status=status.HTTP_200_OK)
            
        elif order.status == 'PENDING':
            logger.info(f"QR válido pero orden pendiente: {order.id}")
            return Response({
                'detail': 'QR válido, pero la orden aún no ha sido pagada.',
                'valid': True,
                'status': 'PENDING',
                'access_granted': False,
                'payment_required': True,
                **base_response
            }, status=status.HTTP_200_OK)
            
        elif order.status == 'CANCELLED':
            logger.warning(f"QR de orden cancelada: {order.id}")
            return Response({
                'detail': 'La orden fue cancelada.',
                'valid': False,
                'status': 'CANCELLED',
                'access_granted': False,
                **base_response
            }, status=status.HTTP_400_BAD_REQUEST)
            
        elif order.status == 'FAILED':
            logger.warning(f"QR de orden fallida: {order.id}")
            return Response({
                'detail': 'El pago de la orden falló.',
                'valid': False,
                'status': 'FAILED',
                'access_granted': False,
                **base_response
            }, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            logger.error(f"Estado de orden desconocido: {order.status} para orden {order.id}")
            return Response({
                'detail': 'Estado de la orden desconocido.',
                'valid': False,
                'status': order.status,
                'access_granted': False,
                **base_response
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        logger.error(f"Error inesperado al validar QR: {str(e)}")
        return Response(
            {'detail': 'Error interno del servidor', 'valid': False}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@transaction.atomic
def bulk_validate_qr(request):
    """
    Valida múltiples códigos QR en una sola petición.
    Útil para validaciones masivas en eventos.
    
    Body esperado:
    {
        "qr_codes": ["Order ID: 123", "Order ID: 124", "125"]
    }
    """
    try:
        qr_codes = request.data.get('qr_codes', [])
        
        if not qr_codes or not isinstance(qr_codes, list):
            return Response(
                {'error': 'Se requiere una lista de códigos QR'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(qr_codes) > 50:  # Límite de seguridad
            return Response(
                {'error': 'Máximo 50 códigos QR por petición'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        results = []
        for qr_data in qr_codes:
            # Simular request para reutilizar la lógica de validate_qr
            mock_request = type('MockRequest', (), {
                'query_params': {'data': qr_data}
            })()
            
            # Llamar a validate_qr y procesar resultado
            response = validate_qr(mock_request)
            results.append({
                'qr_data': qr_data,
                'result': response.data,
                'status_code': response.status_code
            })
        
        return Response({
            'total_processed': len(results),
            'results': results
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error en validación masiva de QR: {str(e)}")
        return Response(
            {'error': 'Error interno del servidor'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )