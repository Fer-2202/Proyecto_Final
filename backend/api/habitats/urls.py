from django.urls import path
from .views import Habitats_ViewSet

urlpatterns = [
    
    # Ruta para listar
    path('', Habitats_ViewSet.as_view({'get': 'list'}), name='habitats-get'),
    
    # Ruta para crear
    path('create/', Habitats_ViewSet.as_view({'post': 'create', 'get': 'list'}), name='habitats-create'),
    
    # Ruta para detalle
    path('<int:pk>/', Habitats_ViewSet.as_view({'get': 'retrieve'}), name='habitats-detail'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', Habitats_ViewSet.as_view({'put': 'update'}), name='habitats-update'),
    
    # Ruta para eliminar 
    path('<int:pk>/delete/', Habitats_ViewSet.as_view({'delete': 'destroy'}), name='habitats-delete'),

]