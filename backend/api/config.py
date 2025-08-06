# -*- coding: utf-8 -*-
"""
Configuración Principal del Sistema
===================================

Este archivo centraliza todas las configuraciones y mejoras implementadas
en el sistema de compras y donaciones.

=== CÓMO USAR ESTE SISTEMA ===

1. INICIALIZACIÓN:
   from api.config import SystemConfig
   config = SystemConfig()
   config.initialize()  # Configura todos los componentes

2. OBTENER ESTADO DEL SISTEMA:
   status = config.get_system_status()
   print(status['system_health'])  # 'OK' o 'ERROR'

3. ACCEDER A COMPONENTES:
   - config.logger: Sistema de logging
   - config.security_validator: Validaciones de seguridad
   - config.db_manager: Gestión de base de datos
   - config.metrics: Métricas del sistema

=== CÓMO MODIFICAR ===

- Para agregar nuevas validaciones: Editar security_config.py
- Para nuevas métricas: Editar monitoring_config.py
- Para operaciones de BD: Editar database_config.py
- Para logging: Editar logging_config.py

Autor: Sistema de Mejoras Backend
Fecha: 2024
"""

import os
import logging
from django.conf import settings
from django.core.cache import cache
from django.db import transaction
from datetime import datetime, timedelta

# Importar todas las configuraciones mejoradas
try:
    from .logging_config import setup_logging, get_logger
    from .security_config import SECURITY_CONFIG, SecurityValidator
    from .database_config import DatabaseManager, QueryOptimizer
    from .monitoring_config import SystemMetrics, AlertManager
except ImportError as e:
    print(f"Advertencia: No se pudieron importar todas las configuraciones: {e}")


class SystemConfig:
    """
    Configuración principal del sistema que integra todas las mejoras.
    
    Esta clase centraliza la configuración de:
    - Logging y auditoría
    - Seguridad y validaciones
    - Optimización de base de datos
    - Monitoreo y métricas
    """
    
    def __init__(self):
        """Inicializar la configuración del sistema."""
        self.logger = None
        self.security_validator = None
        self.db_manager = None
        self.metrics = None
        self.alert_manager = None
        self._initialize_components()
    
    def _initialize_components(self):
        """Inicializar todos los componentes del sistema."""
        try:
            # Configurar logging
            setup_logging()
            self.logger = get_logger('system')
            
            # Inicializar validador de seguridad
            self.security_validator = SecurityValidator()
            
            # Inicializar gestor de base de datos
            self.db_manager = DatabaseManager()
            
            # Inicializar métricas y alertas
            self.metrics = SystemMetrics()
            self.alert_manager = AlertManager()
            
            self.logger.info("Sistema inicializado correctamente")
            
        except Exception as e:
            print(f"Error al inicializar componentes del sistema: {e}")
    
    def get_system_status(self):
        """
        Obtener el estado general del sistema.
        
        Returns:
            dict: Estado del sistema con métricas básicas
        """
        try:
            status = {
                'timestamp': datetime.now().isoformat(),
                'system_health': 'OK',
                'components': {
                    'logging': self.logger is not None,
                    'security': self.security_validator is not None,
                    'database': self.db_manager is not None,
                    'monitoring': self.metrics is not None
                },
                'metrics': {},
                'alerts': []
            }
            
            # Obtener métricas básicas
            if self.metrics:
                status['metrics'] = self.metrics.get_system_health_metrics()
            
            # Verificar alertas
            if self.alert_manager:
                status['alerts'] = self.alert_manager.check_all_alerts()
            
            return status
            
        except Exception as e:
            if self.logger:
                self.logger.error(f"Error al obtener estado del sistema: {e}")
            return {
                'timestamp': datetime.now().isoformat(),
                'system_health': 'ERROR',
                'error': str(e)
            }
    
    def validate_system_integrity(self):
        """
        Validar la integridad general del sistema.
        
        Returns:
            dict: Resultado de la validación de integridad
        """
        try:
            from .database_config import DataIntegrityChecker
            
            checker = DataIntegrityChecker()
            results = {
                'timestamp': datetime.now().isoformat(),
                'overall_status': 'OK',
                'checks': {}
            }
            
            # Verificar integridad de slots de visitas
            visit_check = checker.check_visit_slots_integrity()
            results['checks']['visit_slots'] = visit_check
            
            # Verificar consistencia de pagos
            payment_check = checker.check_payment_order_consistency()
            results['checks']['payment_consistency'] = payment_check
            
            # Determinar estado general
            total_issues = sum(
                check.get('issues_found', 0) 
                for check in results['checks'].values()
            )
            
            if total_issues > 0:
                results['overall_status'] = 'ISSUES_FOUND'
                results['total_issues'] = total_issues
            
            if self.logger:
                self.logger.info(f"Verificación de integridad completada: {total_issues} problemas encontrados")
            
            return results
            
        except Exception as e:
            if self.logger:
                self.logger.error(f"Error en verificación de integridad: {e}")
            return {
                'timestamp': datetime.now().isoformat(),
                'overall_status': 'ERROR',
                'error': str(e)
            }
    
    def perform_maintenance(self):
        """
        Realizar tareas de mantenimiento del sistema.
        
        Returns:
            dict: Resultado de las tareas de mantenimiento
        """
        try:
            maintenance_results = {
                'timestamp': datetime.now().isoformat(),
                'tasks_completed': [],
                'tasks_failed': [],
                'overall_status': 'OK'
            }
            
            # Limpiar cache antiguo
            try:
                cache.clear()
                maintenance_results['tasks_completed'].append('cache_cleanup')
            except Exception as e:
                maintenance_results['tasks_failed'].append(f'cache_cleanup: {e}')
            
            # Verificar y corregir integridad de datos
            try:
                from .database_config import DataIntegrityChecker
                checker = DataIntegrityChecker()
                
                # Corregir slots de visitas
                visit_fixes = checker.fix_visit_slots_integrity()
                if visit_fixes['visits_fixed'] > 0:
                    maintenance_results['tasks_completed'].append(
                        f"visit_slots_fixed: {visit_fixes['visits_fixed']}"
                    )
                
            except Exception as e:
                maintenance_results['tasks_failed'].append(f'integrity_check: {e}')
            
            # Generar reporte de métricas
            try:
                if self.metrics:
                    daily_metrics = self.metrics.get_daily_activity_metrics()
                    maintenance_results['daily_metrics'] = daily_metrics
                    maintenance_results['tasks_completed'].append('metrics_report')
            except Exception as e:
                maintenance_results['tasks_failed'].append(f'metrics_report: {e}')
            
            # Determinar estado general
            if maintenance_results['tasks_failed']:
                maintenance_results['overall_status'] = 'PARTIAL_SUCCESS'
            
            if self.logger:
                self.logger.info(f"Mantenimiento completado: {len(maintenance_results['tasks_completed'])} tareas exitosas")
            
            return maintenance_results
            
        except Exception as e:
            if self.logger:
                self.logger.error(f"Error en mantenimiento del sistema: {e}")
            return {
                'timestamp': datetime.now().isoformat(),
                'overall_status': 'ERROR',
                'error': str(e)
            }


