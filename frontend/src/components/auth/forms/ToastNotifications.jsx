import React from 'react';
import { ToastContainer } from 'react-toastify';

export function ToastNotifications() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default ToastNotifications;
