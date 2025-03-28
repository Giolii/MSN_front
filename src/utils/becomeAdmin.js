import axios from "axios";

const becomeAdmin = async (username, participantId, conversationId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const notification = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/new`,
      {
        content: `${username} is now an Admin`,
        conversationId: conversationId,
        notification: "green",
      }
    );

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/admin`,
      {
        participantId: participantId,
        conversationId: conversationId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed updating user to Admin";
    throw error;
  }
};

export default becomeAdmin;
