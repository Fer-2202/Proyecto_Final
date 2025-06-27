from .views import Animals_ViewSet
from django.urls import path


""" URLs para la aplicación Provinces """
urlpatterns = [
 
    # Ruta para listar
    path('', Animals_ViewSet.as_view({'get': 'list'}), name='animals-get'),
    
    # Ruta para crear
    path('create/', Animals_ViewSet.as_view({'get': 'list', 'post': 'create'}), name='animals-create'),
    
    # Ruta para detalle
    path('<int:pk>/', Animals_ViewSet.as_view({'get': 'retrieve'}), name='animals-detail'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', Animals_ViewSet.as_view({'get': 'retrieve', 'put': 'update' }), name='animals-actualizar-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', Animals_ViewSet.as_view({'delete': 'destroy'}), name='animals-delete'),
    
]