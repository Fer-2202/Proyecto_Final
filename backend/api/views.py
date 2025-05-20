from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import *
from .serializers import *

# Create your views here.

#Sections crear
class Sections_LisCreateView(ListCreateAPIView):
    queryset = sections.objects.all()
    serializer_class = Sections_Serializer

#editar,borrar "Sections"
class Section_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = sections.objects.all()
    serializer_class = Sections_Serializer


#Roles crear
class Roles_ListCreateView(ListCreateAPIView):
    queryset = roles.objects.all()
    serializer_class = Roles_Serializer

#borrar,editar "Roles"
class Roles_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = roles.objects.all()
    serializer_class = Roles_Serializer


#Provinces crear
class Provinces_ListCreateView(ListCreateAPIView):
    queryset = provinces.objects.all()
    serializer_class = Provinces_Serializer

#borrar,editar "Provinces"
class Provinces_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = provinces.objects.all()
    serializer_class = Provinces_Serializer


#species
class Species_ListCreateView(ListCreateAPIView):
    queryset = species.objects.all()
    serializer_class = Species_Serializer

#borrar,editar "Species"
class Species_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = species.objects.all()
    serializer_class = Species_Serializer


#Conservation_Status
class Conservation_Status_ListCreateView(ListCreateAPIView):
    queryset = conservation_status.objects.all()
    serializer_class = Conservation_Status_Serializer

#borrar,editar "Conservation_Status"
class Conservation_Status_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = conservation_status.objects.all()
    serializer_class = Conservation_Status_Serializer


#User crear
class Users_ListCreateView(ListCreateAPIView):
    queryset = users.objects.all()
    serializer_class = Users_Serializer

#borrar,editar "User"
class Users_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = users.objects.all()
    serializer_class = Users_Serializer


#Tickets
class Tickets_ListCreateView(ListCreateAPIView):
    queryset = tickets.objects.all()
    serializer_class = Tickets_Serializer

#borrar,editar "Tickets"
class Tickets_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = tickets.objects.all()
    serializer_class = Tickets_Serializer


#Visits
class Visits_ListCreateView(ListCreateAPIView):
    queryset = visits.objects.all()
    serializer_class = Visits_Serializer

#borrar,editar "Visits"
class Visits_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = visits.objects.all()
    serializer_class = Visits_Serializer


#Purchase_Order crear
class Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = purchase_orders.objects.all()
    serializer_class = Purchase_Orders_Serializer

#borrar,editar "Purchase_Order"
class Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = purchase_orders.objects.all()
    serializer_class = Purchase_Orders_Serializer


#Tickets_Purchase_Order
class Tickets_Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = tickets_purchase_order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer

#borrar,editar "Tickets_Purchase_Order"
class Tickets_Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = tickets_purchase_order.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer


#Habitats crear
class Habitats_ListCreateView(ListCreateAPIView):
    queryset = habitats.objects.all()
    serializer_class = Habitats_Serializer
    
#Habitats editar,eliminar
class Habitats_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = habitats.objects.all()
    serializer_class = Habitats_Serializer


#Animal crear
class Animals_ListCreateView(ListCreateAPIView):
    queryset = animals.objects.all()
    serializer_class = Animals_Serializer

#editar,borrar "Animals"
class Animals_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = animals.objects.all()
    serializer_class = Animals_Serializer