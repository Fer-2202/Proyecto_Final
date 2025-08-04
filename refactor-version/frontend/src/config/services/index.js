/**
 * Archivo índice de servicios
 * Exporta todos los servicios del backend para facilitar su importación
 */

// Configuración de Axios - debe importarse primero
export { default as axiosInstance } from './axiosConfig';
export { authUtils, errorUtils } from './axiosConfig';

// Importar servicios después de la configuración de axios
import authServiceModule from './authService';
import animalsServiceModule from './animalsService';
import exhibitionsServiceModule from './exhibitionsService';
import ticketsServiceModule from './ticketsService';
import paymentsServiceModule from './paymentsService';
import visitsServiceModule from './visitsService';
import educationalServicesServiceModule from './educationalServicesService';
import sectionsServiceModule from './sectionsService';
import speciesServiceModule from './speciesService';
import provincesServiceModule from './provincesService';

// Exportar servicios individuales
export const authService = authServiceModule;
export const animalsService = animalsServiceModule;
export const exhibitionsService = exhibitionsServiceModule;
export const ticketsService = ticketsServiceModule;
export const paymentsService = paymentsServiceModule;
export const visitsService = visitsServiceModule;
export const educationalServicesService = educationalServicesServiceModule;
export const sectionsService = sectionsServiceModule;
export const speciesService = speciesServiceModule;
export const provincesService = provincesServiceModule;

/**
 * Objeto que contiene todos los servicios para importación conveniente
 * 
 * Uso:
 * import { services } from '@/config/services';
 * const animals = await services.animals.getAll();
 * 
 * O importar servicios individuales:
 * import { animalsService, authService } from '@/config/services';
 */
export const services = {
  auth: authServiceModule,
  animals: animalsServiceModule,
  exhibitions: exhibitionsServiceModule,
  tickets: ticketsServiceModule,
  payments: paymentsServiceModule,
  visits: visitsServiceModule,
  educationalServices: educationalServicesServiceModule,
  sections: sectionsServiceModule,
  species: speciesServiceModule,
  provinces: provincesServiceModule,
};

/**
 * Configuración global de servicios
 * Permite configurar aspectos globales como la URL base, timeouts, etc.
 */
export const serviceConfig = {
  /**
   * Configurar la URL base para todos los servicios
   * @param {string} baseURL - Nueva URL base
   */
  setBaseURL: (baseURL) => {
    if (!baseURL) throw new Error('BaseURL is required');
    axiosInstance.defaults.baseURL = baseURL;
  },

  /**
   * Configurar el timeout global para todas las peticiones
   * @param {number} timeout - Timeout en milisegundos
   */
  setTimeout: (timeout) => {
    if (typeof timeout !== 'number' || timeout <= 0) {
      throw new Error('Timeout must be a positive number');
    }
    axiosInstance.defaults.timeout = timeout;
  },

  /**
   * Configurar encabezados globales
   * @param {object} headers - Encabezados a añadir
   */
  setHeaders: (headers) => {
    if (!headers || typeof headers !== 'object') {
      throw new Error('Headers must be an object');
    }
    Object.assign(axiosInstance.defaults.headers.common, headers);
  },

  /**
   * Obtener la configuración actual de Axios
   * @returns {object} Configuración actual
   */
  getConfig: () => ({
    baseURL: axiosInstance.defaults.baseURL,
    timeout: axiosInstance.defaults.timeout,
    headers: { ...axiosInstance.defaults.headers },
  }),
};

/**
 * Utilidades para manejo de errores comunes
 */
export const serviceUtils = {
  /**
   * Verificar si un error es de red
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de red
   */
  isNetworkError: (error) => Boolean(!error.response && error.request),

  /**
   * Verificar si un error es de autenticación
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de autenticación
   */
  isAuthError: (error) => Boolean(error.response && [401, 403].includes(error.response.status)),

  /**
   * Verificar si un error es de validación
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de validación
   */
  isValidationError: (error) => Boolean(error.response?.status === 422),

  /**
   * Extraer mensaje de error legible
   * @param {Error} error - Error del que extraer el mensaje
   * @returns {string} Mensaje de error legible
   */
  getErrorMessage: (error) => {
    if (!error) return 'Ha ocurrido un error inesperado';
    return error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'Ha ocurrido un error inesperado';
  },

  /**
   * Formatear errores de validación para mostrar en formularios
   * @param {Error} error - Error de validación
   * @returns {object} Objeto con errores por campo
   */
  formatValidationErrors: (error) => {
    const validationErrors = error?.response?.data?.errors;
    if (!validationErrors || typeof validationErrors !== 'object') return {};

    return Object.entries(validationErrors).reduce((acc, [field, fieldErrors]) => ({
      ...acc,
      [field]: Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors,
    }), {});
  },
};

export default services;
