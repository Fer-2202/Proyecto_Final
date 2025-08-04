import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * axiosConfig.js - Configuración de Axios para el cliente HTTP
 * 
 * PROBLEMA CORS SOLUCIONADO:
 * Error: "Access to XMLHttpRequest has been blocked by CORS policy: 
 * The value of the 'Access-Control-Allow-Credentials' header in the response is '' 
 * which must be 'true' when the request's credentials mode is 'include'"
 * 
 * CAUSA:
 * - Frontend configurado con withCredentials: true
 * - Backend sin CORS_ALLOW_CREDENTIALS = True
 * - Mismatch entre configuraciones de credenciales
 * 
 * SOLUCIÓN:
 * 1. Frontend: withCredentials: true (ya estaba configurado)
 * 2. Backend: CORS_ALLOW_CREDENTIALS = True (agregado en settings.py)
 * 3. Backend: Headers CORS apropiados (agregados en settings.py)
 * 
 * CONFIGURACIÓN INCLUIDA:
 * - URL base del backend
 * - Timeout de 30 segundos
 * - Envío automático de credenciales (cookies, headers auth)
 * - Headers por defecto (Content-Type, Accept)
 * - Interceptadores para requests y responses
 * - Manejo automático de tokens JWT
 * - Manejo de errores HTTP
 */

// URL base del backend - se obtiene de variables de entorno o usa localhost por defecto
// IMPORTANTE: En producción, cambiar VITE_API_URL en el archivo .env
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios con configuración base
// Esta instancia se reutiliza en todos los servicios para mantener consistencia
const axiosInstance = axios.create({
  baseURL: BASE_URL, // URL base para todas las solicitudes
  timeout: 30000, // 30 segundos de timeout para evitar solicitudes colgadas
  
  // withCredentials: true - CRÍTICO para autenticación
  // Permite envío de cookies, headers de autorización y credenciales
  // Debe coincidir con CORS_ALLOW_CREDENTIALS = True en el backend
  withCredentials: true,
  
  // Headers por defecto para todas las solicitudes
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido JSON
    'Accept': 'application/json', // Aceptar respuestas JSON
  },
});

/**
 * Interceptador de solicitudes (Request Interceptor)
 * 
 * FUNCIÓN:
 * Se ejecuta automáticamente antes de enviar cada solicitud HTTP
 * Añade headers de autenticación y seguridad necesarios
 * 
 * CARACTERÍSTICAS:
 * - Añade token JWT automáticamente si existe
 * - Añade token CSRF para protección contra ataques
 * - Logging detallado en modo desarrollo
 * - Manejo de múltiples fuentes de tokens (cookies y localStorage)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener token de autenticación desde múltiples fuentes
    // Prioridad: cookies -> localStorage (cookies más seguras)
    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    
    if (token) {
      // Añadir token JWT al header Authorization con formato Bearer
      // Este header es leído por JWTAuthentication en Django
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Obtener CSRF token para protección contra ataques CSRF
    // Django requiere este token para operaciones que modifican datos
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    // Log detallado de la solicitud en modo desarrollo
    // Útil para debugging y monitoreo de requests
    if (import.meta.env.DEV) {
      console.log('🚀 Enviando solicitud:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Error en interceptador de solicitud:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptador de respuestas (Response Interceptor)
 * Se ejecuta después de recibir cada respuesta HTTP
 * Maneja errores globales y tokens de autenticación
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Log de la respuesta en desarrollo
    if (import.meta.env.DEV) {
      console.log('✅ Respuesta recibida:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    // Verificar si hay un nuevo token en la respuesta
    const newToken = response.headers['authorization'] || response.data?.token;
    if (newToken) {
      const token = newToken.replace('Bearer ', '');
      Cookies.set('authToken', token, { expires: 7 }); // Expira en 7 días
      localStorage.setItem('authToken', token);
    }

    return response;
  },
  (error) => {
    const { response, request, message } = error;

    // Log detallado del error en modo desarrollo
    // Incluye información completa para debugging
    if (import.meta.env.DEV) {
      console.error('❌ Error en respuesta:', {
        status: response?.status,
        url: request?.responseURL,
        message: message,
        data: response?.data,
      });
    }

    // Manejo específico de errores por código de estado HTTP
    if (response) {
      switch (response.status) {
        case 401:
          // Token expirado, no válido o no proporcionado
          // Limpiar toda la información de autenticación
          console.warn('🔒 Token expirado o no válido - limpiando sesión');
          Cookies.remove('authToken');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          
          // Redirigir al login automáticamente (excepto si ya estamos ahí)
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;

        case 403:
          // Usuario autenticado pero sin permisos suficientes
          console.warn('🚫 Acceso prohibido - permisos insuficientes para esta acción');
          break;

        case 404:
          // Recurso o endpoint no encontrado
          console.warn('🔍 Recurso no encontrado - verificar URL del endpoint');
          break;

        case 422:
          // Error de validación en los datos enviados (Django ValidationError)
          console.warn('📝 Error de validación - revisar datos enviados');
          break;

        case 429:
          // Rate limiting - demasiadas solicitudes
          console.warn('⏰ Demasiadas solicitudes - esperar antes de reintentar');
          break;

        case 500:
          // Error interno del servidor
          console.error('🔥 Error interno del servidor - contactar administrador');
          break;

        case 502:
        case 503:
        case 504:
          // Errores de infraestructura/red
          console.error('🌐 Servidor no disponible - problemas de conectividad');
          break;

        default:
          console.error(`❌ Error HTTP ${response.status}:`, response.data?.message || message);
      }
    } else if (request) {
      // Error de red, timeout o problemas CORS
      // NOTA: Los errores CORS aparecen aquí como "Network Error"
      console.error('🌐 Error de conexión (posible CORS, timeout o red):', message);
    } else {
      // Error en la configuración de la solicitud antes de enviarla
      console.error('⚙️ Error de configuración de la solicitud:', message);
    }

    return Promise.reject(error);
  }
);

/**
 * Funciones auxiliares para manejo de autenticación
 * 
 * PROPÓSITO:
 * Centralizar la gestión de tokens de autenticación
 * Proporcionar una interfaz consistente para auth operations
 * 
 * CARACTERÍSTICAS:
 * - Doble almacenamiento: cookies (seguras) + localStorage (fallback)
 * - Limpieza automática de datos de sesión
 * - Verificación de estado de autenticación
 * - Configuración de expiración de tokens
 */
