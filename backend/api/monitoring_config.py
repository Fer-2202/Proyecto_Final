from django.utils import timezone
from django.db.models import Count, Sum, Avg, Q
from datetime import datetime, timedelta
import logging
import json
from collections import defaultdict

"""
Sistema de monitoreo y métricas para el backend de compras y donaciones.

Este módulo proporciona:
- Métricas de rendimiento del sistema
- Monitoreo de transacciones
- Alertas automáticas
- Reportes de uso
- Análisis de tendencias
"""

# Configuración del logger para monitoreo
monitoring_logger = logging.getLogger('monitoring')

# Configuración de alertas
ALERT_CONFIG = {
    'HIGH_ERROR_RATE_THRESHOLD': 0.05,  # 5% de errores
    'LOW_SUCCESS_RATE_THRESHOLD': 0.90,  # 90% de éxito mínimo
    'HIGH_RESPONSE_TIME_THRESHOLD': 5.0,  # 5 segundos
    'UNUSUAL_ACTIVITY_MULTIPLIER': 3.0,  # 3x el promedio normal
    'DAILY_TRANSACTION_LIMIT': 1000,  # Límite diario de transacciones
}


class SystemMetrics:
    """
    Recopilador de métricas del sistema.
    
    Proporciona métodos para recopilar y analizar
    métricas de rendimiento y uso del sistema.
    
    === CÓMO USAR ===
    
    1. OBTENER MÉTRICAS DE TRANSACCIONES:
        from api.monitoring_config import system_metrics
        
        # Métricas de los últimos 30 días
        metrics = system_metrics.get_transaction_metrics()
        
        # Métricas de un período específico
        from datetime import datetime, timedelta
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        metrics = system_metrics.get_transaction_metrics(start_date, end_date)
    
    2. OBTENER MÉTRICAS DE SALUD DEL SISTEMA:
        health = system_metrics.get_system_health_metrics()
        print(f"Puntuación de salud: {health['health_score']}")
    
    3. OBTENER ACTIVIDAD DIARIA:
        daily_activity = system_metrics.get_daily_activity_metrics(days=7)
    
    4. OBTENER TOP USUARIOS:
        top_users = system_metrics.get_user_activity_metrics()
    
    === MÉTRICAS DISPONIBLES ===
    - Órdenes totales, pagadas, pendientes, canceladas
    - Ingresos totales y promedio por orden
    - Tasas de éxito de pagos
    - Donaciones totales y promedio
    - Puntuación de salud del sistema (0-100)
    - Top compradores y donadores
    
    === CÓMO INTERPRETAR HEALTH_SCORE ===
    - 90-100: Sistema saludable
    - 70-89: Advertencias menores
    - 50-69: Problemas moderados
    - 0-49: Problemas críticos
    """
    
    @staticmethod
    def get_transaction_metrics(start_date=None, end_date=None):
        """
        Obtiene métricas de transacciones para un período específico.
        
        Args:
            start_date (datetime, optional): Fecha de inicio
            end_date (datetime, optional): Fecha de fin
            
        Returns:
            dict: Métricas de transacciones
        """
        from api.purchase_orders.models import PurchaseOrders
        from api.payments.models import Payments, Donation
        
        # Establecer fechas por defecto (últimos 30 días)
        if not end_date:
            end_date = timezone.now()
        if not start_date:
            start_date = end_date - timedelta(days=30)
        
        # Métricas de órdenes de compra
        orders_queryset = PurchaseOrders.objects.filter(
            order_date__range=[start_date, end_date]
        )
        
        order_metrics = orders_queryset.aggregate(
            total_orders=Count('id'),
            total_revenue=Sum('total_price'),
            avg_order_value=Avg('total_price'),
            paid_orders=Count('id', filter=Q(status='PAID')),
            pending_orders=Count('id', filter=Q(status='PENDING')),
            cancelled_orders=Count('id', filter=Q(status='CANCELLED')),
            failed_orders=Count('id', filter=Q(status='FAILED'))
        )
        
        # Métricas de pagos
        payments_queryset = Payments.objects.filter(
            payment_date__range=[start_date, end_date]
        )
        
        payment_metrics = payments_queryset.aggregate(
            total_payments=Count('id'),
            successful_payments=Count('id', filter=Q(status='SUCCESS')),
            failed_payments=Count('id', filter=Q(status='FAILED')),
            pending_payments=Count('id', filter=Q(status='PENDING'))
        )
        
        # Métricas de donaciones
        donations_queryset = Donation.objects.filter(
            donation_date__range=[start_date, end_date]
        )
        
        donation_metrics = donations_queryset.aggregate(
            total_donations=Count('id'),
            total_donation_amount=Sum('amount'),
            avg_donation_amount=Avg('amount')
        )
        
        # Calcular tasas de éxito
        success_rate = (
            (order_metrics['paid_orders'] / order_metrics['total_orders'] * 100)
            if order_metrics['total_orders'] > 0 else 0
        )
        
        payment_success_rate = (
            (payment_metrics['successful_payments'] / payment_metrics['total_payments'] * 100)
            if payment_metrics['total_payments'] > 0 else 0
        )
        
        return {
            'period': {
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'days': (end_date - start_date).days
            },
            'orders': {
                **order_metrics,
                'success_rate': round(success_rate, 2)
            },
            'payments': {
                **payment_metrics,
                'success_rate': round(payment_success_rate, 2)
            },
            'donations': donation_metrics,
            'generated_at': timezone.now().isoformat()
        }
    
    @staticmethod
    def get_daily_activity_metrics(days=7):
        """
        Obtiene métricas de actividad diaria.
        
        Args:
            days (int): Número de días a analizar
            
        Returns:
            dict: Métricas de actividad por día
        """
        from api.purchase_orders.models import PurchaseOrders
        from api.payments.models import Donation
        
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=days-1)
        
        daily_metrics = []
        
        for i in range(days):
            current_date = start_date + timedelta(days=i)
            
            # Órdenes del día
            daily_orders = PurchaseOrders.objects.filter(
                order_date=current_date
            ).aggregate(
                total_orders=Count('id'),
                total_revenue=Sum('total_price'),
                paid_orders=Count('id', filter=Q(status='PAID'))
            )
            
            # Donaciones del día
            daily_donations = Donation.objects.filter(
                created_at__date=current_date
            ).aggregate(
                total_donations=Count('id'),
                total_donation_amount=Sum('amount')
            )
            
            daily_metrics.append({
                'date': current_date.isoformat(),
                'orders': daily_orders,
                'donations': daily_donations
            })
        
        return {
            'period_days': days,
            'daily_data': daily_metrics,
            'generated_at': timezone.now().isoformat()
        }
    
    @staticmethod
    def get_user_activity_metrics():
        """
        Obtiene métricas de actividad de usuarios.
        
        Returns:
            dict: Métricas de usuarios
        """
        from django.contrib.auth.models import User
        from api.purchase_orders.models import PurchaseOrders
        from api.payments.models import Donation
        
        # Usuarios activos (con órdenes en los últimos 30 días)
        thirty_days_ago = timezone.now() - timedelta(days=30)
        
        active_users = User.objects.filter(
            purchaseorders__order_date__gte=thirty_days_ago
        ).distinct().count()
        
        # Top usuarios por compras
        top_buyers = User.objects.annotate(
            total_orders=Count('purchaseorders'),
            total_spent=Sum('purchaseorders__total_price')
        ).filter(
            total_orders__gt=0
        ).order_by('-total_spent')[:10]
        
        # Top donantes
        top_donors = User.objects.annotate(
            total_donations=Count('donation'),
            total_donated=Sum('donation__amount')
        ).filter(
            total_donations__gt=0
        ).order_by('-total_donated')[:10]
        
        return {
            'total_users': User.objects.count(),
            'active_users_30d': active_users,
            'top_buyers': [
                {
                    'user_id': user.id,
                    'username': user.username,
                    'total_orders': user.total_orders,
                    'total_spent': float(user.total_spent or 0)
                }
                for user in top_buyers
            ],
            'top_donors': [
                {
                    'user_id': user.id,
                    'username': user.username,
                    'total_donations': user.total_donations,
                    'total_donated': float(user.total_donated or 0)
                }
                for user in top_donors
            ],
            'generated_at': timezone.now().isoformat()
        }
    
    @staticmethod
    def get_system_health_metrics():
        """
        Obtiene métricas de salud del sistema.
        
        Returns:
            dict: Métricas de salud del sistema
        """
        from api.visits.models import Visits
        from api.purchase_orders.models import PurchaseOrders
        from api.payments.models import Payments
        
        # Verificar integridad de datos
        total_visits = Visits.objects.count()
        visits_with_issues = 0
        
        for visit in Visits.objects.all():
            expected_occupied = PurchaseOrders.objects.filter(
                visit=visit,
                status__in=['PAID', 'PENDING']
            ).aggregate(total=Sum('tickets_set__quantity'))['total'] or 0
            
            if visit.occupied_slots != expected_occupied:
                visits_with_issues += 1
        
        # Verificar pagos pendientes antiguos
        old_pending_payments = Payments.objects.filter(
            status='PENDING',
            payment_date__lt=timezone.now() - timedelta(hours=24)
        ).count()
        
        # Verificar órdenes pendientes antiguas
        old_pending_orders = PurchaseOrders.objects.filter(
            status='PENDING',
            order_date__lt=(timezone.now() - timedelta(hours=24)).date()
        ).count()
        
        # Calcular puntuación de salud
        health_score = 100
        
        if visits_with_issues > 0:
            health_score -= (visits_with_issues / total_visits * 20)  # Hasta -20 puntos
        
        if old_pending_payments > 0:
            health_score -= min(old_pending_payments * 5, 30)  # Hasta -30 puntos
        
        if old_pending_orders > 0:
            health_score -= min(old_pending_orders * 5, 30)  # Hasta -30 puntos
        
        health_score = max(0, health_score)  # No menos de 0
        
        return {
            'health_score': round(health_score, 1),
            'data_integrity': {
                'total_visits': total_visits,
                'visits_with_slot_issues': visits_with_issues,
                'integrity_rate': round((total_visits - visits_with_issues) / total_visits * 100, 2) if total_visits > 0 else 100
            },
            'pending_issues': {
                'old_pending_payments': old_pending_payments,
                'old_pending_orders': old_pending_orders
            },
            'generated_at': timezone.now().isoformat()
        }


