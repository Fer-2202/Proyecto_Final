import axiosInstance from "./axiosInstance";

export const getDonations = async () => {
  const response = await axiosInstance.get("/api/payments/donations/");
  return response.data;
};

export const getDonationById = async (id) => {
  const response = await axiosInstance.get(`/api/payments/donations/${id}/`);
  return response.data;
};

export const createDonation = async (donationData) => {
  const response = await axiosInstance.post(
    "/api/payments/donations/create/",
    donationData
  );
  return response.data;
};

export const updateDonation = async (id, donationData) => {
  const response = await axiosInstance.put(
    `/api/payments/donations/${id}/update/`,
    donationData
  );
  return response.data;
};

export const deleteDonation = async (id) => {
  await axiosInstance.delete(`/api/payments/donations/${id}/delete/`);
};

export default {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
};
