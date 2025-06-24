from rest_framework import viewsets
from .models import Species
from .serializers import Species_Serializer
from api.permissions import IsAuthenticatedAndRole


class Species_ViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
