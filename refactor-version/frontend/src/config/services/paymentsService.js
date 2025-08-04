import axiosInstance from './axiosConfig';

/**
 * Servicio de Pagos y Donaciones
 * Maneja todas las operaciones relacionadas con pagos, métodos de pago y donaciones
 */

const paymentsService = {
  // === SERVICIOS DE PAGOS ===

  /**
   * Obtener lista de todos los pagos
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {string} params.status - Filtrar por estado del pago
   * @param {Date} params.start_date - Fecha de inicio para filtrar
   * @param {Date} params.end_date - Fecha de fin para filtrar
   * @returns {Promise<object>} Lista de pagos
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/payments/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pagos:', error);
      throw error;
    }
  },

  /**
   * Obtener un pago específico por ID
   * @param {number} id - ID del pago
   * @returns {Promise<object>} Datos del pago
   */
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/payments/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pago ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo pago
   * @param {object} paymentData - Datos del pago a crear
   * @param {number} paymentData.amount - Monto del pago
   * @param {string} paymentData.currency - Moneda del pago (CRC, USD, etc.)
   * @param {string} paymentData.payment_method - Método de pago
   * @param {string} paymentData.description - Descripción del pago
   * @param {object} paymentData.metadata - Datos adicionales del pago
   * @returns {Promise<object>} Pago creado
   */
  create: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payments/create/', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creando pago:', error);
      throw error;
    }
  },

  /**
   * Actualizar un pago existente
   * @param {number} id - ID del pago a actualizar
   * @param {object} paymentData - Datos actualizados del pago
   * @returns {Promise<object>} Pago actualizado
   */
  update: async (id, paymentData) => {
    try {
      const response = await axiosInstance.put(`/payments/${id}/update/`, paymentData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando pago ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un pago
   * @param {number} id - ID del pago a eliminar
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/payments/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando pago ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener métodos de pago disponibles
   * @returns {Promise<object>} Lista de métodos de pago
   */
  getPaymentMethods: async () => {
    try {
      const response = await axiosInstance.get('/payments/methods/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo métodos de pago:', error);
      throw error;
    }
  },

  /**
   * Procesar pago con tarjeta de crédito
   * @param {object} cardData - Datos de la tarjeta
   * @param {string} cardData.card_number - Número de tarjeta
   * @param {string} cardData.expiry_month - Mes de expiración
   * @param {string} cardData.expiry_year - Año de expiración
   * @param {string} cardData.cvv - Código de seguridad
   * @param {string} cardData.cardholder_name - Nombre del titular
   * @param {number} cardData.amount - Monto a cobrar
   * @returns {Promise<object>} Resultado del procesamiento
   */
  processCardPayment: async (cardData) => {
    try {
      const response = await axiosInstance.post('/payments/process-card/', cardData);
      return response.data;
    } catch (error) {
      console.error('Error procesando pago con tarjeta:', error);
      throw error;
    }
  },

  /**
   * Procesar pago con PayPal
   * @param {object} paypalData - Datos del pago PayPal
   * @param {string} paypalData.payment_id - ID del pago de PayPal
   * @param {string} paypalData.payer_id - ID del pagador
   * @param {number} paypalData.amount - Monto del pago
   * @returns {Promise<object>} Resultado del procesamiento
   */
  processPayPalPayment: async (paypalData) => {
    try {
      const response = await axiosInstance.post('/payments/process-paypal/', paypalData);
      return response.data;
    } catch (error) {
      console.error('Error procesando pago con PayPal:', error);
      throw error;
    }
  },

  /**
   * Verificar estado de un pago
   * @param {string} paymentId - ID del pago a verificar
   * @returns {Promise<object>} Estado del pago
   */
  verifyPayment: async (paymentId) => {
    try {
      const response = await axiosInstance.get(`/payments/verify/${paymentId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error verificando pago ${paymentId}:`, error);
      throw error;
    }
  },

  /**
   * Reembolsar un pago
   * @param {string} paymentId - ID del pago a reembolsar
   * @param {object} refundData - Datos del reembolso
   * @param {number} refundData.amount - Monto a reembolsar (opcional, por defecto el monto completo)
   * @param {string} refundData.reason - Razón del reembolso
   * @returns {Promise<object>} Resultado del reembolso
   */
  refundPayment: async (paymentId, refundData) => {
    try {
      const response = await axiosInstance.post(`/payments/${paymentId}/refund/`, refundData);
      return response.data;
    } catch (error) {
      console.error(`Error reembolsando pago ${paymentId}:`, error);
      throw error;
    }
  },

  // === SERVICIOS DE DONACIONES ===

  /**
   * Obtener lista de todas las donaciones
   * @param {object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Número de página para paginación
   * @param {number} params.limit - Límite de resultados por página
   * @param {Date} params.start_date - Fecha de inicio para filtrar
   * @param {Date} params.end_date - Fecha de fin para filtrar
   * @returns {Promise<object>} Lista de donaciones
   */
  getAllDonations: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/payments/donations/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo donaciones:', error);
      throw error;
    }
  },

  /**
   * Obtener una donación específica por ID
   * @param {number} id - ID de la donación
   * @returns {Promise<object>} Datos de la donación
   */
  getDonationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/payments/donations/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo donación ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva donación
   * @param {object} donationData - Datos de la donación
   * @param {number} donationData.amount - Monto de la donación
   * @param {string} donationData.currency - Moneda de la donación
   * @param {string} donationData.donor_name - Nombre del donante
   * @param {string} donationData.donor_email - Email del donante
   * @param {string} donationData.message - Mensaje del donante (opcional)
   * @param {boolean} donationData.is_anonymous - Si la donación es anónima
   * @param {string} donationData.payment_method - Método de pago
   * @returns {Promise<object>} Donación creada
   */
  createDonation: async (donationData) => {
    try {
      const response = await axiosInstance.post('/payments/donations/create/', donationData);
      return response.data;
    } catch (error) {
      console.error('Error creando donación:', error);
      throw error;
    }
  },

  /**
   * Actualizar una donación existente
   * @param {number} id - ID de la donación a actualizar
   * @param {object} donationData - Datos actualizados de la donación
   * @returns {Promise<object>} Donación actualizada
   */
  updateDonation: async (id, donationData) => {
    try {
      const response = await axiosInstance.put(`/payments/donations/${id}/update/`, donationData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando donación ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar una donación
   * @param {number} id - ID de la donación a eliminar
   * @returns {Promise<void>}
   */
  deleteDonation: async (id) => {
    try {
      await axiosInstance.delete(`/payments/donations/${id}/delete/`);
    } catch (error) {
      console.error(`Error eliminando donación ${id}:`, error);
      throw error;
    }
  },

  /**
   * Procesar donación
   * @param {object} donationPaymentData - Datos para procesar la donación
   * @param {number} donationPaymentData.donation_id - ID de la donación
   * @param {object} donationPaymentData.payment_data - Datos de pago
   * @returns {Promise<object>} Resultado del procesamiento
   */
  processDonation: async (donationPaymentData) => {
    try {
      const response = await axiosInstance.post('/payments/donations/process/', donationPaymentData);
      return response.data;
    } catch (error) {
      console.error('Error procesando donación:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de donaciones
   * @param {object} params - Parámetros de filtrado
   * @param {Date} params.start_date - Fecha de inicio
   * @param {Date} params.end_date - Fecha de fin
   * @returns {Promise<object>} Estadísticas de donaciones
   */
  getDonationStats: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/payments/donations/stats/', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de donaciones:', error);
      throw error;
    }
  },

  /**
   * Obtener donaciones públicas (no anónimas) para mostrar en el sitio
   * @param {number} limit - Límite de donaciones a obtener
   * @returns {Promise<object>} Lista de donaciones públicas
   */
  getPublicDonations: async (limit = 10) => {
    try {
      const response = await axiosInstance.get('/payments/donations/public/', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo donaciones públicas:', error);
      throw error;
    }
  },

  /**
   * Generar recibo de donación
   * @param {number} donationId - ID de la donación
   * @returns {Promise<object>} Datos del recibo
   */
  generateDonationReceipt: async (donationId) => {
    try {
      const response = await axiosInstance.get(`/payments/donations/${donationId}/receipt/`);
      return response.data;
    } catch (error) {
      console.error(`Error generando recibo de donación ${donationId}:`, error);
      throw error;
    }
  },
};

export default paymentsService;