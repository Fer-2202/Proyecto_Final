from django.urls import path
from .views import Purchase_Orders_ViewSet, Purchase_Orders_DetailViewSet, validate_qr

""" URLs para la aplicación Purchase_Orders """
urlpatterns = [
 
    # Ruta para listar
    path('', Purchase_Orders_ViewSet.as_view({'get': 'list'}), name='purchase_orders-get'),
    
    # Ruta para detalle
    path('<int:pk>/', Purchase_Orders_DetailViewSet.as_view({'get': 'retrieve'}), name='purchase_orders-detail'),
    
    # Ruta para crear
    path('create/', Purchase_Orders_DetailViewSet.as_view({'post': 'create', 'get': 'list'}), name='purchase_orders-create'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', Purchase_Orders_DetailViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='purchase_orders-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', Purchase_Orders_DetailViewSet.as_view({'delete': 'destroy'}), name='purchase_orders-delete'),
    
    # Endpoint para validar QR
    path('validate_qr/', validate_qr, name='purchase_orders-validate-qr'),
    
]