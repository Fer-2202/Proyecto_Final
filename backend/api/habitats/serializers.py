from .models import Habitats
from rest_framework import serializers


class Habitats_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Habitats
        fields = '__all__'