class AlertManager:
    """
    Gestor de alertas del sistema.
    
    Detecta condiciones anómalas y genera alertas
    para el monitoreo del sistema.
    """
    
    @staticmethod
    def check_error_rate_alerts():
        """
        Verifica si la tasa de errores está por encima del umbral.
        
        Returns:
            list: Lista de alertas generadas
        """
        alerts = []
        
        # Verificar últimas 24 horas
        last_24h = timezone.now() - timedelta(hours=24)
        
        from api.payments.models import Payments
        
        payments_24h = Payments.objects.filter(payment_date__gte=last_24h)
        total_payments = payments_24h.count()
        failed_payments = payments_24h.filter(status='FAILED').count()
        
        if total_payments > 0:
            error_rate = failed_payments / total_payments
            
            if error_rate > ALERT_CONFIG['HIGH_ERROR_RATE_THRESHOLD']:
                alerts.append({
                    'type': 'HIGH_ERROR_RATE',
                    'severity': 'HIGH',
                    'message': f'Tasa de errores alta: {error_rate:.2%} en las últimas 24 horas',
                    'details': {
                        'total_payments': total_payments,
                        'failed_payments': failed_payments,
                        'error_rate': error_rate
                    },
                    'timestamp': timezone.now().isoformat()
                })
        
        return alerts
    
    @staticmethod
    def check_unusual_activity_alerts():
        """
        Verifica actividad inusual en el sistema.
        
        Returns:
            list: Lista de alertas de actividad inusual
        """
        alerts = []
        
        from api.purchase_orders.models import PurchaseOrders
        
        # Comparar actividad de hoy con promedio de últimos 7 días
        today = timezone.now().date()
        week_ago = today - timedelta(days=7)
        
        # Órdenes de hoy
        today_orders = PurchaseOrders.objects.filter(
            order_date=today
        ).count()
        
        # Promedio de últimos 7 días (excluyendo hoy)
        avg_orders = PurchaseOrders.objects.filter(
            order_date__range=[week_ago, today - timedelta(days=1)]
        ).count() / 7
        
        # Verificar si la actividad es inusualmente alta
        if avg_orders > 0 and today_orders > avg_orders * ALERT_CONFIG['UNUSUAL_ACTIVITY_MULTIPLIER']:
            alerts.append({
                'type': 'UNUSUAL_HIGH_ACTIVITY',
                'severity': 'MEDIUM',
                'message': f'Actividad inusualmente alta: {today_orders} órdenes hoy vs promedio de {avg_orders:.1f}',
                'details': {
                    'today_orders': today_orders,
                    'average_orders': avg_orders,
                    'multiplier': today_orders / avg_orders
                },
                'timestamp': timezone.now().isoformat()
            })
        
        # Verificar límite diario
        if today_orders > ALERT_CONFIG['DAILY_TRANSACTION_LIMIT']:
            alerts.append({
                'type': 'DAILY_LIMIT_EXCEEDED',
                'severity': 'HIGH',
                'message': f'Límite diario de transacciones excedido: {today_orders}',
                'details': {
                    'today_orders': today_orders,
                    'daily_limit': ALERT_CONFIG['DAILY_TRANSACTION_LIMIT']
                },
                'timestamp': timezone.now().isoformat()
            })
        
        return alerts
    
    @staticmethod
    def check_all_alerts():
        """
        Ejecuta todas las verificaciones de alertas.
        
        Returns:
            dict: Todas las alertas generadas
        """
        all_alerts = []
        
        # Verificar diferentes tipos de alertas
        all_alerts.extend(AlertManager.check_error_rate_alerts())
        all_alerts.extend(AlertManager.check_unusual_activity_alerts())
        
        # Registrar alertas en el log
        for alert in all_alerts:
            monitoring_logger.warning(f"ALERTA: {alert['type']} - {alert['message']}")
        
        return {
            'total_alerts': len(all_alerts),
            'alerts': all_alerts,
            'checked_at': timezone.now().isoformat()
        }


