from rest_framework import serializers # Importa el módulo serializers de Django para definir serializadores
from .models import Animals # Importa el modelo Animals del módulo models.py

class Animals_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Animals
        fields = '__all__'