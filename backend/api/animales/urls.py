from .views import Animals_ListCreateView, Animals_DetailView  # importamos las vistas dentro de la carpeta animals
from django.urls import path, include # importamos path para definir las urls y include para incluir las urls de la app

""" URLs para la aplicación Provinces """
urlpatterns = [
    # Ruta para listar
    path('lista/', Animals_ListCreateView.as_view(), name='animals-lista'),
    # Ruta para actualizar o editar
    path('actualizar-editar/<int:pk>/', Animals_DetailView.as_view(), name='animals-actualizar-editar'),
]