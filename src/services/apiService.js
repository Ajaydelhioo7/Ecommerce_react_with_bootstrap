import axios from "axios";

const API_BASE_URL = "http://localhost:8080/products/"; // Replace with your actual API URL

export const postData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/store-data`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
