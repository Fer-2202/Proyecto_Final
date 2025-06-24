from .models import ConservationStatus
from rest_framework import serializers

# Conservation Status
class Conservation_Status_Serializer(serializers.ModelSerializer):
    class Meta:
        model = ConservationStatus
        fields = '__all__'