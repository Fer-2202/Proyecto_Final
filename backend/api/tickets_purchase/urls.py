from django.urls import path
from .views import Tickets_Purchase_Order_ViewSet


urlpatterns = [
  
    # Ruta para listar
    path('', Tickets_Purchase_Order_ViewSet.as_view({'get': 'list'}), name='tickets-purchase-order-get'),

    # Ruta para crear
    path('create/', Tickets_Purchase_Order_ViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='tickets-purchase-order-create'),

    # Ruta para detalle
    path('<int:pk>/', Tickets_Purchase_Order_ViewSet.as_view({ 'get': 'list'}), name='tickets-purchase-order-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', Tickets_Purchase_Order_ViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='tickets-purchase-order-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', Tickets_Purchase_Order_ViewSet.as_view({'delete': 'destroy'}), name='tickets-purchase-order-delete'),
 
]