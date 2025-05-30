import axiosInstance from './axiosInstance';

export const getUserProfileById = async (id, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axiosInstance.get(`/api/user_profile/${id}/`);
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
    if (!profileData || typeof profileData !== 'object') {
      throw new Error('Invalid profile data');
    }

    const response = await axiosInstance.put(`/api/user_profile/${id}/`, profileData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile with ID ${id}:`, error);
    throw new Error(`Failed to update profile: ${error.message}`);
  } finally {
    if (!setLoading) setLoading(false);
  }
};


export const getUserProfileWithRetry = async (id, setLoading, maxRetries = 3) => {
  let attempts = 0;
  let lastError;

  while (attempts < maxRetries) {
    try {
      if (setLoading) setLoading(true);
      const response = await axiosInstance.get(`/api/user_profile/${id}/`);
      return response.data;
    } catch (error) {
      lastError = error;
      attempts++;
      console.error(`Attempt ${attempts} failed for user ${id}:`, error);
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, attempts)));
    } finally {
      if (setLoading) setLoading(false);
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
};

export default {
  getUserProfileById,
  updateUserProfile,
  getUserProfileWithRetry,
};