from rest_framework import serializers
from .models import Provinces

# Provinces
class Provinces_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Provinces
        fields = '__all__'