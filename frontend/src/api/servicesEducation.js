import axiosInstance from "./axiosInstance";

export const getServiciosEducativos = async () => {
  try {
    const response = await axiosInstance.get("/api/servicios_educativos/");
    return response.data;
  } catch (error) {
    console.error("Error obtener servicios educativo:", error);
    throw error;
  }
};

export const getServiciosEducativosById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicios_educativos/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener servicios educativo con ID ${id}:`, error);
    throw error;
  }
};

export const createServiciosEducativos = async (servicesData) => {
  try {
    const response = await axiosInstance.post(
      "/api/servicios_educativos/create/",
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear servicios educativo:", error);
    throw error;
  }
};

export const updateServiciosEducativos = async (id, servicesData) => {
  try {
    const response = await axiosInstance.put(
      `/api/servicios_educativos/${id}/update/`,
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar servicios educativo ID ${id}:`, error);
    throw error;
  }
};

export const deleteServiciosEducativos = async (id) => {
  try {
    await axiosInstance.delete(`/api/servicios_educativos/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar servicios educativo ID ${id}:`, error);
    throw error;
  }
};

/* IMAGENES */
export const getImageServiciosEducativos = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/servicios_educativos/imagenes/"
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener la imagen`);
    throw error;
  }
};

export const getImageServiciosEducativosById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicios_educativos/imagenes/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener imagen con ID ${id}:`, error);
    throw error;
  }
};

export const createImageServiciosEducativos = async (servicesData) => {
  try {
    const response = await axiosInstance.post(
      "/api/servicios_educativos/imagenes/create/",
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear image:", error);
    throw error;
  }
};

export const updateImageServiciosEducativos = async (id, servicesData) => {
  try {
    const response = await axiosInstance.put(
      `/api/servicios_educativos/image/${id}/update/`,
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar imagen con ID ${id}:`, error);
    throw error;
  }
};

export const deleteImageServiciosEducativos = async (id) => {
  try {
    await axiosInstance.delete(
      `/api/servicios_educativos/imagenes/${id}/delete/`
    );
  } catch (error) {
    console.error(`Error eliminar imagen con ID ${id}:`, error);
    throw error;
  }
};

/* FACTS */
export const getFactsServiciosEducativos = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/servicios_educativos/facts/"
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener facts`);
    throw error;
  }
};

export const getFactsServiciosEducativosById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicios_educativos/facts/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener facts con ID ${id}:`, error);
    throw error;
  }
};

export const createFactsServiciosEducativos = async (servicesData) => {
  try {
    const response = await axiosInstance.post(
      "/api/servicios_educativos/facts/create/",
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear facts:", error);
    throw error;
  }
};

export const updateFactsServiciosEducativos = async (id, servicesData) => {
  try {
    const response = await axiosInstance.put(
      `/api/servicios_educativos/facts/${id}/update/`,
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar facts con ID ${id}:`, error);
    throw error;
  }
};

export const deleteFactsServiciosEducativos = async (id) => {
  try {
    await axiosInstance.delete(`/api/servicios_educativos/facts/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar facts con ID ${id}:`, error);
    throw error;
  }
};

/* DESCRIPTION */
export const getDescriptionServiciosEducativos = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/servicios_educativos/description/"
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener description`);
    throw error;
  }
};

export const getDescriptionServiciosEducativosById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicios_educativos/description/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener description con ID ${id}:`, error);
    throw error;
  }
};

export const createDescriptionServiciosEducativos = async (servicesData) => {
  try {
    const response = await axiosInstance.post(
      "/api/servicios_educativos/description/create/",
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear description:", error);
    throw error;
  }
};

export const updateDescriptionServiciosEducativos = async (
  id,
  servicesData
) => {
  try {
    const response = await axiosInstance.put(
      `/api/servicios_educativos/description/${id}/update/`,
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar description con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDescriptionServiciosEducativos = async (id) => {
  try {
    await axiosInstance.delete(
      `/api/servicios_educativos/description/${id}/delete/`
    );
  } catch (error) {
    console.error(`Error eliminar description con ID ${id}:`, error);
    throw error;
  }
};

/* BUTTONS */
export const getButtonsServiciosEducativos = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/servicios_educativos/buttons/"
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener buttons`);
    throw error;
  }
};

export const getButtonsServiciosEducativosById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/servicios_educativos/buttons/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error obtener buttons con ID ${id}:`, error);
    throw error;
  }
};

export const createButtonsServiciosEducativos = async (servicesData) => {
  try {
    const response = await axiosInstance.post(
      "/api/servicios_educativos/buttons/create/",
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear buttons:", error);
    throw error;
  }
};

export const updateButtonsServiciosEducativos = async (id, servicesData) => {
  try {
    const response = await axiosInstance.put(
      `/api/servicios_educativos/buttons/${id}/update/`,
      servicesData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar buttons con ID ${id}:`, error);
    throw error;
  }
};

export const deleteButtonsServiciosEducativos = async (id) => {
  try {
    await axiosInstance.delete(
      `/api/servicios_educativos/buttons/${id}/delete/`
    );
  } catch (error) {
    console.error(`Error eliminar buttons con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getServiciosEducativos,
  getServiciosEducativosById,
  createServiciosEducativos,
  updateServiciosEducativos,
  deleteServiciosEducativos,

  getImageServiciosEducativos,
  getImageServiciosEducativosById,
  createImageServiciosEducativos,
  updateImageServiciosEducativos,
  deleteImageServiciosEducativos,

  getFactsServiciosEducativos,
  getFactsServiciosEducativosById,
  createFactsServiciosEducativos,
  updateFactsServiciosEducativos,
  deleteFactsServiciosEducativos,

  getDescriptionServiciosEducativos,
  getDescriptionServiciosEducativosById,
  createDescriptionServiciosEducativos,
  updateDescriptionServiciosEducativos,
  deleteDescriptionServiciosEducativos,

  getButtonsServiciosEducativos,
  getButtonsServiciosEducativosById,
  createButtonsServiciosEducativos,
  updateButtonsServiciosEducativos,
  deleteButtonsServiciosEducativos,
};
