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

class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Allows read-only access to anonymous users and full access to authenticated users.
    For write operations (POST, PUT, PATCH, DELETE), authentication is required.
    Optionally, can restrict write operations to users with a specific role.
    """
    def has_permission(self, request, view):
        # Allow read-only access for safe methods (GET, HEAD, OPTIONS)
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # For write methods, require authentication
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Check for specific role requirement on write operations
        required_role = getattr(view, 'required_role', None)
        if required_role is None:
            return True  # Only authentication required
        return request.user.groups.filter(name=required_role).exists()
