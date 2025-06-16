from django.urls import path
from .views import SectionsListCreateView, SectionDetailView  # Importamos las vistas dentro de la carpeta sections

""" URLs para la aplicación Sections """

urlpatterns = [
    path('lista/', SectionsListCreateView.as_view(), name='sections-lista'),
    path('actualizar-editar/<int:pk>/', SectionDetailView.as_view(), name='sections-actualizar-editar'),
]