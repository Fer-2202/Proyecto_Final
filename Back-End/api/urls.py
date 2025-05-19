from django.urls import path
from .views import *

urlpatterns = [

    path('roles/', Roles_ListCreateView.as_view(), name='roles-lista'),
    path('roles/<int:pk>',Roles_DetailView(), name='roles-actualizar-editar'),

    path('provinces/', Provinces_ListCreateView.as_view(), name='provinces-lista'),
    path('provinces/<int:pk>',Provinces_DetailView(), name='provinces-actualizar-editar'),

    path('users/', Users_ListCreateView.as_view(), name='categoria-lista'),
    path('users/<int:pk>',Users_DetailView(), name='categoria-actualizar-editar'), 
    
    path('tickets/', Tickets_ListCreateView.as_view(), name='tickets-lista'),
    path('tickets/<int:pk>',Tickets_DetailView(), name='tickets-actualizar-editar'),
    
    path('visits/', Visits_ListCreateView.as_view(), name='visits-lista'),
    path('visits/<int:pk>',Visits_DetailView(), name='visits-actualizar-editar'),

    path('visits/', Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('visits/<int:pk>',Purchase_Order_DetailView(), name='purchase_order-actualizar-editar'),

    path('visits/', Tickets_Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('visits/<int:pk>',Tickets_Purchase_Order_DetailView(), name='purchase_order-actualizar-editar')

]