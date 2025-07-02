from rest_framework import viewsets
from .models import Payments, Donation
from .serializers import PaymentSerializer, DonationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

class PaymentMethodsView(APIView):
    def get(self, request):
        methods = [
            {"method": "MASTERCARD", "label": "Tarjeta Mastercard"},
            {"method": "VISA", "label": "Tarjeta Visa"},
            {"method": "PAYPAL", "label": "PayPal"},
            {"method": "CASH", "label": "Efectivo/SINPE"},
        ]
        return Response(methods)