import axiosInstance from './axiosConfig';

/**
 * Servicio de Visitas
 * Maneja todas las operaciones relacionadas con visitas, disponibilidad y programación
 */

const visitsService = {
  // === SERVICIOS DE VISITAS ===

  /**
   * Obtener lista de todas las visitas
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {Date} params.date - Filtrar por fecha específica
   * @param {string} params.status - Filtrar por estado de la visita
   * @param {number} params.user_id - Filtrar por usuario
   * @returns {Promise<object>} Lista de visitas
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/visits/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo visitas:', error);
      throw error;
    }
  },

  /**
   * Obtener una visita específica por ID
   * @param {number} id - ID de la visita
   * @returns {Promise<object>} Datos de la visita
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/visits/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo visita ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva visita
   * @param {object} visitData - Datos de la visita a crear
   * @param {Date} visitData.visit_date - Fecha de la visita
   * @param {string} visitData.visit_time - Hora de la visita
   * @param {number} visitData.number_of_visitors - Número de visitantes
   * @param {string} visitData.visitor_name - Nombre del visitante principal
   * @param {string} visitData.visitor_email - Email del visitante
   * @param {string} visitData.visitor_phone - Teléfono del visitante
   * @param {string} visitData.special_requirements - Requerimientos especiales (opcional)
   * @param {string} visitData.visit_type - Tipo de visita (general, educativa, etc.)
   * @returns {Promise<object>} Visita creada
   */
  create: async (visitData) => {
    try {
      const response = await axiosInstance.post('/visits/create/', visitData);
      return response.data;
    } catch (error) {
      console.error('Error creando visita:', error);
      throw error;
    }
  },

  /**
   * Actualizar una visita existente
   * @param {number} id - ID de la visita a actualizar
   * @param {object} visitData - Datos actualizados de la visita
   * @returns {Promise<object>} Visita actualizada
   */
  update: async (id, visitData) => {
    try {
      const response = await axiosInstance.put(`/visits/${id}/update/`, visitData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando visita ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una visita
   * @param {number} id - ID de la visita a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/visits/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando visita ${id}:`, error);
      throw error;
    }
  },

  /**
   * Confirmar una visita
   * @param {number} id - ID de la visita a confirmar
   * @returns {Promise<object>} Visita confirmada
   */
  confirm: async (id) => {
    try {
      const response = await axiosInstance.post(`/visits/${id}/confirm/`);
      return response.data;
    } catch (error) {
      console.error(`Error confirmando visita ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cancelar una visita
   * @param {number} id - ID de la visita a cancelar
   * @param {string} reason - Razón de la cancelación (opcional)
   * @returns {Promise<object>} Visita cancelada
   */
  cancel: async (id, reason = '') => {
    try {
      const response = await axiosInstance.post(`/visits/${id}/cancel/`, { reason });
      return response.data;
    } catch (error) {
      console.error(`Error cancelando visita ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE VISITAS DISPONIBLES ===

  /**
   * Obtener horarios disponibles para visitas
   * @param {object} params - Parámetros de consulta
   * @param {Date} params.date - Fecha para consultar disponibilidad
   * @param {string} params.visit_type - Tipo de visita
   * @param {number} params.number_of_visitors - Número de visitantes
   * @returns {Promise<object>} Horarios disponibles
   */
  getAvailableSlots: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/visits/available/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo horarios disponibles:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo horario disponible
   * @param {object} slotData - Datos del horario disponible
   * @param {Date} slotData.date - Fecha del horario
   * @param {string} slotData.start_time - Hora de inicio
   * @param {string} slotData.end_time - Hora de fin
   * @param {number} slotData.max_capacity - Capacidad máxima
   * @param {string} slotData.visit_type - Tipo de visita
   * @param {boolean} slotData.is_active - Si el horario está activo
   * @returns {Promise<object>} Horario disponible creado
   */
  createAvailableSlot: async (slotData) => {
    try {
      const response = await axiosInstance.post('/visits/available/create/', slotData);
      return response.data;
    } catch (error) {
      console.error('Error creando horario disponible:', error);
      throw error;
    }
  },

  /**
   * Actualizar un horario disponible
   * @param {number} id - ID del horario disponible
   * @param {object} slotData - Datos actualizados del horario
   * @returns {Promise<object>} Horario disponible actualizado
   */
  updateAvailableSlot: async (id, slotData) => {
    try {
      const response = await axiosInstance.put(`/visits/available/${id}/update/`, slotData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando horario disponible ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un horario disponible
   * @param {number} id - ID del horario disponible a eliminar
   * @returns {Promise<void>}
   */
  deleteAvailableSlot: async (id) => {
    try {
      await axiosInstance.delete(`/visits/available/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando horario disponible ${id}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE VISITAS POR DÍA ===

  /**
   * Obtener visitas programadas para un día específico
   * @param {Date} date - Fecha para consultar visitas
   * @param {object} params - Parámetros adicionales opcionales
   * @param {string} params.status - Filtrar por estado
   * @param {string} params.visit_type - Filtrar por tipo de visita
   * @returns {Promise<object>} Visitas del día
   */
  getVisitsByDay: async (date, params = {}) => {
    try {
      const response = await axiosInstance.get('/visits/by-day/', {
        params: { date, ...params }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo visitas del día ${date}:`, error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de visitas por día
   * @param {Date} date - Fecha para obtener estadísticas
   * @returns {Promise<object>} Estadísticas del día
   */
  getDayStats: async (date) => {
    try {
      const response = await axiosInstance.get('/visits/by-day/stats/', {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estadísticas del día ${date}:`, error);
      throw error;
    }
  },

  /**
   * Obtener capacidad disponible para un día específico
   * @param {Date} date - Fecha para consultar capacidad
   * @param {string} visitType - Tipo de visita (opcional)
   * @returns {Promise<object>} Capacidad disponible
   */
  getDayCapacity: async (date, visitType = null) => {
    try {
      const params = { date };
      if (visitType) params.visit_type = visitType;
      
      const response = await axiosInstance.get('/visits/by-day/capacity/', { params });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo capacidad del día ${date}:`, error);
      throw error;
    }
  },

  // === SERVICIOS ADICIONALES ===

  /**
   * Obtener historial de visitas de un usuario
   * @param {number} userId - ID del usuario
   * @param {object} params - Parámetros de filtrado
   * @param {number} params.page - Número de página
   * @param {number} params.limit - Límite de resultados
   * @returns {Promise<object>} Historial de visitas del usuario
   */
  getUserVisitHistory: async (userId, params = {}) => {
    try {
      const response = await axiosInstance.get(`/visits/user/${userId}/history/`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo historial de visitas del usuario ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Verificar disponibilidad para una fecha y hora específica
   * @param {object} checkData - Datos para verificar disponibilidad
   * @param {Date} checkData.date - Fecha de la visita
   * @param {string} checkData.time - Hora de la visita
   * @param {number} checkData.number_of_visitors - Número de visitantes
   * @param {string} checkData.visit_type - Tipo de visita
   * @returns {Promise<object>} Información de disponibilidad
   */
  checkAvailability: async (checkData) => {
    try {
      const response = await axiosInstance.post('/visits/check-availability/', checkData);
      return response.data;
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas generales de visitas
   * @param {object} params - Parámetros de filtrado
   * @param {Date} params.start_date - Fecha de inicio
   * @param {Date} params.end_date - Fecha de fin
   * @param {string} params.period - Período de agrupación (day, week, month)
   * @returns {Promise<object>} Estadísticas de visitas
   */
  getVisitStats: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/visits/stats/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de visitas:', error);
      throw error;
    }
  },

  /**
   * Generar reporte de visitas
   * @param {object} reportParams - Parámetros del reporte
   * @param {Date} reportParams.start_date - Fecha de inicio
   * @param {Date} reportParams.end_date - Fecha de fin
   * @param {string} reportParams.format - Formato del reporte (pdf, excel, csv)
   * @param {string} reportParams.type - Tipo de reporte (summary, detailed)
   * @returns {Promise<object>} Datos del reporte generado
   */
  generateReport: async (reportParams) => {
    try {
      const response = await axiosInstance.post('/visits/generate-report/', reportParams);
      return response.data;
    } catch (error) {
      console.error('Error generando reporte de visitas:', error);
      throw error;
    }
  },

  /**
   * Enviar recordatorio de visita
   * @param {number} visitId - ID de la visita
   * @param {string} reminderType - Tipo de recordatorio (email, sms)
   * @returns {Promise<object>} Resultado del envío
   */
  sendReminder: async (visitId, reminderType = 'email') => {
    try {
      const response = await axiosInstance.post(`/visits/${visitId}/send-reminder/`, {
        reminder_type: reminderType
      });
      return response.data;
    } catch (error) {
      console.error(`Error enviando recordatorio para visita ${visitId}:`, error);
      throw error;
    }
  },
};

export default visitsService;