# Configuraciones globales del sistema
SYSTEM_SETTINGS = {
    # Configuración de cache
    'CACHE_TIMEOUT': {
        'short': 60 * 5,      # 5 minutos
        'medium': 60 * 30,    # 30 minutos
        'long': 60 * 60 * 2,  # 2 horas
    },
    
    # Límites del sistema
    'SYSTEM_LIMITS': {
        'max_tickets_per_order': 20,
        'max_orders_per_user_daily': 10,
        'max_donation_amount': 1000000,  # ₡1,000,000
        'max_purchase_amount': 500000,   # ₡500,000
        'bulk_qr_validation_limit': 50,
    },
    
    # Configuración de monitoreo
    'MONITORING': {
        'alert_thresholds': {
            'error_rate': 0.05,        # 5%
            'response_time': 5.0,      # 5 segundos
            'unusual_activity': 3.0,   # 3x promedio
        },
        'metrics_retention_days': 30,
        'daily_report_time': '06:00',
    },
    
    # Configuración de seguridad
    'SECURITY': {
        'password_min_length': 8,
        'token_expiry_hours': 24,
        'max_login_attempts': 5,
        'lockout_duration_minutes': 30,
    }
}


def get_system_config():
    """
    Obtener la configuración del sistema.
    
    Returns:
        SystemConfig: Instancia de configuración del sistema
    """
    if not hasattr(get_system_config, '_instance'):
        get_system_config._instance = SystemConfig()
    return get_system_config._instance


def validate_system_requirements():
    """
    Validar que todos los requisitos del sistema estén cumplidos.
    
    Returns:
        dict: Resultado de la validación de requisitos
    """
    requirements = {
        'django_version': True,
        'database_connection': True,
        'cache_backend': True,
        'logging_configured': True,
        'security_modules': True
    }
    
    issues = []
    
    try:
        # Verificar versión de Django
        import django
        if django.VERSION < (3, 2):
            requirements['django_version'] = False
            issues.append("Django version < 3.2")
    except ImportError:
        requirements['django_version'] = False
        issues.append("Django no instalado")
    
    try:
        # Verificar conexión a base de datos
        from django.db import connection
        connection.ensure_connection()
    except Exception as e:
        requirements['database_connection'] = False
        issues.append(f"Error de base de datos: {e}")
    
    try:
        # Verificar cache
        cache.set('test_key', 'test_value', 10)
        if cache.get('test_key') != 'test_value':
            raise Exception("Cache no funciona correctamente")
        cache.delete('test_key')
    except Exception as e:
        requirements['cache_backend'] = False
        issues.append(f"Error de cache: {e}")
    
    try:
        # Verificar logging
        logger = logging.getLogger('test')
        logger.info("Test de logging")
    except Exception as e:
        requirements['logging_configured'] = False
        issues.append(f"Error de logging: {e}")
    
    return {
        'all_requirements_met': len(issues) == 0,
        'requirements': requirements,
        'issues': issues,
        'timestamp': datetime.now().isoformat()
    }


# Funciones de utilidad para inicialización
def initialize_system():
    """
    Inicializar completamente el sistema con todas las mejoras.
    
    Returns:
        dict: Resultado de la inicialización
    """
    try:
        # Validar requisitos
        requirements_check = validate_system_requirements()
        if not requirements_check['all_requirements_met']:
            return {
                'success': False,
                'error': 'Requisitos del sistema no cumplidos',
                'details': requirements_check
            }
        
        # Inicializar configuración
        config = get_system_config()
        
        # Verificar estado del sistema
        system_status = config.get_system_status()
        
        return {
            'success': True,
            'message': 'Sistema inicializado correctamente',
            'system_status': system_status,
            'timestamp': datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': f'Error al inicializar sistema: {e}',
            'timestamp': datetime.now().isoformat()
        }


# Exportar configuración principal
__all__ = [
    'SystemConfig',
    'SYSTEM_SETTINGS',
    'get_system_config',
    'validate_system_requirements',
    'initialize_system'
]