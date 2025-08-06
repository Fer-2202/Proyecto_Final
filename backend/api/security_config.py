from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import hashlib
import secrets
import re

"""
Configuración de seguridad para el sistema de compras y donaciones.

Este módulo proporciona utilidades y configuraciones de seguridad para:
- Validación de datos sensibles
- Generación de tokens seguros
- Validación de permisos
- Protección contra ataques comunes
- Auditoría de seguridad
"""

# Configuraciones de seguridad
SECURITY_CONFIG = {
    # Límites de intentos
    'MAX_LOGIN_ATTEMPTS': 5,
    'LOGIN_LOCKOUT_DURATION': 30,  # minutos
    
    # Límites de transacciones
    'MAX_DAILY_PURCHASES_PER_USER': 10,
    'MAX_DAILY_DONATIONS_PER_USER': 5,
    'MAX_PURCHASE_AMOUNT': 500000,  # colones
    'MAX_DONATION_AMOUNT': 1000000,  # colones
    
    # Configuración de tokens
    'TOKEN_LENGTH': 32,
    'TOKEN_EXPIRY_HOURS': 24,
    
    # Validación de datos
    'MIN_PASSWORD_LENGTH': 8,
    'REQUIRE_SPECIAL_CHARS': True,
    'REQUIRE_NUMBERS': True,
    'REQUIRE_UPPERCASE': True,
}


