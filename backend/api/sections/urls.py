from django.urls import path
from .views import SectionsListCreateView, SectionDetailView  # Importamos las vistas dentro de la carpeta sections

""" URLs para la aplicación Sections """

urlpatterns = [
    path('', SectionsListCreateView.as_view(), name='sections-lista'),
    path('crear/', SectionsListCreateView.as_view(), name='sections-crear'),
    path('<int:pk>/', SectionDetailView.as_view(), name='sections-detalle'),
    path('<int:pk>/eliminar/', SectionDetailView.as_view(), name='sections-eliminar'),
    path('<int:pk>/actualizar-editar/', SectionDetailView.as_view(), name='sections-actualizar-editar'),
]
