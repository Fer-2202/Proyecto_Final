from rest_framework import viewsets
from .serializers import Tickets_Purchase_Orders_Serializer
from .models import TicketsPurchaseOrder
from api.permissions import IsAuthenticatedAndRole


# Tickets Purchase Order
class Tickets_Purchase_Order_ViewSet(viewsets.ModelViewSet):
    queryset = TicketsPurchaseOrder.objects.all()
    serializer_class = Tickets_Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'