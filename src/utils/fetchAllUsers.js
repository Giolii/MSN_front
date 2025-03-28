import axios from "axios";

const fetchAllUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/all`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch conversations"
    );
  }
};

export default fetchAllUsers;
