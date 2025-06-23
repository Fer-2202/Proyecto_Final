from django.urls import path
from .views import SectionsListCreateView, SectionDetailView  # Importamos las vistas dentro de la carpeta sections

""" URLs para la aplicación Sections """

urlpatterns = [
    # Ruta para listar
    path('', SectionsListCreateView.as_view(), name='sections-lista'),

    # Ruta para crear
    path('crear/', SectionsListCreateView.as_view(), name='sections-crear'),

    # Ruta para detalle
    path('<int:pk>/', SectionDetailView.as_view(), name='sections-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', SectionDetailView.as_view(), name='sections-actualizar-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/',SectionDetailView.as_view(), name='sections-delete'),
    
]
