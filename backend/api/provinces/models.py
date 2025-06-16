from django.db import models # Importa el módulo models de Django para definir modelos

class Provinces(models.Model):
    """Representa una provincia en el sistema."""
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Province Name")
    
    """ Metadatos del modelo Provinces """
    class Meta:
        """ Define los metadatos del modelo Provinces """
        verbose_name = "Province" # Nombre en singular del modelo
        verbose_name_plural = "Provinces" # Nombre en plural del modelo
        ordering = ["name"] # Ordena por nombre al listar provincias

    def __str__(self):
        """ Retorna una representación en cadena del modelo Provinces """
        return self.name # Nombre de la provincia