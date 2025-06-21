from django.urls import path
from .views import PaymentsViewSet

""" URLs para la aplicación Payments """
urlpatterns = [
 
 # Ruta para listar
 path('', PaymentsViewSet.as_view({'get': 'list'}), name='payments-lista'),
 
 # Ruta para crear
 path('create/', PaymentsViewSet.as_view({'post': 'create'}), name='payments-crear'),
 
 # Ruta para obtener un Payment por su ID
 path('<int:pk>/', PaymentsViewSet.as_view({'get': 'retrieve'}), name='payments-obtener'),
 
 # Ruta para actualizar un Payment por su ID
 path('<int:pk>/update/', PaymentsViewSet.as_view({'put': 'update'}), name='payments-actualizar'),
 
 # Ruta para eliminar un Payment por su ID
 path('<int:pk>/delete/', PaymentsViewSet.as_view({'delete': 'destroy'}), name='payments-eliminar'),
]