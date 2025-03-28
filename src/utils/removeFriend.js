import axios from "axios";

const removeFriend = async (friendId) => {
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/removeFriend`,
      {
        friendId: friendId,
      }
    );
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error || error.message || "Failed adding friend ";
    throw error;
  }
};

export default removeFriend;
