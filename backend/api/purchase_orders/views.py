from rest_framework import viewsets
from .models import PurchaseOrders
from .serializers import Purchase_Orders_Serializer
from api.permissions import IsAuthenticatedAndRole

class Purchase_Orders_ViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrders.objects.all()
    serializer_class = Purchase_Orders_Serializer
    #permission_classes = [IsAuthenticatedAndRole]

class Purchase_Orders_DetailViewSet(viewsets.ModelViewSet):
 queryset = PurchaseOrders.objects.all()
 serializer_class = Purchase_Orders_Serializer
 #permission_classes = [IsAuthenticatedAndRole]

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
