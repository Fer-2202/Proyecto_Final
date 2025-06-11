import axiosInstance from './axiosInstance';

export const getAuditLog = async () => {
  try {
    const response = await axiosInstance.get('/api/audit_logs/');
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};