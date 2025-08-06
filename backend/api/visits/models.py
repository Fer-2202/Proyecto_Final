from django.db import models


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
      
    def free_slots(self, quantity=1):
        """
        Libera cupos ocupados de la visita.
        
        Args:
            quantity (int): Cantidad de cupos a liberar (por defecto 1)
            
        Raises:
            ValueError: Si se intenta liberar más cupos de los ocupados
            
        Uso:
            visit.free_slots(5)  # Libera 5 cupos
        """
        if self.occupied_slots >= quantity:
            self.occupied_slots -= quantity
            self.save()
        else:
            raise ValueError("No se puede liberar más cupos de los ocupados")

    def has_available_slots(self, requested_slots):
        """
        Verifica si hay suficientes cupos disponibles.
        
        Args:
            requested_slots (int): Cantidad de cupos solicitados
            
        Returns:
            bool: True si hay cupos disponibles, False en caso contrario
            
        Uso:
            if visit.has_available_slots(10):
                # Proceder con la reserva
        """
        return self.total_slots - self.occupied_slots >= requested_slots

    def occupy_slots(self, slots):
        """
        Ocupa cupos en la visita si están disponibles.
        
        Args:
            slots (int): Cantidad de cupos a ocupar
            
        Returns:
            bool: True si se ocuparon exitosamente, False si no hay cupos suficientes
            
        Uso:
            if visit.occupy_slots(5):
                # Cupos ocupados exitosamente
            else:
                # No hay cupos suficientes
        """
        if self.has_available_slots(slots):
            self.occupied_slots += slots
            self.save()
            return True
        return False

    @property
    def available_slots(self):
        """
        Propiedad que retorna la cantidad de cupos disponibles.
        
        Returns:
            int: Cantidad de cupos disponibles
            
        Uso:
            cupos_libres = visit.available_slots
        """
        return self.total_slots - self.occupied_slots
