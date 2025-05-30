import axiosInstance from "./axiosInstance";

export const getRoles = async () => {
  try {
    const response = await axiosInstance.get('/api/roles/');
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/roles/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error);
    throw error;
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await axiosInstance.post('/api/roles/', roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  } 
}

export const updateRole = async (id, roleData) => {
  try {
    const response = await axiosInstance.put(`/api/roles/${id}/`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    await axiosInstance.delete(`/api/roles/${id}/`);
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole 
}

