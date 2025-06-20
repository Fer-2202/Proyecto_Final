from django.urls import path
from api.species.views import Species_ListCreateView, Species_DetailView

urlpatterns = [
    path('lista/', Species_ListCreateView.as_view(), name='species-lista'),
    path('actualizar-editar/<int:pk>/', Species_DetailView.as_view(), name='species-actualizar-editar'),
]
