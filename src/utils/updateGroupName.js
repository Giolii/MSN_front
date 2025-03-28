import axios from "axios";

const updateGroupName = async (conversation, groupName) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/conv/editName`,
      {
        conversationId: conversation.id,
        groupName: groupName,
      }
    );

    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed updating group name ";
    throw error;
  }
};

export default updateGroupName;
