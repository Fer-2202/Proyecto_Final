from rest_framework.generics import *
from rest_framework.views import *
from rest_framework import generics
from .models import *
from .serializers import *
from django.contrib.auth import * #authenticate
from .permissions import IsAuthenticatedAndRole
from rest_framework.permissions import BasePermission


# Create your views here.

#Login
class Login_View(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Login successful'},
            status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'},
        status=status.HTTP_400_BAD_REQUEST)


#Logout
class Logout_View(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'},
        status=status.HTTP_200_OK)


#Forgot password
class Forgot_Password_View(APIView):
    def post(self, request):
        email = request.data.get('email')
        return Response({'message': 'Reset password functionality not yet implemented.'}, status=status.HTTP_200_OK)


#Reset password 
class Reset_Password_View(APIView):
    def posts(self, request, vidb64, token):
        return Response({'message': 'Reset password functionality not yet implemented.'}, status=status.HTTP_200_OK)


#Reset password confirm
class Reset_Password_Confirm_View(APIView):
    def post(self, request):
        return Response({'message': 'Reset password confirm functionality bot yet implement.'})


#Sections crear
class Sections_LisCreateView(generics.ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#editar,borrar "Sections"
class Section_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Provinces crear
class Provinces_ListCreateView(generics.ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    permission_classes = [IsAuthenticatedAndRole]
#borrar,editar "Provinces"
class Provinces_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    permission_classes = [IsAuthenticatedAndRole]


#Species
class Species_ListCreateView(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    permission_classes = [IsAuthenticatedAndRole]
#borrar,editar "Species"
class Species_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    permission_classes = [IsAuthenticatedAndRole]


#Conservation_Status
class Conservation_Status_ListCreateView(generics.ListCreateAPIView):
    queryset = Conservation_Status.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]
#borrar,editar "Conservation_Status"
class Conservation_Status_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Conservation_Status.objects.all()
    serializer_class = Conservation_Status_Serializer
    permission_classes = [IsAuthenticatedAndRole]


#User crear
class Users_ListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = User_Serializer
    permission_classes = [IsAuthenticatedAndRole]
    required_role = 'admin'
#borrar,editar "User"
class Users_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = User_Serializer
    permission_classes =[IsAuthenticatedAndRole]
    required_role = 'admin'


#Tickets
class Tickets_ListCreateView(generics.ListCreateAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#borrar,editar "Tickets"
class Tickets_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Visits
class Visits_ListCreateView(generics.ListCreateAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#borrar,editar "Visits"
class Visits_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Purchase_Order crear
class Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = Purchase_Orders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#borrar,editar "Purchase_Order"
class Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Purchase_Orders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Tickets_Purchase_Order
class Tickets_Purchase_Order_ListCreateView(generics.ListCreateAPIView):
    queryset = Tickets_Purchase_Order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#borrar,editar "Tickets_Purchase_Order"
class Tickets_Purchase_Order_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tickets_Purchase_Order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Habitats crear
class Habitats_ListCreateView(generics.ListCreateAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#editar,borrar "Habitats"
class Habitats_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Animal crear
class Animals_ListCreateView(generics.ListCreateAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    permission_classes =[IsAuthenticatedAndRole]
#editar,borrar "Animals"
class Animals_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    permission_classes =[IsAuthenticatedAndRole]


#Users_Profile
class Users_Profile_ListCreateView(generics.ListCreateAPIView):
    queryset = UsersProfile.objects.all()
    serializer_class = UsersProfile_Serializer
    permission_classes = [IsAuthenticatedAndRole]
#editar,borrar "Users_Profile"
class Users_Profile_DetialView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UsersProfile.objects.all()
    serializer_class = UsersProfile_Serializer
    permission_classes = [IsAuthenticatedAndRole]


#Group crear
class Roles_ListCreateView(ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = Group_Serializer
    permission_classes = [IsAuthenticatedAndRole]
    required_role = 'admin'
#borrar,editar "Group"
class Roles_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = Group_Serializer
    permission_classes = [IsAuthenticatedAndRole]
    required_role = 'admin'


#Autentificar el rol
class IsAuthenticatedAndRole(BasePermission):
#Le otorga el acceso de autentificarse 
    def has_permission(self, request, view):
        required_role = getattr(view,'required_role',None)
        if not request.user or not request.user.is_authenticated:
            return False
        if required_role is None:
            return True #Solo autemtificados y requeridos
        return request.user.groups.filter(name=required_role).exists()
    

class Register_View(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = Register_Serializers

class Group_ListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = Group_Serializer

class Group_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = Group_Serializer
