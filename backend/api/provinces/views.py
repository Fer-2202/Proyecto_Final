from rest_framework import generics
from .models import Provinces
from .serializers import Provinces_Serializer
from api.permissions import IsAuthenticatedAndRole

class Provinces_ListCreateView(generics.ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer

class Provinces_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    permission_classes = [IsAuthenticatedAndRole]