from django.urls import path
from .views import ProgramaEducativoViewSet, ProgramaItemViewSet

urlpatterns = [
    # Programa
    # Ruta para listar
    path('', ProgramaEducativoViewSet.as_view({'get': 'list'}), name='programas-educativos-get'),

    # Ruta para crear
    path('create/', ProgramaEducativoViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-create'),
    
    # Ruta para detalle
    path('<int:pk>/detail/', ProgramaEducativoViewSet.as_view({ 'get': 'retrieve' }), name='programas-educativos-detail'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', ProgramaEducativoViewSet.as_view({ 'get': 'retrieve', 'put': 'update' }), name='programas-educativos-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', ProgramaEducativoViewSet.as_view({ 'delete': 'destroy' }), name='programas-educativos-delete'),
    

    # Programas Items
    # Ruta para listar
    path('items/', ProgramaItemViewSet.as_view({'get': 'list'}), name='programas-educativos-items-lista'),
    
    # Ruta para crear
    path('items/create/', ProgramaItemViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-items-registro'),
    
    # Ruta para detalle
    path('items/<int:pk>/detail/', ProgramaItemViewSet.as_view({ 'get': 'retrieve' }), name='programas-educativos-items-actualizar'),

    # Ruta para actualizar o editar
    path('items/<int:pk>/update/', ProgramaItemViewSet.as_view({ 'get': 'retrieve', 'put': 'update' }), name='programas-educativos-items-eliminar'),

    # Ruta para eliminar
    path('items/<int:pk>/delete/', ProgramaItemViewSet.as_view({'delete': 'destroy'}), name='programas-educativos-items-eliminar'),

]