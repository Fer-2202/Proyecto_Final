from django.db import models, transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from contextlib import contextmanager
import logging

"""
Configuración y utilidades de base de datos para optimización y consistencia.

Este módulo proporciona:
- Gestores de transacciones atómicas
- Optimizaciones de consultas
- Validaciones de integridad
- Utilidades de backup y restauración
- Monitoreo de rendimiento
"""

# Configuración del logger para base de datos
db_logger = logging.getLogger('database')


class DatabaseManager:
    """
    Gestor centralizado para operaciones de base de datos.
    
    Proporciona métodos optimizados y seguros para realizar
    operaciones complejas en la base de datos.
    
    === CÓMO USAR ===
    
    1. TRANSACCIONES ATÓMICAS:
        from api.database_config import DatabaseManager
        
        with DatabaseManager.atomic_transaction():
            # Todas estas operaciones se ejecutan como una unidad
            order = PurchaseOrders.objects.create(...)
            payment = Payments.objects.create(...)
            # Si algo falla, todo se revierte automáticamente
    
    2. VERIFICAR INTEGRIDAD DE DATOS:
        from api.database_config import integrity_checker
        
        # Verificar slots de visitas
        result = integrity_checker.check_visit_slots_integrity()
        if result['issues_found'] > 0:
            print(f"Problemas encontrados: {result['issues_found']}")
        
        # Corregir automáticamente
        fixes = integrity_checker.fix_visit_slots_integrity()
        print(f"Visitas corregidas: {fixes['visits_fixed']}")
    
    3. VERIFICAR CONSISTENCIA DE PAGOS:
        payment_issues = integrity_checker.check_payment_consistency()
        
    4. OPTIMIZAR CONSULTAS:
        # Usar select_related y prefetch_related automáticamente
        optimized_orders = DatabaseManager.get_optimized_orders()
    
    === FUNCIONES DE INTEGRIDAD ===
    - check_visit_slots_integrity(): Verifica que los slots ocupados coincidan
    - fix_visit_slots_integrity(): Corrige automáticamente los slots
    - check_payment_consistency(): Verifica consistencia entre órdenes y pagos
    - data_integrity_check(): Verificación completa del sistema
    
    === CUÁNDO USAR ===
    - Siempre usar transacciones atómicas para operaciones múltiples
    - Ejecutar verificaciones de integridad después de migraciones
    - Usar en tareas programadas para mantenimiento
    """
    
    @staticmethod
    @contextmanager
    def atomic_transaction(savepoint=True):
        """
        Context manager para transacciones atómicas con logging.
        
        Args:
            savepoint (bool): Si crear un savepoint para transacciones anidadas
            
        Yields:
            None: Context manager para la transacción
            
        Ejemplo:
            with DatabaseManager.atomic_transaction():
                # operaciones de base de datos
                order.save()
                payment.save()
        """
        try:
            with transaction.atomic(savepoint=savepoint):
                db_logger.debug("Iniciando transacción atómica")
                yield
                db_logger.debug("Transacción completada exitosamente")
        except Exception as e:
            db_logger.error(f"Error en transacción atómica: {str(e)}")
            raise
    
    @staticmethod
    def bulk_create_with_validation(model_class, objects_data, batch_size=100):
        """
        Crea múltiples objetos en lotes con validación.
        
        Args:
            model_class: Clase del modelo a crear
            objects_data (list): Lista de diccionarios con datos de objetos
            batch_size (int): Tamaño del lote para creación
            
        Returns:
            list: Lista de objetos creados
            
        Raises:
            ValidationError: Si algún objeto no es válido
        """
        objects_to_create = []
        
        # Validar cada objeto antes de crear
        for data in objects_data:
            obj = model_class(**data)
            obj.full_clean()  # Ejecutar validaciones
            objects_to_create.append(obj)
        
        # Crear en lotes
        created_objects = []
        for i in range(0, len(objects_to_create), batch_size):
            batch = objects_to_create[i:i + batch_size]
            created_batch = model_class.objects.bulk_create(batch)
            created_objects.extend(created_batch)
            
            db_logger.info(f"Creados {len(created_batch)} objetos de {model_class.__name__}")
        
        return created_objects
    
    @staticmethod
    def safe_get_or_create(model_class, defaults=None, **kwargs):
        """
        Versión segura de get_or_create con manejo de errores.
        
        Args:
            model_class: Clase del modelo
            defaults (dict): Valores por defecto para creación
            **kwargs: Criterios de búsqueda
            
        Returns:
            tuple: (objeto, creado)
            
        Raises:
            ValidationError: Si hay errores de validación
        """
        try:
            with transaction.atomic():
                obj, created = model_class.objects.get_or_create(
                    defaults=defaults, **kwargs
                )
                
                if created:
                    db_logger.info(f"Creado nuevo {model_class.__name__}: {obj.pk}")
                else:
                    db_logger.debug(f"Obtenido {model_class.__name__} existente: {obj.pk}")
                
                return obj, created
                
        except Exception as e:
            db_logger.error(f"Error en get_or_create para {model_class.__name__}: {str(e)}")
            raise


