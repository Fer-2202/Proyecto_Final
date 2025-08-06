from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils import timezone
from decimal import Decimal
import re

from .models import Payments, Donation
from ..purchase_orders.models import PurchaseOrders


class PaymentSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Payments con validaciones mejoradas.
    
    Funcionalidades:
    - Validación de estados de pago
    - Validación de métodos de pago
    - Validación de coherencia con órdenes de compra
    - Campos calculados y de solo lectura
    """
    
    # Campos de solo lectura calculados
    order_total = serializers.SerializerMethodField()
    order_status = serializers.SerializerMethodField()
    days_since_payment = serializers.SerializerMethodField()
    
    class Meta:
        model = Payments
        fields = '__all__'
        read_only_fields = ('payment_date', 'order_total', 'order_status', 'days_since_payment')
    
    def get_order_total(self, obj):
        """
        Obtiene el total de la orden de compra asociada.
        
        Args:
            obj: Instancia del pago
            
        Returns:
            float: Total de la orden de compra
        """
        if obj.purchase_order:
            return float(obj.purchase_order.total_price)
        return 0.0
    
    def get_order_status(self, obj):
        """
        Obtiene el estado de la orden de compra asociada.
        
        Args:
            obj: Instancia del pago
            
        Returns:
            str: Estado de la orden de compra
        """
        if obj.purchase_order:
            return obj.purchase_order.status
        return None
    
    def get_days_since_payment(self, obj):
        """
        Calcula los días transcurridos desde el pago.
        
        Args:
            obj: Instancia del pago
            
        Returns:
            int: Días transcurridos desde el pago
        """
        if obj.payment_date:
            delta = timezone.now().date() - obj.payment_date
            return delta.days
        return None
    
    def validate_purchase_order(self, value):
        """
        Valida que la orden de compra sea válida para el pago.
        
        Args:
            value: Orden de compra a validar
            
        Returns:
            PurchaseOrders: Orden de compra validada
            
        Raises:
            ValidationError: Si la orden no es válida para pago
        """
        if not value:
            raise serializers.ValidationError("La orden de compra es requerida.")
        
        # Verificar que la orden existe y está en estado válido
        if value.status not in ['PENDING', 'PAID']:
            raise serializers.ValidationError(
                f"No se puede procesar el pago para una orden en estado {value.status}."
            )
        
        return value
    
    def validate_payment_method(self, value):
        """
        Valida que el método de pago sea válido.
        
        Args:
            value: Método de pago a validar
            
        Returns:
            str: Método de pago validado
            
        Raises:
            ValidationError: Si el método de pago no es válido
        """
        valid_methods = ['MASTERCARD', 'VISA', 'PAYPAL', 'CASH']
        
        if value not in valid_methods:
            raise serializers.ValidationError(
                f"Método de pago inválido. Métodos válidos: {', '.join(valid_methods)}"
            )
        
        return value
    
    def validate_transaction_id(self, value):
        """
        Valida el formato del ID de transacción según el método de pago.
        
        Args:
            value: ID de transacción a validar
            
        Returns:
            str: ID de transacción validado
            
        Raises:
            ValidationError: Si el formato del ID no es válido
        """
        if not value:
            return value
        
        # Validar longitud mínima
        if len(value) < 5:
            raise serializers.ValidationError(
                "El ID de transacción debe tener al menos 5 caracteres."
            )
        
        # Validar caracteres permitidos (alfanuméricos y algunos símbolos)
        if not re.match(r'^[A-Za-z0-9_-]+$', value):
            raise serializers.ValidationError(
                "El ID de transacción solo puede contener letras, números, guiones y guiones bajos."
            )
        
        return value
    
    def validate_status(self, value):
        """
        Valida que el estado del pago sea válido.
        
        Args:
            value: Estado del pago a validar
            
        Returns:
            str: Estado del pago validado
            
        Raises:
            ValidationError: Si el estado no es válido
        """
        valid_statuses = ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']
        
        if value not in valid_statuses:
            raise serializers.ValidationError(
                f"Estado de pago inválido. Estados válidos: {', '.join(valid_statuses)}"
            )
        
        return value
    
    def validate(self, attrs):
        """
        Validación general del pago.
        
        Args:
            attrs: Atributos del pago a validar
            
        Returns:
            dict: Atributos validados
            
        Raises:
            ValidationError: Si hay inconsistencias en los datos
        """
        # Validar coherencia entre método de pago y transaction_id
        payment_method = attrs.get('payment_method')
        transaction_id = attrs.get('transaction_id')
        
        if payment_method == 'CASH' and transaction_id:
            # Para pagos en efectivo, el transaction_id es opcional
            pass
        elif payment_method in ['MASTERCARD', 'VISA', 'PAYPAL'] and not transaction_id:
            raise serializers.ValidationError(
                f"El método de pago {payment_method} requiere un ID de transacción."
            )
        
        # Validar que no se pueda cambiar el estado a SUCCESS sin transaction_id
        status = attrs.get('status')
        if status == 'SUCCESS' and not transaction_id and payment_method != 'CASH':
            raise serializers.ValidationError(
                "No se puede marcar como exitoso un pago sin ID de transacción (excepto efectivo)."
            )
        
        return attrs


class DonationSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Donation con validaciones mejoradas.
    
    Funcionalidades:
    - Validación de montos mínimos y máximos
    - Validación de datos del donante
    - Campos calculados
    - Validaciones de coherencia
    """
    
    # Campos de solo lectura calculados
    donation_date_formatted = serializers.SerializerMethodField()
    amount_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('donation_date', 'donation_date_formatted', 'amount_formatted')
    
    def get_donation_date_formatted(self, obj):
        """
        Formatea la fecha de donación para mostrar.
        
        Args:
            obj: Instancia de la donación
            
        Returns:
            str: Fecha formateada
        """
        if obj.donation_date:
            return obj.donation_date.strftime('%d/%m/%Y %H:%M')
        return None
    
    def get_amount_formatted(self, obj):
        """
        Formatea el monto de la donación con símbolo de moneda.
        
        Args:
            obj: Instancia de la donación
            
        Returns:
            str: Monto formateado
        """
        if obj.amount:
            return f"₡{obj.amount:,.2f}"
        return "₡0.00"
    
    def validate_amount(self, value):
        """
        Valida que el monto de la donación sea válido.
        
        Args:
            value: Monto a validar
            
        Returns:
            Decimal: Monto validado
            
        Raises:
            ValidationError: Si el monto no es válido
        """
        if value is None:
            raise serializers.ValidationError("El monto de la donación es requerido.")
        
        # Convertir a Decimal para mayor precisión
        if not isinstance(value, Decimal):
            value = Decimal(str(value))
        
        # Validar monto mínimo
        min_amount = Decimal('1.00')
        if value < min_amount:
            raise serializers.ValidationError(
                f"El monto mínimo de donación es ₡{min_amount}."
            )
        
        # Validar monto máximo (límite razonable)
        max_amount = Decimal('1000000.00')  # 1 millón
        if value > max_amount:
            raise serializers.ValidationError(
                f"El monto máximo de donación es ₡{max_amount:,.2f}."
            )
        
        # Validar que tenga máximo 2 decimales
        if value.as_tuple().exponent < -2:
            raise serializers.ValidationError(
                "El monto no puede tener más de 2 decimales."
            )
        
        return value
    
    def validate_donor_name(self, value):
        """
        Valida el nombre del donante.
        
        Args:
            value: Nombre del donante a validar
            
        Returns:
            str: Nombre validado
            
        Raises:
            ValidationError: Si el nombre no es válido
        """
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre del donante es requerido.")
        
        # Validar longitud
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "El nombre del donante debe tener al menos 2 caracteres."
            )
        
        if len(value.strip()) > 100:
            raise serializers.ValidationError(
                "El nombre del donante no puede exceder 100 caracteres."
            )
        
        # Validar caracteres permitidos (letras, espacios, algunos símbolos)
        if not re.match(r'^[A-Za-zÀ-ÿ\s\.\-\']+$', value.strip()):
            raise serializers.ValidationError(
                "El nombre del donante solo puede contener letras, espacios, puntos, guiones y apostrofes."
            )
        
        return value.strip()
    
    def validate_donor_email(self, value):
        """
        Valida el email del donante.
        
        Args:
            value: Email del donante a validar
            
        Returns:
            str: Email validado
            
        Raises:
            ValidationError: Si el email no es válido
        """
        if not value:
            return value  # Email es opcional
        
        # Validar formato básico de email
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError(
                "Formato de email inválido."
            )
        
        return value.lower().strip()
    
    def validate(self, attrs):
        """
        Validación general de la donación.
        
        Args:
            attrs: Atributos de la donación a validar
            
        Returns:
            dict: Atributos validados
        """
        # Si no se especifica usuario, se asignará en la vista
        # Aquí solo validamos la coherencia de los datos
        
        return attrs