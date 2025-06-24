from django.urls import path
from .views import SectionsViewSet

""" URLs para la aplicación Sections """

urlpatterns = [
 
    # Ruta para listar
    path('', SectionsViewSet.as_view({'get': 'list'}), name='sections-lista'),

    # Ruta para crear
    path('crear/', SectionsViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='sections-crear'),

    # Ruta para detalle
    path('<int:pk>/', SectionsViewSet.as_view({'get': 'list'}), name='sections-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', SectionsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='sections-actualizar-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/',SectionsViewSet.as_view({'delete': 'destroy'}), name='sections-delete'),
    
]