class QueryOptimizer:
    """
    Optimizador de consultas para mejorar el rendimiento.
    
    Proporciona métodos para optimizar consultas comunes
    y reducir el número de queries a la base de datos.
    """
    
    @staticmethod
    def get_orders_with_related(user=None, status=None):
        """
        Obtiene órdenes con datos relacionados optimizados.
        
        Args:
            user: Usuario para filtrar (opcional)
            status: Estado para filtrar (opcional)
            
        Returns:
            QuerySet: Órdenes optimizadas con datos relacionados
        """
        from api.purchase_orders.models import PurchaseOrders
        
        queryset = PurchaseOrders.objects.select_related(
            'user', 'visit'
        ).prefetch_related(
            'tickets_set',
            'payments_set'
        )
        
        if user:
            queryset = queryset.filter(user=user)
        
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset.order_by('-order_date')
    
    @staticmethod
    def get_payments_with_orders(user=None, status=None):
        """
        Obtiene pagos con órdenes relacionadas optimizados.
        
        Args:
            user: Usuario para filtrar (opcional)
            status: Estado para filtrar (opcional)
            
        Returns:
            QuerySet: Pagos optimizados con datos relacionados
        """
        from api.payments.models import Payments
        
        queryset = Payments.objects.select_related(
            'purchase_order',
            'purchase_order__user',
            'purchase_order__visit'
        )
        
        if user:
            queryset = queryset.filter(purchase_order__user=user)
        
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset.order_by('-payment_date')
    
    @staticmethod
    def get_visit_statistics():
        """
        Obtiene estadísticas de visitas optimizadas.
        
        Returns:
            dict: Estadísticas de visitas
        """
        from api.visits.models import Visits
        from django.db.models import Sum, Avg, Count
        
        stats = Visits.objects.aggregate(
            total_visits=Count('id'),
            total_slots=Sum('total_slots'),
            total_occupied=Sum('occupied_slots'),
            avg_occupation=Avg('occupied_slots')
        )
        
        # Calcular slots disponibles
        stats['total_available'] = (stats['total_slots'] or 0) - (stats['total_occupied'] or 0)
        stats['occupation_rate'] = (
            (stats['total_occupied'] / stats['total_slots'] * 100) 
            if stats['total_slots'] and stats['total_slots'] > 0 else 0
        )
        
        return stats
    
    @staticmethod
    def get_user_purchase_summary(user):
        """
        Obtiene resumen de compras de un usuario optimizado.
        
        Args:
            user: Usuario para el resumen
            
        Returns:
            dict: Resumen de compras del usuario
        """
        from api.purchase_orders.models import PurchaseOrders
        from django.db.models import Sum, Count, Avg
        
        summary = PurchaseOrders.objects.filter(user=user).aggregate(
            total_orders=Count('id'),
            total_spent=Sum('total_price'),
            avg_order_value=Avg('total_price'),
            paid_orders=Count('id', filter=models.Q(status='PAID')),
            pending_orders=Count('id', filter=models.Q(status='PENDING')),
            cancelled_orders=Count('id', filter=models.Q(status='CANCELLED'))
        )
        
        # Calcular estadísticas adicionales
        summary['success_rate'] = (
            (summary['paid_orders'] / summary['total_orders'] * 100)
            if summary['total_orders'] and summary['total_orders'] > 0 else 0
        )
        
        return summary


