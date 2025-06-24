from .views import Provinces_GetView, Provinces_DetailView
from django.urls import path, include

""" URLs para la aplicación Provinces """
urlpatterns = [
 
    # Ruta para listar
    path('', Provinces_GetView.as_view({'get': 'list'}), name='provinces-lista'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', Provinces_DetailView.as_view({'get': 'retrieve', 'put': 'update'}), name='provinces-actualizar-editar'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', Provinces_DetailView.as_view({'delete': 'destroy'}), name='provinces-eliminar'),
    
    # Ruta para crear
    path('create/', Provinces_DetailView.as_view({'post': 'create'}), name='provinces-crear'),
    
    # Ruta para detalle
    path('<int:pk>/', Provinces_DetailView.as_view({'get': 'retrieve'}), name='provinces-detalle'),

]