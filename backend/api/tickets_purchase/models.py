from django.db import models


class TicketsPurchaseOrder(models.Model):
    amount = models.PositiveIntegerField()
    ticket = models.ForeignKey('Tickets', on_delete=models.CASCADE, related_name='tickets_purchase_order')
    purchase_order = models.ForeignKey('PurchaseOrders', on_delete=models.CASCADE, related_name='tickets_purchase_order')

    class Meta:
        verbose_name = "Tickets Purchase Order"
        verbose_name_plural = "Tickets Purchase Orders"
        unique_together = ("ticket", "purchase_order")

    @property
    def subtotal(self):
        return self.amount * self.ticket.price