from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Visits
from api.permissions import IsAuthenticatedAndRole
from rest_framework.permissions import IsAuthenticated
from .serializers import Visits_Serializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.utils.dateparse import parse_date


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

    @action(detail=False, methods=['get'])
    def by_day(self, request):
        day = request.query_params.get('day')
        if not day:
            return Response({'detail': 'El parámetro day es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
        visit = Visits.objects.filter(day=day).first()
        if not visit:
            return Response({'detail': 'No existe visita para ese día.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(visit)
        return Response(serializer.data)


class AvailableVisitsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        visits = []
        for visit in Visits.objects.all():
            available_slots = visit.total_slots - visit.occupied_slots
            if available_slots > 0:
                v = Visits_Serializer(visit).data
                v['available_slots'] = available_slots
                visits.append(v)
        return Response(visits, status=status.HTTP_200_OK)