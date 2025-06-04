import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './../context/AuthContext';
import { toast } from 'react-toastify';

const SessionTimeoutHandler = () => {
  const { logout } = useAuth();

  const lastActivityRef = useRef(Date.now());
  const toastIdRef = useRef(null);
  const countdownRef = useRef(null);
  const [countdown, setCountdown] = useState(60); // 2 minutos

  // Actualizar última actividad en cada respuesta axios
  useEffect(() => {
    const updateLastActivity = () => {
      lastActivityRef.current = Date.now();
      // Si el toast está visible, lo cerramos
      if (toastIdRef.current !== null) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
        clearInterval(countdownRef.current);
        setCountdown(60);
      }
    };

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        updateLastActivity();
        return response;
      },
      (error) => {
        updateLastActivity();
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // Control de inactividad
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastActivityRef.current;

      if (diff >= 180000 && toastIdRef.current === null) {
        // Mostrar toast de confirmación
        showTimeoutToast();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showTimeoutToast = () => {
    // Mostrar toast con botones y contador
    toastIdRef.current = toast.info(
      ({ closeToast }) => (
        <div>
          <p>Tu sesión está por expirar. ¿Deseas continuar? ({countdown}s)</p>
          <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
            <button
              onClick={() => {
                continueSession();
                closeToast();
              }}
            >
              Sí
            </button>
            <button
              onClick={() => {
                logout();
                closeToast();
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        position: 'top-center',
      }
    );

    // Iniciar cuenta regresiva para logout automático
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          logout();
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const continueSession = () => {
    lastActivityRef.current = Date.now();
    setCountdown(120);
    if (countdownRef.current) clearInterval(countdownRef.current);
    toastIdRef.current = null;
  };

  return null; // No renderizamos nada visible
};

export default SessionTimeoutHandler;
