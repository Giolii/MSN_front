import axios from "axios";

const fetchLeaveConversation = async (username, conversationId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const goodbyeMessage = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/new`,
      {
        content: `${username} left the conversation`,
        conversationId: conversationId,
        notification: "red",
      }
    );

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/conv/leave`,
      {
        conversationId: conversationId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed leaving conversation ";
    throw error;
  }
};

export default fetchLeaveConversation;
