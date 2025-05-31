import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfileById } from '../api/userProfile';
import axiosInstance from '../api/axiosInstance';
import Loading from './../pages/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);

        /* Verificamos el token guardado en el localStorage */
        const payload = parseJwt(storedToken);
        if (payload && payload.user_id) {
          try {
            const profileData = await getUserProfileById(payload.user_id);
            setUser({ ...profileData, id: payload.user_id });
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/token/', credentials);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        setToken(access);
        setIsAuthenticated(true);

        const payload = parseJwt(access);
        if (payload && payload.user_id) {
          try {
            const profileData = await getUserProfileById(payload.user_id);
            setUser({ ...profileData, id: payload.user_id });
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
    return false;
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/logout/', {
        refresh_token: localStorage.getItem('refreshToken'),
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  };

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem('accessToken');
      const payload = parseJwt(storedToken);
      if (payload && payload.user_id) {
        try {
          const profileData = await getUserProfileById(payload.user_id);
          setUser({ ...profileData, id: payload.user_id });
          return { ...profileData, id: payload.user_id };
        } catch (error) {
          setUser(null);
          throw error;
        }
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
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
