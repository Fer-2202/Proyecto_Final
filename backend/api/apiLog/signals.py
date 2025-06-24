from django.db.models.signals import post_save, post_delete
import reversion
from django.dispatch import receiver
from django.utils import timezone
from ..apiLog import AuditLog

@receiver(post_save)
def audit_log_create(sender, instance, created, **kwargs):
    if sender._meta.app_label == 'api' and sender._meta.model_name != 'auditlog':
        action = 'created' if created else 'updated'
        with reversion.create_revision():
            reversion.set_user(
                getattr(instance, 'id_user', getattr(instance, 'user', None))
            )
            reversion.set_comment(
                f'Action {action} on {sender._meta.model_name} with id {instance.pk}'
            )
            AuditLog.objects.create(
                timestamp=timezone.now(),
                user=getattr(instance, 'id_user', getattr(instance, 'user', None)),
                action=action,
                model=sender._meta.model_name,
                record_id=instance.pk,
                details=f'Action {action} on {sender._meta.model_name} with id {instance.pk}'
            )

@receiver(post_delete)
def audit_log_delete(sender, instance, **kwargs):
    if sender._meta.app_label == 'api' and sender._meta.model_name != 'auditlog':
        with reversion.create_revision():
            reversion.set_user(
                getattr(instance, 'id_user', getattr(instance, 'user', None))
            )
            reversion.set_comment(
                f'Action deleted on {sender._meta.model_name} with id {instance.pk}'
            )
            AuditLog.objects.create(
                timestamp=timezone.now(),
                user=getattr(instance, 'id_user', getattr(instance, 'user', None)),
                action='deleted',
                model=sender._meta.model_name,
                record_id=instance.pk,
                details=f'Action deleted on {sender._meta.model_name} with id {instance.pk}'
            )