from django.urls import path
from .views import UserProfileListCreateView, UserProfileDetailView, Users_ListCreateView, Users_DetailView, LoginView, LogoutView, ForgotPasswordView, ResetPasswordConfirmView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer

urlpatterns = [

    # Perfil de usuario
    path('user_profile/', UserProfileListCreateView.as_view(), name='user_profile-list-create'),
    path('user_profile/<int:pk>/', UserProfileDetailView.as_view(), name='user_profile-detail'),

    # Autenticacion y registro
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Login/Logout
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Password Reset
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password-confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),

]
