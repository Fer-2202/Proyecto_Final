import axiosInstance from "./axiosInstance";

export const getTickets = async () => {
  try {
    const response = await axiosInstance.get("/api/tickets/");
    return response.data;
  } catch (error) {
    console.error("Error obtener tickets:", error);
    throw error;
  }
};

export const getTicketById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/tickets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener ticket con ID ${id}:`, error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    console.log("Creating ticket with data:", ticketData);
    const response = await axiosInstance.post(
      "/api/tickets/create/",
      ticketData
    );
    console.log("Create ticket response:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    console.error("Error details:", error.response);
    throw error;
  }
};

export const updateTicket = async (id, ticketData) => {
  try {
    const response = await axiosInstance.put(
      `/api/tickets/${id}/update/`,
      ticketData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar ticket con ID ${id}:`, error);
    throw error;
  }
};

export const deleteTicket = async (id) => {
  try {
    await axiosInstance.delete(`/api/tickets/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar ticket con ID ${id}:`, error);
    throw error;
  }
};

export const getAvailableTickets = async (eventId) => {
  try {
    const response = await axiosInstance.get("/api/tickets/available/");
    return response.data;
  } catch (error) {
    console.error(
      `Error obtener tickets disponibles para evento ID ${eventId}:`,
      error
    );
    throw error;
  }
};

export default {

  getTickets,
  getTicketById,
  getAvailableTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  
};
