from rest_framework import serializers
from .models import Species

class Species_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'