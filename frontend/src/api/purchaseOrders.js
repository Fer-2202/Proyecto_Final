import axiosInstance from './axiosInstance';

export const getPurchaseOrders = async () => {
  try {
    const response = await axiosInstance.get('/api/purchase_order/');
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    throw error;
  }
};

export const getPurchaseOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/purchase_order/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching purchase order with ID ${id}:`, error);
    throw error;
  }
};

export const createPurchaseOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/api/purchase_order/', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating purchase order:', error);
    throw error;
  }
};

export const updatePurchaseOrder = async (id, orderData) => {
  try {
    const response = await axiosInstance.put(`/api/purchase_order/${id}/`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating purchase order with ID ${id}:`, error);
    throw error;
  }
};

export const deletePurchaseOrder = async (id) => {
  try {
    await axiosInstance.delete(`/api/purchase_order/${id}/`);
  } catch (error) {
    console.error(`Error deleting purchase order with ID ${id}:`, error);
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