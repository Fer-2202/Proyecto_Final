from django.db.models.signals import post_save, post_delete
import reversion
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.contrib.auth import get_user_model
from .models import AuditLog
from django.utils import timezone  # Import timezone

User = get_user_model()

@receiver(post_save)
def audit_log_create(sender, instance, created, **kwargs):
    print("Audit log create signal handler is running")
    if sender._meta.app_label == 'api' and sender._meta.model_name != 'auditlog':
        action = 'created' if created else 'updated'
        with reversion.create_revision():
            reversion.set_user(instance.id_user if hasattr(instance, 'id_user') else (instance.user if hasattr(instance, 'user') else None))
            reversion.set_comment(f'Action {action} on {sender._meta.model_name} with id {instance.pk}')

            AuditLog.objects.create(
                timestamp=timezone.now(),  # Use timezone.now()
                user=instance.id_user if hasattr(instance, 'id_user') else (instance.user if hasattr(instance, 'user') else None),
                action=f'{action}',
                model=sender._meta.model_name,
                record_id=instance.pk,
                details=f'Action {action} on {sender._meta.model_name} with id {instance.pk}'
            )

@receiver(post_delete)
def audit_log_delete(sender, instance, **kwargs):
    print("Audit log delete signal handler is running")
    if sender._meta.app_label == 'api' and sender._meta.model_name != 'auditlog':
        with reversion.create_revision():
            reversion.set_user(instance.id_user if hasattr(instance, 'id_user') else (instance.user if hasattr(instance, 'user') else None))
            reversion.set_comment(f'Action deleted on {sender._meta.model_name} with id {instance.pk}')

            AuditLog.objects.create(
                timestamp=timezone.now(),  # Use timezone.now()
                user=instance.id_user if hasattr(instance, 'id_user') else (instance.user if hasattr(instance, 'user') else None),
                action='deleted',
                model=sender._meta.model_name,
                record_id=instance.pk,
                details=f'Action deleted on {sender._meta.model_name} with id {instance.pk}'
            )
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
