from rest_framework import generics # Importa las vistas genéricas de Django REST Framework
from .models import Provinces # Importa el modelo Provinces del módulo models.py
from .serializers import Provinces_Serializer # Importa el serializador Provinces_Serializer
from api.permissions import IsAuthenticatedAndRole # Importa la clase de permisos personalizada IsAuthenticatedAndRole

""" Views para Provinces
    - Provinces_ListCreateView: Vista para listar y crear provincias.
    - Provinces_DetailView: Vista para obtener, actualizar o eliminar una provincia específica.
    
    Ambas vistas utilizan el modelo Provinces y el serializador Provinces_Serializer.
    
    Para los permisos, se utiliza IsAuthenticatedAndRole para restringir el acceso a usuarios autenticados con un rol específico.
    
    Las vistas heredan de las clases genéricas de Django REST Framework para manejar las operaciones CRUD de manera eficiente.
    
    Se puede utilizar required_role en las vistas para especificar el rol requerido para acceder a ellas.
"""
class Provinces_ListCreateView(generics.ListCreateAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer

class Provinces_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provinces.objects.all()
    serializer_class = Provinces_Serializer
    permission_classes = [IsAuthenticatedAndRole]