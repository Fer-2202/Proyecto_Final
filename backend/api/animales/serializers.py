from rest_framework import serializers # Importa el módulo serializers de Django para definir serializadores
from .models import Animals # Importa el modelo Animals del módulo models.py

class Animals_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Animals
        fields = '__all__'
        
    def validar_campos(self, validated_data):
        """
        Valida los campos del modelo Animals.
        """
        # Aquí puedes agregar validaciones específicas para los campos del modelo
        if validated_data.get('age') < 0:
            raise serializers.ValidationError("La edad no puede ser negativa.")
        if not validated_data.get('name'):
            raise serializers.ValidationError("El nombre del animal es obligatorio.")
        if not validated_data.get('species'):
            raise serializers.ValidationError("La especie del animal es obligatoria.")
        if not validated_data.get('conservation_status'):
            raise serializers.ValidationError("El estado de conservación del animal es obligatorio.")
        if not validated_data.get('habitat'):
            raise serializers.ValidationError("El hábitat del animal es obligatorio.")
        if not validated_data.get('description'):
            raise serializers.ValidationError("La descripción del animal es obligatoria.")
        if not validated_data.get('image'):
            raise serializers.ValidationError("La imagen del animal es obligatoria.")
        
        return validated_data