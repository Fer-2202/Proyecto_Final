import axiosInstance from "./axiosInstance";

export const getTicketsPurchaseOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/tickets_purchase_order/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets-purchase orders:", error);
    throw error;
  }
};

export const getTicketsPurchaseOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/tickets_purchase_order/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching tickets-purchase order with ID ${id}:`,
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
    console.error("Error creating tickets-purchase order:", error);
    throw error;
  }
};

export const updateTicketsPurchaseOrder = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/tickets_purchase_order/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating tickets-purchase order with ID ${id}:`,
      error
    );
    throw error;
  }
};

export const deleteTicketsPurchaseOrder = async (id) => {
  try {
    await axiosInstance.delete(`/api/tickets_purchase_order/${id}/`);
  } catch (error) {
    console.error(
      `Error deleting tickets-purchase order with ID ${id}:`,
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
