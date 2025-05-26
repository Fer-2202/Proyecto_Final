from .models import *

from rest_framework import serializers

#sections
class Sections_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Sections
        fields= '__all__'


#Roles
class Roles_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Roles
        fields= '__all__'


#Provincias
class Provinces_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Provinces
        fields= '__all__'


#species
class Species_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Species
        fields= '__all__'


#conservation_status
class Conservation_Status_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Conservation_Status
        fields= '__all__'


#User
class Users_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Users
        fields= '__all__'


#Tickets
class Tickets_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Tickets
        fields= '__all__'


#visits
class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Visits
        fields= '__all__'


#purchase_orders
class Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta: 
        model= Purchase_Orders
        fields= '__all__'


#tickets_purchase_order
class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Tickets_Purchase_Order
        fields= '__all__'


#habitats
class Habitats_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Habitats
        fields= '__all__'


#animals
class Animals_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Animals
        fields= '__all__'