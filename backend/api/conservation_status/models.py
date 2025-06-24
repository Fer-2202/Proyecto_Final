from django.db import models

# Conservation Status
class ConservationStatus(models.Model):
    STATUS_CHOICES = [
        ("LC", "Least Concern"),
        ("NT", "Near Threatened"),
        ("VU", "Vulnerable"),
        ("EN", "Endangered"),
        ("CR", "Critically Endangered"),
        ("EW", "Extinct in the Wild"),
        ("EX", "Extinct"),
    ]
    name = models.CharField(max_length=30, choices=STATUS_CHOICES, null=False, unique=True, verbose_name="Conservation Status")

    class Meta:
        verbose_name = "Conservation Status"
        verbose_name_plural = "Conservation Statuses"
        ordering = ["name"]

    def __str__(self):
        return self.get_name_display()