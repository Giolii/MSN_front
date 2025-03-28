import axios from "axios";

const removeUser = async (username, partId, conversationId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const goodbyeMessage = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/new`,
      {
        content: `${username} has been removed`,
        conversationId: conversationId,
        notification: "red",
      }
    );

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/conv/remove`,
      {
        partId: partId,
        conversationId: conversationId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error || error.message || "Failed deleting comment";
    throw error;
  }
};

export default removeUser;
