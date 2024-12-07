import axios from "axios";

// Creating common Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Base URL for API
  timeout: 10000, // Timeout for requests
  withCredentials: true, // Include cookies for session handling
});

// Flag to track if redirection has occurred
let hasRedirected = false;

axiosInstance.interceptors.request.use(
  (config) => {
    return config; // Allow request to proceed
  },
  (error) => {
    console.error("Request error occurred:", error.message);
    return Promise.reject(error); // Propagate the error
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return successful response
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Handle authentication errors only for specific routes
      const authRequiredRoutes = [
        "/users/currentUser",
        "/checkout",
        "/account",
      ];
      const isAuthRequired = authRequiredRoutes.some((route) =>
        error.config.url.includes(route)
      );

      if (isAuthRequired && !hasRedirected) {
        if (status === 401) {
          // Unauthorized: Redirect to login
          console.error("Unauthorized access. Redirecting to login...");
          hasRedirected = true;
          window.location.href = "/login"; // Redirect to login page
        } else if (status === 403) {
          // Forbidden: Insufficient permissions
          console.error(
            "Access forbidden. You do not have the required permissions."
          );
        }
      } else if (status >= 400 && status < 500) {
        // Log client-side errors for debugging
        console.error(
          `Client error: ${status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (status >= 500) {
        // Log server-side errors for debugging
        console.error(
          `Server error: ${status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      }
    } else if (error.request) {
      // No response from the server
      console.error("No response received from the server.");
    } else {
      // Unexpected error
      console.error("Unexpected error:", error.message);
    }

    return Promise.reject(error); // Propagate the error
  }
);

export default axiosInstance;
