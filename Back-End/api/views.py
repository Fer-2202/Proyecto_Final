from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import *
from .serializers import *

# Create your views here.


#Roles crear
class Roles_ListCreateView(ListCreateAPIView):
    queryset = roles.objects.all()
    serializer_class = Roles_Serializer

#borrar,editar "Roles"
class Roles_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = roles.objects.all()
    serializer_class = Roles_Serializer


#provinces crear
class Provinces_ListCreateView(ListCreateAPIView):
    queryset = provinces.objects.all()
    serializer_class = Provinces_Serializer

#borrar,editar "provinces"
class Provinces_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = provinces.objects.all()
    serializer_class = Provinces_Serializer


#User crear
class Users_ListCreateView(ListCreateAPIView):
    queryset = users.objects.all()
    serializer_class = Users_Serializer

#borrar,editar "User"
class Users_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = users.objects.all()
    serializer_class = Users_Serializer


#Visits
class Tickets_ListCreateView(ListCreateAPIView):
    queryset = tickets.objects.all()
    serializer_class = Tickets_Serializer

#borrar,editar "tickets"
class Tickets_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = tickets.objects.all()
    serializer_class = Tickets_Serializer


#Visits
class Visits_ListCreateView(ListCreateAPIView):
    queryset = visits.objects.all()
    serializer_class = Visits_Serializer

#borrar,editar "visits"
class Visits_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = visits.objects.all()
    serializer_class = Visits_Serializer


#purchase_order crear
class Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = purchase_orders.objects.all()
    serializer_class = Purchase_Orders_Serializer

#borrar,editar "purchase_order"
class Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = purchase_orders.objects.all()
    serializer_class = Purchase_Orders_Serializer


#tickets_purchase_order
class   Tickets_Purchase_Order_ListCreateView(ListCreateAPIView):
    queryset = tickets_purchase_order.objects.all()
    serializer_class = tickets_purchase_order

#borrar,editar "tickets_purchase_order"
class Tickets_Purchase_Order_DetailView(RetrieveUpdateDestroyAPIView):
    queryset = tickets_purchase_order.objects.all()
    serializer_class = tickets_purchase_order