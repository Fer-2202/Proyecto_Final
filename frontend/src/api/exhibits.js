import axiosInstance from './axiosInstance';

export const getExhibits = async () => {
   try {
    const response = await axiosInstance.get('/api/exhibiciones/lista/');
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibits:', error);
    throw error;
  }
}
 
export const getExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const createExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post('/api/exhibiciones/', exhibitData);
    return response.data;
  } catch (error) {
    console.error('Error creating exhibit:', error);
    throw error;
  }
};

export const updateExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(`/api/exhibiciones/${id}/`, exhibitData);
    return response.data;
  } catch (error) {
    console.error(`Error updating exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const deleteExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/${id}/`);
  } catch (error) {
    console.error(`Error deleting exhibit with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhibit,
};

