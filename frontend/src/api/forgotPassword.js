import axiosInstance from "./axiosInstance";

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/api/auth/forgot-password/", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const resetPasswordConfirm = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/reset-password-confirm/",
      { token, new_password: newPassword }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
