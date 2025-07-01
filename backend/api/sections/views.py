from rest_framework import viewsets
from .models import Sections
from .serializers import SectionsSerializer
from api.permissions import IsAuthenticatedAndRole

class SectionsViewSet(viewsets.ModelViewSet):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = ['admin', 'manager']