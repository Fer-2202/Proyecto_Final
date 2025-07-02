import axiosInstance from "./axiosInstance";

export const getPurchaseOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/purchase_orders/");
    return response.data;
  } catch (error) {
    console.error("Error obtener purchase orders:", error);
    throw error;
  }
};

export const getPurchaseOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/purchase_orders/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener purchase order with ID ${id}:`, error);
    throw error;
  }
};

export const createPurchaseOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post(
      "/api/purchase_orders/create/",
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear purchase order:", error);
    throw error;
  }
};

export const updatePurchaseOrder = async (id, orderData) => {
  try {
    const response = await axiosInstance.put(
      `/api/purchase_orders/${id}/update/`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar purchase order con ID ${id}:`, error);
    throw error;
  }
};

export const deletePurchaseOrder = async (id) => {
  try {
    await axiosInstance.delete(`/api/purchase_orders/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar purchase order con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
