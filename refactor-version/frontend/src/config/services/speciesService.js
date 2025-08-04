import axiosInstance from './axiosConfig';

/**
 * Servicio de Especies
 * Maneja todas las operaciones relacionadas con las especies marinas
 */

const speciesService = {
  /**
   * Obtener lista de todas las especies
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {string} params.conservation_status - Filtrar por estado de conservación
   * @param {string} params.habitat - Filtrar por hábitat
   * @param {string} params.search - Búsqueda por nombre científico o común
   * @param {string} params.category - Filtrar por categoría (mamífero, pez, etc.)
   * @returns {Promise<object>} Lista de especies
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/species/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especies:', error);
      throw error;
    }
  },

  /**
   * Obtener una especie específica por ID
   * @param {number} id - ID de la especie
   * @returns {Promise<object>} Datos de la especie
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/species/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo especie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva especie
   * @param {object} speciesData - Datos de la especie a crear
   * @param {string} speciesData.scientific_name - Nombre científico
   * @param {string} speciesData.common_name - Nombre común
   * @param {string} speciesData.family - Familia taxonómica
   * @param {string} speciesData.order - Orden taxonómico
   * @param {string} speciesData.class - Clase taxonómica
   * @param {string} speciesData.description - Descripción de la especie
   * @param {string} speciesData.habitat - Hábitat natural
   * @param {string} speciesData.diet - Dieta
   * @param {string} speciesData.conservation_status - Estado de conservación
   * @param {number} speciesData.average_lifespan - Esperanza de vida promedio
   * @param {number} speciesData.average_size - Tamaño promedio
   * @param {number} speciesData.average_weight - Peso promedio
   * @returns {Promise<object>} Especie creada
   */
  create: async (speciesData) => {
    try {
      const response = await axiosInstance.post('/species/create/', speciesData);
      return response.data;
    } catch (error) {
      console.error('Error creando especie:', error);
      throw error;
    }
  },

  /**
   * Actualizar una especie existente
   * @param {number} id - ID de la especie a actualizar
   * @param {object} speciesData - Datos actualizados de la especie
   * @returns {Promise<object>} Especie actualizada
   */
  update: async (id, speciesData) => {
    try {
      const response = await axiosInstance.put(`/species/${id}/update/`, speciesData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando especie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una especie
   * @param {number} id - ID de la especie a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/species/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando especie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener especies por estado de conservación
   * @param {string} status - Estado de conservación (EN, VU, CR, etc.)
   * @returns {Promise<object>} Lista de especies filtradas
   */
  getByConservationStatus: async (status) => {
    try {
      const response = await axiosInstance.get('/species/', {
        params: { conservation_status: status }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo especies con estado ${status}:`, error);
      throw error;
    }
  },

  /**
   * Obtener especies por hábitat
   * @param {string} habitat - Tipo de hábitat
   * @returns {Promise<object>} Lista de especies del hábitat
   */
  getByHabitat: async (habitat) => {
    try {
      const response = await axiosInstance.get('/species/', {
        params: { habitat }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo especies del hábitat ${habitat}:`, error);
      throw error;
    }
  },

  /**
   * Obtener especies en peligro de extinción
   * @returns {Promise<object>} Lista de especies en peligro
   */
  getEndangered: async () => {
    try {
      const response = await axiosInstance.get('/species/endangered/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especies en peligro:', error);
      throw error;
    }
  },

  /**
   * Buscar especies
   * @param {string} query - Término de búsqueda
   * @param {object} filters - Filtros adicionales
   * @returns {Promise<object>} Resultados de búsqueda
   */
  search: async (query, filters = {}) => {
    try {
      const response = await axiosInstance.get('/species/search/', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando especies:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de especies
   * @returns {Promise<object>} Estadísticas de especies
   */
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/species/stats/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de especies:', error);
      throw error;
    }
  },

  /**
   * Obtener taxonomía completa de una especie
   * @param {number} id - ID de la especie
   * @returns {Promise<object>} Información taxonómica completa
   */
  getTaxonomy: async (id) => {
    try {
      const response = await axiosInstance.get(`/species/${id}/taxonomy/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo taxonomía de la especie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener animales de una especie específica
   * @param {number} speciesId - ID de la especie
   * @returns {Promise<object>} Lista de animales de la especie
   */
  getAnimals: async (speciesId) => {
    try {
      const response = await axiosInstance.get(`/species/${speciesId}/animals/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo animales de la especie ${speciesId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener especies relacionadas
   * @param {number} speciesId - ID de la especie
   * @param {number} limit - Límite de especies relacionadas
   * @returns {Promise<object>} Lista de especies relacionadas
   */
  getRelated: async (speciesId, limit = 5) => {
    try {
      const response = await axiosInstance.get(`/species/${speciesId}/related/`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo especies relacionadas a ${speciesId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener categorías de especies disponibles
   * @returns {Promise<object>} Lista de categorías
   */
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/species/categories/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo categorías de especies:', error);
      throw error;
    }
  },

  /**
   * Obtener estados de conservación disponibles
   * @returns {Promise<object>} Lista de estados de conservación
   */
  getConservationStatuses: async () => {
    try {
      const response = await axiosInstance.get('/species/conservation-statuses/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estados de conservación:', error);
      throw error;
    }
  },
};

export default speciesService;