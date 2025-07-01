import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const contextValue = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};