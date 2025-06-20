from rest_framework import generics
from .models import Animals  # Importa el modelo Animals del módulo models.py
from .serializers import Animals_Serializer  # Importa el serializador Animals_Serializer
from api.permissions import IsAuthenticatedAndRole

class Animals_ListCreateView(generics.ListCreateAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Animals_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animals.objects.all()
    serializer_class = Animals_Serializer
    #permission_classes = [IsAuthenticatedAndRole]