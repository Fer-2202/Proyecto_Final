# Documentación del LoginSerializer

## Descripción General

El `LoginSerializer` es un serializador personalizado de Django REST Framework diseñado para manejar la autenticación de usuarios de manera robusta y segura. Reemplaza la lógica manual de login anterior con un enfoque más estructurado y mantenible.

## Características Principales

### ✅ Validación Robusta
- Validación automática de campos requeridos
- Mensajes de error específicos en español
- Verificación de credenciales segura
- Validación de estado del usuario (activo/inactivo)

### ✅ Flexibilidad de Login
- Soporte para login con **username** o **email**
- Búsqueda automática en múltiples fuentes:
  - Tabla User por username
  - Tabla User por email
  - Tabla UserProfile por email

### ✅ Respuesta Estructurada
- Información completa del usuario autenticado
- Datos de grupos/roles del usuario
- Formato consistente de respuesta
- Exclusión de datos sensibles

## Estructura del Serializador

### Campos de Entrada

```python
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=150,
        help_text="Nombre de usuario o email"
    )
    
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        help_text="Contraseña del usuario"
    )
```

### Proceso de Validación

1. **Extracción de datos**: Obtiene username/email y password
2. **Búsqueda de usuario**: Busca en User.username → User.email → UserProfile.email
3. **Verificación de contraseña**: Usa `user.check_password()`
4. **Validación de estado**: Verifica que el usuario esté activo
5. **Retorno de datos**: Incluye el usuario autenticado en validated_data

## Uso en Vistas

### Implementación en LoginView

```python
class LoginView(APIView):
    def post(self, request):
        # Crear instancia del serializador
        serializer = LoginSerializer(data=request.data)
        
        # Validar datos
        if serializer.is_valid():
            # Obtener usuario autenticado
            user = serializer.validated_data['user']
            
            # Realizar login
            login(request, user)
            
            # Obtener datos para respuesta
            user_data = serializer.to_representation(serializer.validated_data)
            
            return Response({
                'message': 'Login exitoso',
                'user': user_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Credenciales inválidas',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
```

## Ejemplos de Uso

### 1. Login con Username

**Solicitud:**
```json
POST /auth/login/
{
    "username": "miusuario",
    "password": "micontraseña123"
}
```

**Respuesta Exitosa:**
```json
{
    "message": "Login exitoso",
    "user": {
        "user_id": 1,
        "username": "miusuario",
        "email": "usuario@ejemplo.com",
        "first_name": "Juan",
        "last_name": "Pérez",
        "is_staff": false,
        "is_superuser": false,
        "groups": ["usuarios", "clientes"]
    }
}
```

### 2. Login con Email

**Solicitud:**
```json
POST /auth/login/
{
    "username": "usuario@ejemplo.com",
    "password": "micontraseña123"
}
```

**Respuesta:** (Misma estructura que el ejemplo anterior)

### 3. Manejo de Errores

**Credenciales Incorrectas:**
```json
{
    "error": "Credenciales inválidas",
    "details": {
        "non_field_errors": [
            "Credenciales inválidas. Verifica tu usuario/email y contraseña."
        ]
    }
}
```

**Usuario Inactivo:**
```json
{
    "error": "Credenciales inválidas",
    "details": {
        "non_field_errors": [
            "Esta cuenta está desactivada."
        ]
    }
}
```

**Campos Faltantes:**
```json
{
    "error": "Credenciales inválidas",
    "details": {
        "username": [
            "El nombre de usuario o email es requerido."
        ],
        "password": [
            "La contraseña es requerida."
        ]
    }
}
```

## Integración con Frontend

### Actualización del AuthService

El frontend ha sido actualizado para trabajar con la nueva estructura:

```javascript
// authService.js
login: async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login/', credentials);
        
        // La respuesta ahora incluye un objeto 'user' detallado
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
    } catch (error) {
        // Manejo mejorado de errores con detalles específicos
        if (error.response?.data?.details) {
            console.error('Detalles del error:', error.response.data.details);
        }
        throw error;
    }
}
```

## Ventajas del Nuevo Enfoque

### 🔒 Seguridad Mejorada
- Validación centralizada y consistente
- Mensajes de error que no revelan información sensible
- Verificación automática del estado del usuario

### 🛠️ Mantenibilidad
- Código más limpio y organizado
- Lógica de validación reutilizable
- Fácil extensión para nuevas funcionalidades

### 📊 Mejor Experiencia de Usuario
- Mensajes de error claros en español
- Respuestas estructuradas y consistentes
- Información completa del usuario autenticado

### 🧪 Testabilidad
- Fácil creación de pruebas unitarias
- Validación aislada y testeable
- Casos de prueba comprehensivos incluidos

## Pruebas Unitarias

Se incluye un archivo completo de pruebas (`tests_login_serializer.py`) que cubre:

- ✅ Login exitoso con username
- ✅ Login exitoso con email
- ✅ Manejo de credenciales incorrectas
- ✅ Validación de usuarios inactivos
- ✅ Verificación de campos requeridos
- ✅ Estructura de respuesta
- ✅ Integración con UserProfile

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas del LoginSerializer
python manage.py test api.auth.tests_login_serializer

# Ejecutar una prueba específica
python manage.py test api.auth.tests_login_serializer.LoginSerializerTestCase.test_login_with_valid_username
```

## Migración desde el Sistema Anterior

### Cambios Requeridos

1. **Backend**: ✅ Implementado
   - LoginSerializer creado
   - LoginView actualizada
   - Importaciones agregadas

2. **Frontend**: ✅ Actualizado
   - authService.js modificado
   - Manejo de nueva estructura de respuesta
   - Documentación de cambios agregada

3. **Pruebas**: ✅ Incluidas
   - Casos de prueba comprehensivos
   - Documentación de uso

### Compatibilidad

El nuevo sistema es **totalmente compatible** con el frontend existente, ya que:
- Mantiene el mismo endpoint (`/auth/login/`)
- Acepta los mismos campos de entrada
- Proporciona información adicional sin romper la funcionalidad existente

## Próximos Pasos

### Mejoras Futuras Sugeridas

1. **Integración JWT**: Agregar soporte para tokens JWT
2. **Rate Limiting**: Implementar límites de intentos de login
3. **Logging**: Agregar logs de seguridad para intentos de login
4. **2FA**: Soporte para autenticación de dos factores
5. **OAuth**: Integración con proveedores externos (Google, Facebook, etc.)

### Monitoreo

- Revisar logs de errores de autenticación
- Monitorear intentos de login fallidos
- Verificar rendimiento del nuevo serializador
- Recopilar feedback de usuarios

---

**Nota**: Esta implementación mejora significativamente la robustez y mantenibilidad del sistema de autenticación, proporcionando una base sólida para futuras mejoras y extensiones.