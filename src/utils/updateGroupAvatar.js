import axios from "axios";
const updateGroupAvatar = async (file, conversationId) => {
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("conversationId", conversationId);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/files/groupAvatar`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed updating group avatar ";
    throw error;
  }
};
export default updateGroupAvatar;
