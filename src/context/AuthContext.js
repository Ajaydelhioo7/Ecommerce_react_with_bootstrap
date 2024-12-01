import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken") // Check token in localStorage
  );

  const login = (token) => {
    localStorage.setItem("jwtToken", token); // Save token
    setIsAuthenticated(true); // Update auth state
  };

  const logout = () => {
    localStorage.removeItem("jwtToken"); // Remove token
    setIsAuthenticated(false); // Update auth state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
