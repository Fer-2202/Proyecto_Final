from rest_framework import serializers # Importa el módulo serializers de Django para definir serializadores
from .models import Provinces # Importa el modelo Provinces del módulo models.py

# Provinces
class Provinces_Serializer(serializers.ModelSerializer):
    """ Serializador para el modelo Provinces """
    def validate_name(self, value):
        """ Valida que el nombre de la provincia no esté vacío """
        if not value:
            raise serializers.ValidationError("El nombre de la provincia no puede estar vacío.")
        return value # Retorna el valor validado
    class Meta:
        """ Define los metadatos del serializador Provinces_Serializer """
        model = Provinces # Modelo asociado al serializador
        fields = '__all__' # Incluye todos los campos del modelo en el serializador
        read_only_fields = ['id'] # Define los campos de solo lectura