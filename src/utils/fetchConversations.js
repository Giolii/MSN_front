import axios from "axios";
import fetchAllUsers from "./fetchAllUsers";

const fetchConversations = async () => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/conv`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch conversations"
    );
  }
};

export default fetchConversations;
