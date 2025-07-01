from rest_framework import viewsets
from .models import ProgramaEducativo, ProgramaItem
from .serializers import ProgramaEducativoSerializer, ProgramaItemSerializer

class ProgramaEducativoViewSet(viewsets.ModelViewSet):
    queryset = ProgramaEducativo.objects.all()
    serializer_class = ProgramaEducativoSerializer
    

class ProgramaItemViewSet(viewsets.ModelViewSet):
    queryset = ProgramaItem.objects.all()
    serializer_class = ProgramaItemSerializer