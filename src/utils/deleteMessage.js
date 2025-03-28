import axios from "axios";

const deleteMessage = async (msgId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/messages/delete`,
      {
        data: {
          messageId: msgId,
        },
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error || error.message || "Failed deleting comment";
    throw error;
  }
};

export default deleteMessage;
