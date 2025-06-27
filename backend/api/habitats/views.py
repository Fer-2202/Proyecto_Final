from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .models import Habitats
from .serializers import Habitats_Serializer

class Habitats_ViewSet(viewsets.ModelViewSet):
    queryset = Habitats.objects.all()
    serializer_class = Habitats_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'