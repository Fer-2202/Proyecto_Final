from django.urls import path
from .views import PaymentsViewSet

""" URLs para la aplicación Payments """
urlpatterns = [
 
    # Ruta para listar
    path('', PaymentsViewSet.as_view({'get': 'list'}), name='payments-get'),
    
    # Ruta para crear
    path('create/', PaymentsViewSet.as_view({'post': 'create'}), name='payments-create'),
    
    # Ruta para obtener un Payment por su ID
    path('<int:pk>/', PaymentsViewSet.as_view({'get': 'retrieve'}), name='payments-detail'),
    
    # Ruta para actualizar un Payment por su ID
    path('<int:pk>/update/', PaymentsViewSet.as_view({'put': 'update'}), name='payments-update'),
    
    # Ruta para eliminar un Payment por su ID
    path('<int:pk>/delete/', PaymentsViewSet.as_view({'delete': 'destroy'}), name='payments-delete'),

]