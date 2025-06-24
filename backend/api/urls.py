from django.urls import path, include
from .views import AvailableTicketsView, Visits_ListCreateView, Visits_DetailView, AvailableVisitsView, Tickets_Purchase_Order_ListCreateView,  Tickets_Purchase_Order_DetailView, Habitats_ListCreateView, Habitats_DetailView


urlpatterns = [
 
    # Animales
    path('animals/', include('api.animales.urls')),

    # Secciones
    path('sections/', include('api.sections.urls')),

    # Provincias
    path('provinces/', include('api.provinces.urls')),

    # Especies
    path('species/', include('api.species.urls')),
    
    # Exhibiciones
    path('exhibiciones/', include('api.exhibiciones.urls')),
    
    # Servicios Educativos
    path('servicios_educativos/', include('api.servicios-educativos.urls')),
    
    # Programas Educativos
    path('programas_educativos/', include('api.programas-educativos.urls')),

    # Estado de conservacion
    path('conservation_status/', include('api.conservation_status.urls')),

    # Tickets
    path('tickets/', include('api.tickets.urls')),

    # Available Tickets
    path('tickets/available/', AvailableTicketsView.as_view(), name='tickets-available'),

    # Visitas
    path('visits/', Visits_ListCreateView.as_view(), name='visits-lista'),
    path('visits/<int:pk>/', Visits_DetailView.as_view(), name='visits-actualizar-editar'),

    # Available Visits
    path('visits/available/', AvailableVisitsView.as_view(), name='visits-available'),

    # Ordenes de Compra
    path('purchase_orders/', include('api.purchase_orders.urls')),

    # Tickets Orden de Compra
    path('tickets_purchase_order/', Tickets_Purchase_Order_ListCreateView.as_view(), name='tickets_purchase_order-lista'),
    path('tickets_purchase_order/<int:pk>/', Tickets_Purchase_Order_DetailView.as_view(), name='tickets_purchase_order-actualizar-editar'),

    # Pagos
    path('payments/', include('api.payments.urls')),
    # Habitats
    path('habitats/', Habitats_ListCreateView.as_view(), name='habitats-lista'),
    path('habitats/<int:pk>/', Habitats_DetailView.as_view(), name='habitats-actualizar-editar'),

    # Auth
    path('auth/', include('api.auth.urls')),



    # Audit Log
    path('audit_log/', include('api.apiLog.urls'))

]
