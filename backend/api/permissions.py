from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAuthenticatedAndRole(BasePermission):
    """
    Allows access only to authenticated users and, optionally, users with a specific role (group).
    Usage: set 'required_role' attribute on the view class to restrict to a group name.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        required_role = getattr(view, 'required_role', None)
        if required_role is None:
            return True  # Only authentication required
        return request.user.groups.filter(name=required_role).exists()