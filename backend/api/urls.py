from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    #Sections
    path('sections/',Sections_LisCreateView.as_view(), name='sections-lista'),
    path('sections/<int:pk>',Section_DetailView.as_view(), name='sections-actualizar-editar'),

    #Provinces
    path('provinces/', Provinces_ListCreateView.as_view(), name='provinces-lista'),
    path('provinces/<int:pk>',Provinces_DetailView.as_view(), name='provinces-actualizar-editar'),

    #Species
    path('species/', Species_ListCreateView.as_view(), name='species-lista'),
    path('species/<int:pk>',Species_DetailView.as_view(), name='species-actualizar-editar'),

    #Conservation_Status
    path('conservation_status/', Conservation_Status_ListCreateView.as_view(), name='conservation_status-lista'),
    path('conservation_status/<int:pk>',Conservation_Status_DetailView.as_view(), name='conservation_status-actualizar-editar'),

    #Users
    path('users/', Users_ListCreateView.as_view(), name='users-lista'),
    path('users/<int:pk>',Users_DetailView.as_view(), name='users-actualizar-editar'),

    #Tickets
    path('tickets/', Tickets_ListCreateView.as_view(), name='tickets-lista'),
    path('tickets/<int:pk>',Tickets_DetailView.as_view(), name='tickets-actualizar-editar'),

    #Visits
    path('visits/', Visits_ListCreateView.as_view(), name='visits-lista'),
    path('visits/<int:pk>',Visits_DetailView.as_view(), name='visits-actualizar-editar'),

    #Purchase_Order
    path('purchase_order/', Purchase_Order_ListCreateView.as_view(), name='purchase_order-lista'),
    path('purchase_order/<int:pk>',Purchase_Order_DetailView.as_view(), name='purchase_order-actualizar-editar'),

    #Tickets_Purchase_Order
    path('tickets_purchase_order/', Tickets_Purchase_Order_ListCreateView.as_view(), name='tickets_purchase_order-lista'),
    path('tickets_purchase_order/<int:pk>',Tickets_Purchase_Order_DetailView.as_view(), name='tickets_purchase_order-actualizar-editar'),

    #Habitats
    path('habitats/', Habitats_ListCreateView.as_view(), name='habitats-lista'),
    path('habitats/<int:pk>',Habitats_DetailView.as_view(), name='habitats-actualizar-editar'),

    #Animals
    path('animals/', Animals_ListCreateView.as_view(), name='animals-lista'),
    path('animals/<int:pk>',Animals_DetailView.as_view(), name='animals-actualizar-editar'),

    #PerfilUsers
    path('user_porfile/', Users_Profile_ListCreateView.as_view(), name='user_profile-list-create'),
    path('user_profile/<int:pk>', Users_Profile_DetialView.as_view()),

    #Autenticacion y registro
    path('token/', TokenObtainPairView.as_view(serializer_class=Custom_TokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', Register_View.as_view(), name='register'),

    #Login y Logout
    path('login/', Login_View.as_view(), name='login'),
    path('logout', Logout_View.as_view(), name='logout'),

    #Password y Reset
    path('forgot-password/', Forgot_Password_View.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', Reset_Password_View.as_view(), name='reset_password'),
    path('reset-password-confirm/', Reset_Password_Confirm_View.as_view(), name='reset_password_confirm'),

    # Roles (Groups)
    path('roles/', Group_ListCreateView.as_view(), name='roles-lista'),
    path('roles/<int:pk>/', Group_DetailView.as_view(), name='roles-detalle'),
]