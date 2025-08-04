import axiosInstance from './axiosConfig';

/**
 * Servicio de Exhibiciones
 * Maneja todas las operaciones CRUD relacionadas con exhibiciones del parque marino
 */

const exhibitionsService = {
  /**
   * Obtener lista de todas las exhibiciones
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {string} params.search - Término de búsqueda
   * @returns {Promise<object>} Lista de exhibiciones
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/exhibiciones/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo exhibiciones:', error);
      throw error;
    }
  },

  /**
   * Obtener una exhibición específica por ID
   * @param {number} id - ID de la exhibición
   * @returns {Promise<object>} Datos de la exhibición
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/exhibiciones/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo exhibición ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva exhibición
   * @param {object} exhibitionData - Datos de la exhibición a crear
   * @param {string} exhibitionData.title - Título de la exhibición
   * @param {string} exhibitionData.description - Descripción de la exhibición
   * @param {string} exhibitionData.location - Ubicación de la exhibición
   * @param {Date} exhibitionData.start_date - Fecha de inicio
   * @param {Date} exhibitionData.end_date - Fecha de finalización
   * @returns {Promise<object>} Exhibición creada
   */
  create: async (exhibitionData) => {
    try {
      const response = await axiosInstance.post('/exhibiciones/create/', exhibitionData);
      return response.data;
    } catch (error) {
      console.error('Error creando exhibición:', error);
      throw error;
    }
  },

  /**
   * Actualizar una exhibición existente
   * @param {number} id - ID de la exhibición a actualizar
   * @param {object} exhibitionData - Datos actualizados de la exhibición
   * @returns {Promise<object>} Exhibición actualizada
   */
  update: async (id, exhibitionData) => {
    try {
      const response = await axiosInstance.put(`/exhibiciones/${id}/update/`, exhibitionData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando exhibición ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una exhibición
   * @param {number} id - ID de la exhibición a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/exhibiciones/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando exhibición ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS PARA IMÁGENES DE EXHIBICIONES ===

  /**
   * Obtener todas las imágenes de exhibiciones
   * @returns {Promise<object>} Lista de imágenes
   */
  getAllImages: async () => {
    try {
      const response = await axiosInstance.get('/exhibiciones/imagenes/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo imágenes de exhibiciones:', error);
      throw error;
    }
  },

  /**
   * Obtener imagen específica de exhibición
   * @param {number} id - ID de la imagen
   * @returns {Promise<object>} Datos de la imagen
   */
  getImageById: async (id) => {
    try {
      const response = await axiosInstance.get(`/exhibiciones/imagenes/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo imagen ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nueva imagen para exhibición
   * @param {object} imageData - Datos de la imagen
   * @param {File} imageData.image - Archivo de imagen
   * @param {number} imageData.exhibition_id - ID de la exhibición
   * @param {string} imageData.caption - Descripción de la imagen
   * @returns {Promise<object>} Imagen creada
   */
  createImage: async (imageData) => {
    try {
      const formData = new FormData();
      Object.keys(imageData).forEach(key => {
        formData.append(key, imageData[key]);
      });
      
      const response = await axiosInstance.post('/exhibiciones/imagenes/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creando imagen de exhibición:', error);
      throw error;
    }
  },

  /**
   * Actualizar imagen de exhibición
   * @param {number} id - ID de la imagen
   * @param {object} imageData - Datos actualizados
   * @returns {Promise<object>} Imagen actualizada
   */
  updateImage: async (id, imageData) => {
    try {
      let data = imageData;
      let headers = {};
      
      if (imageData.image instanceof File) {
        data = new FormData();
        Object.keys(imageData).forEach(key => {
          data.append(key, imageData[key]);
        });
        headers['Content-Type'] = 'multipart/form-data';
      }
      
      const response = await axiosInstance.put(`/exhibiciones/imagenes/${id}/update/`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando imagen ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar imagen de exhibición
   * @param {number} id - ID de la imagen a eliminar
   * @returns {Promise<void>}
   */
  deleteImage: async (id) => {
    try {
      await axiosInstance.delete(`/exhibiciones/imagenes/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando imagen ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS PARA DATOS CURIOSOS (FACTS) ===

  /**
   * Obtener todos los datos curiosos de exhibiciones
   * @returns {Promise<object>} Lista de datos curiosos
   */
  getAllFacts: async () => {
    try {
      const response = await axiosInstance.get('/exhibiciones/facts/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo datos curiosos:', error);
      throw error;
    }
  },

  /**
   * Obtener dato curioso específico
   * @param {number} id - ID del dato curioso
   * @returns {Promise<object>} Datos del fact
   */
  getFactById: async (id) => {
    try {
      const response = await axiosInstance.get(`/exhibiciones/facts/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo dato curioso ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo dato curioso
   * @param {object} factData - Datos del fact
   * @param {string} factData.title - Título del dato curioso
   * @param {string} factData.content - Contenido del dato curioso
   * @param {number} factData.exhibition_id - ID de la exhibición
   * @returns {Promise<object>} Dato curioso creado
   */
  createFact: async (factData) => {
    try {
      const response = await axiosInstance.post('/exhibiciones/facts/create/', factData);
      return response.data;
    } catch (error) {
      console.error('Error creando dato curioso:', error);
      throw error;
    }
  },

  /**
   * Actualizar dato curioso
   * @param {number} id - ID del dato curioso
   * @param {object} factData - Datos actualizados
   * @returns {Promise<object>} Dato curioso actualizado
   */
  updateFact: async (id, factData) => {
    try {
      const response = await axiosInstance.put(`/exhibiciones/facts/${id}/update/`, factData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando dato curioso ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar dato curioso
   * @param {number} id - ID del dato curioso a eliminar
   * @returns {Promise<void>}
   */
  deleteFact: async (id) => {
    try {
      await axiosInstance.delete(`/exhibiciones/facts/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando dato curioso ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS PARA DESCRIPCIONES ===

  /**
   * Obtener todas las descripciones de exhibiciones
   * @returns {Promise<object>} Lista de descripciones
   */
  getAllDescriptions: async () => {
    try {
      const response = await axiosInstance.get('/exhibiciones/description/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo descripciones:', error);
      throw error;
    }
  },

  /**
   * Crear nueva descripción
   * @param {object} descriptionData - Datos de la descripción
   * @returns {Promise<object>} Descripción creada
   */
  createDescription: async (descriptionData) => {
    try {
      const response = await axiosInstance.post('/exhibiciones/description/create/', descriptionData);
      return response.data;
    } catch (error) {
      console.error('Error creando descripción:', error);
      throw error;
    }
  },

  /**
   * Actualizar descripción
   * @param {number} id - ID de la descripción
   * @param {object} descriptionData - Datos actualizados
   * @returns {Promise<object>} Descripción actualizada
   */
  updateDescription: async (id, descriptionData) => {
    try {
      const response = await axiosInstance.put(`/exhibiciones/description/${id}/update/`, descriptionData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando descripción ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar descripción
   * @param {number} id - ID de la descripción a eliminar
   * @returns {Promise<void>}
   */
  deleteDescription: async (id) => {
    try {
      await axiosInstance.delete(`/exhibiciones/description/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando descripción ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS PARA BOTONES ===

  /**
   * Obtener todos los botones de exhibiciones
   * @returns {Promise<object>} Lista de botones
   */
  getAllButtons: async () => {
    try {
      const response = await axiosInstance.get('/exhibiciones/buttons/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo botones:', error);
      throw error;
    }
  },

  /**
   * Crear nuevo botón
   * @param {object} buttonData - Datos del botón
   * @returns {Promise<object>} Botón creado
   */
  createButton: async (buttonData) => {
    try {
      const response = await axiosInstance.post('/exhibiciones/buttons/create/', buttonData);
      return response.data;
    } catch (error) {
      console.error('Error creando botón:', error);
      throw error;
    }
  },
};

export default exhibitionsService;