from django.urls import path
from .views import ProgramaEducativoViewSet, ProgramaItemViewSet

urlpatterns = [
    path('', ProgramaEducativoViewSet.as_view({'get': 'list'}), name='programas-educativos-lista'),
    
    path('create/', ProgramaEducativoViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-registro'),
    
    path('<int:pk>/update/', ProgramaEducativoViewSet.as_view({'put': 'update', 'get': 'retrieve'}), name='programas-educativos-actualizar'),
    
    path('<int:pk>/detail/', ProgramaEducativoViewSet.as_view({'get': 'retrieve'}), name='programas-educativos-detalle'),
    
    path('<int:pk>/delete/', ProgramaEducativoViewSet.as_view({'delete': 'destroy', 'get': 'retrieve'}), name='programas-educativos-eliminar'),
    
    #
    path('items', ProgramaItemViewSet.as_view({'get': 'list'}), name='programas-educativos-items-lista'),
    
    path('items/create', ProgramaItemViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-items-registro'),
    
    path('items/actualizar/<int:pk>', ProgramaItemViewSet.as_view({'put': 'update', 'get': 'retrieve'}), name='programas-educativos-items-actualizar'),
    
    path('items/eliminar/<int:pk>', ProgramaItemViewSet.as_view({'delete': 'destroy'}), name='programas-educativos-items-eliminar'),
]

