import axios from "axios";

const fetchEditMessage = async (content, messageId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/messages/edit`,
      {
        content: content,
        messageId: messageId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed creating conversation ";
    throw error;
  }
};

export default fetchEditMessage;
