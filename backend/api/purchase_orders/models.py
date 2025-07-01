from django.db import models
from django.conf import settings

# Purchase Orders
class PurchaseOrders(models.Model):
    order_date = models.DateField(auto_now_add=True)
    purchase_date = models.DateField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=False, default=0.0)
    total_crc = models.DecimalField(max_digits=12, decimal_places=2, null=False, default=0.0)
    total_usd = models.DecimalField(max_digits=12, decimal_places=2, null=False, default=0.0)
    email = models.EmailField(max_length=50)
    qr_image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[("PENDING", "Pending"), ("PAID", "Paid"), ("CANCELLED", "Cancelled"), ("FAILED", "Failed")],
        default="PENDING"
    )
    visit = models.ForeignKey('Visits', on_delete=models.CASCADE, related_name='purchase_orders')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchase_orders')

    class Meta:
        verbose_name = "Purchase Order"
        verbose_name_plural = "Purchase Orders"
        ordering = ["-order_date"]

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"

    def calculate_total_price(self):
        total = sum([item.subtotal for item in self.tickets_purchase_order.all()])
        self.total_price = total
        self.total_crc = sum([item.subtotal for item in self.tickets_purchase_order.all() if item.ticket.currency == 'CRC'])
        self.total_usd = sum([item.subtotal for item in self.tickets_purchase_order.all() if item.ticket.currency == 'USD'])
        self.save()

    def occupy_visit_slots(self):
        total_tickets = sum([item.amount for item in self.tickets_purchase_order.all()])
        return self.visit.occupy_slots(total_tickets)

    def mark_as_paid(self):
        self.status = "PAID"
        self.save()