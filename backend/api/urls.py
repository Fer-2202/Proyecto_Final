from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer

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
    path('servicios-educativos/', include('api.servicios-educativos.urls')),
    
    # Programas Educativos
    path('programas-educativos/', include('api.programas-educativos.urls')),

    # Estado de conservacion
    path('conservation_status/', Conservation_Status_ListCreateView.as_view(), name='conservation_status-lista'),
    path('conservation_status/<int:pk>/', Conservation_Status_DetailView.as_view(), name='conservation_status-actualizar-editar'),

    # Usuarios
    path('users/', Users_ListCreateView.as_view(), name='users-lista'),
    path('users/<int:pk>/', Users_DetailView.as_view(), name='users-actualizar-editar'),

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
    path('purchase_order/', Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('purchase_order/<int:pk>/', Purchase_Order_DetailView.as_view(), name='purchase_order-actualizar-editar'),

    # Tickets Orden de Compra
    path('tickets_purchase_order/', Tickets_Purchase_Order_ListCreateView.as_view(), name='tickets_purchase_order-lista'),
    path('tickets_purchase_order/<int:pk>/', Tickets_Purchase_Order_DetailView.as_view(), name='tickets_purchase_order-actualizar-editar'),

    # Pagos
    path('payments/', Payment_ListCreateView.as_view(), name='payment-lista'),
    path('payments/<int:pk>/', Payment_DetailView.as_view(), name='payment-detalle'),

    # Habitats
    path('habitats/', Habitats_ListCreateView.as_view(), name='habitats-lista'),
    path('habitats/<int:pk>/', Habitats_DetailView.as_view(), name='habitats-actualizar-editar'),

    # Perfil de usuario
    path('user_profile/', UserProfileListCreateView.as_view(), name='user_profile-list-create'),
    path('user_profile/<int:pk>/', UserProfileDetailView.as_view(), name='user_profile-detail'),

    # Autenticacion y registro
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),

    # Login/Logout
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Password Reset
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password-confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),


    # Roles (Groups)
    path('roles/', GroupListCreateView.as_view(), name='roles-lista'),
    path('roles/<int:pk>/', GroupDetailView.as_view(), name='roles-detalle'),
    path('roles/<int:pk>/permissions/', GroupPermissionsView.as_view(), name='roles-permissions'),

    # Audit Log
    path('audit_logs/', AuditLogListView.as_view(), name='audit_log-list'),
    path('audit_logs/<int:pk>/', AuditLogDetailView.as_view(), name='audit_log-detail'),

]
