from rest_framework import viewsets
from .models import PurchaseOrders
from .serializers import Purchase_Orders_Serializer
from api.permissions import IsAuthenticatedAndRole
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class Purchase_Orders_ViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Purchase_Orders_DetailViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print("PERFORM_CREATE CALLED", self.request.user, self.request.user.is_authenticated)
        serializer.save(user=self.request.user)

    """ def get_permissions(self):
        if self.action == 'list':
            return [IsAuthenticatedAndRole()]
        return [IsAuthenticatedAndRole()]
        
        def get_queryset(self):
            queryset = super().get_queryset()
            user = self.request.user
            if user.role == 'admin':
                return queryset
            return queryset.filter(user=user)
        
        def perform_create(self, serializer):
            serializer.save(user=self.request.user)
        
        def perform_update(self, serializer):
            instance = self.get_object()
            serializer.save(user=self.request.user)
            if instance.user != self.request.user:
                raise serializers.ValidationError("No tienes permiso para editar esta orden de compra")
            return super().perform_update(serializer)
        
        def perform_destroy(self, instance):
            if instance.user != self.request.user:
                raise serializers.ValidationError("No tienes permiso para eliminar esta orden de compra")
            return super().perform_destroy(instance) """

@api_view(['GET'])
def validate_qr(request):
    data = request.query_params.get('data')
    if not data:
        return Response({'detail': 'No se recibió ningún dato de QR.'}, status=status.HTTP_400_BAD_REQUEST)
    # Suponiendo que el QR contiene el ID de la orden
    # Puedes ajustar esto si usas un token único
    try:
        # Extrae el ID de la orden del string del QR
        # Ejemplo: "Order ID: 123 | Email: ..."
        if 'Order ID:' in data:
            order_id = int(data.split('Order ID:')[1].split('|')[0].strip())
        else:
            order_id = int(data.strip())
    except Exception:
        return Response({'detail': 'Formato de QR no válido.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        order = PurchaseOrders.objects.get(id=order_id)
    except PurchaseOrders.DoesNotExist:
        return Response({'detail': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    if order.status == 'PAID':
        return Response({'detail': 'QR válido. Orden ya pagada.', 'order_id': order.id, 'email': order.email, 'date': str(order.purchase_date)}, status=status.HTTP_200_OK)
    elif order.status == 'PENDING':
        return Response({'detail': 'QR válido, pero la orden aún no ha sido pagada.', 'order_id': order.id, 'email': order.email, 'date': str(order.purchase_date)}, status=status.HTTP_200_OK)
    elif order.status == 'CANCELLED':
        return Response({'detail': 'La orden fue cancelada.', 'order_id': order.id}, status=status.HTTP_400_BAD_REQUEST)
    elif order.status == 'FAILED':
        return Response({'detail': 'La orden falló.', 'order_id': order.id}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'Estado de la orden desconocido.', 'order_id': order.id}, status=status.HTTP_400_BAD_REQUEST)