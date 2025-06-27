from .views import ExhibicionViewSet, ExhibicionImageViewSet, ExhibicionFactsViewSet, ExhibicionDescriptionViewSet, ExhibicionButtonsViewSet
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
 
    # Endpoints para Exhibiciones
    # Ruta para listar
    path('', ExhibicionViewSet.as_view({'get': 'list'}), name='exhibition-get'),

    # Ruta para crear
    path('create/', ExhibicionViewSet.as_view({ 'get': 'list', 'post': 'create' }), name='exhibition-create'),

    # Ruta para detalle
    path('<int:pk>/', ExhibicionViewSet.as_view({ 'get': 'list' }), name='exhibition-detail'),

    # Ruta para actualizar-editar
    path('<int:pk>/update/', ExhibicionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-actualizar-update'),

    #Ruta para eliminar
    path('<int:pk>/delete/', ExhibicionViewSet.as_view({'delete': 'destroy'}), name='exhibition-delete'),


    #Aqui van la endpoints de las imagenes
    # Ruta para listar
    path('imagenes/', ExhibicionImageViewSet.as_view({'get': 'list'}), name='exhibition-image-get'),

    # Ruta para crear
    path('create/', ExhibicionImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-image-create'),

    # Ruta para detalle
    path('<int:pk>/', ExhibicionImageViewSet.as_view({ 'get': 'retrieve' }), name='exhibition-image-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ExhibicionImageViewSet.as_view({ 'get': 'retrieve', 'put': 'update', 'delete': 'destroy' }), name='exhibition-actualizar-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ExhibicionImageViewSet.as_view({ 'delete': 'destroy' }), name='exhibition-image-delete'),


    # Endpoints para facts
    # Ruta para listar
    path('facts/', ExhibicionFactsViewSet.as_view({'get': 'list'}), name='exhibition-fact-get'),

    # Ruta para crear
    path('create/', ExhibicionFactsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-fact-create'),

    # Ruta para detalle
    path('<int:pk>/', ExhibicionFactsViewSet.as_view({'get': 'retrieve'}), name='exhibition-fact-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ExhibicionImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-fact-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ExhibicionFactsViewSet.as_view({'delete': 'destroy'}), name='exhibition-fact-delete'),
    

    # Endpoints para manejar descripciones de exhibiciones
    #Ruta para listar
    path('description/', ExhibicionDescriptionViewSet.as_view({'get': 'list'}), name='exhibition-description-get'),

    # Ruta para crear
    path('create/', ExhibicionDescriptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-description-create'),

    # Ruta para detalle
    path('<int:pk>/', ExhibicionDescriptionViewSet.as_view({'get': 'retrieve'}), name='exhibition-description-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ExhibicionDescriptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-description-update'),
    
    # Ruta para eliminar
    path('<int:pk>/delete/', ExhibicionDescriptionViewSet.as_view({'delete': 'destroy'}), name='exhibition-description-delete'), 


    # Botones
    #Ruta para listar
    path('buttons/', ExhibicionButtonsViewSet.as_view({'get': 'list'}), name='exhibition-button-get'),

    # Ruta para crear
    path('create/', ExhibicionButtonsViewSet.as_view({'get': 'list', 'post': 'create'}), name='exhibition-button-create'),

    # Ruta para detalle
    path('<int:pk>/', ExhibicionButtonsViewSet.as_view({'get': 'retrieve'}), name='exhibition-button-detail'),

    # Ruta para actualizar o editar
    path('<int:pk>/update/', ExhibicionButtonsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='exhibition-button-update'),

    # Ruta para eliminar
    path('<int:pk>/delete/', ExhibicionButtonsViewSet.as_view({'delete': 'destroy'}), name='exhibition-button-delete'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)