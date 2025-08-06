#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de Configuración de Mejoras del Backend
==============================================

Este script configura e inicializa todas las mejoras implementadas
en el sistema de compras y donaciones.

Uso:
    python setup_mejoras.py [--check-only] [--verbose]

Opciones:
    --check-only    Solo verificar el estado, no aplicar cambios
    --verbose       Mostrar información detallada
    --help          Mostrar esta ayuda

Autor: Sistema de Mejoras Backend
Fecha: 2024
"""

import os
import sys
import django
import argparse
from datetime import datetime

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Importar módulos de Django después de la configuración
from django.core.management import execute_from_command_line
from django.db import connection, transaction
from django.core.cache import cache
from django.contrib.auth.models import User


class MejorasSetup:
    """
    Clase para configurar e inicializar todas las mejoras del sistema.
    """
    
    def __init__(self, verbose=False):
        """Inicializar el configurador de mejoras."""
        self.verbose = verbose
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'checks_passed': [],
            'checks_failed': [],
            'actions_completed': [],
            'actions_failed': [],
            'warnings': []
        }
    
    def log(self, message, level='INFO'):
        """Registrar mensaje con timestamp."""
        timestamp = datetime.now().strftime('%H:%M:%S')
        prefix = f"[{timestamp}] {level}:"
        
        if level == 'ERROR':
            print(f"\033[91m{prefix} {message}\033[0m")  # Rojo
        elif level == 'WARNING':
            print(f"\033[93m{prefix} {message}\033[0m")  # Amarillo
        elif level == 'SUCCESS':
            print(f"\033[92m{prefix} {message}\033[0m")  # Verde
        else:
            print(f"{prefix} {message}")
    
    def check_django_setup(self):
        """Verificar que Django esté configurado correctamente."""
        try:
            from django.conf import settings
            
            # Verificar configuración básica
            required_settings = ['DATABASES', 'INSTALLED_APPS', 'SECRET_KEY']
            for setting in required_settings:
                if not hasattr(settings, setting):
                    raise Exception(f"Configuración faltante: {setting}")
            
            # Verificar conexión a base de datos
            connection.ensure_connection()
            
            self.log("✓ Django configurado correctamente", 'SUCCESS')
            self.results['checks_passed'].append('django_setup')
            return True
            
        except Exception as e:
            self.log(f"✗ Error en configuración de Django: {e}", 'ERROR')
            self.results['checks_failed'].append(f'django_setup: {e}')
            return False
    
    def check_database_tables(self):
        """Verificar que las tablas necesarias existan."""
        try:
            from api.visits.models import Visits
            from api.purchase_orders.models import PurchaseOrders
            from api.tickets.models import Tickets
            from api.payments.models import Payments, Donation
            
            # Verificar que las tablas existan
            models_to_check = [
                (Visits, 'visits'),
                (PurchaseOrders, 'purchase_orders'),
                (Tickets, 'tickets'),
                (Payments, 'payments'),
                (Donation, 'donations')
            ]
            
            for model, name in models_to_check:
                count = model.objects.count()
                if self.verbose:
                    self.log(f"  - Tabla {name}: {count} registros")
            
            self.log("✓ Todas las tablas de base de datos están disponibles", 'SUCCESS')
            self.results['checks_passed'].append('database_tables')
            return True
            
        except Exception as e:
            self.log(f"✗ Error al verificar tablas: {e}", 'ERROR')
            self.results['checks_failed'].append(f'database_tables: {e}')
            return False
    
    def check_cache_system(self):
        """Verificar que el sistema de cache funcione."""
        try:
            # Probar cache
            test_key = 'mejoras_setup_test'
            test_value = 'test_value_123'
            
            cache.set(test_key, test_value, 60)
            retrieved_value = cache.get(test_key)
            
            if retrieved_value != test_value:
                raise Exception("Cache no retorna el valor correcto")
            
            cache.delete(test_key)
            
            self.log("✓ Sistema de cache funcionando correctamente", 'SUCCESS')
            self.results['checks_passed'].append('cache_system')
            return True
            
        except Exception as e:
            self.log(f"✗ Error en sistema de cache: {e}", 'ERROR')
            self.results['checks_failed'].append(f'cache_system: {e}')
            return False
    
    def check_mejoras_modules(self):
        """Verificar que los módulos de mejoras estén disponibles."""
        modules_to_check = [
            ('api.logging_config', 'Configuración de logging'),
            ('api.security_config', 'Configuración de seguridad'),
            ('api.database_config', 'Configuración de base de datos'),
            ('api.monitoring_config', 'Configuración de monitoreo'),
            ('api.purchase_orders.services', 'Servicios de órdenes'),
            ('api.purchase_orders.audit', 'Sistema de auditoría')
        ]
        
        available_modules = []
        missing_modules = []
        
        for module_name, description in modules_to_check:
            try:
                __import__(module_name)
                available_modules.append(description)
                if self.verbose:
                    self.log(f"  ✓ {description}")
            except ImportError as e:
                missing_modules.append(f"{description}: {e}")
                if self.verbose:
                    self.log(f"  ✗ {description}: {e}", 'WARNING')
        
        if available_modules:
            self.log(f"✓ {len(available_modules)} módulos de mejoras disponibles", 'SUCCESS')
            self.results['checks_passed'].append('mejoras_modules')
        
        if missing_modules:
            self.log(f"⚠ {len(missing_modules)} módulos no disponibles", 'WARNING')
            self.results['warnings'].extend(missing_modules)
        
        return len(available_modules) > 0
    
    def setup_logging(self):
        """Configurar el sistema de logging."""
        try:
            from api.logging_config import setup_logging
            
            # Configurar logging
            setup_logging()
            
            # Crear directorios de logs si no existen
            logs_dir = os.path.join(os.getcwd(), 'logs')
            if not os.path.exists(logs_dir):
                os.makedirs(logs_dir)
                self.log(f"Directorio de logs creado: {logs_dir}")
            
            self.log("✓ Sistema de logging configurado", 'SUCCESS')
            self.results['actions_completed'].append('logging_setup')
            return True
            
        except Exception as e:
            self.log(f"✗ Error al configurar logging: {e}", 'ERROR')
            self.results['actions_failed'].append(f'logging_setup: {e}')
            return False
    
    def verify_data_integrity(self):
        """Verificar la integridad de los datos."""
        try:
            from api.database_config import DataIntegrityChecker
            
            checker = DataIntegrityChecker()
            
            # Verificar integridad de slots de visitas
            visit_result = checker.check_visit_slots_integrity()
            if visit_result['issues_found'] > 0:
                self.log(f"⚠ Se encontraron {visit_result['issues_found']} problemas en slots de visitas", 'WARNING')
                self.results['warnings'].append(f"visit_slots_issues: {visit_result['issues_found']}")
            else:
                self.log("✓ Integridad de slots de visitas: OK")
            
            # Verificar consistencia de pagos
            payment_result = checker.check_payment_order_consistency()
            if payment_result['issues_found'] > 0:
                self.log(f"⚠ Se encontraron {payment_result['issues_found']} problemas en consistencia de pagos", 'WARNING')
                self.results['warnings'].append(f"payment_consistency_issues: {payment_result['issues_found']}")
            else:
                self.log("✓ Consistencia de pagos: OK")
            
            self.log("✓ Verificación de integridad completada", 'SUCCESS')
            self.results['actions_completed'].append('data_integrity_check')
            return True
            
        except Exception as e:
            self.log(f"✗ Error al verificar integridad: {e}", 'ERROR')
            self.results['actions_failed'].append(f'data_integrity_check: {e}')
            return False
    
    def initialize_system_config(self):
        """Inicializar la configuración del sistema."""
        try:
            from api.config import get_system_config, initialize_system
            
            # Inicializar sistema
            init_result = initialize_system()
            
            if init_result['success']:
                self.log("✓ Configuración del sistema inicializada", 'SUCCESS')
                self.results['actions_completed'].append('system_config_init')
                
                if self.verbose and 'system_status' in init_result:
                    status = init_result['system_status']
                    self.log(f"  - Estado del sistema: {status.get('system_health', 'Unknown')}")
                    
                    components = status.get('components', {})
                    for component, available in components.items():
                        status_icon = "✓" if available else "✗"
                        self.log(f"  - {component}: {status_icon}")
                
                return True
            else:
                self.log(f"✗ Error al inicializar sistema: {init_result.get('error', 'Unknown')}", 'ERROR')
                self.results['actions_failed'].append(f"system_config_init: {init_result.get('error')}")
                return False
            
        except Exception as e:
            self.log(f"✗ Error al inicializar configuración: {e}", 'ERROR')
            self.results['actions_failed'].append(f'system_config_init: {e}')
            return False
    
    def run_checks_only(self):
        """Ejecutar solo las verificaciones sin aplicar cambios."""
        self.log("=== VERIFICACIÓN DEL SISTEMA ===")
        self.log("Ejecutando verificaciones sin aplicar cambios...")
        
        checks = [
            ('Configuración de Django', self.check_django_setup),
            ('Tablas de base de datos', self.check_database_tables),
            ('Sistema de cache', self.check_cache_system),
            ('Módulos de mejoras', self.check_mejoras_modules)
        ]
        
        for check_name, check_func in checks:
            self.log(f"\nVerificando: {check_name}")
            check_func()
        
        self.print_summary()
    
    def run_full_setup(self):
        """Ejecutar configuración completa del sistema."""
        self.log("=== CONFIGURACIÓN COMPLETA DEL SISTEMA ===")
        self.log("Ejecutando configuración e inicialización...")
        
        # Primero ejecutar verificaciones
        self.log("\n--- VERIFICACIONES PREVIAS ---")
        basic_checks_passed = True
        
        basic_checks = [
            ('Configuración de Django', self.check_django_setup),
            ('Tablas de base de datos', self.check_database_tables),
            ('Sistema de cache', self.check_cache_system)
        ]
        
        for check_name, check_func in basic_checks:
            self.log(f"\nVerificando: {check_name}")
            if not check_func():
                basic_checks_passed = False
        
        if not basic_checks_passed:
            self.log("\n✗ Las verificaciones básicas fallaron. No se puede continuar.", 'ERROR')
            return False
        
        # Verificar módulos disponibles
        self.log("\nVerificando: Módulos de mejoras")
        self.check_mejoras_modules()
        
        # Ejecutar configuraciones
        self.log("\n--- CONFIGURACIÓN E INICIALIZACIÓN ---")
        
        setup_actions = [
            ('Configuración de logging', self.setup_logging),
            ('Verificación de integridad', self.verify_data_integrity),
            ('Inicialización del sistema', self.initialize_system_config)
        ]
        
        for action_name, action_func in setup_actions:
            self.log(f"\nEjecutando: {action_name}")
            action_func()
        
        self.print_summary()
        return len(self.results['checks_failed']) == 0 and len(self.results['actions_failed']) == 0
    
    def print_summary(self):
        """Imprimir resumen de resultados."""
        self.log("\n" + "="*50)
        self.log("RESUMEN DE RESULTADOS")
        self.log("="*50)
        
        # Verificaciones
        if self.results['checks_passed']:
            self.log(f"✓ Verificaciones exitosas: {len(self.results['checks_passed'])}", 'SUCCESS')
            if self.verbose:
                for check in self.results['checks_passed']:
                    self.log(f"  - {check}")
        
        if self.results['checks_failed']:
            self.log(f"✗ Verificaciones fallidas: {len(self.results['checks_failed'])}", 'ERROR')
            for check in self.results['checks_failed']:
                self.log(f"  - {check}")
        
        # Acciones
        if self.results['actions_completed']:
            self.log(f"✓ Acciones completadas: {len(self.results['actions_completed'])}", 'SUCCESS')
            if self.verbose:
                for action in self.results['actions_completed']:
                    self.log(f"  - {action}")
        
        if self.results['actions_failed']:
            self.log(f"✗ Acciones fallidas: {len(self.results['actions_failed'])}", 'ERROR')
            for action in self.results['actions_failed']:
                self.log(f"  - {action}")
        
        # Advertencias
        if self.results['warnings']:
            self.log(f"⚠ Advertencias: {len(self.results['warnings'])}", 'WARNING')
            if self.verbose:
                for warning in self.results['warnings']:
                    self.log(f"  - {warning}")
        
        # Estado general
        total_issues = len(self.results['checks_failed']) + len(self.results['actions_failed'])
        if total_issues == 0:
            self.log("\n🎉 CONFIGURACIÓN COMPLETADA EXITOSAMENTE", 'SUCCESS')
        else:
            self.log(f"\n⚠ CONFIGURACIÓN COMPLETADA CON {total_issues} PROBLEMAS", 'WARNING')
        
        self.log(f"\nTiempo: {self.results['timestamp']}")


def main():
    """Función principal del script."""
    parser = argparse.ArgumentParser(
        description='Configurar e inicializar mejoras del backend',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  python setup_mejoras.py                    # Configuración completa
  python setup_mejoras.py --check-only       # Solo verificaciones
  python setup_mejoras.py --verbose          # Con información detallada
        """
    )
    
    parser.add_argument(
        '--check-only',
        action='store_true',
        help='Solo ejecutar verificaciones sin aplicar cambios'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Mostrar información detallada'
    )
    
    args = parser.parse_args()
    
    # Crear instancia del configurador
    setup = MejorasSetup(verbose=args.verbose)
    
    try:
        if args.check_only:
            setup.run_checks_only()
        else:
            success = setup.run_full_setup()
            sys.exit(0 if success else 1)
            
    except KeyboardInterrupt:
        setup.log("\n\n⚠ Configuración interrumpida por el usuario", 'WARNING')
        sys.exit(1)
    except Exception as e:
        setup.log(f"\n\n✗ Error inesperado: {e}", 'ERROR')
        sys.exit(1)


if __name__ == '__main__':
    main()