from .views import ServiciosEducativosViewSet, ServiciosEducativosDescriptionViewSet, ServiciosEducativosFactsViewSet,ServiciosEducativosButtonsViewSet, ServiciosEducativosImageViewSet
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
 # Endpoints para Servicios Educativos
    
    # Endpoints para crear, actualizar y eliminar servicios educativos
    # Ruta para listar
    path('', ServiciosEducativosViewSet.as_view({'get': 'list'}), name='exhibition-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='exhibition-create'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosViewSet.as_view({ 'get': 'list'}), name='exhibition-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', ServiciosEducativosViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-update'),

    # Ruta para eliminar
    path('<int:pk>/eliminar/', ServiciosEducativosViewSet.as_view({'delete': 'destroy'}), name='exhibition-delete'),
    



    # Endpoints para manejar imágenes de exhibiciones
    # Ruta para listar
    path('imagenes/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='exhibition-image-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-image-detail'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='exhibition-image-delete'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', ServiciosEducativosImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-image-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosImageViewSet.as_view({ 'delete': 'destroy' }), name='exhibition-image-delete'),



    # Endpoints para facts
    #Ruta para listar
    path('facts/', ServiciosEducativosFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-fact-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-detail'),

    # Ruta para detalle
    path('facts/eliminar/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),
    
    # Ruta para actualizar o editar
    path('facts/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-detail'),

    # Ruta para eliminar
    path('facts/eliminar/<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),




    # Endpoints para manejar descripciones de exhibiciones
    path('description/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-description-list'),
    path('description/<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-description-detail'),
    path('description/eliminar/<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'delete': 'destroy'}), name='exhibition-description-delete'),
    
    path('buttons/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-button-list'),
    path('buttons/<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-button-detail'),
    path('buttons/eliminar/<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'delete': 'destroy'}), name='exhibition-button-delete'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
