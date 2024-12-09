import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Store user session data
  const [loading, setLoading] = useState(true); // Loading state for session check

  const fetchUser = async () => {
    try {
      console.log("Fetching user session...");
      const response = await axiosInstance.get("/users/currentUser", {
        withCredentials: true, // Include cookies for session
      });
      console.log("User session fetched:", response.data);
      setAuthData(response.data); // Cache user data in context
    } catch (error) {
      console.error("Error fetching user session:", error);
      setAuthData(null); // Clear state if not authenticated
    } finally {
      setLoading(false); // Loading complete
    }
  };

  useEffect(() => {
    if (!authData) {
      fetchUser(); // Fetch session data only if not cached
    }
  }, [authData]);

  const login = (userData) => {
    setAuthData(userData); // Store user session after login
  };

  const logout = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setAuthData(null); // Clear session on logout
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
