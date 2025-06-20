from django.db import models


# Tickets
class Tickets(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, verbose_name="Ticket Price")
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Ticket Name")
    description = models.CharField(max_length=100, null=False, verbose_name="Description")

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"
        ordering = ["name"]

    def __str__(self):
        return self.name
       
