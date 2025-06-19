from .views import Tickets_DetailView, Tickets_ListCreateView, Tickets_DestroyView
from django.urls import path

urlpatterns = [
     # Tickets
    path('lista/', Tickets_ListCreateView.as_view(), name='tickets-lista'),
    path('actualizar-editar/<int:pk>/', Tickets_DetailView.as_view(), name='tickets-actualizar-editar'),
    path('tickets/<int:pk>/delete/', Tickets_DestroyView.as_view(), name='tickets-eliminar'),
]