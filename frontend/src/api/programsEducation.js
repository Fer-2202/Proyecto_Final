import axiosInstance from './axiosInstance';

export const getProgramsEducation = async () => {
 try {
  const response = await axiosInstance.get('/api/programas-educativos/');
  return response.data;
 } catch (error) {
  console.error('Error fetching exhibits:', error);
  throw error;
 }
};

export const getProgramsEducationById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/programas-educativos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getProgramsEducation,
  getProgramsEducationById
}