from rest_framework import viewsets
from .serializers import Conservation_Status_Serializer
from .models import ConservationStatus
from api.permissions import IsAuthenticatedAndRole

# ==================
#  / STATUS
# ==================

class Conservation_Status_ViewSet(viewsets.ModelViewSet):
    queryset = ConservationStatus.objects.all()
    serializer_class = Conservation_Status_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'


