from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import PurchaseOrders, UserProfile
from .utils import generate_qr_code

# Generar código QR después de crear una orden de compra
@receiver(post_save, sender=PurchaseOrders)
def generate_qr_after_order_created(sender, instance, created, **kwargs):
    if created and not instance.qr_image:
        generate_qr_code(instance)

# Crear o actualizar perfil de usuario cuando se guarda un User
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    profile, _ = UserProfile.objects.get_or_create(user=instance)
    profile.save()

# Eliminar imagen de perfil cuando se elimina un UserProfile
@receiver(post_delete, sender=UserProfile)
def delete_profile_picture_on_profile_delete(sender, instance, **kwargs):
    if instance.profile_picture:
        instance.profile_picture.delete(save=False)
