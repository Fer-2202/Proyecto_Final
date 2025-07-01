import axiosInstance from "./axiosInstance";

export const getAuditLog = async () => {
  try {
    const response = await axiosInstance.get("/api/audit_log/");
    return response.data;
  } catch (error) {
    console.error("Error obtener  audit logs:", error);
    throw error;
  }
};

export const getAuditLogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/audit_log/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo auditLog con ID ${id}:`, error);
    throw error;
  }
};
