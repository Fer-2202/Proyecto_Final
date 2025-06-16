from django.db import models

class Species(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Species Name")

    class Meta:
        verbose_name = "Species"
        verbose_name_plural = "Species"
        ordering = ["name"]
        
    def __str__(self):
        return self.name
 