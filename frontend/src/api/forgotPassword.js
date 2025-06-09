import axiosInstance from './axiosInstance';

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/api/forgot-password/', { email });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};