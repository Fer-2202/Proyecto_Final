import axiosInstance from "./axiosInstance";

export const getRoles = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/roles/');
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/auth/roles/${id}/detail/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error);
    throw error;
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await axiosInstance.post('/api/auth/roles/create/', roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  } 
}

export const updateRole = async (id, roleData) => {
  try {
    const response = await axiosInstance.put(`/api/auth/roles/${id}/update/`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    await axiosInstance.delete(`/api/auth/roles/${id}/delete/`);
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

