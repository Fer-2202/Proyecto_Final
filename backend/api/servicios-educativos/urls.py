from .views import ServiciosEducativosViewSet, ServiciosEducativosDescriptionViewSet, ServiciosEducativosFactsViewSet,ServiciosEducativosButtonsViewSet, ServiciosEducativosImageViewSet
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
 # Endpoints para Servicios Educativos
    
    # Ruta para listar
    path('', ServiciosEducativosViewSet.as_view({'get': 'list'}), name='exhibition-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='exhibition-create'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosViewSet.as_view({ 'get': 'list'}), name='exhibition-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', ServiciosEducativosViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosViewSet.as_view({'delete': 'destroy'}), name='exhibition-delete'),
    


    # Endpoints para manejar imágenes de exhibiciones
    # Ruta para listar
    path('imagenes/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='exhibition-image-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-image-detail'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosImageViewSet.as_view({'get': 'list'}), name='exhibition-image-detail'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', ServiciosEducativosImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-image-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosImageViewSet.as_view({ 'delete': 'destroy' }), name='exhibition-image-delete'),



    # Endpoints para facts
    #Ruta para listar
    path('facts/', ServiciosEducativosFactsViewSet.as_view({'get': 'list'}), name='exhibition-fact-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-fact-detail'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosFactsViewSet.as_view({'get': 'list'}), name='exhibition-fact-detail'),
    
    # Ruta para actualizar o editar
    path('<int:pk>/update/', ServiciosEducativosFactsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),



    # Endpoints para manejar descripciones de exhibiciones
    #Ruta para listar
    path('description/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list'}), name='exhibition-description-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-description-detail'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'list'}), name='exhibition-description-delete'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ServiciosEducativosDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-description-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosDescriptionViewSet.as_view({'delete': 'destroy'}), name='exhibition-description-delete'),



    # Ruta para listar
    path('buttons/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list'}), name='exhibition-button-list'),

    # Ruta para crear
    path('create/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-button-list'),

    # Ruta para detalle
    path('<int:pk>/', ServiciosEducativosButtonsViewSet.as_view({'get': 'list'}), name='exhibition-button-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ServiciosEducativosButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-button-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ServiciosEducativosButtonsViewSet.as_view({'delete': 'destroy'}), name='exhibition-button-delete'),

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
