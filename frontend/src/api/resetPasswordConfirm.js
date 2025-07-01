import axiosInstance from "./axiosInstance";

export const resetPasswordConfirm = async (uid, token, new_password) => {
  try {
    const response = await axiosInstance.post("/api/reset-password-confirm/", {
      uid,
      token,
      new_password,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
