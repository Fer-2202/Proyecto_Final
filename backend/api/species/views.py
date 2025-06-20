from rest_framework import generics
from .models import Species
from .serializers import Species_Serializer
from api.permissions import IsAuthenticatedAndRole


class Species_ListCreateView(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Species_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = Species_Serializer
    #permission_classes = [IsAuthenticatedAndRole]