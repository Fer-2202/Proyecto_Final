from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

def create_group_with_permissions(group_name, model, permissions):
    """
    Creates a group and assigns the specified permissions to it.

    Args:
        group_name: The name of the group to create.
        model: The model for which to assign permissions.
        permissions: A list of permission codenames (e.g., 'add_animal', 'change_animal').
    """
    group, created = Group.objects.get_or_create(name=group_name)
    content_type = ContentType.objects.get_for_model(model)

    for codename in permissions:
        permission, created = Permission.objects.get_or_create(
            codename=codename,
            content_type=content_type
        )
        group.permissions.add(permission)

    group.save()


def add_permissions_to_group(group_name, model, permissions):
    """
    Adds permissions to an existing group.

    Args:
        group_name: The name of the group.
        model: The model for which to assign permissions.
        permissions: A list of permission codenames.
    """
    try:
        group = Group.objects.get(name=group_name)
    except Group.DoesNotExist:
        raise ValueError(f"Group '{group_name}' does not exist.")

    content_type = ContentType.objects.get_for_model(model)

    for codename in permissions:
        permission, created = Permission.objects.get_or_create(
            codename=codename,
            content_type=content_type
        )
        group.permissions.add(permission)

    group.save()


def remove_permissions_from_group(group_name, model, permissions):
    """
    Removes permissions from a group.

    Args:
        group_name: The name of the group.
        model: The model for which to remove permissions.
        permissions: A list of permission codenames.
    """
    try:
        group = Group.objects.get(name=group_name)
    except Group.DoesNotExist:
        raise ValueError(f"Group '{group_name}' does not exist.")

    content_type = ContentType.objects.get_for_model(model)

    for codename in permissions:
        try:
            permission = Permission.objects.get(
                codename=codename,
                content_type=content_type
            )
            group.permissions.remove(permission)
        except Permission.DoesNotExist:
            pass  # Permission doesn't exist, so skip

    group.save()


def user_has_permission(user, permission_codename, model):
    """
    Checks if a user has a specific permission (either directly or through a group).

    Args:
        user: The user object.
        permission_codename: The codename of the permission.
        model: The model to which the permission applies.

    Returns:
        True if the user has the permission, False otherwise.
    """
    content_type = ContentType.objects.get_for_model(model)
    permission = Permission.objects.get(codename=permission_codename, content_type=content_type)
    return user.has_perm(f"{content_type.app_label}.{permission.codename}")