export const authUtils = {
  /**
   * Guardar token de autenticación en múltiples ubicaciones
   * 
   * @param {string} token - Token JWT recibido del backend
   * 
   * ALMACENAMIENTO:
   * - Cookies: Más seguras, enviadas automáticamente con requests
   * - localStorage: Fallback para compatibilidad
   */
  setToken: (token) => {
    // Guardar en cookies con expiración de 7 días
    // httpOnly no se puede usar desde JS, pero expires sí
    Cookies.set('authToken', token, { expires: 7 });
    
    // Guardar también en localStorage como fallback
    localStorage.setItem('authToken', token);
  },

  /**
   * Obtener token de autenticación desde múltiples fuentes
   * 
   * @returns {string|null} Token JWT o null si no existe
   * 
   * PRIORIDAD:
   * 1. Cookies (más seguras)
   * 2. localStorage (fallback)
   */
  getToken: () => {
    return Cookies.get('authToken') || localStorage.getItem('authToken');
  },

  /**
   * Eliminar completamente la sesión del usuario
   * 
   * LIMPIEZA COMPLETA:
   * - Token de autenticación (cookies y localStorage)
   * - Datos del usuario almacenados
   * - Cualquier otra información de sesión
   */
  removeToken: () => {
    // Eliminar token de ambas ubicaciones
    Cookies.remove('authToken');
    localStorage.removeItem('authToken');
    
    // Limpiar datos adicionales de la sesión
    localStorage.removeItem('user');
  },

  /**
   * Verificar si el usuario está autenticado
   * 
   * @returns {boolean} true si hay token, false si no
   * 
   * NOTA: Solo verifica existencia del token, no su validez
   * La validez se verifica en el backend con cada request
   */
  isAuthenticated: () => {
    const token = authUtils.getToken();
    return !!token;
  },
};

/**
 * Funciones auxiliares para manejo de errores
 */
export const errorUtils = {
  /**
   * Extraer mensaje de error de la respuesta
   * @param {object} error - Error de axios
   * @returns {string} Mensaje de error legible
   */
  getErrorMessage: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.response?.data?.detail) {
      return error.response.data.detail;
    }
    if (error.message) {
      return error.message;
    }
    return 'Ha ocurrido un error inesperado';
  },

  /**
   * Verificar si es un error de validación
   * @param {object} error - Error de axios
   * @returns {boolean} True si es error de validación
   */
  isValidationError: (error) => {
    return error.response?.status === 422 || error.response?.status === 400;
  },

  /**
   * Obtener errores de validación por campo
   * @param {object} error - Error de axios
   * @returns {object} Objeto con errores por campo
   */
  getValidationErrors: (error) => {
    if (error.response?.data?.errors) {
      return error.response.data.errors;
    }
    if (error.response?.data?.non_field_errors) {
      return { general: error.response.data.non_field_errors };
    }
    return {};
  },
};

export default axiosInstance;