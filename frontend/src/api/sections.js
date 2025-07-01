import axiosInstance from "./axiosInstance";

export const getSections = async () => {
  try {
    const response = await axiosInstance.get("/api/sections/");
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

export const getSectionById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/sections/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching section with ID ${id}:`, error);
    throw error;
  }
};

export const createSection = async (sectionData) => {
  try {
    const response = await axiosInstance.post(
      "/api/sections/crear/",
      sectionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating section:", error);
    throw error;
  }
};

export const updateSection = async (id, sectionData) => {
  try {
    const response = await axiosInstance.put(
      `/api/sections/${id}/actualizar-editar/`,
      sectionData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating section with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSection = async (id) => {
  try {
    await axiosInstance.delete(`/api/sections/${id}/`);
  } catch (error) {
    console.error(`Error deleting section with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
};
