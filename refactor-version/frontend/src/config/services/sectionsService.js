import axiosInstance from './axiosConfig';

/**
 * Servicio de Secciones
 * Maneja todas las operaciones relacionadas con las secciones del parque marino
 */

const sectionsService = {
  /**
   * Obtener lista de todas las secciones
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {boolean} params.is_active - Filtrar por secciones activas
   * @param {string} params.search - Búsqueda por nombre o descripción
   * @returns {Promise<object>} Lista de secciones
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/sections/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo secciones:', error);
      throw error;
    }
  },

  /**
   * Obtener una sección específica por ID
   * @param {number} id - ID de la sección
   * @returns {Promise<object>} Datos de la sección
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/sections/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo sección ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva sección
   * @param {object} sectionData - Datos de la sección a crear
   * @param {string} sectionData.name - Nombre de la sección
   * @param {string} sectionData.description - Descripción de la sección
   * @param {string} sectionData.location - Ubicación de la sección
   * @param {number} sectionData.capacity - Capacidad máxima de visitantes
   * @param {boolean} sectionData.is_active - Si la sección está activa
   * @param {string} sectionData.opening_hours - Horarios de apertura
   * @param {string} sectionData.special_requirements - Requerimientos especiales
   * @returns {Promise<object>} Sección creada
   */
  create: async (sectionData) => {
    try {
      const response = await axiosInstance.post('/sections/create/', sectionData);
      return response.data;
    } catch (error) {
      console.error('Error creando sección:', error);
      throw error;
    }
  },

  /**
   * Actualizar una sección existente
   * @param {number} id - ID de la sección a actualizar
   * @param {object} sectionData - Datos actualizados de la sección
   * @returns {Promise<object>} Sección actualizada
   */
  update: async (id, sectionData) => {
    try {
      const response = await axiosInstance.put(`/sections/${id}/update/`, sectionData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando sección ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una sección
   * @param {number} id - ID de la sección a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/sections/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando sección ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener secciones activas
   * @returns {Promise<object>} Lista de secciones activas
   */
  getActive: async () => {
    try {
      const response = await axiosInstance.get('/sections/', {
        params: { is_active: true }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo secciones activas:', error);
      throw error;
    }
  },

  /**
   * Obtener animales de una sección específica
   * @param {number} sectionId - ID de la sección
   * @returns {Promise<object>} Lista de animales en la sección
   */
  getAnimals: async (sectionId) => {
    try {
      const response = await axiosInstance.get(`/sections/${sectionId}/animals/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo animales de la sección ${sectionId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de una sección
   * @param {number} sectionId - ID de la sección
   * @returns {Promise<object>} Estadísticas de la sección
   */
  getStats: async (sectionId) => {
    try {
      const response = await axiosInstance.get(`/sections/${sectionId}/stats/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estadísticas de la sección ${sectionId}:`, error);
      throw error;
    }
  },

  /**
   * Buscar secciones
   * @param {string} query - Término de búsqueda
   * @param {object} filters - Filtros adicionales
   * @returns {Promise<object>} Resultados de búsqueda
   */
  search: async (query, filters = {}) => {
    try {
      const response = await axiosInstance.get('/sections/search/', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando secciones:', error);
      throw error;
    }
  },
};

export default sectionsService;