from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import PurchaseOrders
from .services import PurchaseService
from api.payments.serializers import PaymentSerializer
from api.visits.models import Visits
from api.tickets.models import Tickets

class Purchase_Orders_Serializer(serializers.ModelSerializer):
    """
    Serializer para órdenes de compra con validaciones mejoradas.
    
    Campos adicionales:
    - payment: Información del pago asociado
    - total_tickets: Cantidad total de tickets (solo lectura)
    - available_slots: Cupos disponibles en la visita (solo lectura)
    """
    payment = serializers.SerializerMethodField()
    total_tickets = serializers.SerializerMethodField()
    available_slots = serializers.SerializerMethodField()
    
    class Meta:
        model = PurchaseOrders
        fields = '__all__'
        read_only_fields = ('order_date', 'purchase_date', 'total_price', 'total_crc', 'total_usd', 'qr_image')

    def get_payment(self, obj):
        """
        Retorna la información del pago asociado a la orden.
        """
        if hasattr(obj, 'payment'):
            return PaymentSerializer(obj.payment).data
        return None
    
    def get_total_tickets(self, obj):
        """
        Retorna la cantidad total de tickets en la orden.
        """
        return obj.get_total_tickets()
    
    def get_available_slots(self, obj):
        """
        Retorna los cupos disponibles en la visita.
        """
        return obj.visit.available_slots if obj.visit else 0
    
    def validate_email(self, value):
        """
        Valida que el email tenga un formato correcto.
        """
        if not value or '@' not in value:
            raise serializers.ValidationError("El email debe tener un formato válido")
        return value
    
    def validate_visit(self, value):
        """
        Valida que la visita exista y esté disponible.
        """
        if not value:
            raise serializers.ValidationError("Debe seleccionar una visita")
        
        try:
            visit = Visits.objects.get(id=value.id)
            if visit.available_slots <= 0:
                raise serializers.ValidationError("No hay cupos disponibles para esta visita")
        except Visits.DoesNotExist:
            raise serializers.ValidationError("La visita seleccionada no existe")
        
        return value
    
    def validate(self, attrs):
        """
        Validaciones a nivel de objeto.
        """
        # Validar que el usuario tenga permisos para crear órdenes
        user = self.context.get('request').user if self.context.get('request') else None
        if user and not user.is_authenticated:
            raise serializers.ValidationError("Debe estar autenticado para crear una orden")
        
        return attrs

class CreatePurchaseSerializer(serializers.Serializer):
    """
    Serializer especializado para crear órdenes de compra con tickets.
    Utiliza el servicio centralizado PurchaseService.
    
    Uso:
        data = {
            "email": "user@example.com",
            "visit_id": 1,
            "tickets_data": [
                {"ticket_id": 1, "quantity": 2},
                {"ticket_id": 2, "quantity": 1}
            ],
            "payment_method": "CARD"
        }
        serializer = CreatePurchaseSerializer(data=data)
        if serializer.is_valid():
            purchase_order = serializer.save(user=request.user)
    """
    email = serializers.EmailField()
    visit_id = serializers.IntegerField()
    tickets_data = serializers.ListField(
        child=serializers.DictField(child=serializers.IntegerField()),
        min_length=1
    )
    payment_method = serializers.ChoiceField(
        choices=[('CARD', 'Tarjeta'), ('PAYPAL', 'PayPal'), ('CASH', 'Efectivo')]
    )
    
    def validate_tickets_data(self, value):
        """
        Valida que los datos de tickets tengan el formato correcto.
        """
        for ticket_data in value:
            if 'ticket_id' not in ticket_data or 'quantity' not in ticket_data:
                raise serializers.ValidationError(
                    "Cada ticket debe tener 'ticket_id' y 'quantity'"
                )
            
            if ticket_data['quantity'] <= 0:
                raise serializers.ValidationError(
                    "La cantidad debe ser mayor a 0"
                )
        
        return value
    
    def validate(self, attrs):
        """
        Validación completa usando el servicio de compras.
        """
        service = PurchaseService()
        validation_result = service.validate_purchase_data(
            email=attrs['email'],
            visit_id=attrs['visit_id'],
            tickets_data=attrs['tickets_data']
        )
        
        if not validation_result['valid']:
            raise serializers.ValidationError({
                'non_field_errors': validation_result['errors']
            })
        
        return attrs
    
    def save(self, **kwargs):
        """
        Crea la orden de compra usando el servicio centralizado.
        """
        user = kwargs.get('user')
        if not user:
            raise serializers.ValidationError("Usuario requerido")
        
        service = PurchaseService()
        return service.create_purchase_with_tickets(
            email=self.validated_data['email'],
            visit_id=self.validated_data['visit_id'],
            user_id=user.id,
            tickets_data=self.validated_data['tickets_data'],
            payment_method=self.validated_data['payment_method']
        )