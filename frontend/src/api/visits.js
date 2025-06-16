import axiosInstance from './axiosInstance';

export const getVisits = async () => {
  try {
    const response = await axiosInstance.get('/api/visits/');
    return response.data;
  } catch (error) {
    console.error('Error fetching visits:', error);
    throw error;
  }
};

export const getVisitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/visits/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching visit with ID ${id}:`, error);
    throw error;
  }
};

export const createVisit = async (visitData) => {
  try {
    const response = await axiosInstance.post('/api/visits/', visitData);
    return response.data;
  } catch (error) {
    console.error('Error creating visit:', error);
    throw error;
  }
};

export const updateVisit = async (id, visitData) => {
  try {
    const response = await axiosInstance.put(`/api/visits/${id}/`, visitData);
    return response.data;
  } catch (error) {
    console.error(`Error updating visit with ID ${id}:`, error);
    throw error;
  }
};

export const deleteVisit = async (id) => {
  try {
    await axiosInstance.delete(`/api/visits/${id}/`);
  } catch (error) {
    console.error(`Error deleting visit with ID ${id}:`, error);
    throw error;
  }
};

export const getAvailableVisits = async () => {
  try {
    const response = await axiosInstance.get('/api/visits/available/');
    return response.data;
  } catch (error) {
    console.error('Error fetching available visits:', error);
    throw error;
  }
};

export default {
  getVisits,
  getVisitById,
  getAvailableVisits,
  createVisit,
  updateVisit,
  deleteVisit,
};