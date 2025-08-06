from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.contrib.auth.models import User
import logging

from .models import Payments, Donation
from .serializers import PaymentSerializer, DonationSerializer
from ..purchase_orders.models import PurchaseOrders

# Configuración del logger para auditoría de pagos
logger = logging.getLogger('payments')

class PaymentsViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar pagos con transacciones atómicas y validaciones mejoradas.
    
    Funcionalidades:
    - CRUD completo de pagos
    - Procesamiento atómico de transacciones
    - Validaciones de estado y coherencia
    - Filtrado por usuario y estado
    - Auditoría automática de cambios
    """
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Filtra los pagos según el rol del usuario.
        
        Returns:
            QuerySet: Pagos filtrados según permisos del usuario
        """
        user = self.request.user
        
        # Los administradores pueden ver todos los pagos
        if user.is_staff or user.is_superuser:
            return Payments.objects.all().select_related('purchase_order')
        
        # Los usuarios regulares solo ven sus propios pagos
        return Payments.objects.filter(
            purchase_order__user=user
        ).select_related('purchase_order')
    
    @transaction.atomic
    def perform_create(self, serializer):
        """
        Crea un pago de forma atómica con validaciones.
        
        Args:
            serializer: Serializador del pago a crear
        """
        try:
            payment = serializer.save()
            logger.info(f"Pago creado exitosamente: {payment.id}")
        except Exception as e:
            logger.error(f"Error al crear pago: {str(e)}")
            raise
    
    @transaction.atomic
    def perform_update(self, serializer):
        """
        Actualiza un pago de forma atómica.
        
        Args:
            serializer: Serializador del pago a actualizar
        """
        try:
            payment = serializer.save()
            logger.info(f"Pago actualizado exitosamente: {payment.id}")
        except Exception as e:
            logger.error(f"Error al actualizar pago: {str(e)}")
            raise

class DonationViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar donaciones con validaciones y auditoría.
    
    Funcionalidades:
    - CRUD completo de donaciones
    - Validaciones de montos y datos
    - Filtrado por usuario
    - Estadísticas de donaciones
    """
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Filtra las donaciones según el rol del usuario.
        
        Returns:
            QuerySet: Donaciones filtradas según permisos del usuario
        """
        user = self.request.user
        
        # Los administradores pueden ver todas las donaciones
        if user.is_staff or user.is_superuser:
            return Donation.objects.all()
        
        # Los usuarios regulares solo ven sus propias donaciones
        return Donation.objects.filter(user=user)
    
    @transaction.atomic
    def perform_create(self, serializer):
        """
        Crea una donación de forma atómica con validaciones.
        
        Args:
            serializer: Serializador de la donación a crear
        """
        try:
            # Asignar el usuario actual si no se especifica
            if not serializer.validated_data.get('user'):
                serializer.validated_data['user'] = self.request.user
            
            donation = serializer.save()
            logger.info(f"Donación creada exitosamente: {donation.id} por usuario {donation.user.username}")
        except Exception as e:
            logger.error(f"Error al crear donación: {str(e)}")
            raise
    
    @action(detail=False, methods=['get'])
    @method_decorator(cache_page(60 * 15))  # Cache por 15 minutos
    def statistics(self, request):
        """
        Obtiene estadísticas de donaciones del usuario actual.
        
        Returns:
            Response: Estadísticas de donaciones
        """
        user = request.user
        
        try:
            if user.is_staff or user.is_superuser:
                # Estadísticas globales para administradores
                total_donations = Donation.objects.count()
                total_amount = sum(d.amount for d in Donation.objects.all())
                avg_amount = total_amount / total_donations if total_donations > 0 else 0
            else:
                # Estadísticas personales para usuarios regulares
                user_donations = Donation.objects.filter(user=user)
                total_donations = user_donations.count()
                total_amount = sum(d.amount for d in user_donations)
                avg_amount = total_amount / total_donations if total_donations > 0 else 0
            
            return Response({
                'total_donations': total_donations,
                'total_amount': total_amount,
                'average_amount': round(avg_amount, 2),
                'user_scope': 'global' if (user.is_staff or user.is_superuser) else 'personal'
            })
        
        except Exception as e:
            logger.error(f"Error al obtener estadísticas de donaciones: {str(e)}")
            return Response(
                {'error': 'Error al obtener estadísticas'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PaymentMethodsView(APIView):
    def get(self, request):
        methods = [
            {"method": "MASTERCARD", "label": "Tarjeta Mastercard"},
            {"method": "VISA", "label": "Tarjeta Visa"},
            {"method": "PAYPAL", "label": "PayPal"},
            {"method": "CASH", "label": "Efectivo/SINPE"},
        ]
        return Response(methods)