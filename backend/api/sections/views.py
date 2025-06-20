from rest_framework import generics
from .models import Sections
from .serializers import SectionsSerializer
from api.permissions import IsAuthenticatedAndRole

class SectionsListCreateView(generics.ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = ['admin', 'manager']
    

class SectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    #permission_classes = [IsAuthenticatedAndRole]
    #required_role = ['admin', 'manager']