from django.db import models
from django.contrib.auth.models import User

class AuditLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    record_id = models.PositiveIntegerField(null=True, blank=True)
    details = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.timestamp} - {self.user} - {self.action} - {self.model} - {self.record_id}'