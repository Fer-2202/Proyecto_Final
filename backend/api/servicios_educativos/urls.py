from .views import ServiciosEducativosViewSet, ServiciosEducativosDescriptionViewSet, ServiciosEducativosFactsViewSet,ServiciosEducativosButtonsViewSet, ServiciosEducativosImageViewSet
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    
    # Endpoints para Servicios Educativos
    # Ruta para listar
    path('', ServiciosEducativosViewSet.as_view({'get': 'list'}), name='servicio-educativo-get'),

    # Ruta para crear
    path('create/', ServiciosEducativosViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='servicio-educativo-create'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosViewSet.as_view({ 'get': 'list'}), name='servicio-educativo-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', ServiciosEducativosViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='servicio-educativo-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosViewSet.as_view({'delete': 'destroy'}), name='servicio-educativo-delete'),
    

    # Endpoints para manejar imágenes de exhibiciones
    # Ruta para listar
    path('imagenes/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='servicio-educativo-image-get'),

    # Ruta para crear
    path('imagenes/create/', ServiciosEducativosImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='servicio-educativo-image-create'),

    # Ruta para detalle
    path('imagenes/<int:pk>/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='servicio-educativo-image-detail'),
    
    # Ruta para actualizar o editar
    path('imagenes/<int:pk>/update/', ServiciosEducativosImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='servicio-educativo-image-update'),

    # Ruta para eliminar
    path('imagenes/<int:pk>/delete/', ServiciosEducativosImageViewSet.as_view({ 'delete': 'destroy' }), name='servicio-educativo-image-delete'),


    # Endpoints para facts
    #Ruta para listar
    path('facts/', ServiciosEducativosFactsViewSet.as_view({'get': 'list'}), name='servicio-educativo-fact-get'),

    # Ruta para crear
    path('facts/create/', ServiciosEducativosFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='servicio-educativo-fact-create'),

    # Ruta para detalle
    path('facts/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'get': 'list'}), name='servicio-educativo-fact-detail'),
    
    # Ruta para actualizar o editar
    path('facts/<int:pk>/update/', ServiciosEducativosFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='servicio-educativo-fact-update'),

    # Ruta para eliminar
    path('facts/<int:pk>/delete/', ServiciosEducativosFactsViewSet.as_view({'delete': 'destroy'}), name='servicio-educativo-fact-delete'),


    # Endpoints para manejar descripciones de exhibiciones
    #Ruta para listar
    path('description/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list'}), name='servicio-educativo-description-get'),

    # Ruta para crear
    path('description/create/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='servicio-educativo-description-create'),

    # Ruta para detalle
    path('description/<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list'}), name='servicio-educativos-description-detail'),

    # Ruta para actualizar o editar
    path('description/<int:pk>/update/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='servicio-educativo-description-update'),

    # Ruta para eliminar
    path('description/<int:pk>/delete/', ServiciosEducativosDescriptionViewSet.as_view({'delete': 'destroy'}), name='servicio-educativo-description-delete'),


    
    # Ruta para listar BUTTONS
    path('buttons/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list'}), name='servicio-educativo-button-get'),

    # Ruta para crear
    path('buttons/create/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='servicio-educativo-button-create'),

    # Ruta para detalle
    path('buttons/<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list'}), name='servicio-educativo-button-detail'),

    # Ruta para actualizar o editar
    path('buttons/<int:pk>/update/', ServiciosEducativosButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='servicio-educativo-button-update'),

    # Ruta para eliminar
    path('buttons/<int:pk>/delete/', ServiciosEducativosButtonsViewSet.as_view({'delete': 'destroy'}), name='servicio-educativo-button-delete'),

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)