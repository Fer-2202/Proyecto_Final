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
        super().save(*args, **kwargs)
        if self.status == "SUCCESS":
            self.purchase_order.mark_as_paid()
