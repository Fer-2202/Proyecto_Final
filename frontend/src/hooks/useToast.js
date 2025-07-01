import { useState, useCallback } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ message, type = "info", duration = 5000 }) => {
      const id = Date.now() + Math.random();
      const newToast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      return id;
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => {
      return addToast({ message, type: "success", duration });
    },
    [addToast]
  );

  const error = useCallback(
    (message, duration) => {
      return addToast({ message, type: "error", duration });
    },
    [addToast]
  );

  const warning = useCallback(
    (message, duration) => {
      return addToast({ message, type: "warning", duration });
    },
    [addToast]
  );

  const info = useCallback(
    (message, duration) => {
      return addToast({ message, type: "info", duration });
    },
    [addToast]
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };
};

export default useToast;