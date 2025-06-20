from rest_framework import serializers
from .models import PurchaseOrders

class Purchase_Orders_Serializer(serializers.ModelSerializer):
    payment = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseOrders
        fields = '__all__'