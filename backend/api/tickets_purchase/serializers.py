from .models import TicketsPurchaseOrder
from rest_framework import serializers

class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model = TicketsPurchaseOrder
        fields = '__all__'
