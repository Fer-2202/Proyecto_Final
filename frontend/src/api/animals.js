import axiosInstance from './axiosInstance';

export const getAnimals = async () => {
  try {
    const response = await axiosInstance.get('/api/animals/');
    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

export const getAnimalById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/animals/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with ID ${id}:`, error);
    throw error;
  }
};

export const createAnimal = async (animalData) => {
  try {
    const response = await axiosInstance.post('/api/animals/create/', animalData);
    return response.data;
  } catch (error) {
    console.error('Error creating animal:', error);
    throw error;
  }
};

export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axiosInstance.put(`/api/animals/${id}/edit/`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Error updating animal with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    await axiosInstance.delete(`/api/animals/${id}/delete`);
  } catch (error) {
    console.error(`Error deleting animal with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};