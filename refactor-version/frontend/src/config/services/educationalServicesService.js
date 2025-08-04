import axiosInstance from './axiosConfig';

/**
 * Servicio de Servicios Educativos
 * Maneja todas las operaciones relacionadas con servicios educativos, sus imágenes, datos curiosos, descripciones y botones
 */

const educationalServicesService = {
  // === SERVICIOS EDUCATIVOS PRINCIPALES ===

  /**
   * Obtener lista de todos los servicios educativos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {boolean} params.is_active - Filtrar por servicios activos
   * @param {string} params.category - Filtrar por categoría
   * @param {string} params.search - Búsqueda por nombre o descripción
   * @returns {Promise<object>} Lista de servicios educativos
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener un servicio educativo específico por ID
   * @param {number} id - ID del servicio educativo
   * @returns {Promise<object>} Datos del servicio educativo
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/servicios-educativos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo servicio educativo ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo servicio educativo
   * @param {object} serviceData - Datos del servicio educativo a crear
   * @param {string} serviceData.name - Nombre del servicio
   * @param {string} serviceData.description - Descripción del servicio
   * @param {string} serviceData.category - Categoría del servicio
   * @param {number} serviceData.duration - Duración en minutos
   * @param {number} serviceData.max_participants - Máximo de participantes
   * @param {number} serviceData.price - Precio del servicio
   * @param {boolean} serviceData.is_active - Si el servicio está activo
   * @param {string} serviceData.requirements - Requerimientos especiales
   * @returns {Promise<object>} Servicio educativo creado
   */
  create: async (serviceData) => {
    try {
      const response = await axiosInstance.post('/servicios-educativos/create/', serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creando servicio educativo:', error);
      throw error;
    }
  },

  /**
   * Actualizar un servicio educativo existente
   * @param {number} id - ID del servicio educativo a actualizar
   * @param {object} serviceData - Datos actualizados del servicio educativo
   * @returns {Promise<object>} Servicio educativo actualizado
   */
  update: async (id, serviceData) => {
    try {
      const response = await axiosInstance.put(`/servicios-educativos/${id}/update/`, serviceData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando servicio educativo ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un servicio educativo
   * @param {number} id - ID del servicio educativo a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/servicios-educativos/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando servicio educativo ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE IMÁGENES ===

  /**
   * Obtener todas las imágenes de servicios educativos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.service_id - Filtrar por ID de servicio educativo
   * @returns {Promise<object>} Lista de imágenes
   */
  getAllImages: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/images/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo imágenes de servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener una imagen específica por ID
   * @param {number} id - ID de la imagen
   * @returns {Promise<object>} Datos de la imagen
   */
  getImageById: async (id) => {
    try {
      const response = await axiosInstance.get(`/servicios-educativos/images/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo imagen ${id}:`, error);
      throw error;
    }
  },

  /**
   * Subir una nueva imagen para un servicio educativo
   * @param {object} imageData - Datos de la imagen
   * @param {number} imageData.service_id - ID del servicio educativo
   * @param {File} imageData.image - Archivo de imagen
   * @param {string} imageData.alt_text - Texto alternativo
   * @param {string} imageData.caption - Descripción de la imagen
   * @param {boolean} imageData.is_primary - Si es la imagen principal
   * @returns {Promise<object>} Imagen creada
   */
  uploadImage: async (imageData) => {
    try {
      const formData = new FormData();
      Object.keys(imageData).forEach(key => {
        formData.append(key, imageData[key]);
      });

      const response = await axiosInstance.post('/servicios-educativos/images/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error subiendo imagen de servicio educativo:', error);
      throw error;
    }
  },

  /**
   * Actualizar una imagen existente
   * @param {number} id - ID de la imagen a actualizar
   * @param {object} imageData - Datos actualizados de la imagen
   * @returns {Promise<object>} Imagen actualizada
   */
  updateImage: async (id, imageData) => {
    try {
      const formData = new FormData();
      Object.keys(imageData).forEach(key => {
        if (imageData[key] !== null && imageData[key] !== undefined) {
          formData.append(key, imageData[key]);
        }
      });

      const response = await axiosInstance.put(`/servicios-educativos/images/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando imagen ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una imagen
   * @param {number} id - ID de la imagen a eliminar
   * @returns {Promise<void>}
   */
  deleteImage: async (id) => {
    try {
      await axiosInstance.delete(`/servicios-educativos/images/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando imagen ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE DATOS CURIOSOS ===

  /**
   * Obtener todos los datos curiosos de servicios educativos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.service_id - Filtrar por ID de servicio educativo
   * @returns {Promise<object>} Lista de datos curiosos
   */
  getAllFacts: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/facts/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo datos curiosos de servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener un dato curioso específico por ID
   * @param {number} id - ID del dato curioso
   * @returns {Promise<object>} Datos del dato curioso
   */
  getFactById: async (id) => {
    try {
      const response = await axiosInstance.get(`/servicios-educativos/facts/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo dato curioso ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo dato curioso
   * @param {object} factData - Datos del dato curioso
   * @param {number} factData.service_id - ID del servicio educativo
   * @param {string} factData.title - Título del dato curioso
   * @param {string} factData.content - Contenido del dato curioso
   * @param {number} factData.order - Orden de visualización
   * @returns {Promise<object>} Dato curioso creado
   */
  createFact: async (factData) => {
    try {
      const response = await axiosInstance.post('/servicios-educativos/facts/create/', factData);
      return response.data;
    } catch (error) {
      console.error('Error creando dato curioso:', error);
      throw error;
    }
  },

  /**
   * Actualizar un dato curioso existente
   * @param {number} id - ID del dato curioso a actualizar
   * @param {object} factData - Datos actualizados del dato curioso
   * @returns {Promise<object>} Dato curioso actualizado
   */
  updateFact: async (id, factData) => {
    try {
      const response = await axiosInstance.put(`/servicios-educativos/facts/${id}/update/`, factData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando dato curioso ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un dato curioso
   * @param {number} id - ID del dato curioso a eliminar
   * @returns {Promise<void>}
   */
  deleteFact: async (id) => {
    try {
      await axiosInstance.delete(`/servicios-educativos/facts/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando dato curioso ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE DESCRIPCIONES ===

  /**
   * Obtener todas las descripciones de servicios educativos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.service_id - Filtrar por ID de servicio educativo
   * @returns {Promise<object>} Lista de descripciones
   */
  getAllDescriptions: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/descriptions/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo descripciones de servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener una descripción específica por ID
   * @param {number} id - ID de la descripción
   * @returns {Promise<object>} Datos de la descripción
   */
  getDescriptionById: async (id) => {
    try {
      const response = await axiosInstance.get(`/servicios-educativos/descriptions/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo descripción ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva descripción
   * @param {object} descriptionData - Datos de la descripción
   * @param {number} descriptionData.service_id - ID del servicio educativo
   * @param {string} descriptionData.title - Título de la descripción
   * @param {string} descriptionData.content - Contenido de la descripción
   * @param {string} descriptionData.type - Tipo de descripción (overview, details, etc.)
   * @param {number} descriptionData.order - Orden de visualización
   * @returns {Promise<object>} Descripción creada
   */
  createDescription: async (descriptionData) => {
    try {
      const response = await axiosInstance.post('/servicios-educativos/descriptions/create/', descriptionData);
      return response.data;
    } catch (error) {
      console.error('Error creando descripción:', error);
      throw error;
    }
  },

  /**
   * Actualizar una descripción existente
   * @param {number} id - ID de la descripción a actualizar
   * @param {object} descriptionData - Datos actualizados de la descripción
   * @returns {Promise<object>} Descripción actualizada
   */
  updateDescription: async (id, descriptionData) => {
    try {
      const response = await axiosInstance.put(`/servicios-educativos/descriptions/${id}/update/`, descriptionData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando descripción ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una descripción
   * @param {number} id - ID de la descripción a eliminar
   * @returns {Promise<void>}
   */
  deleteDescription: async (id) => {
    try {
      await axiosInstance.delete(`/servicios-educativos/descriptions/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando descripción ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE BOTONES ===

  /**
   * Obtener todos los botones de servicios educativos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.service_id - Filtrar por ID de servicio educativo
   * @returns {Promise<object>} Lista de botones
   */
  getAllButtons: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/buttons/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo botones de servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener un botón específico por ID
   * @param {number} id - ID del botón
   * @returns {Promise<object>} Datos del botón
   */
  getButtonById: async (id) => {
    try {
      const response = await axiosInstance.get(`/servicios-educativos/buttons/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo botón ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo botón
   * @param {object} buttonData - Datos del botón
   * @param {number} buttonData.service_id - ID del servicio educativo
   * @param {string} buttonData.text - Texto del botón
   * @param {string} buttonData.url - URL del botón
   * @param {string} buttonData.type - Tipo de botón (primary, secondary, etc.)
   * @param {string} buttonData.icon - Icono del botón (opcional)
   * @param {number} buttonData.order - Orden de visualización
   * @param {boolean} buttonData.is_active - Si el botón está activo
   * @returns {Promise<object>} Botón creado
   */
  createButton: async (buttonData) => {
    try {
      const response = await axiosInstance.post('/servicios-educativos/buttons/create/', buttonData);
      return response.data;
    } catch (error) {
      console.error('Error creando botón:', error);
      throw error;
    }
  },

  /**
   * Actualizar un botón existente
   * @param {number} id - ID del botón a actualizar
   * @param {object} buttonData - Datos actualizados del botón
   * @returns {Promise<object>} Botón actualizado
   */
  updateButton: async (id, buttonData) => {
    try {
      const response = await axiosInstance.put(`/servicios-educativos/buttons/${id}/update/`, buttonData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando botón ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un botón
   * @param {number} id - ID del botón a eliminar
   * @returns {Promise<void>}
   */
  deleteButton: async (id) => {
    try {
      await axiosInstance.delete(`/servicios-educativos/buttons/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando botón ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS ADICIONALES ===

  /**
   * Obtener servicios educativos destacados
   * @param {number} limit - Límite de servicios a obtener
   * @returns {Promise<object>} Lista de servicios destacados
   */
  getFeatured: async (limit = 6) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/featured/', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo servicios educativos destacados:', error);
      throw error;
    }
  },

  /**
   * Buscar servicios educativos
   * @param {string} query - Término de búsqueda
   * @param {object} filters - Filtros adicionales
   * @returns {Promise<object>} Resultados de búsqueda
   */
  search: async (query, filters = {}) => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/search/', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando servicios educativos:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de servicios educativos
   * @returns {Promise<object>} Estadísticas de servicios educativos
   */
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/servicios-educativos/stats/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de servicios educativos:', error);
      throw error;
    }
  },
};

export default educationalServicesService;