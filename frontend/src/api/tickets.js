import axiosInstance from './axiosInstance';

export const getTickets = async () => {
  try {
    const response = await axiosInstance.get('/api/tickets/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const getTicketById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/tickets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/api/tickets/', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const updateTicket = async (id, ticketData) => {
  try {
    const response = await axiosInstance.put(`/api/tickets/${id}/`, ticketData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTicket = async (id) => {
  try {
    await axiosInstance.delete(`/api/tickets/${id}/`);
  } catch (error) {
    console.error(`Error deleting ticket with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};