class SecurityValidator:
    """
    Clase para validaciones de seguridad centralizadas.
    
    Proporciona métodos para validar datos sensibles y aplicar
    políticas de seguridad de forma consistente en toda la aplicación.
    
    === CÓMO USAR ===
    
    1. VALIDAR MONTO DE TRANSACCIÓN:
        from api.security_config import security_validator
        
        # Validar compra
        security_validator.validate_transaction_amount(50000, 'purchase')
        
        # Validar donación
        security_validator.validate_transaction_amount(100000, 'donation')
    
    2. VERIFICAR LÍMITES DE USUARIO:
        # Verificar límites diarios
        security_validator.check_user_transaction_limits(user, 'purchase')
        security_validator.check_user_transaction_limits(user, 'donation')
    
    3. VALIDAR CONTRASEÑA:
        is_valid = security_validator.validate_password_strength('MiPassword123!')
    
    4. GENERAR TOKEN SEGURO:
        token = security_validator.generate_secure_token()
    
    === LÍMITES CONFIGURADOS ===
    - Compras diarias por usuario: 10
    - Donaciones diarias por usuario: 5
    - Monto máximo compra: ₡500,000
    - Monto máximo donación: ₡1,000,000
    
    === CÓMO MODIFICAR LÍMITES ===
    Editar SECURITY_CONFIG en este archivo:
    - MAX_DAILY_PURCHASES_PER_USER: Cambiar límite de compras
    - MAX_PURCHASE_AMOUNT: Cambiar monto máximo de compra
    - MAX_DONATION_AMOUNT: Cambiar monto máximo de donación
    """
    
    @staticmethod
    def validate_email_security(email):
        """
        Valida un email desde el punto de vista de seguridad.
        
        Args:
            email (str): Email a validar
            
        Returns:
            bool: True si el email es seguro
            
        Raises:
            ValidationError: Si el email no cumple criterios de seguridad
        """
        if not email:
            raise ValidationError("El email es requerido.")
        
        # Validar formato básico
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            raise ValidationError("Formato de email inválido.")
        
        # Validar longitud
        if len(email) > 254:
            raise ValidationError("El email es demasiado largo.")
        
        # Validar dominios sospechosos (lista básica)
        suspicious_domains = [
            'tempmail.org', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'throwaway.email'
        ]
        
        domain = email.split('@')[1].lower()
        if domain in suspicious_domains:
            raise ValidationError("Dominio de email no permitido.")
        
        return True
    
    @staticmethod
    def validate_password_strength(password):
        """
        Valida la fortaleza de una contraseña.
        
        Args:
            password (str): Contraseña a validar
            
        Returns:
            bool: True si la contraseña es fuerte
            
        Raises:
            ValidationError: Si la contraseña no cumple criterios
        """
        if not password:
            raise ValidationError("La contraseña es requerida.")
        
        # Validar longitud mínima
        if len(password) < SECURITY_CONFIG['MIN_PASSWORD_LENGTH']:
            raise ValidationError(
                f"La contraseña debe tener al menos {SECURITY_CONFIG['MIN_PASSWORD_LENGTH']} caracteres."
            )
        
        # Validar caracteres especiales
        if SECURITY_CONFIG['REQUIRE_SPECIAL_CHARS']:
            if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
                raise ValidationError(
                    "La contraseña debe contener al menos un carácter especial."
                )
        
        # Validar números
        if SECURITY_CONFIG['REQUIRE_NUMBERS']:
            if not re.search(r'\d', password):
                raise ValidationError(
                    "La contraseña debe contener al menos un número."
                )
        
        # Validar mayúsculas
        if SECURITY_CONFIG['REQUIRE_UPPERCASE']:
            if not re.search(r'[A-Z]', password):
                raise ValidationError(
                    "La contraseña debe contener al menos una letra mayúscula."
                )
        
        # Validar que no sea una contraseña común
        common_passwords = [
            'password', '123456', 'password123', 'admin', 'qwerty',
            'letmein', 'welcome', 'monkey', '1234567890'
        ]
        
        if password.lower() in common_passwords:
            raise ValidationError("La contraseña es demasiado común.")
        
        return True
    
    @staticmethod
    def validate_transaction_amount(amount, transaction_type='purchase'):
        """
        Valida el monto de una transacción desde el punto de vista de seguridad.
        
        Args:
            amount (float): Monto a validar
            transaction_type (str): Tipo de transacción ('purchase' o 'donation')
            
        Returns:
            bool: True si el monto es válido
            
        Raises:
            ValidationError: Si el monto excede límites de seguridad
        """
        if amount <= 0:
            raise ValidationError("El monto debe ser mayor a cero.")
        
        # Validar límites según tipo de transacción
        if transaction_type == 'purchase':
            max_amount = SECURITY_CONFIG['MAX_PURCHASE_AMOUNT']
            if amount > max_amount:
                raise ValidationError(
                    f"El monto de compra no puede exceder ₡{max_amount:,.2f}."
                )
        
        elif transaction_type == 'donation':
            max_amount = SECURITY_CONFIG['MAX_DONATION_AMOUNT']
            if amount > max_amount:
                raise ValidationError(
                    f"El monto de donación no puede exceder ₡{max_amount:,.2f}."
                )
        
        return True
    
    @staticmethod
    def check_user_transaction_limits(user, transaction_type='purchase'):
        """
        Verifica si un usuario ha excedido los límites diarios de transacciones.
        
        Args:
            user: Usuario a verificar
            transaction_type (str): Tipo de transacción a verificar
            
        Returns:
            bool: True si el usuario puede realizar la transacción
            
        Raises:
            ValidationError: Si el usuario ha excedido los límites
        """
        today = timezone.now().date()
        
        if transaction_type == 'purchase':
            from api.purchase_orders.models import PurchaseOrders
            
            daily_purchases = PurchaseOrders.objects.filter(
                user=user,
                order_date=today
            ).count()
            
            max_daily = SECURITY_CONFIG['MAX_DAILY_PURCHASES_PER_USER']
            if daily_purchases >= max_daily:
                raise ValidationError(
                    f"Has excedido el límite diario de {max_daily} compras."
                )
        
        elif transaction_type == 'donation':
            from api.payments.models import Donation
            
            daily_donations = Donation.objects.filter(
                user=user,
                created_at__date=today
            ).count()
            
            max_daily = SECURITY_CONFIG['MAX_DAILY_DONATIONS_PER_USER']
            if daily_donations >= max_daily:
                raise ValidationError(
                    f"Has excedido el límite diario de {max_daily} donaciones."
                )
        
        return True


class TokenManager:
    """
    Gestor de tokens seguros para el sistema.
    
    Proporciona métodos para generar, validar y gestionar tokens
    de seguridad para diferentes propósitos.
    """
    
    @staticmethod
    def generate_secure_token(length=None):
        """
        Genera un token seguro aleatorio.
        
        Args:
            length (int, optional): Longitud del token
            
        Returns:
            str: Token seguro generado
        """
        if length is None:
            length = SECURITY_CONFIG['TOKEN_LENGTH']
        
        return secrets.token_urlsafe(length)
    
    @staticmethod
    def generate_order_token(order_id, user_id):
        """
        Genera un token específico para una orden.
        
        Args:
            order_id (int): ID de la orden
            user_id (int): ID del usuario
            
        Returns:
            str: Token de la orden
        """
        # Combinar datos de la orden con un salt aleatorio
        salt = secrets.token_hex(16)
        data = f"{order_id}:{user_id}:{salt}:{timezone.now().isoformat()}"
        
        # Generar hash SHA-256
        token = hashlib.sha256(data.encode()).hexdigest()
        
        return token
    
    @staticmethod
    def generate_qr_validation_token(order_id):
        """
        Genera un token para validación de códigos QR.
        
        Args:
            order_id (int): ID de la orden
            
        Returns:
            str: Token de validación QR
        """
        # Datos específicos para QR
        timestamp = timezone.now().timestamp()
        data = f"QR:{order_id}:{timestamp}:{secrets.token_hex(8)}"
        
        # Generar hash más corto para QR
        token = hashlib.md5(data.encode()).hexdigest()[:16]
        
        return token.upper()


