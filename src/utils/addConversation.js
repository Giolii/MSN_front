import axios from "axios";

const addConversation = async (participants, groupName = "") => {
  if (typeof participants[0] === "object") {
    participants = participants.map((item) => item.id);
  }
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/conv/new`,
      {
        participants: participants,
        isGroup: participants.length > 1,
        name: groupName,
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

export default addConversation;
