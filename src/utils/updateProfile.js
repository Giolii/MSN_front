import axios from "axios";

const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/update`,
      { data }
    );

    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed updating user informations ";
    throw error;
  }
};
export default updateProfile;
