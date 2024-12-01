import axios from "axios";

// Creating common Axios Instance

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error occurred:", error.message);
    return Promise.reject(error); // I am Rejecting the promise so the error can propagate
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized: Token might be expired or invalid
        console.error("Unauthorized access. Redirecting to login...");
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      } else if (status === 403) {
        // Forbidden: User does not have permission for this action
        console.error(
          "Access forbidden. You do not have the required permissions."
        );
        alert("You are not authorized to perform this action.");
      } else if (status >= 400 && status < 500) {
        // Other Client Errors (400–499)
        console.error(
          `Client error: ${status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
        alert(error.response.data.message || "A client-side error occurred.");
      } else if (status >= 500) {
        // Server Errors
        console.error(
          `Server error: ${status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
        alert("A server error occurred. Please try again later.");
      }
    } else if (error.request) {
      console.error(
        "No response received from the server. Please check your network."
      );
      alert(
        "A network error occurred. Please check your connection and try again."
      );
    } else {
      console.error("Unexpected error:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
