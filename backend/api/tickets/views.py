from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from api.permissions import IsAuthenticatedAndRole
from .models import Tickets
from .serializers import Tickets_Serializer

class Tickets_ListCreateView(viewsets.ModelViewSet):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    """ permission_classes = [IsAuthenticatedAndRole] """

class Tickets_DetailView(viewsets.ModelViewSet):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    
class Tickets_DestroyView(viewsets.ModelViewSet):
    queryset = Tickets.objects.all()
    serializer_class = Tickets_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)