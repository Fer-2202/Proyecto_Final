import axiosInstance from "./axiosInstance";

export const getProgramsEducation = async () => {
  try {
    const response = await axiosInstance.get("/api/programas_educativos/");
    return response.data;
  } catch (error) {
    console.error("Error obtener servicios educativo:", error);
    throw error;
  }
};

export const getProgramsEducationById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/programas_educativos/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener programas educativos con ID ${id}:`, error);
    throw error;
  }
};

export const createProgramsEducation = async (programsData) => {
  try {
    const response = await axiosInstance.post(
      "/api/programas_educativos/create/",
      programsData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear programas educativos:", error);
    throw error;
  }
};

export const updateProgramsEducation = async (id, programsData) => {
  try {
    const response = await axiosInstance.put(
      `/api/programas_educativos/${id}/update/`,
      programsData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar programas educativos ID ${id}:`, error);
    throw error;
  }
};

export const deleteProgramsEducation = async (id) => {
  try {
    await axiosInstance.delete(`/api/programas_educativos/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar programas educativos ID ${id}:`, error);
    throw error;
  }
};

/* ITEMS */
export const getItems = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/programas_educativos/items/"
    );
    return response.data;
  } catch (error) {
    console.error("Error obtener items:", error);
    throw error;
  }
};

export const getItemsById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/programas_educativos/items/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener items con ID ${id}:`, error);
    throw error;
  }
};

export const createItems = async (programsData) => {
  try {
    const response = await axiosInstance.post(
      "/api/programas_educativos/items/create/",
      programsData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear items:", error);
    throw error;
  }
};

export const updateItems = async (id, programsData) => {
  try {
    const response = await axiosInstance.put(
      `/api/programas_educativos/items/${id}/update/`,
      programsData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar items ID ${id}:`, error);
    throw error;
  }
};

export const deleteItems = async (id) => {
  try {
    await axiosInstance.delete(`/api/programas_educativos/items/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar items ID ${id}:`, error);
    throw error;
  }
};

export default {
  getProgramsEducation,
  getProgramsEducationById,
  createProgramsEducation,
  updateProgramsEducation,
  deleteProgramsEducation,

  getItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
};
