import axiosInstance from "./axiosInstance";

export const getDocuments = async () => {
  try {
    const response = await axiosInstance.get("api/documents/");
    return response.data;
  } catch (error) {
    console.error("Error fetching conservation statuses:", error);
    throw error;
  }
};
