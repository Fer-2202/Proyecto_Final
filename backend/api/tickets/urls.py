from .views import Tickets_DetailView, Tickets_ListCreateView, Tickets_DestroyView, AvailableTicketsView
from django.urls import path

urlpatterns = [
 
    # Ruta para listar
    path('', Tickets_ListCreateView.as_view({'get': 'list'}), name='tickets-get'),
    
    # Ruta para crear
    path('create/', Tickets_ListCreateView.as_view({'get': 'list', 'post': 'create'}), name='tickets-create'),
    
    # Ruta para detalle
    path('<int:pk>/', Tickets_DetailView.as_view({'get': 'retrieve'}), name='tickets-detail'),
    
    # Ruta para editar o actualizar
    path('<int:pk>/update/', Tickets_DetailView.as_view({'put': 'update', 'get': 'retrieve'}), name='tickets-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', Tickets_DestroyView.as_view({'delete': 'destroy'}), name='tickets-delete'),
    
    # Ruta para tickets disponibles
    path('available/', AvailableTicketsView.as_view(), name='tickets-available'),
    
]