import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores 401/403 globalmente
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/token/refresh/",
            {
              refresh: refreshToken,
            }
          );
          Cookies.set("accessToken", response.data.access, { expires: 1 });
          error.config.headers["Authorization"] =
            `Bearer ${response.data.access}`;
          return axios(error.config);
        } catch (refreshError) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
        }
      } else {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Exportar el objeto axios con los interceptores personalizados
export default instance;
