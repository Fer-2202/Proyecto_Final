# -*- coding: utf-8 -*-
"""
Pruebas unitarias para LoginSerializer

Este archivo contiene pruebas para verificar el funcionamiento correcto
del LoginSerializer implementado para el sistema de autenticación.

Características probadas:
- Validación de credenciales correctas
- Manejo de credenciales incorrectas
- Login con username
- Login con email
- Validación de campos requeridos
- Manejo de usuarios inactivos
- Estructura de respuesta

Uso:
python manage.py test api.auth.tests_login_serializer
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers
from .serializers import LoginSerializer
from .models import UserProfile

User = get_user_model()


class LoginSerializerTestCase(TestCase):
    """
    Casos de prueba para LoginSerializer.
    
    Verifica que el serializador funcione correctamente en diferentes
    escenarios de autenticación y validación.
    """
    
    def setUp(self):
        """
        Configuración inicial para las pruebas.
        Crea usuarios de prueba con diferentes configuraciones.
        """
        # Crear usuario activo con username
        self.active_user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        
        # Crear perfil para el usuario
        UserProfile.objects.create(user=self.active_user)
        
        # Crear usuario inactivo
        self.inactive_user = User.objects.create_user(
            username='inactiveuser',
            email='inactive@example.com',
            password='testpass123',
            is_active=False
        )
        
        # Crear grupo de prueba
        self.test_group = Group.objects.create(name='TestGroup')
        self.active_user.groups.add(self.test_group)
        
        # Datos de prueba válidos
        self.valid_credentials_username = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        
        self.valid_credentials_email = {
            'username': 'test@example.com',
            'password': 'testpass123'
        }
    
    def test_login_with_valid_username(self):
        """
        Prueba login exitoso usando username.
        """
        serializer = LoginSerializer(data=self.valid_credentials_username)
        
        # Verificar que los datos son válidos
        self.assertTrue(serializer.is_valid())
        
        # Verificar que el usuario autenticado es correcto
        validated_data = serializer.validated_data
        self.assertEqual(validated_data['user'], self.active_user)
        
        # Verificar estructura de respuesta
        response_data = serializer.to_representation(validated_data)
        self.assertIn('user_id', response_data)
        self.assertIn('username', response_data)
        self.assertIn('email', response_data)
        self.assertIn('groups', response_data)
        self.assertEqual(response_data['username'], 'testuser')
        self.assertEqual(response_data['email'], 'test@example.com')
    
    def test_login_with_valid_email(self):
        """
        Prueba login exitoso usando email.
        """
        serializer = LoginSerializer(data=self.valid_credentials_email)
        
        # Verificar que los datos son válidos
        self.assertTrue(serializer.is_valid())
        
        # Verificar que el usuario autenticado es correcto
        validated_data = serializer.validated_data
        self.assertEqual(validated_data['user'], self.active_user)
    
    def test_login_with_invalid_password(self):
        """
        Prueba login con contraseña incorrecta.
        """
        invalid_credentials = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        
        serializer = LoginSerializer(data=invalid_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar mensaje de error
        self.assertIn('non_field_errors', serializer.errors)
        self.assertIn('Credenciales inválidas', str(serializer.errors))
    
    def test_login_with_nonexistent_user(self):
        """
        Prueba login con usuario que no existe.
        """
        invalid_credentials = {
            'username': 'nonexistentuser',
            'password': 'testpass123'
        }
        
        serializer = LoginSerializer(data=invalid_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar mensaje de error
        self.assertIn('non_field_errors', serializer.errors)
    
    def test_login_with_inactive_user(self):
        """
        Prueba login con usuario inactivo.
        """
        inactive_credentials = {
            'username': 'inactiveuser',
            'password': 'testpass123'
        }
        
        serializer = LoginSerializer(data=inactive_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar mensaje de error específico
        self.assertIn('non_field_errors', serializer.errors)
        self.assertIn('desactivada', str(serializer.errors))
    
    def test_login_missing_username(self):
        """
        Prueba login sin proporcionar username.
        """
        incomplete_credentials = {
            'password': 'testpass123'
        }
        
        serializer = LoginSerializer(data=incomplete_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar error de campo requerido
        self.assertIn('username', serializer.errors)
    
    def test_login_missing_password(self):
        """
        Prueba login sin proporcionar password.
        """
        incomplete_credentials = {
            'username': 'testuser'
        }
        
        serializer = LoginSerializer(data=incomplete_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar error de campo requerido
        self.assertIn('password', serializer.errors)
    
    def test_login_empty_credentials(self):
        """
        Prueba login con credenciales vacías.
        """
        empty_credentials = {
            'username': '',
            'password': ''
        }
        
        serializer = LoginSerializer(data=empty_credentials)
        
        # Verificar que los datos no son válidos
        self.assertFalse(serializer.is_valid())
        
        # Verificar errores de campos vacíos
        self.assertIn('username', serializer.errors)
        self.assertIn('password', serializer.errors)
    
    def test_response_structure(self):
        """
        Prueba la estructura de la respuesta del serializador.
        """
        serializer = LoginSerializer(data=self.valid_credentials_username)
        serializer.is_valid()
        
        response_data = serializer.to_representation(serializer.validated_data)
        
        # Verificar campos obligatorios en la respuesta
        required_fields = [
            'user_id', 'username', 'email', 'first_name', 'last_name',
            'is_staff', 'is_superuser', 'groups'
        ]
        
        for field in required_fields:
            self.assertIn(field, response_data)
        
        # Verificar tipos de datos
        self.assertIsInstance(response_data['user_id'], int)
        self.assertIsInstance(response_data['username'], str)
        self.assertIsInstance(response_data['email'], str)
        self.assertIsInstance(response_data['is_staff'], bool)
        self.assertIsInstance(response_data['is_superuser'], bool)
        self.assertIsInstance(response_data['groups'], list)
    
    def test_groups_in_response(self):
        """
        Prueba que los grupos del usuario se incluyan en la respuesta.
        """
        serializer = LoginSerializer(data=self.valid_credentials_username)
        serializer.is_valid()
        
        response_data = serializer.to_representation(serializer.validated_data)
        
        # Verificar que el grupo de prueba está en la respuesta
        self.assertIn('TestGroup', response_data['groups'])
        self.assertEqual(len(response_data['groups']), 1)


class LoginSerializerIntegrationTestCase(TestCase):
    """
    Pruebas de integración para LoginSerializer.
    
    Verifica la integración del serializador con otros componentes
    del sistema como UserProfile y permisos.
    """
    
    def setUp(self):
        """
        Configuración para pruebas de integración.
        """
        # Crear usuario con perfil completo
        self.user = User.objects.create_user(
            username='integrationuser',
            email='integration@example.com',
            password='testpass123',
            first_name='Integration',
            last_name='Test'
        )
        
        # Crear perfil con información adicional
        self.profile = UserProfile.objects.create(
            user=self.user,
            phone='123456789',
            address='Test Address',
            bio='Test bio'
        )
    
    def test_login_with_profile_email(self):
        """
        Prueba login usando email del perfil de usuario.
        """
        credentials = {
            'username': 'integration@example.com',
            'password': 'testpass123'
        }
        
        serializer = LoginSerializer(data=credentials)
        
        # Verificar que el login es exitoso
        self.assertTrue(serializer.is_valid())
        
        # Verificar que se encontró el usuario correcto
        validated_data = serializer.validated_data
        self.assertEqual(validated_data['user'], self.user)