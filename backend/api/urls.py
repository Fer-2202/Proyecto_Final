from django.urls import path, include



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

    # Visitas
    path('visits/', include('api.visits.urls')),

    # Ordenes de Compra
    path('purchase_orders/', include('api.purchase_orders.urls')),

    # Tickets Orden de Compra
    path('tickets_purchase_order/', include('api.tickets_purchase.urls')),

    # Pagos
    path('payments/', include('api.payments.urls')),

    # Habitats
    path('habitats/', include('api.habitats.urls')),

    # Auth
    path('auth/', include('api.auth.urls')),

    # Audit Log
    path('audit_log/', include('api.apiLog.urls')),

    # Documentos
    path('documents/', include('api.documentos.urls'))

]