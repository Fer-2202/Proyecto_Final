from rest_framework import viewsets
from .models import Payments
from .serializers import PaymentSerializer

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer