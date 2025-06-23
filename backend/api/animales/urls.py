from .views import *
from django.urls import path, include

""" URLs para la aplicación Provinces """
urlpatterns = [
    # Ruta para listar
    path('', Animals_ViewSet.as_view({'get': 'list'}), name='animals-lista'),
    
    # Ruta para crear
    path('create/', Animals_ViewSet.as_view({'get': 'list', 'post': 'create'}), name='animals-crear'),
    
    # Ruta para detalle
    path('<int:pk>/', Animals_ViewSet.as_view({'get': 'retrieve'}), name='animals-detalle'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/updatete/', Animals_ViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='animals-actualizar-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', Animals_ViewSet.as_view({'delete': 'destroy'}), name='animals-eliminar'),
]
