from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthenticatedAndRole
from .species.models import Species
from .sections.models import Sections
from .provinces.models import Provinces
from .tickets.models import Tickets
from .purchase_orders.models import PurchaseOrders
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model



from .purchase_orders.serializers import Purchase_Orders_Serializer
from .tickets.serializers import Tickets_Serializer

# Models
from django.contrib.auth.models import User, Group
from .models import (
     Visits, TicketsPurchaseOrder,
    Habitats
)

# Serializers
from .serializers import (
    Visits_Serializer,
    Tickets_Purchase_Orders_Serializer, 
    Habitats_Serializer
)

User = get_user_model()


# ==================
#  / STATUS
# ==================




# ==================
# TICKETS / VISITS / PURCHASE ORDERS / PAYMENTS
# ==================



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
  visits = []
  for visit in Visits.objects.all():
   if visit.occupied_slots < visit.total_slots:
    visits.append(visit)
  serializer = Visits_Serializer(visits, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# Available Tickets View (puedes personalizarlo si agregas stock en el futuro)
class AvailableTicketsView(APIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = Tickets.objects.all()
        serializer = Tickets_Serializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Purchase Orders
class Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]


# Tickets Purchase Order
class Tickets_Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Tickets_Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

# ==================
# HABITATS / ANIMALS
# ==================

class Habitats_ListCreateView(generics.ListCreateAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Habitats_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    #permission_classes = [IsAuthenticatedAndRole]


# ==================
# PASSWORD RESET VIEWS (FUNCIONALES)
# ==================

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes




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