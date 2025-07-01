from .models import Exhibicion, ExhibicionImage, ExhibicionFacts, ExhibicionDescription, ExhibicionButtons
from .serializers import ExhibicionSerializer, ExhibicionImageSerializer, ExhibicionFactsSerializer, ExhibicionDescriptionSerializer, ExhibicionButtonsSerializer
from rest_framework import viewsets
from api.permissions import IsAuthenticatedAndRole

class ExhibicionViewSet(viewsets.ModelViewSet):

    """
    ViewSet para manejar las operaciones CRUD de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar exhibiciones.
    Utiliza el serializador ExhibicionSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = Exhibicion.objects.all()
    serializer_class = ExhibicionSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibition', 'exhibitions.add_exhibition', 'exhibitions.change_exhibition', 'exhibitions.delete_exhibition']

class ExhibicionImageViewSet(viewsets.ModelViewSet):

    """
    ViewSet para manejar las operaciones CRUD de imágenes de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar imágenes asociadas a exhibiciones.
    Utiliza el serializador ExhibicionImageSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ExhibicionImage.objects.all()
    serializer_class = ExhibicionImageSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitionimage', 'exhibitions.add_exhibitionimage', 'exhibitions.change_exhibitionimage', 'exhibitions.delete_exhibitionimage']
    def get_queryset(self):
        queryset = super().get_queryset()
        exhibicion_id = self.kwargs.get('exhibicion_id')
        if exhibicion_id:
            queryset = queryset.filter(exhibicion_id=exhibicion_id)
        return queryset

class ExhibicionFactsViewSet(viewsets.ModelViewSet):

    """
    ViewSet para manejar las operaciones CRUD de facts de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar facts asociadas a exhibiciones.
    Utiliza el serializador ExhibicionFactsSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ExhibicionFacts.objects.all()
    serializer_class = ExhibicionFactsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitionfacts', 'exhibitions.add_exhibitionfacts', 'exhibitions.change_exhibitionfacts', 'exhibitions.delete_exhibitionfacts']
    
class ExhibicionDescriptionViewSet(viewsets.ModelViewSet):

    """
    ViewSet para manejar las operaciones CRUD de descripciones de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar descripciones asociadas a exhibiciones.
    Utiliza el serializador ExhibicionDescriptionSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ExhibicionDescription.objects.all()
    serializer_class = ExhibicionDescriptionSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitiondescription', 'exhibitions.add_exhibitiondescription', 'exhibitions.change_exhibitiondescription', 'exhibitions.delete_exhibitiondescription']
    
class ExhibicionButtonsViewSet(viewsets.ModelViewSet):
    
    """
    ViewSet para manejar las operaciones CRUD de botones de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar botones asociados a exhibiciones.
    Utiliza el serializador ExhibicionButtonsSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ExhibicionButtons.objects.all()
    serializer_class = ExhibicionButtonsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitionbuttons', 'exhibitions.add_exhibitionbuttons', 'exhibitions.change_exhibitionbuttons', 'exhibitions.delete_exhibitionbuttons']