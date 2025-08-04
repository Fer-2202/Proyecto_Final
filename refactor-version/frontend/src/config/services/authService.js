import axiosInstance, { authUtils } from './axiosConfig';

/**
 * Servicio de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación de usuarios
 */

const authService = {
  /**
   * Iniciar sesión de usuario
   * 
   * ACTUALIZACIÓN: Ahora utiliza LoginSerializer en el backend
   * 
   * Características del nuevo serializador:
   * - Validación robusta de credenciales
   * - Soporte para login con username o email
   * - Mensajes de error específicos en español
   * - Respuesta estructurada con información del usuario
   * 
   * @param {object} credentials - Credenciales de login
   * @param {string} credentials.username - Username o email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   * @returns {Promise<object>} Datos del usuario autenticado
   * 
   * Estructura de respuesta:
   * {
   *   message: "Login exitoso",
   *   user: {
   *     user_id: 1,
   *     username: "usuario",
   *     email: "email@ejemplo.com",
   *     first_name: "Nombre",
   *     last_name: "Apellido",
   *     is_staff: false,
   *     is_superuser: false,
   *     groups: ["grupo1", "grupo2"]
   *   }
   * }
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login/', credentials);
      
      // La nueva respuesta incluye un objeto 'user' con información detallada
      if (response.data.user) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Si hay token en la respuesta, guardarlo (para futuras implementaciones JWT)
        if (response.data.token) {
          authUtils.setToken(response.data.token);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      
      // El nuevo serializador proporciona errores más detallados
      if (error.response?.data?.details) {
        console.error('Detalles del error:', error.response.data.details);
      }
      
      throw error;
    }
  },

  /**
   * Registrar nuevo usuario
   * @param {object} userData - Datos del nuevo usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña del usuario
   * @param {string} userData.first_name - Nombre del usuario
   * @param {string} userData.last_name - Apellido del usuario
   * @returns {Promise<object>} Datos del usuario registrado
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register/', userData);
      
      // Guardar token y datos del usuario si se proporciona
      if (response.data.token) {
        authUtils.setToken(response.data.token);
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión de usuario
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout/');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar datos locales independientemente del resultado
      authUtils.removeToken();
    }
  },

  /**
   * Obtener perfil del usuario actual
   * @returns {Promise<object>} Datos del perfil del usuario
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/profile/');
      
      // Actualizar datos del usuario en localStorage
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  },

  /**
   * Actualizar perfil del usuario
   * @param {object} profileData - Datos del perfil a actualizar
   * @returns {Promise<object>} Datos del perfil actualizado
   */
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/auth/profile/', profileData);
      
      // Actualizar datos del usuario en localStorage
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },

  /**
   * Cambiar contraseña del usuario
   * @param {object} passwordData - Datos para cambio de contraseña
   * @param {string} passwordData.old_password - Contraseña actual
   * @param {string} passwordData.new_password - Nueva contraseña
   * @param {string} passwordData.confirm_password - Confirmación de nueva contraseña
   * @returns {Promise<object>} Respuesta del servidor
   */
  changePassword: async (passwordData) => {
    try {
      const response = await axiosInstance.post('/auth/change-password/', passwordData);
      return response.data;
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      throw error;
    }
  },

  /**
   * Solicitar restablecimiento de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise<object>} Respuesta del servidor
   */
  requestPasswordReset: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/password-reset/', { email });
      return response.data;
    } catch (error) {
      console.error('Error solicitando reset de contraseña:', error);
      throw error;
    }
  },

  /**
   * Confirmar restablecimiento de contraseña
   * @param {object} resetData - Datos para confirmar reset
   * @param {string} resetData.token - Token de restablecimiento
   * @param {string} resetData.password - Nueva contraseña
   * @returns {Promise<object>} Respuesta del servidor
   */
  confirmPasswordReset: async (resetData) => {
    try {
      const response = await axiosInstance.post('/auth/password-reset-confirm/', resetData);
      return response.data;
    } catch (error) {
      console.error('Error confirmando reset de contraseña:', error);
      throw error;
    }
  },

  /**
   * Verificar si el token actual es válido
   * @returns {Promise<boolean>} True si el token es válido
   */
  verifyToken: async () => {
    try {
      const response = await axiosInstance.post('/auth/verify-token/');
      return response.status === 200;
    } catch (error) {
      console.error('Token no válido:', error);
      return false;
    }
  },

  /**
   * Refrescar token de autenticación
   * @returns {Promise<object>} Nuevo token
   */
  refreshToken: async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh-token/');
      
      if (response.data.token) {
        authUtils.setToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error refrescando token:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario actual desde localStorage
   * @returns {object|null} Datos del usuario o null
   */
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} True si está autenticado
   */
  isAuthenticated: () => {
    return authUtils.isAuthenticated();
  },
};

export default authService;