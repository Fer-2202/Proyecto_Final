from .models import *

from rest_framework import serializers

#User
class Users_Serializer(serializers.ModelSerializer):
    class Meta:
        model= users
        fields = '__all__'


#Provincias
class Provinces_Serializer(serializers.ModelSerializer):
    class Meta:
        model= provinces
        fields= '__all__'


#Roles
class Roles_Serializer(serializers.ModelSerializer):
    class Meta:
        model= roles
        fields= '__all__'


#Tickets
class Tickets_Serializer(serializers.ModelSerializer):
    class Meta:
        model= tickets
        fields = '__all__'


#purchase_orders
class Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta: 
        model= purchase_orders
        fields = '__all__'


#visits
class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model= visits
        fields = '__all__'


#tickets_purchase_order
class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model= tickets_purchase_order
        fields = '__all__'




