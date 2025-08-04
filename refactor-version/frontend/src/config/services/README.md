# Servicios del Backend - Parque Marino

Este directorio contiene todos los servicios del frontend para comunicarse con el backend del Parque Marino. Los servicios están organizados por funcionalidad y utilizan Axios para realizar las peticiones HTTP.

## Estructura de Archivos

```
services/
├── axiosConfig.js                    # Configuración principal de Axios
├── authService.js                     # Servicios de autenticación
├── animalsService.js                  # Servicios de animales
├── exhibitionsService.js              # Servicios de exhibiciones
├── ticketsService.js                  # Servicios de tickets
├── paymentsService.js                 # Servicios de pagos y donaciones
├── visitsService.js                   # Servicios de visitas
├── educationalServicesService.js      # Servicios educativos
├── sectionsService.js                 # Servicios de secciones
├── speciesService.js                  # Servicios de especies
├── provincesService.js                # Servicios de provincias
├── index.js                          # Archivo índice para exportaciones
└── README.md                         # Esta documentación
```

## Configuración de Axios

El archivo `axiosConfig.js` contiene la configuración principal de Axios con:

- **URL Base**: `http://localhost:8000/api` (configurable)
- **Timeout**: 30 segundos
- **Cookies**: Habilitadas con `withCredentials: true`
- **Interceptores**: Para manejo automático de tokens y errores
- **Encabezados**: Content-Type y Accept configurados para JSON

### Características principales:

1. **Manejo automático de tokens**: Los tokens de autenticación se añaden automáticamente a las peticiones
2. **Manejo de errores**: Interceptores que manejan errores comunes (401, 403, 404, etc.)
3. **CSRF Protection**: Tokens CSRF añadidos automáticamente
4. **Utilidades**: Funciones auxiliares para manejo de autenticación y errores

## Uso de los Servicios

### Importación Individual

```javascript
import { authService, animalsService } from '@/config/services';

// Usar el servicio
const animals = await animalsService.getAll();
const user = await authService.login({ email, password });
```

### Importación del Objeto de Servicios

```javascript
import { services } from '@/config/services';

// Usar los servicios
const animals = await services.animals.getAll();
const user = await services.auth.login({ email, password });
```

### Importación de la Instancia de Axios

```javascript
import { axiosInstance } from '@/config/services';

// Usar Axios directamente
const response = await axiosInstance.get('/custom-endpoint/');
```

## Servicios Disponibles

### 1. Servicio de Autenticación (`authService`)

```javascript
// Login
const user = await authService.login({ email, password });

// Registro
const newUser = await authService.register({ name, email, password });

// Obtener perfil
const profile = await authService.getProfile();

// Logout
await authService.logout();
```

### 2. Servicio de Animales (`animalsService`)

```javascript
// Obtener todos los animales
const animals = await animalsService.getAll({ page: 1, limit: 10 });

// Obtener animal por ID
const animal = await animalsService.getById(1);

// Crear animal
const newAnimal = await animalsService.create(animalData);

// Buscar animales
const results = await animalsService.search('delfín');
```

### 3. Servicio de Exhibiciones (`exhibitionsService`)

```javascript
// Obtener exhibiciones
const exhibitions = await exhibitionsService.getAll();

// Obtener exhibición con detalles completos
const exhibition = await exhibitionsService.getById(1);

// Subir imagen
const image = await exhibitionsService.uploadImage({
  exhibition_id: 1,
  image: file,
  alt_text: 'Descripción'
});
```

### 4. Servicio de Tickets (`ticketsService`)

```javascript
// Obtener tickets disponibles
const availableTickets = await ticketsService.getAvailable();

// Comprar tickets
const purchase = await ticketsService.purchase({
  ticket_type: 'general',
  quantity: 2,
  visit_date: '2024-01-15'
});

// Validar ticket
const validation = await ticketsService.validate('QR_CODE');
```

