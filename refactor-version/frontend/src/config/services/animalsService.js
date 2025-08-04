import axiosInstance from './axiosConfig';

/**
 * Servicio de Animales
 * Maneja todas las operaciones CRUD relacionadas con animales del parque marino
 */

const animalsService = {
  /**
   * Obtener lista de todos los animales
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {string} params.search - Término de búsqueda
   * @param {string} params.species - Filtrar por especie
   * @param {string} params.habitat - Filtrar por hábitat
   * @returns {Promise<object>} Lista de animales
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/animals/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo animales:', error);
      throw error;
    }
  },

  /**
   * Obtener un animal específico por ID
   * @param {number} id - ID del animal
   * @returns {Promise<object>} Datos del animal
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/animals/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo animal
   * @param {object} animalData - Datos del animal a crear
   * @param {string} animalData.name - Nombre del animal
   * @param {string} animalData.species - Especie del animal
   * @param {string} animalData.habitat - Hábitat del animal
   * @param {string} animalData.description - Descripción del animal
   * @param {File} animalData.image - Imagen del animal (opcional)
   * @returns {Promise<object>} Animal creado
   */
  create: async (animalData) => {
    try {
      // Si hay una imagen, usar FormData para envío multipart
      let data = animalData;
      let headers = {};
      
      if (animalData.image instanceof File) {
        data = new FormData();
        Object.keys(animalData).forEach(key => {
          data.append(key, animalData[key]);
        });
        headers['Content-Type'] = 'multipart/form-data';
      }
      
      const response = await axiosInstance.post('/animals/create/', data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creando animal:', error);
      throw error;
    }
  },

  /**
   * Actualizar un animal existente
   * @param {number} id - ID del animal a actualizar
   * @param {object} animalData - Datos actualizados del animal
   * @returns {Promise<object>} Animal actualizado
   */
  update: async (id, animalData) => {
    try {
      // Si hay una imagen, usar FormData para envío multipart
      let data = animalData;
      let headers = {};
      
      if (animalData.image instanceof File) {
        data = new FormData();
        Object.keys(animalData).forEach(key => {
          data.append(key, animalData[key]);
        });
        headers['Content-Type'] = 'multipart/form-data';
      }
      
      const response = await axiosInstance.put(`/animals/${id}/update/`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un animal
   * @param {number} id - ID del animal a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/animals/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener animales por especie
   * @param {number} speciesId - ID de la especie
   * @returns {Promise<object>} Lista de animales de la especie
   */
  getBySpecies: async (speciesId) => {
    try {
      const response = await axiosInstance.get('/animals/', {
        params: { species: speciesId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo animales por especie ${speciesId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener animales por hábitat
   * @param {number} habitatId - ID del hábitat
   * @returns {Promise<object>} Lista de animales del hábitat
   */
  getByHabitat: async (habitatId) => {
    try {
      const response = await axiosInstance.get('/animals/', {
        params: { habitat: habitatId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo animales por hábitat ${habitatId}:`, error);
      throw error;
    }
  },

  /**
   * Buscar animales por término de búsqueda
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<object>} Lista de animales que coinciden con la búsqueda
   */
  search: async (searchTerm) => {
    try {
      const response = await axiosInstance.get('/animals/', {
        params: { search: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando animales con término "${searchTerm}":`, error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de animales
   * @returns {Promise<object>} Estadísticas de animales
   */
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/animals/stats/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de animales:', error);
      throw error;
    }
  },

  /**
   * Obtener animales destacados o populares
   * @param {number} limit - Límite de animales a obtener
   * @returns {Promise<object>} Lista de animales destacados
   */
  getFeatured: async (limit = 6) => {
    try {
      const response = await axiosInstance.get('/animals/featured/', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo animales destacados:', error);
      throw error;
    }
  },
};

export default animalsService;