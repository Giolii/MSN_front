import axios from "axios";

const sendMessage = async (content, conversation, imageUrl) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/new`,
      {
        content: content,
        conversationId: conversation.id,
        imageUrl: imageUrl,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to send message"
    );
  }
};

export default sendMessage;
