from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthenticatedAndRole

# Models
from django.contrib.auth.models import User, Group
from .models import (
      Species, ConservationStatus,
    Tickets, Visits, PurchaseOrders, TicketsPurchaseOrder,
    Habitats, Animals, UserProfile, Payment, AuditLog
)

# Serializers
from .serializers import (
    RegisterSerializer, UserProfileSerializer, Species_Serializer, Conservation_Status_Serializer,
    Tickets_Serializer, Visits_Serializer, Purchase_Orders_Serializer,
    Tickets_Purchase_Orders_Serializer, Habitats_Serializer, Animals_Serializer,
    GroupSerializer, PaymentSerializer, GroupPermissionsSerializer, AuditLogSerializer
)

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

class Users_ListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticatedAndRole]
    required_role = 'admin'

class Users_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticatedAndRole]
    required_role = 'admin'

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedAndRole]

class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    lookup_field = 'user__id'
    lookup_url_kwarg = 'pk'
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedAndRole]

# ==================
# GROUPS
# ==================

class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

from django.contrib.auth.models import Permission

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

class GroupPermissionsView(generics.UpdateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupPermissionsSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

    def update(self, request, *args, **kwargs):
        group = self.get_object()
        serializer = self.get_serializer(group, data=request.data)
        serializer.is_valid(raise_exception=True)
        group.permissions.set(serializer.validated_data['permissions'])
        return Response(GroupSerializer(group).data)

# ==================
# SECTIONS / PROVINCES / SPECIES / STATUS
# ==================




class Species_ListCreateView(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Species_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Conservation_Status_ListCreateView(generics.ListCreateAPIView):
    queryset = ConservationStatus.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Conservation_Status_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConservationStatus.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]

# ==================
# TICKETS / VISITS / PURCHASE ORDERS / PAYMENTS
# ==================

class Tickets_ListCreateView(generics.ListCreateAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Tickets_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Visits_ListCreateView(generics.ListCreateAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Visits_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
    permission_classes = [IsAuthenticatedAndRole]

# Available Visits View (solo visitas con cupos)
class AvailableVisitsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        visits = Visits.objects.filter(occupied_slots__lt=models.F('total_slots'))
        serializer = Visits_Serializer(visits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Available Tickets View (puedes personalizarlo si agregas stock en el futuro)
class AvailableTicketsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = Tickets.objects.all()
        serializer = Tickets_Serializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Purchase Orders
class Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

# Payments
class Payment_ListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticatedAndRole]

class Payment_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticatedAndRole]

# Tickets Purchase Order
class Tickets_Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Tickets_Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

# ==================
# HABITATS / ANIMALS
# ==================

class Habitats_ListCreateView(generics.ListCreateAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Habitats_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Animals_ListCreateView(generics.ListCreateAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Animals_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

# ==================
# PASSWORD RESET VIEWS (FUNCIONALES)
# ==================

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

class AuditLogListView(generics.ListAPIView):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

class AuditLogDetailView(generics.RetrieveAPIView):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'

from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model

User = get_user_model()

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