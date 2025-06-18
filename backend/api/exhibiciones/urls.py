from .views import ExhibicionViewSet, ExhibicionImageViewSet, ExhibicionFactsViewSet, ExhibicionDescriptionViewSet, ExhibicionButtonsViewSet
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Endpoints para Exhibiciones
   
    
    
    # Endpoints para crear, actualizar y eliminar exhibiciones
    path('lista/', ExhibicionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-list'),
    path('actualizar-editar/<int:pk>/', ExhibicionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-detail'),
    path('eliminar/<int:pk>/', ExhibicionViewSet.as_view({'delete': 'destroy'}), name='exhibition-delete'),
    
    # Endpoints para manejar imágenes de exhibiciones
    path('imagenes/', ExhibicionImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-image-list'),
    path('imagenes/<int:pk>/', ExhibicionImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-image-detail'),
    path('imagenes/eliminar/<int:pk>/', ExhibicionImageViewSet.as_view({'delete': 'destroy'}), name='exhibition-image-delete'),
    
    # Endpoints para facts
    path('facts/', ExhibicionFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-fact-list'),
    path('facts/<int:pk>/', ExhibicionFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-detail'),
    path('facts/eliminar/<int:pk>/', ExhibicionFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),
    
    # Endpoints para manejar descripciones de exhibiciones
    path('description/', ExhibicionDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-description-list'),
    path('description/<int:pk>/', ExhibicionDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-description-detail'),
    path('description/eliminar/<int:pk>/', ExhibicionDescriptionViewSet.as_view({'delete': 'destroy'}), name='exhibition-description-delete'),
    
    path('buttons/', ExhibicionButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-button-list'),
    path('buttons/<int:pk>/', ExhibicionButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-button-detail'),
    path('buttons/eliminar/<int:pk>/', ExhibicionButtonsViewSet.as_view({'delete': 'destroy'}), name='exhibition-button-delete'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
