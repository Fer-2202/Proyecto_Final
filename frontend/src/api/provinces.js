import axiosInstance from './axiosInstance';

/* Get all provinces */
export const getProvinces = async () => {
  try {
    const response = await axiosInstance.get('/api/provinces/');
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

/* Get province by ID */
export const getProvinceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/provinces/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching province with ID ${id}:`, error);
    throw error;
  }
};

/* Create a new province */
export const createProvince = async (provinceData) => {
  try {
    const response = await axiosInstance.post('/api/provinces/', provinceData);
    return response.data;
  } catch (error) {
    console.error('Error creating province:', error);
    throw error;
  }
};

/* Update an existing province */
export const updateProvince = async (id, provinceData) => {
  try {
    const response = await axiosInstance.put(`/api/provinces/${id}/`, provinceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating province with ID ${id}:`, error);
    throw error;
  }
};

/* Delete a province */
export const deleteProvince = async (id) => {
  try {
    await axiosInstance.delete(`/api/provinces/${id}/`);
  } catch (error) {
    console.error(`Error deleting province with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince,
};

