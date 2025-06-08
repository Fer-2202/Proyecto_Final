import axiosInstance from './axiosInstance';

export const getPayments = async () => {
  try {
    const response = await axiosInstance.get("/payments");
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

export const createPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post("/payments", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await axiosInstance.put(`/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}

export const deletePayment = async (paymentId) => {
  try {
    const response = await axiosInstance.delete(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
}

export const getPaymentById = async (paymentId) => {
  try {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
}

export default {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
}