from rest_framework import serializers
from .models import Tickets

# Tickets Serializer
class Tickets_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Tickets
        fields = '__all__'