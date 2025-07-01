from django.urls import path
from .views import DocumentsViewSet, get_document_content

urlpatterns = [
    
    path('<int:pk>/document_content/', get_document_content, name='document_content'),
    #Para listar, obtener y crear documentos
    path('', DocumentsViewSet.as_view({'get': 'list', 'post': 'create'}), name='documents-get'),
    #Para eliminar y editar los documentos
    path('<int:pk>/', DocumentsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='documents-detail'),

]