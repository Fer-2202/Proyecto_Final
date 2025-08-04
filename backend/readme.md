# Backend - Sistema de Gestión de Parque Marino

## Descripción

Este es el backend del sistema de gestión de un parque marino desarrollado con Django y Django REST Framework. El sistema proporciona una API REST completa para gestionar animales, exhibiciones, tickets, visitas, programas educativos y más.

## Tecnologías Utilizadas

- **Django 5.2.3** - Framework web principal
- **Django REST Framework 3.16.0** - Para crear la API REST
- **Django REST Framework SimpleJWT 5.5.0** - Autenticación JWT
- **Django CORS Headers 4.7.0** - Manejo de CORS para el frontend
- **SQLite** - Base de datos por defecto (desarrollo)
- **MySQL** - Base de datos opcional (producción)
- **Pillow 11.2.1** - Procesamiento de imágenes
- **QRCode 8.2** - Generación de códigos QR
- **Python-dotenv 0.19.2** - Manejo de variables de entorno

## Estructura del Proyecto

```
backend/
├── config/                 # Configuración principal de Django
│   ├── settings.py        # Configuraciones del proyecto
│   ├── urls.py           # URLs principales
│   ├── .env              # Variables de entorno
│   └── wsgi.py           # Configuración WSGI
├── api/                   # Aplicación principal de la API
│   ├── animales/         # Gestión de animales
│   ├── auth/             # Autenticación y usuarios
│   ├── conservation_status/ # Estados de conservación
│   ├── documentos/       # Gestión de documentos
│   ├── exhibiciones/     # Exhibiciones del parque
│   ├── habitats/         # Hábitats de los animales
│   ├── payments/         # Sistema de pagos
│   ├── programas-educativos/ # Programas educativos
│   ├── provinces/        # Provincias de Costa Rica
│   ├── purchase_orders/  # Órdenes de compra
│   ├── sections/         # Secciones del parque
│   ├── servicios-educativos/ # Servicios educativos
│   ├── species/          # Especies de animales
│   ├── tickets/          # Sistema de tickets
│   ├── tickets_purchase/ # Compra de tickets
│   ├── visits/           # Gestión de visitas
│   └── apiLog/           # Logs de auditoría
├── media/                # Archivos multimedia subidos
├── manage.py             # Comando de gestión de Django
├── requirements.txt      # Dependencias del proyecto
└── db.sqlite3           # Base de datos SQLite
```

## Instalación y Configuración

### Prerrequisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Git (opcional, para clonar el repositorio)

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <url-del-repositorio>
   cd Proyecto_Final-1/backend
   ```

2. **Crear un entorno virtual**:
   ```bash
   # En Windows
   python -m venv .venv
   .venv\Scripts\activate
   
   # En macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Instalar las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar las variables de entorno**:
   - El archivo `.env` ya está configurado con valores por defecto
   - Puedes modificar las variables según tus necesidades:
     ```env
     DJANGO_SECRET_KEY='tu-clave-secreta'
     DJANGO_DEBUG=True
     DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
     ```

5. **Ejecutar las migraciones**:
   ```bash
   python manage.py migrate
   ```

6. **Crear un superusuario** (opcional):
   ```bash
   python manage.py createsuperuser
   ```

7. **Ejecutar el servidor de desarrollo**:
   ```bash
   python manage.py runserver
   ```

   El servidor estará disponible en: `http://localhost:8000`

## Configuración de Base de Datos

### SQLite (Por defecto)
El proyecto viene configurado para usar SQLite, ideal para desarrollo:
```env
DATABASE_ENGINE=django.db.backends.sqlite3
DATABASE_NAME=parque_marino_db.sqlite3
```

### MySQL (Producción)
Para usar MySQL, descomenta y configura estas variables en el archivo `.env`:
```env
DATABASE_ENGINE=django.db.backends.mysql
DATABASE_NAME=parque_marino_db
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

## Endpoints de la API

La API está disponible en `http://localhost:8000/api/` y incluye los siguientes módulos:

