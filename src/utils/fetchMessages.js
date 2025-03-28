import axios from "axios";

const fetchMessages = async (conversation) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/messages/${conversation.id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch messages"
    );
  }
};

export default fetchMessages;
