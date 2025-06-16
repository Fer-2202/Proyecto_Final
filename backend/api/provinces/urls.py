from .views import Provinces_ListCreateView, Provinces_DetailView
from django.urls import path


urlpatterns = [
    path('lista/', Provinces_ListCreateView.as_view(), name='provinces-lista'),
    path('actualizar-editar/<int:pk>/', Provinces_DetailView.as_view(), name='provinces-actualizar-editar'),
]