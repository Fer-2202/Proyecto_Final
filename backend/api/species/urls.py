from django.urls import path
from api.species.views import Species_ViewSet

urlpatterns = [
  
    # Ruta para listar
    path('', Species_ViewSet.as_view({'get': 'list'}), name='species-listar'),

    # Ruta para crear
    path('create/', Species_ViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='species-crate'),

    # Ruta para detalle
    path('<int:pk>/', Species_ViewSet.as_view({ 'get': 'list'}), name='species-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', Species_ViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='species-actualizar-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', Species_ViewSet.as_view({'delete': 'destroy'}), name='species-delete'),
    
]
