from .views import Tickets_DetailView, Tickets_ListCreateView, Tickets_DestroyView
from django.urls import path

urlpatterns = [
 
    # Tickets
    path('', Tickets_ListCreateView.as_view({'get': 'list'}), name='tickets-lista'),
    
    path('create/', Tickets_ListCreateView.as_view({'get': 'list', 'post': 'create'}), name='tickets-crear'),
    
    path('<int:pk>/', Tickets_DetailView.as_view({'get': 'retrieve'}), name='tickets-detalle'),
    
    path('<int:pk>/update/', Tickets_DetailView.as_view({'put': 'update', 'get': 'retrieve'}), name='tickets-actualizar-editar'),
    
    path('<int:pk>/delete/', Tickets_DestroyView.as_view({'delete': 'destroy'}), name='tickets-eliminar'),
]