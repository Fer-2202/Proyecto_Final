from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Visits
from api.permissions import IsAuthenticatedAndRole
from rest_framework.permissions import IsAuthenticated
from .serializers import Visits_Serializer
from rest_framework.response import Response
from rest_framework import status


class Visits_ViewSet(viewsets.ModelViewSet):
    queryset = Visits.objects.all()
    serializer_class = Visits_Serializer
    #permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'

    def create(self, request, *args, **kwargs):
        day = request.data.get('day')
        if day and Visits.objects.filter(day=day).exists():
            return Response({'detail': f'Ya existe una visita para el día {day}.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class AvailableVisitsView(APIView):
 permission_classes = [IsAuthenticated]

 def get(self, request):
  visits = []
  for visit in Visits.objects.all():
   if visit.occupied_slots < visit.total_slots:
    visits.append(visit)
  serializer = Visits_Serializer(visits, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)