class PermissionChecker:
    """
    Verificador de permisos y autorización.
    
    Centraliza las verificaciones de permisos para diferentes
    operaciones del sistema.
    """
    
    @staticmethod
    def can_user_access_order(user, order):
        """
        Verifica si un usuario puede acceder a una orden específica.
        
        Args:
            user: Usuario a verificar
            order: Orden a verificar
            
        Returns:
            bool: True si el usuario puede acceder
        """
        # Los administradores pueden acceder a todas las órdenes
        if user.is_staff or user.is_superuser:
            return True
        
        # Los usuarios solo pueden acceder a sus propias órdenes
        return order.user == user
    
    @staticmethod
    def can_user_modify_order(user, order):
        """
        Verifica si un usuario puede modificar una orden.
        
        Args:
            user: Usuario a verificar
            order: Orden a verificar
            
        Returns:
            bool: True si el usuario puede modificar
        """
        # Solo los administradores pueden modificar órdenes
        if user.is_staff or user.is_superuser:
            return True
        
        # Los usuarios solo pueden cancelar sus propias órdenes pendientes
        if order.user == user and order.status == 'PENDING':
            return True
        
        return False
    
    @staticmethod
    def can_user_access_payment(user, payment):
        """
        Verifica si un usuario puede acceder a información de un pago.
        
        Args:
            user: Usuario a verificar
            payment: Pago a verificar
            
        Returns:
            bool: True si el usuario puede acceder
        """
        # Los administradores pueden acceder a todos los pagos
        if user.is_staff or user.is_superuser:
            return True
        
        # Los usuarios solo pueden acceder a pagos de sus órdenes
        if payment.purchase_order:
            return payment.purchase_order.user == user
        
        return False
    
    @staticmethod
    def can_user_view_statistics(user):
        """
        Verifica si un usuario puede ver estadísticas del sistema.
        
        Args:
            user: Usuario a verificar
            
        Returns:
            bool: True si el usuario puede ver estadísticas
        """
        # Solo administradores pueden ver estadísticas globales
        return user.is_staff or user.is_superuser


def sanitize_input(input_string, max_length=255):
    """
    Sanitiza una cadena de entrada para prevenir ataques.
    
    Args:
        input_string (str): Cadena a sanitizar
        max_length (int): Longitud máxima permitida
        
    Returns:
        str: Cadena sanitizada
    """
    if not input_string:
        return ""
    
    # Convertir a string y limitar longitud
    sanitized = str(input_string)[:max_length]
    
    # Remover caracteres peligrosos
    dangerous_chars = ['<', '>', '"', "'", '&', ';', '(', ')', '|', '`']
    for char in dangerous_chars:
        sanitized = sanitized.replace(char, '')
    
    # Limpiar espacios extra
    sanitized = ' '.join(sanitized.split())
    
    return sanitized


def log_security_event(event_type, user, details=None):
    """
    Registra un evento de seguridad en el log de auditoría.
    
    Args:
        event_type (str): Tipo de evento de seguridad
        user: Usuario involucrado en el evento
        details (dict, optional): Detalles adicionales del evento
    """
    from logging_config import get_logger
    
    logger = get_logger('audit')
    
    user_info = f"Usuario: {user.username} (ID: {user.id})" if user else "Usuario: Anónimo"
    message = f"EVENTO DE SEGURIDAD - Tipo: {event_type} - {user_info}"
    
    if details:
        details_str = ", ".join([f"{k}: {v}" for k, v in details.items()])
        message += f" - Detalles: {details_str}"
    
    logger.warning(message)


# Instancias globales para uso fácil
security_validator = SecurityValidator()
token_manager = TokenManager()
permission_checker = PermissionChecker()