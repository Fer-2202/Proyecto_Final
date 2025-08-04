import axiosInstance from './axiosConfig';

/**
 * Servicio de Provincias
 * Maneja todas las operaciones relacionadas con las provincias de Costa Rica
 */

const provincesService = {
  /**
   * Obtener lista de todas las provincias
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {boolean} params.is_active - Filtrar por provincias activas
   * @param {string} params.search - Búsqueda por nombre
   * @returns {Promise<object>} Lista de provincias
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/provinces/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo provincias:', error);
      throw error;
    }
  },

  /**
   * Obtener una provincia específica por ID
   * @param {number} id - ID de la provincia
   * @returns {Promise<object>} Datos de la provincia
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/provinces/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo provincia ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva provincia
   * @param {object} provinceData - Datos de la provincia a crear
   * @param {string} provinceData.name - Nombre de la provincia
   * @param {string} provinceData.code - Código de la provincia
   * @param {string} provinceData.capital - Capital de la provincia
   * @param {number} provinceData.area - Área en km²
   * @param {number} provinceData.population - Población
   * @param {string} provinceData.description - Descripción de la provincia
   * @param {boolean} provinceData.is_active - Si la provincia está activa
   * @returns {Promise<object>} Provincia creada
   */
  create: async (provinceData) => {
    try {
      const response = await axiosInstance.post('/provinces/create/', provinceData);
      return response.data;
    } catch (error) {
      console.error('Error creando provincia:', error);
      throw error;
    }
  },

  /**
   * Actualizar una provincia existente
   * @param {number} id - ID de la provincia a actualizar
   * @param {object} provinceData - Datos actualizados de la provincia
   * @returns {Promise<object>} Provincia actualizada
   */
  update: async (id, provinceData) => {
    try {
      const response = await axiosInstance.put(`/provinces/${id}/update/`, provinceData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando provincia ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una provincia
   * @param {number} id - ID de la provincia a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/provinces/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando provincia ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener provincias activas
   * @returns {Promise<object>} Lista de provincias activas
   */
  getActive: async () => {
    try {
      const response = await axiosInstance.get('/provinces/', {
        params: { is_active: true }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo provincias activas:', error);
      throw error;
    }
  },

  /**
   * Obtener cantones de una provincia específica
   * @param {number} provinceId - ID de la provincia
   * @returns {Promise<object>} Lista de cantones de la provincia
   */
  getCantons: async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/provinces/${provinceId}/cantons/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cantones de la provincia ${provinceId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener distritos de una provincia específica
   * @param {number} provinceId - ID de la provincia
   * @returns {Promise<object>} Lista de distritos de la provincia
   */
  getDistricts: async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/provinces/${provinceId}/districts/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo distritos de la provincia ${provinceId}:`, error);
      throw error;
    }
  },

  /**
   * Buscar provincias
   * @param {string} query - Término de búsqueda
   * @param {object} filters - Filtros adicionales
   * @returns {Promise<object>} Resultados de búsqueda
   */
  search: async (query, filters = {}) => {
    try {
      const response = await axiosInstance.get('/provinces/search/', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando provincias:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de una provincia
   * @param {number} provinceId - ID de la provincia
   * @returns {Promise<object>} Estadísticas de la provincia
   */
  getStats: async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/provinces/${provinceId}/stats/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estadísticas de la provincia ${provinceId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener visitantes por provincia
   * @param {object} params - Parámetros de filtrado
   * @param {Date} params.start_date - Fecha de inicio
   * @param {Date} params.end_date - Fecha de fin
   * @returns {Promise<object>} Estadísticas de visitantes por provincia
   */
  getVisitorStats: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/provinces/visitor-stats/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de visitantes por provincia:', error);
      throw error;
    }
  },

  /**
   * Obtener información geográfica de una provincia
   * @param {number} provinceId - ID de la provincia
   * @returns {Promise<object>} Información geográfica
   */
  getGeographicInfo: async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/provinces/${provinceId}/geographic-info/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo información geográfica de la provincia ${provinceId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener códigos postales de una provincia
   * @param {number} provinceId - ID de la provincia
   * @returns {Promise<object>} Lista de códigos postales
   */
  getPostalCodes: async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/provinces/${provinceId}/postal-codes/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo códigos postales de la provincia ${provinceId}:`, error);
      throw error;
    }
  },
};

export default provincesService;