from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer

urlpatterns = [

    # Secciones
    path('sections/',Sections_LisCreateView.as_view(), name='sections-lista'),
    path('sections/<int:pk>/',Section_DetailView.as_view(), name='sections-actualizar-editar'),

    #Provincias
    path('provinces/', Provinces_ListCreateView.as_view(), name='provinces-lista'),
    path('provinces/<int:pk>/',Provinces_DetailView.as_view(), name='provinces-actualizar-editar'),

    #Especies
    path('species/', Species_ListCreateView.as_view(), name='species-lista'),
    path('species/<int:pk>/',Species_DetailView.as_view(), name='species-actualizar-editar'),

    #Estado de conservacion
    path('conservation_status/', Conservation_Status_ListCreateView.as_view(), name='conservation_status-lista'),
    path('conservation_status/<int:pk>/',Conservation_Status_DetailView.as_view(), name='conservation_status-actualizar-editar'),

    #Usuarios
    path('users/', Users_ListCreateView.as_view(), name='users-lista'),
    path('users/<int:pk>/',Users_DetailView.as_view(), name='users-actualizar-editar'),

    #Tickets
    path('tickets/', Tickets_ListCreateView.as_view(), name='tickets-lista'),
    path('tickets/<int:pk>/',Tickets_DetailView.as_view(), name='tickets-actualizar-editar'),
    
    #Visitas
    path('visits/', Visits_ListCreateView.as_view(), name='visits-lista'),
    path('visits/<int:pk>/',Visits_DetailView.as_view(), name='visits-actualizar-editar'),

    #Roles
    path('purchase_order/', Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('purchase_order/<int:pk>/',Purchase_Order_DetailView.as_view(), name='purchase_order-actualizar-editar'),

    #Tickets Orden de Compra
    path('tickets_purchase_order/', Tickets_Purchase_Order_ListCreateView.as_view(), name='tickets_purchase_order-lista'),
    path('tickets_purchase_order/<int:pk>/',Tickets_Purchase_Order_DetailView.as_view(), name='tickets_purchase_order-actualizar-editar'),
    
    #Habitats
    path('habitats/', Habitats_ListCreateView.as_view(), name='habitats-lista'),
    path('habitats/<int:pk>/',Habitats_DetailView.as_view(), name='habitats-actualizar-editar'),
    
    #Animales
    path('animals/', Animals_ListCreateView.as_view(), name='animals-lista'),
    path('animals/<int:pk>/',Animals_DetailView.as_view(), name='animals-actualizar-editar'),
    
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
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('reset-password-confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),
    # Roles (Groups)
    path('roles/', GroupListCreateView.as_view(), name='roles-lista'),
    path('roles/<int:pk>/', GroupDetailView.as_view(), name='roles-detalle'),
    
]