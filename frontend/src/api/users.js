import axiosInstance from './axiosInstance';

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/api/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/api/users/${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/api/users/${id}/`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/users/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default { getUsers, getUserById, updateUser, deleteUser, createUser };