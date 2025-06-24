from django.db import models
from django.conf import settings
from django.contrib.auth.models import Group, User
from api.tickets.models import Tickets

# Conservation Status



# Visits
class Visits(models.Model):
    day = models.DateField(null=False, verbose_name="Visit Day")
    total_slots = models.PositiveIntegerField(default=1276, null=False, verbose_name="Total Slots")
    occupied_slots = models.PositiveIntegerField(default=0, verbose_name="Occupied Slots")

    class Meta:
        verbose_name = "Visit"
        verbose_name_plural = "Visits"
        ordering = ["-day"]
        unique_together = ("day",)

    def __str__(self):
        return self.day.strftime('%Y-%m-%d')

    def has_available_slots(self, requested_slots):
        return self.total_slots - self.occupied_slots >= requested_slots

    def occupy_slots(self, slots):
        if self.has_available_slots(slots):
            self.occupied_slots += slots
            self.save()
            return True
        return False


# Purchase Orders



# Tickets Purchase Order (Intermediate Table)
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




# Habitats
class Habitats(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Habitat Name")
    nums_animals = models.PositiveIntegerField(null=False, verbose_name="Number of Animals")
    description = models.CharField(max_length=100, null=False, verbose_name="Description")
    section = models.ForeignKey('Sections', on_delete=models.CASCADE, related_name='habitats')

    class Meta:
        verbose_name = "Habitat"
        verbose_name_plural = "Habitats"
        ordering = ["name"]

    def __str__(self):
        return self.name


# User profile