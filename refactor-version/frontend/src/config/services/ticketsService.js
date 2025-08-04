import axiosInstance from './axiosConfig';

/**
 * Servicio de Tickets
 * Maneja todas las operaciones relacionadas con tickets y entradas del parque marino
 */

const ticketsService = {
  /**
   * Obtener lista de todos los tickets
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {string} params.search - Término de búsqueda
   * @param {string} params.status - Filtrar por estado del ticket
   * @returns {Promise<object>} Lista de tickets
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/tickets/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tickets:', error);
      throw error;
    }
  },

  /**
   * Obtener un ticket específico por ID
   * @param {number} id - ID del ticket
   * @returns {Promise<object>} Datos del ticket
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tickets/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo ticket ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo ticket
   * @param {object} ticketData - Datos del ticket a crear
   * @param {string} ticketData.type - Tipo de ticket (adulto, niño, estudiante, etc.)
   * @param {number} ticketData.price - Precio del ticket
   * @param {string} ticketData.description - Descripción del ticket
   * @param {boolean} ticketData.is_active - Si el ticket está activo
   * @param {Date} ticketData.valid_from - Fecha de inicio de validez
   * @param {Date} ticketData.valid_until - Fecha de fin de validez
   * @returns {Promise<object>} Ticket creado
   */
  create: async (ticketData) => {
    try {
      const response = await axiosInstance.post('/tickets/create/', ticketData);
      return response.data;
    } catch (error) {
      console.error('Error creando ticket:', error);
      throw error;
    }
  },

  /**
   * Actualizar un ticket existente
   * @param {number} id - ID del ticket a actualizar
   * @param {object} ticketData - Datos actualizados del ticket
   * @returns {Promise<object>} Ticket actualizado
   */
  update: async (id, ticketData) => {
    try {
      const response = await axiosInstance.put(`/tickets/${id}/update/`, ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando ticket ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un ticket
   * @param {number} id - ID del ticket a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/tickets/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando ticket ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener tickets disponibles para compra
   * @param {object} params - Parámetros de filtrado
   * @param {Date} params.date - Fecha para la cual se quieren tickets
   * @param {number} params.quantity - Cantidad de tickets necesarios
   * @returns {Promise<object>} Lista de tickets disponibles
   */
  getAvailable: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/tickets/available/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tickets disponibles:', error);
      throw error;
    }
  },

  /**
   * Reservar tickets (proceso de compra)
   * @param {object} reservationData - Datos de la reserva
   * @param {Array} reservationData.tickets - Array de tickets a reservar
   * @param {number} reservationData.tickets[].ticket_id - ID del tipo de ticket
   * @param {number} reservationData.tickets[].quantity - Cantidad de tickets
   * @param {Date} reservationData.visit_date - Fecha de la visita
   * @param {object} reservationData.customer_info - Información del cliente
   * @returns {Promise<object>} Datos de la reserva
   */
  reserve: async (reservationData) => {
    try {
      const response = await axiosInstance.post('/tickets/reserve/', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error reservando tickets:', error);
      throw error;
    }
  },

  /**
   * Confirmar compra de tickets
   * @param {object} purchaseData - Datos de la compra
   * @param {string} purchaseData.reservation_id - ID de la reserva
   * @param {object} purchaseData.payment_info - Información de pago
   * @returns {Promise<object>} Confirmación de compra
   */
  purchase: async (purchaseData) => {
    try {
      const response = await axiosInstance.post('/tickets/purchase/', purchaseData);
      return response.data;
    } catch (error) {
      console.error('Error comprando tickets:', error);
      throw error;
    }
  },

  /**
   * Validar un ticket (para entrada al parque)
   * @param {string} ticketCode - Código del ticket a validar
   * @returns {Promise<object>} Resultado de la validación
   */
  validate: async (ticketCode) => {
    try {
      const response = await axiosInstance.post('/tickets/validate/', { code: ticketCode });
      return response.data;
    } catch (error) {
      console.error(`Error validando ticket ${ticketCode}:`, error);
      throw error;
    }
  },

  /**
   * Obtener historial de tickets de un usuario
   * @param {number} userId - ID del usuario (opcional, usa el usuario actual si no se proporciona)
   * @returns {Promise<object>} Historial de tickets
   */
  getUserHistory: async (userId = null) => {
    try {
      const endpoint = userId ? `/tickets/user/${userId}/history/` : '/tickets/my-history/';
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo historial de tickets:', error);
      throw error;
    }
  },

  /**
   * Cancelar una reserva de tickets
   * @param {string} reservationId - ID de la reserva a cancelar
   * @returns {Promise<object>} Resultado de la cancelación
   */
  cancelReservation: async (reservationId) => {
    try {
      const response = await axiosInstance.post(`/tickets/cancel-reservation/`, { reservation_id: reservationId });
      return response.data;
    } catch (error) {
      console.error(`Error cancelando reserva ${reservationId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de tickets
   * @param {object} params - Parámetros de filtrado
   * @param {Date} params.start_date - Fecha de inicio
   * @param {Date} params.end_date - Fecha de fin
   * @returns {Promise<object>} Estadísticas de tickets
   */
  getStats: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/tickets/stats/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de tickets:', error);
      throw error;
    }
  },

  /**
   * Obtener precios actuales de tickets
   * @returns {Promise<object>} Lista de precios de tickets
   */
  getPrices: async () => {
    try {
      const response = await axiosInstance.get('/tickets/prices/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo precios de tickets:', error);
      throw error;
    }
  },

  /**
   * Verificar disponibilidad para una fecha específica
   * @param {Date} date - Fecha a verificar
   * @returns {Promise<object>} Información de disponibilidad
   */
  checkAvailability: async (date) => {
    try {
      const response = await axiosInstance.get('/tickets/check-availability/', {
        params: { date: date.toISOString().split('T')[0] }
      });
      return response.data;
    } catch (error) {
      console.error(`Error verificando disponibilidad para ${date}:`, error);
      throw error;
    }
  },

  /**
   * Generar código QR para un ticket
   * @param {number} ticketId - ID del ticket
   * @returns {Promise<object>} Datos del código QR
   */
  generateQR: async (ticketId) => {
    try {
      const response = await axiosInstance.get(`/tickets/${ticketId}/qr/`);
      return response.data;
    } catch (error) {
      console.error(`Error generando QR para ticket ${ticketId}:`, error);
      throw error;
    }
  },
};

export default ticketsService;