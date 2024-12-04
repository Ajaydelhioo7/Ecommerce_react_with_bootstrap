import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // User session data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user session details on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser", {
          withCredentials: true, // Include credentials for cookies
        });
        setAuthData(response.data); // Store user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthData(null); // Clear state if not authenticated
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setAuthData(userData); // Update state on login
  };

  const logout = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setAuthData(null); // Clear state on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
