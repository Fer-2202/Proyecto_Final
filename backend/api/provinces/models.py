from django.db import models


class Provinces(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Province Name")

    class Meta:
        verbose_name = "Province"
        verbose_name_plural = "Provinces"
        ordering = ["name"]

    def __str__(self):
        return self.name