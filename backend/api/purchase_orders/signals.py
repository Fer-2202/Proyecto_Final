from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PurchaseOrders
from api.utils import generate_qr_code

@receiver(post_save, sender=PurchaseOrders)
def create_qr_on_order(sender, instance, created, **kwargs):
    if created and not instance.qr_image:
        generate_qr_code(instance) 