from .models import ServiciosEducativos, ServiciosEducativosImage, ServiciosEducativosFacts, ServiciosEducativosDescription, ServiciosEducativosButtons
from .serializers import ServiciosEducativosSerializer, ServiciosEducativosImageSerializer, ServiciosEducativosFactsSerializer, ServiciosEducativosDescriptionSerializer, ServiciosEducativosButtonsSerializer
from rest_framework import viewsets
from api.permissions import IsAuthenticatedAndRole, IsAuthenticatedOrReadOnly

class ServiciosEducativosViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar las operaciones CRUD de Servicios Educativos.
    
    Permite listar servicios educativos sin autenticación, pero requiere autenticación para crear, actualizar y eliminar.
    Utiliza el serializador ServiciosEducativosSerializer para la validación y transformación de datos.
    """
    queryset = ServiciosEducativos.objects.all()
    serializer_class = ServiciosEducativosSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibition', 'exhibitions.add_exhibition', 'exhibitions.change_exhibition', 'exhibitions.delete_exhibition']

class ServiciosEducativosImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar las operaciones CRUD de imágenes de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar imágenes asociadas a exhibiciones.
    Utiliza el serializador ExhibicionImageSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ServiciosEducativosImage.objects.all()
    serializer_class = ServiciosEducativosImageSerializer
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

class ServiciosEducativosFactsViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar las operaciones CRUD de facts de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar facts asociadas a exhibiciones.
    Utiliza el serializador ExhibicionFactsSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ServiciosEducativosFacts.objects.all()
    serializer_class = ServiciosEducativosFactsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitionfacts', 'exhibitions.add_exhibitionfacts', 'exhibitions.change_exhibitionfacts', 'exhibitions.delete_exhibitionfacts']
    
class ServiciosEducativosDescriptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar las operaciones CRUD de descripciones de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar descripciones asociadas a exhibiciones.
    Utiliza el serializador ExhibicionDescriptionSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ServiciosEducativosDescription.objects.all()
    serializer_class = ServiciosEducativosDescriptionSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitiondescription', 'exhibitions.add_exhibitiondescription', 'exhibitions.change_exhibitiondescription', 'exhibitions.delete_exhibitiondescription']
    
class ServiciosEducativosButtonsViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar las operaciones CRUD de botones de Exhibiciones.
    
    Permite listar, crear, actualizar y eliminar botones asociados a exhibiciones.
    Utiliza el serializador ExhibicionButtonsSerializer para la validación y transformación de datos.
    Requiere que el usuario esté autenticado y tenga un rol específico para acceder a las operaciones de actualización y eliminación.
    """
    queryset = ServiciosEducativosButtons.objects.all()
    serializer_class = ServiciosEducativosButtonsSerializer
    permission_classes = [IsAuthenticatedAndRole]
    http_method_names = ['get', 'post', 'put', 'delete']
    #required_role = 'admin'
    #required_permissions = ['exhibitions.view_exhibitionbuttons', 'exhibitions.add_exhibitionbuttons', 'exhibitions.change_exhibitionbuttons', 'exhibitions.delete_exhibitionbuttons']