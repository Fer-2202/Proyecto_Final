import axiosInstance from "./axiosInstance";

export const getTicketsPurchaseOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/tickets_purchase_orders/");
    return response.data;
  } catch (error) {
    console.error("Error obtener tickets purchase orders:", error);
    throw error;
  }
};

export const getTicketsPurchaseOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/tickets_purchase_orders/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error obtener tickets purchase order con ID ${id}:`,
      error
    );
    throw error;
  }
};

export const createTicketsPurchaseOrder = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/tickets_purchase_orders/create/",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error crear tickets purchase order:", error);
    throw error;
  }
};

export const updateTicketsPurchaseOrder = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/tickets_purchase_orders/${id}/update/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error actualizar tickets purchase order con ID ${id}:`,
      error
    );
    throw error;
  }
};

export const deleteTicketsPurchaseOrder = async (id) => {
  try {
    await axiosInstance.delete(`/api/tickets_purchase_orders/${id}/delete/`);
  } catch (error) {
    console.error(
      `Error eliminar tickets purchase order con ID ${id}:`,
      error
    );
    throw error;
  }
};

export default {

  getTicketsPurchaseOrders,
  getTicketsPurchaseOrderById,
  createTicketsPurchaseOrder,
  updateTicketsPurchaseOrder,
  deleteTicketsPurchaseOrder,

};
