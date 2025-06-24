from django.urls import path
from .views import AuditLogViewSet

urlpatterns = [

  # Listar todo las auditorias
  path('', AuditLogViewSet.as_view({'get': 'list'}), name='AuditLog_list'),

  # Detalles de la auditoria
  path('<int:pk>/', AuditLogViewSet.as_view({'get': 'list'}), name='AuditLog_detail'),

]