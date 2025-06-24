from api.apiLog.models import AuditLog
from api.apiLog.serializers import AuditLogSerializer
from rest_framework import viewsets
from api.permissions import IsAuthenticatedAndRole

class AuditLogViewSet(viewsets.ModelViewSet):
  queryset = AuditLog.objects.all()
  serializer_class = AuditLogSerializer
  #permission_classes = [IsAuthenticatedAndRole]
  http_method_names = ['get', 'post', 'put', 'delete']
  #required_role = 'admin'

