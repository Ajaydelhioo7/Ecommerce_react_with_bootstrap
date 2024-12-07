import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // User session data
  const [loading, setLoading] = useState(true); // Loading state for session check

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user session...");
        const response = await axiosInstance.get("/users/currentUser", {
          withCredentials: true, // Include cookies for session
        });
        console.log("User session fetched:", response.data);
        setAuthData(response.data); // Store user data in state
      } catch (error) {
        console.error("Error fetching user session:", error);
        setAuthData(null); // Clear state if not authenticated
      } finally {
        setLoading(false); // Set loading to false after check
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    console.log("Login called, updating authData:", userData);
    setAuthData(userData); // Update user data on login
  };

  const logout = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout successful, clearing authData.");
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
