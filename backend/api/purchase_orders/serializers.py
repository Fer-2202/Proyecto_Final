from rest_framework import serializers
from .models import PurchaseOrders
from api.payments.serializers import PaymentSerializer

class Purchase_Orders_Serializer(serializers.ModelSerializer):
    payment = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseOrders
        fields = '__all__'

    def get_payment(self, obj):
        if hasattr(obj, 'payment'):
            return PaymentSerializer(obj.payment).data
        return None