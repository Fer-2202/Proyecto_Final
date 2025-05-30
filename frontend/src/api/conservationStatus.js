import axiosInstance from './axiosInstance';

export const getConservationStatuses = async () => {
  try {
    const response = await axiosInstance.get('/api/conservation_status/');
    return response.data;
  } catch (error) {
    console.error('Error fetching conservation statuses:', error);
    throw error;
  }
};

export const getConservationStatusById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/conservation_status/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching conservation status with ID ${id}:`, error);
    throw error;
  }
};

export const createConservationStatus = async (statusData) => {
  try {
    const response = await axiosInstance.post('/api/conservation_status/', statusData);
    return response.data;
  } catch (error) {
    console.error('Error creating conservation status:', error);
    throw error;
  }
};

export const updateConservationStatus = async (id, statusData) => {
  try {
    const response = await axiosInstance.put(`/api/conservation_status/${id}/`, statusData);
    return response.data;
  } catch (error) {
    console.error(`Error updating conservation status with ID ${id}:`, error);
    throw error;
  }
};

export const deleteConservationStatus = async (id) => {
  try {
    await axiosInstance.delete(`/api/conservation_status/${id}/`);
  } catch (error) {
    console.error(`Error deleting conservation status with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getConservationStatuses,
  getConservationStatusById,
  createConservationStatus,
  updateConservationStatus,
  deleteConservationStatus,
};