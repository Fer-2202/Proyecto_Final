import axiosInstance from './axiosInstance';

export const getServiciosEducativos = async () => {
   try {
    const response = await axiosInstance.get('/api/servicios_educativos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibits:', error);
    throw error;
  }
}

export default {
  getServiciosEducativos
};



