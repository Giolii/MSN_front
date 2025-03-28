const sendImgMessage = async (conversationId, imageUrl) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/newImage`,
      {
        imageUrl: imageUrl,
        conversationId: conversationId,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to send message"
    );
  }
};

export default sendImgMessage;
