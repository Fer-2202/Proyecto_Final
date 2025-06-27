from rest_framework.response import Response
from rest_framework.views import APIView
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
   
class AvailableTicketsView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        available_tickets = []
        for ticket in Tickets.objects.all():
            if ticket.occupied_slots < ticket.total_slots:
                available_tickets.append(ticket)
        serializer = Tickets_Serializer(available_tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)