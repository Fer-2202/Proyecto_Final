from .models import Visits
from rest_framework import serializers


class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = '__all__'