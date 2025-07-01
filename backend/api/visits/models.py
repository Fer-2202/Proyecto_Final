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

    def has_available_slots(self, requested_slots):
        return self.total_slots - self.occupied_slots >= requested_slots

    def occupy_slots(self, slots):
        if self.has_available_slots(slots):
            self.occupied_slots += slots
            self.save()
            return True
        return False