# Guía de Funcionalidad de Perfil de Usuario

## Descripción General

Se ha implementado una funcionalidad completa de perfil de usuario que permite a los usuarios ver, editar y gestionar su información personal en el sistema del Parque Marino.

## Características Implementadas

### Backend (Django REST Framework)

#### Modelo UserProfile
- **Campos disponibles:**
  - `user`: Relación OneToOne con el modelo User de Django
  - `phone`: Número de teléfono (opcional)
  - `address`: Dirección (opcional)
  - `birth_date`: Fecha de nacimiento (opcional)
  - `profile_picture`: Imagen de perfil (opcional)
  - `bio`: Biografía del usuario (opcional)
  - `province`: Provincia (relación con modelo Provinces)
  - `roles`: Roles del usuario (ManyToMany con Group)
  - `created_at`: Fecha de creación
  - `updated_at`: Fecha de última actualización

#### Endpoints API

1. **Perfil del usuario actual:**
   - `GET /api/auth/profile/` - Obtener perfil del usuario autenticado
   - `PUT /api/auth/profile/` - Actualizar perfil del usuario autenticado

2. **Perfil de usuario específico (admin):**
   - `GET /api/auth/user_profile/<id>/` - Obtener perfil por ID de usuario
   - `PUT /api/auth/user_profile/<id>/update/` - Actualizar perfil por ID
   - `DELETE /api/auth/user_profile/<id>/delete/` - Eliminar perfil

#### Serializers
- `UserProfileSerializer`: Serializa todos los campos del perfil
- `ProfileSerializer`: Serializador simplificado para actualizaciones
- `RegisterSerializer`: Incluye creación de perfil durante el registro

### Frontend (React)

#### Componente Profile.jsx
- **Pestañas disponibles:**
  - **Personal**: Información básica del usuario
  - **Seguridad**: Cambio de contraseña y sesiones
  - **Preferencias**: Configuraciones del usuario
  - **Mis Entradas**: Historial de tickets (pendiente)

#### Funcionalidades del Perfil Personal
- **Campos editables:**
  - Nombre y apellido
  - Teléfono
  - Fecha de nacimiento
  - Dirección
  - Provincia (selector con provincias de Costa Rica)
  - Biografía (textarea)

- **Campos de solo lectura:**
  - Email (por seguridad)
  - Nombre completo (calculado)

#### Características de UX
- **Modo de edición:** Botón "Editar" que habilita la edición de campos
- **Validación:** Campos requeridos y validación de formato
- **Loading states:** Indicadores de carga durante operaciones
- **Manejo de errores:** Mensajes de error claros
- **Responsive design:** Adaptable a diferentes tamaños de pantalla

#### API Functions (userProfile.js)
- `getCurrentUserProfile()`: Obtener perfil del usuario actual
- `updateCurrentUserProfile()`: Actualizar perfil del usuario actual
- `getUserProfileById()`: Obtener perfil por ID (admin)
- `updateUserProfile()`: Actualizar perfil por ID (admin)

## Flujo de Uso

### Para Usuarios Regulares
1. Iniciar sesión en la aplicación
2. Navegar a "Mi Perfil"
3. Hacer clic en "Editar" en la pestaña Personal
4. Modificar los campos deseados
5. Hacer clic en "Guardar"

### Para Administradores
1. Acceder al perfil de cualquier usuario
2. Editar información incluyendo roles
3. Gestionar permisos y configuraciones

## Permisos y Seguridad

### Roles de Usuario
- **Cliente:** Puede ver y editar su propio perfil
- **Admin:** Puede gestionar perfiles de todos los usuarios

### Validaciones
- Autenticación requerida para todas las operaciones
- Validación de datos en frontend y backend
- Sanitización de inputs
- Manejo seguro de archivos de imagen

## Configuración Técnica

### Dependencias Backend
- Django 4.x+
- Django REST Framework
- Django REST Framework Simple JWT
- Pillow (para manejo de imágenes)

### Dependencias Frontend
- React 18+
- Axios (para llamadas API)
- Framer Motion (para animaciones)
- Lucide React (para iconos)
- Tailwind CSS (para estilos)

## Migraciones Realizadas
- Se creó automáticamente la migración `0022_alter_userprofile_bio.py`
- Se aplicó la migración para actualizar la base de datos

## Próximas Mejoras Sugeridas

1. **Subida de imágenes:** Implementar drag & drop para fotos de perfil
2. **Validación avanzada:** Validación de formato de teléfono y fecha
3. **Notificaciones:** Sistema de notificaciones para cambios de perfil
4. **Historial:** Registro de cambios en el perfil
5. **Exportación:** Permitir exportar datos del perfil
6. **Temas:** Opción de tema claro/oscuro en preferencias

## Troubleshooting

### Problemas Comunes
1. **Error 404 al cargar perfil:** Verificar que el usuario esté autenticado
2. **Error al guardar:** Verificar que todos los campos requeridos estén completos
3. **Imagen no se carga:** Verificar permisos de carpeta media y configuración de MEDIA_URL

### Logs
- Los errores se registran en `serializer_error.log`
- Verificar logs de Django para errores del backend
- Verificar consola del navegador para errores del frontend 