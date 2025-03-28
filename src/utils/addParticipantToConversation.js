import axios from "axios";

const addParticipantToConversation = async (
  username,
  participantsIds,
  conversationId
) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const notification = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/new`,
      {
        content: `${username} joined the group`,
        conversationId: conversationId,
        notification: "blue",
      }
    );

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/conv/addParticipants`,
      {
        userToAdd: participantsIds,
        conversationId: conversationId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error || error.message || "Failed adding friend ";
    throw error;
  }
};

export default addParticipantToConversation;
