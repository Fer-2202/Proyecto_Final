from rest_framework import viewsets
from .models import Animals  # Importa el modelo Animals del módulo models.py
from .serializers import Animals_Serializer  # Importa el serializador Animals_Serializer
from api.permissions import IsAuthenticatedAndRole

class Animals_ViewSet(viewsets.ModelViewSet):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = 'admin'