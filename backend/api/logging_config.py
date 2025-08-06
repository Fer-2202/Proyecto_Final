import logging
import os
from datetime import datetime

"""
Configuración de logging para el sistema de auditoría y monitoreo.

Este archivo configura los loggers para diferentes componentes del sistema:
- Órdenes de compra y tickets
- Pagos y transacciones
- Donaciones
- Auditoría general
- Errores del sistema

Cada logger tiene su propio archivo y formato para facilitar el monitoreo
y la resolución de problemas.
"""

# Directorio base para los logs
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')

# Crear directorio de logs si no existe
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# Formato común para todos los logs
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
DATE_FORMAT = '%Y-%m-%d %H:%M:%S'

# Configuración de loggers
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': LOG_FORMAT,
            'datefmt': DATE_FORMAT,
        },
        'detailed': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(module)s - %(funcName)s:%(lineno)d - %(message)s',
            'datefmt': DATE_FORMAT,
        },
    },
    'handlers': {
        # Handler para órdenes de compra
        'purchase_orders_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'purchase_orders.log'),
            'maxBytes': 10 * 1024 * 1024,  # 10MB
            'backupCount': 5,
            'formatter': 'detailed',
            'encoding': 'utf-8',
        },
        # Handler para pagos
        'payments_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'payments.log'),
            'maxBytes': 10 * 1024 * 1024,  # 10MB
            'backupCount': 5,
            'formatter': 'detailed',
            'encoding': 'utf-8',
        },
        # Handler para donaciones
        'donations_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'donations.log'),
            'maxBytes': 5 * 1024 * 1024,  # 5MB
            'backupCount': 3,
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
        # Handler para auditoría
        'audit_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'audit.log'),
            'maxBytes': 20 * 1024 * 1024,  # 20MB
            'backupCount': 10,
            'formatter': 'detailed',
            'encoding': 'utf-8',
        },
        # Handler para errores críticos
        'errors_file': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR, 'errors.log'),
            'maxBytes': 10 * 1024 * 1024,  # 10MB
            'backupCount': 5,
            'formatter': 'detailed',
            'encoding': 'utf-8',
        },
        # Handler para consola (desarrollo)
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
        },
    },
    'loggers': {
        # Logger para órdenes de compra
        'purchase_orders': {
            'handlers': ['purchase_orders_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        # Logger para pagos
        'payments': {
            'handlers': ['payments_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        # Logger para donaciones
        'donations': {
            'handlers': ['donations_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        # Logger para auditoría
        'audit': {
            'handlers': ['audit_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        # Logger para errores del sistema
        'system_errors': {
            'handlers': ['errors_file', 'console'],
            'level': 'ERROR',
            'propagate': False,
        },
        # Logger raíz para capturar otros logs
        'root': {
            'handlers': ['console'],
            'level': 'WARNING',
        },
    },
}


def setup_logging():
    """
    Configura el sistema de logging usando la configuración definida.
    
    Esta función debe ser llamada al inicio de la aplicación Django
    para configurar todos los loggers necesarios.
    """
    import logging.config
    
    # Aplicar la configuración
    logging.config.dictConfig(LOGGING_CONFIG)
    
    # Crear un log de inicio del sistema
    audit_logger = logging.getLogger('audit')
    audit_logger.info(f"Sistema de logging configurado correctamente - {datetime.now()}")


def get_logger(name):
    """
    Obtiene un logger configurado por nombre.
    
    Args:
        name (str): Nombre del logger ('purchase_orders', 'payments', 'donations', 'audit', 'system_errors')
    
    Returns:
        logging.Logger: Logger configurado
    
    Ejemplo:
        logger = get_logger('purchase_orders')
        logger.info('Orden creada exitosamente')
    """
    valid_loggers = ['purchase_orders', 'payments', 'donations', 'audit', 'system_errors']
    
    if name not in valid_loggers:
        # Si el nombre no es válido, devolver el logger de errores del sistema
        return logging.getLogger('system_errors')
    
    return logging.getLogger(name)


def log_user_action(logger_name, user, action, details=None):
    """
    Registra una acción de usuario en el log correspondiente.
    
    Args:
        logger_name (str): Nombre del logger a usar
        user: Usuario que realizó la acción
        action (str): Descripción de la acción
        details (dict, optional): Detalles adicionales de la acción
    
    Ejemplo:
        log_user_action('purchase_orders', request.user, 'CREATE_ORDER', 
                       {'order_id': 123, 'total': 50000})
    """
    logger = get_logger(logger_name)
    
    user_info = f"Usuario: {user.username} (ID: {user.id})" if user else "Usuario: Anónimo"
    message = f"{user_info} - Acción: {action}"
    
    if details:
        details_str = ", ".join([f"{k}: {v}" for k, v in details.items()])
        message += f" - Detalles: {details_str}"
    
    logger.info(message)


def log_system_error(error, context=None):
    """
    Registra un error del sistema con contexto adicional.
    
    Args:
        error (Exception): Excepción o error ocurrido
        context (dict, optional): Contexto adicional del error
    
    Ejemplo:
        try:
            # código que puede fallar
            pass
        except Exception as e:
            log_system_error(e, {'function': 'create_order', 'user_id': 123})
    """
    logger = get_logger('system_errors')
    
    error_message = f"Error: {str(error)} - Tipo: {type(error).__name__}"
    
    if context:
        context_str = ", ".join([f"{k}: {v}" for k, v in context.items()])
        error_message += f" - Contexto: {context_str}"
    
    logger.error(error_message, exc_info=True)


# Configurar logging automáticamente al importar el módulo
setup_logging()