from django.db import models

# Payment
class Payments(models.Model):
    purchase_order = models.OneToOneField('PurchaseOrders', on_delete=models.CASCADE, related_name='payment')
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=30, choices=[("CARD", "Card"), ("PAYPAL", "PayPal"), ("CASH", "Cash")])
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=[("SUCCESS", "Success"), ("FAILED", "Failed")])

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
        ordering = ["-payment_date"]

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"

    def save(self, *args, **kwargs):
        """
        Sobrescribe el método save para manejar automáticamente los cambios de estado.
        
        - Si el pago es exitoso: marca la orden como pagada
        - Si el pago falla: marca la orden como cancelada y libera cupos
        """
        # Verificar si es una actualización de estado
        is_status_change = False
        if self.pk:
            old_payment = Payments.objects.get(pk=self.pk)
            is_status_change = old_payment.status != self.status
        
        super().save(*args, **kwargs)
        
        # Solo ejecutar acciones si hay cambio de estado o es un nuevo pago
        if not self.pk or is_status_change:
            if self.status == "SUCCESS":
                self.purchase_order.mark_as_paid()
            elif self.status == "FAILED":
                self.purchase_order.mark_as_cancelled()

# Donation
class Donation(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=[('CRC', 'Colones'), ('USD', 'Dólares')])
    donor_name = models.CharField(max_length=100, blank=True, null=True)
    donor_email = models.EmailField(blank=True, null=True)
    payment_method = models.CharField(max_length=30, choices=[('CARD', 'Tarjeta'), ('PAYPAL', 'PayPal'), ('CASH', 'Efectivo/SINPE')])
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('SUCCESS', 'Éxito'), ('FAILED', 'Fallido'), ('PENDING', 'Pendiente')], default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Donación'
        verbose_name_plural = 'Donaciones'
        ordering = ['-created_at']

    def __str__(self):
        return f"Donación {self.amount} {self.currency} - {self.status}"