### 5. Servicio de Pagos (`paymentsService`)

```javascript
// Procesar pago con tarjeta
const payment = await paymentsService.processCardPayment({
  card_number: '4111111111111111',
  expiry_month: '12',
  expiry_year: '2025',
  cvv: '123',
  amount: 5000
});

// Crear donación
const donation = await paymentsService.createDonation({
  amount: 10000,
  donor_name: 'Juan Pérez',
  donor_email: 'juan@email.com'
});
```

### 6. Servicio de Visitas (`visitsService`)

```javascript
// Verificar disponibilidad
const availability = await visitsService.checkAvailability({
  date: '2024-01-15',
  time: '10:00',
  number_of_visitors: 4
});

// Crear visita
const visit = await visitsService.create({
  visit_date: '2024-01-15',
  visit_time: '10:00',
  number_of_visitors: 4,
  visitor_name: 'María González',
  visitor_email: 'maria@email.com'
});
```

## Manejo de Errores

Todos los servicios incluyen manejo de errores. Puedes usar las utilidades proporcionadas:

```javascript
import { serviceUtils } from '@/config/services';

try {
  const animals = await animalsService.getAll();
} catch (error) {
  if (serviceUtils.isAuthError(error)) {
    // Redirigir al login
    router.push('/login');
  } else if (serviceUtils.isValidationError(error)) {
    // Mostrar errores de validación
    const validationErrors = serviceUtils.formatValidationErrors(error);
    console.log(validationErrors);
  } else {
    // Mostrar mensaje de error general
    const message = serviceUtils.getErrorMessage(error);
    alert(message);
  }
}
```

## Configuración Global

Puedes configurar aspectos globales de los servicios:

```javascript
import { serviceConfig } from '@/config/services';

// Cambiar URL base
serviceConfig.setBaseURL('https://api.parquemarino.com/api');

// Configurar timeout
serviceConfig.setTimeout(60000); // 60 segundos

// Añadir encabezados globales
serviceConfig.setHeaders({
  'X-Custom-Header': 'valor'
});
```

## Autenticación

Los servicios manejan automáticamente la autenticación mediante:

1. **Tokens en cookies**: Se leen automáticamente
2. **Tokens en localStorage**: Como respaldo
3. **Tokens CSRF**: Se obtienen y envían automáticamente
4. **Renovación automática**: Los tokens se renuevan cuando es necesario

## Interceptores

### Interceptor de Peticiones
- Añade tokens de autenticación automáticamente
- Incluye tokens CSRF en peticiones que los requieren
- Configura encabezados necesarios

### Interceptor de Respuestas
- Maneja errores HTTP comunes
- Limpia autenticación en caso de tokens inválidos
- Redirige al login cuando es necesario
- Muestra mensajes de error apropiados

## Mejores Prácticas

1. **Siempre manejar errores**: Usa try-catch o .catch() en todas las llamadas
2. **Usar loading states**: Indica al usuario cuando se están cargando datos
3. **Validar datos**: Valida los datos antes de enviarlos al backend
4. **Usar TypeScript**: Para mejor tipado y autocompletado (opcional)
5. **Cachear cuando sea apropiado**: Evita peticiones innecesarias

## Ejemplo Completo

```javascript
import { useState, useEffect } from 'react';
import { animalsService, serviceUtils } from '@/config/services';

function AnimalsComponent() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await animalsService.getAll({ limit: 20 });
      setAnimals(data.results || data);
    } catch (err) {
      const message = serviceUtils.getErrorMessage(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {animals.map(animal => (
        <div key={animal.id}>{animal.name}</div>
      ))}
    </div>
  );
}
```

## Soporte

Para problemas o preguntas sobre los servicios:

1. Revisa la consola del navegador para errores detallados
2. Verifica que el backend esté ejecutándose en `http://localhost:8000`
3. Confirma que las URLs de los endpoints coincidan con el backend
4. Revisa la configuración de CORS en el backend