from django.db import models
from api.species.models import Species


# Animals
class Animals(models.Model):
    name = models.CharField(max_length=30, null=False, verbose_name="Animal Name")
    age = models.PositiveIntegerField(null=False, verbose_name="Age")
    species = models.ForeignKey('Species', on_delete=models.CASCADE, related_name='animals')
    conservation_status = models.ForeignKey('ConservationStatus', on_delete=models.CASCADE, related_name='animals')
    habitat = models.ForeignKey('Habitats', on_delete=models.CASCADE, related_name='animals')

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animals"
        ordering = ["name"]

    def __str__(self):
        return self.name