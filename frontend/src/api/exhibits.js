import axiosInstance from "./axiosInstance";

export const getExhibits = async () => {
  try {
    const response = await axiosInstance.get("/api/exhibiciones/");
    return response.data;
  } catch (error) {
    console.error("Error fetching exhibits:", error);
    throw error;
  }
};

export const getExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const createExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibiciones/create/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exhibit:", error);
    throw error;
  }
};

export const updateExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibiciones/${id}/update/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const deleteExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/${id}/delete/`);
  } catch (error) {
    console.error(`Error deleting exhibit with ID ${id}:`, error);
    throw error;
  }
};




export const getImageExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibiciones/imagenes/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo la imagen`)
  }
};

export const getImageExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/imagenes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const createImageExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibiciones/imagenes/create/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exhibit:", error);
    throw error;
  }
};

export const updateImageExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibiciones/image/${id}/update/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando imagen con ID ${id}:`, error);
    throw error;
  }
};

export const deleteImageExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/imagenes/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminando imagen con ID ${id}:`, error);
    throw error;
  }
};





export const getFactsExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibiciones/facts/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo facts`)
  }
};

export const getFactsExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/facts/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo facts con ID ${id}:`, error);
    throw error;
  }
};

export const createFactsExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibiciones/facts/create/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating facts:", error);
    throw error;
  }
};

export const updateFactsExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibiciones/facts/${id}/update/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando facts con ID ${id}:`, error);
    throw error;
  }
};

export const deleteFactsExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/facts/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminando facts con ID ${id}:`, error);
    throw error;
  }
};





export const getDescriptionExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibiciones/description/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo description`)
  }
};

export const getDescriptionExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/description/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo description con ID ${id}:`, error);
    throw error;
  }
};

export const createDescriptionExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibiciones/description/create/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating description:", error);
    throw error;
  }
};

export const updateDescriptionExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibiciones/description/${id}/update/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando description con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDescriptionExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/description/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminando description con ID ${id}:`, error);
    throw error;
  }
};







export const getButtonsExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibiciones/buttons/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo buttons`)
  }
};

export const getButtonsExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibiciones/buttons/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo buttons con ID ${id}:`, error);
    throw error;
  }
};

export const createButtonsExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibiciones/buttons/create/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating buttons:", error);
    throw error;
  }
};

export const updateButtonsExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibiciones/buttons/${id}/update/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando buttons con ID ${id}:`, error);
    throw error;
  }
};

export const deleteButtonsExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibiciones/buttons/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminando buttons con ID ${id}:`, error);
    throw error;
  }
};







export default {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhibit,
  getImageExhibit,
  getImageExhibitById,
  createImageExhibit,
  updateImageExhibit,
  deleteImageExhibit,
  getFactsExhibit,
  getFactsExhibitById,
  createFactsExhibit,
  updateFactsExhibit,
  deleteFactsExhibit,
  getDescriptionExhibit,
  getDescriptionExhibitById,
  createDescriptionExhibit,
  updateDescriptionExhibit,
  deleteDescriptionExhibit,
  getButtonsExhibit,
  getButtonsExhibitById,
  
};
