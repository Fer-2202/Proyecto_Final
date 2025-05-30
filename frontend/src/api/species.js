import axiosInstance from './axiosInstance';

export const getSpecies = async () => {
  try {
    const response = await axiosInstance.get('/api/species/');
    return response.data;
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

export const getSpeciesById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/species/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species with ID ${id}:`, error);
    throw error;
  }
};

export const createSpecies = async (speciesData) => {
  try {
    const response = await axiosInstance.post('/api/species/', speciesData);
    return response.data;
  } catch (error) {
    console.error('Error creating species:', error);
    throw error;
  }
};

export const updateSpecies = async (id, speciesData) => {
  try {
    const response = await axiosInstance.put(`/api/species/${id}/`, speciesData);
    return response.data;
  } catch (error) {
    console.error(`Error updating species with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSpecies = async (id) => {
  try {
    await axiosInstance.delete(`/api/species/${id}/`);
  } catch (error) {
    console.error(`Error deleting species with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
};