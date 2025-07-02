import axiosInstance from "./axiosInstance";

export const getPayments = async () => {
  try {
    const response = await axiosInstance.get("/api/payments/");
    return response.data;
  } catch (error) {
    console.error("Error obtener payments:", error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post("/api/payments/", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error crear payment:", error);
    throw error;
  }
};

export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await axiosInstance.put(
      `/api/payments/${paymentId}/update`,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Error actualizar payment:", error);
    throw error;
  }
};

export const deletePayment = async (paymentId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/payments/${paymentId}/delete`
    );
    return response.data;
  } catch (error) {
    console.error("Error eliminar payment:", error);
    throw error;
  }
};

export const getPaymentById = async (paymentId) => {
  try {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error obtener payment por ID:", error);
    throw error;
  }
};

export const getPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get("/api/payments/methods/");
    return response.data;
  } catch (error) {
    console.error("Error obtener payment methods:", error);
    throw error;
  }
};

export default {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
  getPaymentMethods,
};
