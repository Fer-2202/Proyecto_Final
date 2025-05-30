from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework import generics
from django.contrib.auth import authenticate, login, logout
from .models import Sections, Provinces, Species, ConservationStatus, Tickets, Visits, PurchaseOrders, TicketsPurchaseOrder, Habitats, Animals
from .serializers import Sections_Serializer, Provinces_Serializer, Species_Serializer, Conservation_Status_Serializer, Tickets_Serializer, Visits_Serializer, Purchase_Orders_Serializer, Tickets_Purchase_Orders_Serializer, Habitats_Serializer, Animals_Serializer
from django.contrib.auth.models import Group
from .serializers import GroupSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated
from .permissions import IsAuthenticatedAndRole

# Login View
class LoginView(APIView):
    def post(self, request):
        identifier = request.data.get('username')
        password = request.data.get('password')
        user = None
        # Try to authenticate by username or User.email
        try:
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                # Try secondary email in UserProfile
                try:
                    profile = UserProfile.objects.get(email=identifier)
                    user = profile.user
                except UserProfile.DoesNotExist:
                    user = None
        if user and user.check_password(password):
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Logout View
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# Forgot Password (Placeholder)
class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        
        return Response({'message': 'Forgot password functionality not yet implemented.'}, status=status.HTTP_200_OK)

# Reset Password View (Placeholder)
class ResetPasswordView(APIView):
    def post(self, request, uidb64, token):
        return Response({'message': 'Reset password functionality not yet implemented.'}, status=status.HTTP_200_OK)

# Reset Password Confirm View (Placeholder)
class ResetPasswordConfirmView(APIView):
    def post(self, request):
        return Response({'message': 'Reset password confirm functionality not yet implemented.'}, status=status.HTTP_200_OK)

# vista 
class Sections_LisCreateView(generics.ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Section_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Provinces_ListCreateView(generics.ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    

class Provinces_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Species_ListCreateView(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Species_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Conservation_Status_ListCreateView(generics.ListCreateAPIView):
    queryset = ConservationStatus.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Conservation_Status_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConservationStatus.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]

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

class Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Tickets_Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class Tickets_Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes = [IsAuthenticatedAndRole]

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
    permission_classes = [IsAuthenticatedAndRole]

class Animals_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    permission_classes = [IsAuthenticatedAndRole]

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedAndRole]

class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedAndRole]

class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer