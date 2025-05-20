from django.urls import path
from .views import *

urlpatterns = [

    path('sections/',Sections_LisCreateView.as_view(), name='sections-lista'),
    path('sections/<int:pk>',Section_DetailView.as_view(), name='sections-actualizar-editar'),

    path('roles/', Roles_ListCreateView.as_view(), name='roles-lista'),
    path('roles/<int:pk>',Roles_DetailView.as_view(), name='roles-actualizar-editar'),

    path('provinces/', Provinces_ListCreateView.as_view(), name='provinces-lista'),
    path('provinces/<int:pk>',Provinces_DetailView.as_view(), name='provinces-actualizar-editar'),

    path('species/', Species_ListCreateView.as_view(), name='species-lista'),
    path('species/<int:pk>',Species_DetailView.as_view(), name='species-actualizar-editar'),

    path('conservation_status/', Conservation_Status_ListCreateView.as_view(), name='conservation_status-lista'),
    path('conservation_status/<int:pk>',Conservation_Status_DetailView.as_view(), name='conservation_status-actualizar-editar'),

    path('users/', Users_ListCreateView.as_view(), name='users-lista'),
    path('users/<int:pk>',Users_DetailView.as_view(), name='users-actualizar-editar'),

    path('tickets/', Tickets_ListCreateView.as_view(), name='tickets-lista'),
    path('tickets/<int:pk>',Tickets_DetailView.as_view(), name='tickets-actualizar-editar'),
    
    path('visits/', Visits_ListCreateView.as_view(), name='visits-lista'),
    path('visits/<int:pk>',Visits_DetailView.as_view(), name='visits-actualizar-editar'),

    path('purchase_order/', Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('purchase_order/<int:pk>',Purchase_Order_DetailView.as_view(), name='purchase_order-actualizar-editar'),

    path('tickets_purchase_order/', Tickets_Purchase_Order_ListCreateView.as_view(), name='tickets_purchase_order-lista'),
    path('tickets_purchase_order/<int:pk>',Tickets_Purchase_Order_DetailView.as_view(), name='tickets_purchase_order-actualizar-editar'),
    
    path('habitats/', Habitats_ListCreateView.as_view(), name='habitats-lista'),
    path('habitats/<int:pk>',Habitats_DetailView.as_view(), name='habitats-actualizar-editar'),
    
    path('animals/', Animals_ListCreateView.as_view(), name='animals-lista'),
    path('animals/<int:pk>',Animals_DetailView.as_view(), name='animals-actualizar-editar'),

]