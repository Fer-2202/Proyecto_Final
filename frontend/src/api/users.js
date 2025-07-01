import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/users/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/auth/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(
      `/api/auth/users/${id}/update/`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/api/auth/users/${id}/delete/`);
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default { getUsers, getUserById, updateUser, deleteUser, createUser };
