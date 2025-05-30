from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAuthenticatedAndRole(BasePermission):
    """ 
      Permite el acceso solo a usuarios autenticados y, opcionalmente. a usuarios con el rol especifico. 
      
      uso:
        class MiVista(APIView):
            permission_classes = [IsAuthenticatedAndRole]
            required_role = 'rol'

      si no se especifica el rol, se permite el acceso a todos los usuarios autenticados.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        required_role = getattr(view, 'required_role', None)
        if required_role is None:
            return True 
        return request.user.groups.filter(name=required_role).exists()