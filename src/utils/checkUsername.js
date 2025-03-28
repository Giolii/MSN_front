import axios from "axios";

const checkUsername = async (username, currentUser, participants) => {
  if (!username) throw new Error("You need to provide an username");
  const token = localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    );
    if (response.data.id === currentUser.id) {
      throw new Error("You can't add yourself");
    }
    if (
      participants.some((participant) => participant.id === response.data.id)
    ) {
      throw new Error("This user is already in your conversation list");
    }
    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error ||
      error.message ||
      "Failed checking username ";
    throw error;
  }
};

export default checkUsername;
