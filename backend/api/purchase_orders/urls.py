from django.urls import path, include
from .views import Purchase_Orders_ViewSet, Purchase_Orders_DetailViewSet

""" URLs para la aplicación Purchase_Orders """
urlpatterns = [
 
 # Ruta para listar
 path('', Purchase_Orders_ViewSet.as_view({'get': 'list'}), name='purchase_orders-lista'),
 
  # Ruta para detalle
 path('<int:pk>/', Purchase_Orders_DetailViewSet.as_view({'get': 'retrieve'}), name='purchase_orders-detalle'),
 
 # Ruta para crear
 path('create/', Purchase_Orders_DetailViewSet.as_view({'post': 'create', 'get': 'list'}), name='purchase_orders-crear'),
 
 # Ruta para actualizar o editar
 path('<int:pk>/update/', Purchase_Orders_DetailViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='purchase_orders-actualizar-editar'),
 
 # Ruta para eliminar
 path('<int:pk>/delete/', Purchase_Orders_DetailViewSet.as_view({'delete': 'destroy'}), name='purchase_orders-eliminar'),
 

]