- **Animales**: `/api/animals/` - Gestión de animales del parque
- **Autenticación**: `/api/auth/` - Login, registro y gestión de usuarios
- **Secciones**: `/api/sections/` - Secciones del parque
- **Provincias**: `/api/provinces/` - Provincias de Costa Rica
- **Especies**: `/api/species/` - Especies de animales
- **Exhibiciones**: `/api/exhibiciones/` - Exhibiciones del parque
- **Servicios Educativos**: `/api/servicios_educativos/` - Servicios educativos
- **Programas Educativos**: `/api/programas_educativos/` - Programas educativos
- **Estados de Conservación**: `/api/conservation_status/` - Estados de conservación
- **Tickets**: `/api/tickets/` - Sistema de tickets
- **Visitas**: `/api/visits/` - Gestión de visitas
- **Órdenes de Compra**: `/api/purchase_orders/` - Órdenes de compra
- **Pagos**: `/api/payments/` - Sistema de pagos
- **Hábitats**: `/api/habitats/` - Hábitats de los animales
- **Documentos**: `/api/documents/` - Gestión de documentos
- **Logs de Auditoría**: `/api/audit_log/` - Logs del sistema

## Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

- **Access Token**: Válido por 5 minutos
- **Refresh Token**: Válido por 1 día
- **Rotación automática** de refresh tokens habilitada

### Ejemplo de uso:
```bash
# Obtener tokens
POST /api/auth/login/
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}

# Usar el token en las peticiones
Authorization: Bearer <access_token>
```

## Configuración de CORS

El backend está configurado para permitir peticiones desde:
- `http://localhost:5173` (Vite - desarrollo)
- `http://127.0.0.1:5173`
- `http://localhost:3000` (React - desarrollo)
- `http://127.0.0.1:3000`

## Comandos Útiles

```bash
# Ejecutar el servidor de desarrollo
python manage.py runserver

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar tests
python manage.py test

# Recopilar archivos estáticos
python manage.py collectstatic

# Abrir shell de Django
python manage.py shell
```

## Archivos Multimedia

Los archivos subidos se almacenan en la carpeta `media/` con la siguiente estructura:
- `media/documentos/` - Documentos subidos
- `media/exhibitions/` - Imágenes de exhibiciones
- `media/profile_pics/` - Fotos de perfil
- `media/programas/` - Archivos de programas educativos
- `media/qr_codes/` - Códigos QR generados
- `media/servicios-educativos/` - Archivos de servicios educativos
- `media/species/` - Imágenes de especies

## Desarrollo

### Agregar un nuevo módulo

1. Crear una nueva carpeta en `api/`
2. Crear los archivos necesarios:
   - `__init__.py`
   - `models.py` - Modelos de base de datos
   - `serializers.py` - Serializadores para la API
   - `views.py` - Vistas de la API
   - `urls.py` - URLs del módulo

3. Agregar las URLs en `api/urls.py`:
   ```python
   path('nuevo_modulo/', include('api.nuevo_modulo.urls')),
   ```

4. Crear y aplicar migraciones:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Estructura de archivos por módulo

Cada módulo sigue esta estructura estándar:
- **models.py**: Define los modelos de base de datos
- **serializers.py**: Convierte los modelos a JSON y viceversa
- **views.py**: Lógica de negocio y endpoints de la API
- **urls.py**: Rutas específicas del módulo

## Solución de Problemas

### Error de migraciones
```bash
# Resetear migraciones (¡CUIDADO: Borra datos!)
python manage.py migrate --fake api zero
python manage.py migrate
```

### Error de dependencias
```bash
# Reinstalar dependencias
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

### Error de permisos en archivos multimedia
- Verificar que la carpeta `media/` tenga permisos de escritura
- En sistemas Unix: `chmod 755 media/`

## Contribución

1. Crear una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Realizar los cambios necesarios
3. Ejecutar los tests: `python manage.py test`
4. Hacer commit de los cambios: `git commit -m "Descripción del cambio"`
5. Hacer push de la rama: `git push origin feature/nueva-funcionalidad`
6. Crear un Pull Request

## Licencia

[Especificar la licencia del proyecto]

## Contacto

[Información de contacto del equipo de desarrollo]