import axiosInstance from "./axiosInstance";

export const getDocuments = async () => {
  try {
    const response = await axiosInstance.get("api/documents/");
    return response.data;
  } catch (error) {
    console.error("Error obtener documents:", error);
    throw error;
  }
};

export const getDocumentsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/documents/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener documents por ID ${id}:`, error);
    throw error;
  }
};

export const createDocuments = async (documentsData) => {
  try {
    const response = await axiosInstance.post("/api/documents/", documentsData);
    return response.data;
  } catch (error) {
    console.error("Error crear documents:", error);
    throw error;
  }
};

export const updateDocuments = async (id, documentsData) => {
  try {
    const response = await axiosInstance.put(
      `/api/documents/${id}/`,
      documentsData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar documents con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDocuments = async (id) => {
  try {
    await axiosInstance.delete(`/api/documents/${id}/`);
  } catch (error) {
    console.error(`Error eliminar documents con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getDocuments,
  getDocumentsById,
  createDocuments,
  updateDocuments,
  deleteDocuments,
};
