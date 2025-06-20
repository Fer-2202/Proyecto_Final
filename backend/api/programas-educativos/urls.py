from django.urls import path
from .views import ProgramaEducativoViewSet, ProgramaItemViewSet

urlpatterns = [
    path('', ProgramaEducativoViewSet.as_view({'get': 'list'}), name='programas-educativos-lista'),
    path('registro', ProgramaEducativoViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-registro'),
    path('actualizar/<int:pk>', ProgramaEducativoViewSet.as_view({'put': 'update'}), name='programas-educativos-actualizar'),
    path('eliminar/<int:pk>', ProgramaEducativoViewSet.as_view({'delete': 'destroy'}), name='programas-educativos-eliminar'),
    
    #
    path('items', ProgramaItemViewSet.as_view({'get': 'list'}), name='programas-educativos-items-lista'),
    path('items/registro', ProgramaItemViewSet.as_view({'get': 'list', 'post': 'create'}), name='programas-educativos-items-registro'),
    path('items/actualizar/<int:pk>', ProgramaItemViewSet.as_view({'put': 'update'}), name='programas-educativos-items-actualizar'),
    path('items/eliminar/<int:pk>', ProgramaItemViewSet.as_view({'delete': 'destroy'}), name='programas-educativos-items-eliminar'),
]

