import axiosInstance from "./axiosInstance";

export const getPayments = async () => {
  try {
    const response = await axiosInstance.get("/api/payments/");
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post("/api/payments/", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
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
    console.error("Error updating payment:", error);
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
    console.error("Error deleting payment:", error);
    throw error;
  }
};

export const getPaymentById = async (paymentId) => {
  try {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
};

export const getPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get("/api/payments/methods/");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
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
