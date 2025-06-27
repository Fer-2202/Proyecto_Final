from django.urls import path
from .views import Visits_ViewSet, AvailableVisitsView

urlpatterns = [
  
    # Ruta para listar
    path('', Visits_ViewSet.as_view({'get': 'list'}), name='Visits-get'),

    # Ruta para crear
    path('create/', Visits_ViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='Visits-create'),

    # Ruta para detalle
    path('<int:pk>/', Visits_ViewSet.as_view({ 'get': 'list'}), name='Visits-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', Visits_ViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='Visits-actualizar-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', Visits_ViewSet.as_view({'delete': 'destroy'}), name='Visits-delete'),
    
    # Ruta para visitas disponibles
    path('available/', AvailableVisitsView.as_view(), name='Visits-available'),
    
]