class PerformanceMonitor:
    """
    Monitor de rendimiento del sistema.
    
    Rastrea métricas de rendimiento y detecta
    cuellos de botella en el sistema.
    """
    
    def __init__(self):
        self.start_time = None
        self.operation_name = None
    
    def start_monitoring(self, operation_name):
        """
        Inicia el monitoreo de una operación.
        
        Args:
            operation_name (str): Nombre de la operación a monitorear
        """
        self.operation_name = operation_name
        self.start_time = timezone.now()
        monitoring_logger.debug(f"Iniciando monitoreo: {operation_name}")
    
    def end_monitoring(self, success=True, details=None):
        """
        Finaliza el monitoreo y registra métricas.
        
        Args:
            success (bool): Si la operación fue exitosa
            details (dict, optional): Detalles adicionales
        
        Returns:
            dict: Métricas de la operación
        """
        if not self.start_time or not self.operation_name:
            return None
        
        end_time = timezone.now()
        duration = (end_time - self.start_time).total_seconds()
        
        metrics = {
            'operation': self.operation_name,
            'duration_seconds': duration,
            'success': success,
            'start_time': self.start_time.isoformat(),
            'end_time': end_time.isoformat()
        }
        
        if details:
            metrics['details'] = details
        
        # Registrar en log
        status = "EXITOSA" if success else "FALLIDA"
        monitoring_logger.info(
            f"Operación {status}: {self.operation_name} - Duración: {duration:.2f}s"
        )
        
        # Verificar si la duración es inusualmente alta
        if duration > ALERT_CONFIG['HIGH_RESPONSE_TIME_THRESHOLD']:
            monitoring_logger.warning(
                f"Operación lenta detectada: {self.operation_name} - {duration:.2f}s"
            )
        
        # Resetear para próxima operación
        self.start_time = None
        self.operation_name = None
        
        return metrics


def generate_daily_report():
    """
    Genera un reporte diario del sistema.
    
    Returns:
        dict: Reporte completo del día
    """
    today = timezone.now().date()
    
    # Obtener métricas del día
    daily_metrics = SystemMetrics.get_daily_activity_metrics(days=1)
    health_metrics = SystemMetrics.get_system_health_metrics()
    alerts = AlertManager.check_all_alerts()
    
    report = {
        'report_date': today.isoformat(),
        'generated_at': timezone.now().isoformat(),
        'daily_activity': daily_metrics['daily_data'][0] if daily_metrics['daily_data'] else {},
        'system_health': health_metrics,
        'alerts': alerts,
        'summary': {
            'health_score': health_metrics['health_score'],
            'total_alerts': alerts['total_alerts'],
            'data_integrity_ok': health_metrics['data_integrity']['integrity_rate'] > 95
        }
    }
    
    # Registrar reporte en log
    monitoring_logger.info(f"Reporte diario generado: {json.dumps(report['summary'])}")
    
    return report


# Instancias globales para uso fácil
system_metrics = SystemMetrics()
alert_manager = AlertManager()
performance_monitor = PerformanceMonitor()