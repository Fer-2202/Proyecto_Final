from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

# Sections



# Species


# Conservation Status


# Tickets


# Visits
class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = '__all__'



# Purchase Orders (actualizado con Payment anidado)


# Tickets Purchase Order
class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model = TicketsPurchaseOrder
        fields = '__all__'

# Habitats
class Habitats_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Habitats
        fields = '__all__'

# Animals


# UserProfile Serializer


# Register Serializer


# Profile Serializer


# UserSerializer con Profile opcional



# Custom Token Serializer


# Group Serializer


# Group Permissions Serializer

