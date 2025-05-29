from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAuthenticatedAndRole(BasePermission):
    
#Este codigo es para que verifique que esten autentificados y que sus roles existan
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        required_role = getattr(view, 'required_role', None)
        if required_role is None:
            return True 
        return request.user.groups.filter(name=required_role).exists()