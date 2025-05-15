from .models import users

from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model= users
        fields = '__all__'
