import axiosInstance from "./axiosInstance";

export const getVisits = async () => {
  try {
    const response = await axiosInstance.get("/api/visits/");
    return response.data;
  } catch (error) {
    console.error("Error obtener visits:", error);
    throw error;
  }
};

export const getVisitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/visits/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener visit con ID ${id}:`, error);
    throw error;
  }
};

export const createVisit = async (visitData) => {
  try {
    const response = await axiosInstance.post("/api/visits/create/", visitData);
    return response.data;
  } catch (error) {
    console.error("Error crear visit:", error);
    throw error;
  }
};

export const updateVisit = async (id, visitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/visits/${id}/update/`,
      visitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar visit con ID ${id}:`, error);
    throw error;
  }
};

export const deleteVisit = async (id) => {
  try {
    await axiosInstance.delete(`/api/visits/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar visit con ID ${id}:`, error);
    throw error;
  }
};

export const getAvailableVisits = async () => {
  try {
    const response = await axiosInstance.get("/api/visits/available/");
    return response.data;
  } catch (error) {
    console.error("Error obtener visits disponible:", error);
    throw error;
  }
};

export const getVisitByDay = async (day) => {
  try {
    const response = await axiosInstance.get(`/api/visits/by_day/?day=${day}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // No existe visita para ese día
    }
    console.error(`Error obtener visit por dia ${day}:`, error);
    throw error;
  }
};

export default {

  getVisits,
  getVisitById,
  getAvailableVisits,
  createVisit,
  updateVisit,
  deleteVisit,
  getVisitByDay,
  
};