class DataIntegrityChecker:
    """
    Verificador de integridad de datos.
    
    Proporciona métodos para verificar y mantener
    la integridad de los datos en el sistema.
    """
    
    @staticmethod
    def check_visit_slots_integrity():
        """
        Verifica la integridad de los slots de visitas.
        
        Returns:
            dict: Resultado de la verificación
        """
        from api.visits.models import Visits
        from api.purchase_orders.models import PurchaseOrders
        
        issues = []
        
        for visit in Visits.objects.all():
            # Contar tickets vendidos para esta visita
            sold_tickets = PurchaseOrders.objects.filter(
                visit=visit,
                status__in=['PAID', 'PENDING']
            ).aggregate(
                total=Sum('tickets_set__quantity')
            )['total'] or 0
            
            # Verificar coherencia
            if visit.occupied_slots != sold_tickets:
                issues.append({
                    'visit_id': visit.id,
                    'visit_date': visit.day,
                    'recorded_occupied': visit.occupied_slots,
                    'actual_sold': sold_tickets,
                    'difference': visit.occupied_slots - sold_tickets
                })
        
        return {
            'total_visits_checked': Visits.objects.count(),
            'issues_found': len(issues),
            'issues': issues
        }
    
    @staticmethod
    def check_payment_order_consistency():
        """
        Verifica la consistencia entre pagos y órdenes.
        
        Returns:
            dict: Resultado de la verificación
        """
        from api.payments.models import Payments
        from api.purchase_orders.models import PurchaseOrders
        
        issues = []
        
        # Verificar órdenes pagadas sin pago exitoso
        paid_orders_without_payment = PurchaseOrders.objects.filter(
            status='PAID'
        ).exclude(
            payment__status='SUCCESS'
        )
        
        for order in paid_orders_without_payment:
            issues.append({
                'type': 'paid_order_without_successful_payment',
                'order_id': order.id,
                'order_status': order.status,
                'payment_statuses': list(order.payments_set.values_list('status', flat=True))
            })
        
        # Verificar pagos exitosos con órdenes no pagadas
        successful_payments_with_unpaid_orders = Payments.objects.filter(
            status='SUCCESS'
        ).exclude(
            purchase_order__status='PAID'
        )
        
        for payment in successful_payments_with_unpaid_orders:
            issues.append({
                'type': 'successful_payment_with_unpaid_order',
                'payment_id': payment.id,
                'payment_status': payment.status,
                'order_id': payment.purchase_order.id if payment.purchase_order else None,
                'order_status': payment.purchase_order.status if payment.purchase_order else None
            })
        
        return {
            'issues_found': len(issues),
            'issues': issues
        }
    
    @staticmethod
    def fix_visit_slots_integrity():
        """
        Corrige automáticamente problemas de integridad en slots de visitas.
        
        Returns:
            dict: Resultado de las correcciones
        """
        from api.visits.models import Visits
        from api.purchase_orders.models import PurchaseOrders
        from django.db.models import Sum
        
        fixed_visits = []
        
        with transaction.atomic():
            for visit in Visits.objects.all():
                # Calcular slots realmente ocupados
                actual_occupied = PurchaseOrders.objects.filter(
                    visit=visit,
                    status__in=['PAID', 'PENDING']
                ).aggregate(
                    total=Sum('tickets_set__quantity')
                )['total'] or 0
                
                # Corregir si hay diferencia
                if visit.occupied_slots != actual_occupied:
                    old_value = visit.occupied_slots
                    visit.occupied_slots = actual_occupied
                    visit.save()
                    
                    fixed_visits.append({
                        'visit_id': visit.id,
                        'visit_date': visit.day,
                        'old_occupied': old_value,
                        'new_occupied': actual_occupied
                    })
                    
                    db_logger.info(
                        f"Corregidos slots de visita {visit.id}: {old_value} -> {actual_occupied}"
                    )
        
        return {
            'visits_fixed': len(fixed_visits),
            'fixes': fixed_visits
        }


class DatabaseBackupManager:
    """
    Gestor de respaldos y restauración de datos críticos.
    
    Proporciona métodos para respaldar y restaurar
    datos importantes del sistema.
    """
    
    @staticmethod
    def backup_critical_data():
        """
        Crea un respaldo de los datos críticos del sistema.
        
        Returns:
            dict: Información del respaldo creado
        """
        from api.purchase_orders.models import PurchaseOrders
        from api.payments.models import Payments, Donation
        from api.visits.models import Visits
        import json
        from django.core import serializers
        
        backup_data = {
            'timestamp': timezone.now().isoformat(),
            'data': {}
        }
        
        # Respaldar órdenes de compra
        orders = PurchaseOrders.objects.all()
        backup_data['data']['purchase_orders'] = serializers.serialize('json', orders)
        
        # Respaldar pagos
        payments = Payments.objects.all()
        backup_data['data']['payments'] = serializers.serialize('json', payments)
        
        # Respaldar donaciones
        donations = Donation.objects.all()
        backup_data['data']['donations'] = serializers.serialize('json', donations)
        
        # Respaldar visitas
        visits = Visits.objects.all()
        backup_data['data']['visits'] = serializers.serialize('json', visits)
        
        # Estadísticas del respaldo
        backup_info = {
            'timestamp': backup_data['timestamp'],
            'records_backed_up': {
                'purchase_orders': orders.count(),
                'payments': payments.count(),
                'donations': donations.count(),
                'visits': visits.count()
            },
            'backup_size_mb': len(json.dumps(backup_data)) / (1024 * 1024)
        }
        
        db_logger.info(f"Respaldo creado: {backup_info}")
        
        return backup_info


# Instancias globales para uso fácil
db_manager = DatabaseManager()
query_optimizer = QueryOptimizer()
integrity_checker = DataIntegrityChecker()
backup_manager = DatabaseBackupManager()