import axios from "axios";

const uploadImage = async (file) => {
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/files/image`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    error.message =
      error.response?.data?.error || error.message || "Failed updating image ";
    throw error;
  }
};

export default uploadImage;
