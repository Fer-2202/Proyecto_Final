from .views import Provinces_GetView, Provinces_DetailView # importamos las vistas dentro de la carpeta provinces
from django.urls import path, include # importamos path para definir las urls y include para incluir las urls de la app

""" URLs para la aplicación Provinces """
urlpatterns = [
    # Ruta para listar
    path('', Provinces_GetView.as_view({'get': 'list'}), name='provinces-lista'),
    # Ruta para actualizar o editar
    path('actualizar-editar/<int:pk>/', Provinces_DetailView.as_view(), name='provinces-actualizar-editar'),
    
]