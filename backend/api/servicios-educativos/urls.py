from .views import ServiciosEducativosViewSet, ServiciosEducativosDescriptionViewSet, ServiciosEducativosFactsViewSet,ServiciosEducativosButtonsViewSet, ServiciosEducativosImageViewSet
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
 # Endpoints para Servicios Educativos
    
    # Endpoints para crear, actualizar y eliminar servicios educativos
    path('lista/', ServiciosEducativosViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-list'),
    path('actualizar-editar/<int:pk>/', ServiciosEducativosViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-detail'),
    path('eliminar/<int:pk>/', ServiciosEducativosViewSet.as_view({'delete': 'destroy'}), name='exhibition-delete'),
    
    # Endpoints para manejar imágenes de exhibiciones
    path('imagenes/', ServiciosEducativosImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-image-list'),
    path('imagenes/<int:pk>/', ServiciosEducativosImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-image-detail'),
    path('imagenes/eliminar/<int:pk>/', ServiciosEducativosImageViewSet.as_view({'delete': 'destroy'}), name='exhibition-image-delete'),
    
    # Endpoints para facts
    path('facts/', ServiciosEducativosFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-fact-list'),
    path('facts/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-detail'),
    path('facts/eliminar/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),
    
    # Endpoints para manejar descripciones de exhibiciones
    path('description/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-description-list'),
    path('description/<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-description-detail'),
    path('description/eliminar/<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'delete': 'destroy'}), name='exhibition-description-delete'),
    
    path('buttons/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-button-list'),
    path('buttons/<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-button-detail'),
    path('buttons/eliminar/<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'delete': 'destroy'}), name='exhibition-button-delete'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
