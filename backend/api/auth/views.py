from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from api.permissions import IsAuthenticatedAndRole
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

# Models
from django.contrib.auth.models import User, Group
from .models import (
    UserProfile
)

# Serializers
from .serializers import (
    RegisterSerializer, UserProfileSerializer,
    GroupSerializer,  GroupPermissionsSerializer
)

User = get_user_model()

# ==================
# AUTHENTICATION VIEWS
# ==================

class LoginView(APIView):
    def post(self, request):
        identifier = request.data.get('username')
        password = request.data.get('password')
        user = None

        try:
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                try:
                    profile = UserProfile.objects.get(user__email=identifier)
                    user = profile.user
                except UserProfile.DoesNotExist:
                    user = None

        if user and user.check_password(password):
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# ==================
# USERS / PROFILES
# ==================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class Users_ViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    lookup_field = 'user__id'
    lookup_url_kwarg = 'pk'

    def get_object(self):
        """Override to get profile by user ID"""
        user_id = self.kwargs.get('pk')
        try:
            user = User.objects.get(id=user_id)
            profile, created = UserProfile.objects.get_or_create(user=user)
            return profile
        except User.DoesNotExist:
            return None

    def retrieve(self, request, *args, **kwargs):
        """Get user profile by user ID"""
        profile = self.get_object()
        if not profile:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """Update user profile by user ID"""
        profile = self.get_object()
        if not profile:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CurrentUserProfileView(APIView):
    """View for getting and updating the current user's profile"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get current user's profile"""
        try:
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request):
        """Update current user's profile"""
        try:
            print('request.data:', request.data)
            print('request.FILES:', request.FILES)
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            import traceback
            print('ERROR EN PERFIL:')
            traceback.print_exc()  # Esto imprime el traceback completo en la terminal
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ==================
# GROUPS
# ==================
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

class GroupPermissionsViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupPermissionsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

    def update(self, request, *args, **kwargs):
        group = self.get_object()
        serializer = self.get_serializer(group, data=request.data)
        serializer.is_valid(raise_exception=True)
        group.permissions.set(serializer.validated_data['permissions'])
        return Response(GroupSerializer(group).data)


# ==================
# PASSWORD RESET VIEWS (FUNCIONALES)
# ==================
class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'No user found with this email.'}, status=status.HTTP_400_BAD_REQUEST)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = f"/reset-password-confirm/?uid={uid}&token={token}"

        return Response({
            'message': 'Password reset link generated.',
            'reset_link': reset_link,
            'uid': uid,
            'token': token
        }, status=status.HTTP_200_OK)

class ResetPasswordConfirmView(APIView):
    def post(self, request):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not uidb64 or not token or not new_password:
            return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)