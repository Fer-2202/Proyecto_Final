from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import *
from .serializers import *

# Create your views here.

#Sections crear
class Sections_LisCreateView(ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer
#editar,borrar "Sections"
class Section_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = Sections_Serializer


#Roles crear
class Roles_ListCreateView(ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = Roles_Serializer
#borrar,editar "Roles"
class Roles_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Roles.objects.all()
    serializer_class = Roles_Serializer


#Provinces crear
class Provinces_ListCreateView(ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
#borrar,editar "Provinces"
class Provinces_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer


#species
class Species_ListCreateView(ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
#borrar,editar "Species"
class Species_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer


#Conservation_Status
class Conservation_Status_ListCreateView(ListCreateAPIView):
    queryset = Conservation_Status.objects.all()
    serializer_class = Conservation_Status_Serializer
#borrar,editar "Conservation_Status"
class Conservation_Status_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Conservation_Status.objects.all()
    serializer_class = Conservation_Status_Serializer


#User crear
class Users_ListCreateView(ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = Users_Serializer
#borrar,editar "User"
class Users_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = Users_Serializer


#Tickets
class Tickets_ListCreateView(ListCreateAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
#borrar,editar "Tickets"
class Tickets_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer


#Visits
class Visits_ListCreateView(ListCreateAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
#borrar,editar "Visits"
class Visits_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer


#Purchase_Order crear
class Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = Purchase_Orders.objects.all()
    serializer_class = Purchase_Orders_Serializer
#borrar,editar "Purchase_Order"
class Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Purchase_Orders.objects.all()
    serializer_class = Purchase_Orders_Serializer


#Tickets_Purchase_Order
class Tickets_Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = Tickets_Purchase_Order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
#borrar,editar "Tickets_Purchase_Order"
class Tickets_Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Tickets_Purchase_Order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer


#Habitats crear
class Habitats_ListCreateView(ListCreateAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer 
#editar,borrar "Habitats"
class Habitats_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer


#Animal crear
class Animals_ListCreateView(ListCreateAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
#editar,borrar "Animals"
class Animals_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer