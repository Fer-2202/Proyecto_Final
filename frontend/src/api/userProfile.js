import axiosInstance from "./axiosInstance";

// Get current user's profile
export const getCurrentUserProfile = async (setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axiosInstance.get("/api/auth/profile/");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    throw new Error(`Failed to load profile: ${error.message}`);
  } finally {
    if (setLoading) setLoading(false);
  }
};

// Update current user's profile
export const updateCurrentUserProfile = async (profileData, setLoading) => {
  try {
    if (setLoading) setLoading(true);

    let config = {};
    // Si es FormData, no pongas Content-Type manualmente
    if (profileData instanceof FormData) {
      config = {};
    } else {
      config = { headers: { "Content-Type": "application/json" } };
    }

    const response = await axiosInstance.put(
      "/api/auth/profile/",
      profileData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating current user profile:", error);
    throw new Error(`Failed to update profile: ${error.message}`);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const getUserProfileById = async (id, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axiosInstance.get(`/api/auth/user_profile/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${id}:`, error);
    throw new Error(`Failed to load profile: ${error.message}`);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const updateUserProfile = async (id, profileData, setLoading) => {
  try {
    if (setLoading) setLoading(true);

    // Validate required fields
    if (!profileData || typeof profileData !== "object") {
      throw new Error("Invalid profile data");
    }

    const response = await axiosInstance.put(
      `/api/auth/user_profile/${id}/update/`,
      profileData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile with ID ${id}:`, error);
    throw new Error(`Failed to update profile: ${error.message}`);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const getUserProfileWithRetry = async (
  id,
  setLoading,
  maxRetries = 3
) => {
  let attempts = 0;
  let lastError;

  while (attempts < maxRetries) {
    try {
      if (setLoading) setLoading(true);
      const response = await axiosInstance.get(`/api/auth/user_profile/${id}/`);
      return response.data;
    } catch (error) {
      lastError = error;
      attempts++;
      console.error(`Attempt ${attempts} failed for user ${id}:`, error);

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempts))
      );
    } finally {
      if (setLoading) setLoading(false);
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
};

export const getUserProfile = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/auth/user_profile/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${id}:`, error);
    throw error;
  }
};

export const createUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/user_profile/",
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUsersProfiles = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/user_profile/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users profiles:", error);
    throw error;
  }
};

export const deleteUserProfile = async (id) => {
  try {
    await axiosInstance.delete(`/api/auth/user_profile/${id}/delete`);
  } catch (error) {
    console.error(`Error deleting user profile with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getUserProfileById,
  updateUserProfile,
  getUserProfileWithRetry,
  getUserProfile,
  createUserProfile,
  getUsersProfiles,
  deleteUserProfile,
};
