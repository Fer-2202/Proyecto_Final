from rest_framework import serializers
from .models import Payments

# Payment (nuevo serializer)
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'