from .views import Conservation_Status_ViewSet
from django.urls import path

urlpatterns = [
    
    # Ruta para listar
    path('', Conservation_Status_ViewSet.as_view({'get': 'list'}), name='conservation-status-list'),

    # Ruta para crear
    path('create/', Conservation_Status_ViewSet.as_view({'get': 'list', 'post': 'create'}), name='conservation-status-create'),

    # Ruta para detalle
    path('<int:pk>/', Conservation_Status_ViewSet.as_view({'get': 'list'}), name='conservation-status-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', Conservation_Status_ViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='conservation-status-update'),

    #Ruta para eliminar
    path('<int:pk>/delete/', Conservation_Status_ViewSet.as_view({'delete': 'destroy'}), name='conservation-status-delete'),

]



