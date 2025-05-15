from django.urls import path
from .views import *

urlpatterns = [

    path('categorias/', UsersListCreateView.as_view(), name='categoria-lista'),
    path('categorias/<int:pk>',UsersDetailView(), name='categoria-actualizar-editar'),

]