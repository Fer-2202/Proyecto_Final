from rest_framework import viewsets
from .models import Payments
from .serializers import PaymentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer

class PaymentMethodsView(APIView):
    def get(self, request):
        methods = [
            {"method": "MASTERCARD", "label": "Tarjeta Mastercard"},
            {"method": "VISA", "label": "Tarjeta Visa"},
            {"method": "PAYPAL", "label": "PayPal"},
            {"method": "CASH", "label": "Efectivo/SINPE"},
        ]
        return Response(methods)