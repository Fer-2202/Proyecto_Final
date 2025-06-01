from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import *
from .utils import generate_qr_code



@receiver(post_save , sender=PurchaseOrders)
def  created (sender, instance, created, **kwargs):
  if created and not instance.qr_image:
    generate_qr_code(instance)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()