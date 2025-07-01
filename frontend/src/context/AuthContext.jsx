import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserProfile } from "@api/userProfile";
import axiosInstance from "@api/axiosInstance";
import Loading from "@pages/Loading";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get("accessToken");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);

        try {
          const profileData = await getCurrentUserProfile();
          setUser(profileData);
        } catch {
          setUser(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // -- Refrescar token automáticamente cada 4 minutos (240000 ms) --
  useEffect(() => {
    if (!token) return; // Si no hay token, no refrescamos

    const refreshToken = async () => {
      const refresh = Cookies.get("refreshToken");
      if (!refresh) {
        logout(); // si no hay refresh token, cerramos sesión
        return;
      }

      try {
        const response = await axiosInstance.post("/api/auth/token/refresh/", {
          refresh,
        });
        if (response.status === 200) {
          const { access } = response.data;
          Cookies.set("accessToken", access, { expires: 1 });
          setToken(access);
          setIsAuthenticated(true);
          // Opcional: actualizar perfil si quieres
          try {
            const profileData = await getCurrentUserProfile();
            setUser(profileData);
          } catch {
            setUser(null);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
      }
    };

    // Set interval para refrescar token cada 4 minutos
    const interval = setInterval(() => {
      refreshToken();
    }, 240000);

    // Limpiar el interval cuando el componente se desmonta o cambia el token
    return () => clearInterval(interval);
  }, [token]);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/token/",
        credentials
      );
      if (response.status === 200) {
        const { access, refresh } = response.data;
        Cookies.set("accessToken", access, { expires: 1 });
        Cookies.set("refreshToken", refresh, { expires: 7 });
        setToken(access);
        setIsAuthenticated(true);

        try {
          const profileData = await getCurrentUserProfile();
          setUser(profileData);
        } catch {
          setUser(null);
        }
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
    return false;
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout/", {
        refresh_token: Cookies.get("refreshToken"),
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  };

  const getProfile = async () => {
    try {
      const storedToken = Cookies.get("accessToken");
      const storedRefreshToken = Cookies.get("refreshToken");
      if (!storedToken || !storedRefreshToken) {
        setUser(null);
        return null;
      }
      try {
        const profileData = await getCurrentUserProfile();
        setUser(profileData);
        return profileData;
      } catch (error) {
        setUser(null);
        throw error;
      }
    } catch (error) {
      setUser(null);
      throw error;
    }
    return null;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
