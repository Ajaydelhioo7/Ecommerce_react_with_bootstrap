import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Books from "../pages/Books";
import Account from "../pages/Account";
import CoursesPage from "../pages/CoursesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FooterOne from "../components/common/Footer/FooterOne";
import FooterTwo from "../components/common/Footer/FooterTwo";
import TestSeriesPage from "../pages/TestSeriesPage";
import Login from "../components/common/Login/Login";
import Register from "../components/common/Register/Register";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const location = useLocation();
  const { authData, loading } = useAuth();

  // Determine which footer to display based on the route
  const isFooterOne = !["/checkout", "/cart"].includes(location.pathname);

  if (loading) {
    // Show a loader while auth status is being determined
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/test-series" element={<TestSeriesPage />} />
        <Route
          path="/login"
          element={authData ? <Navigate to="/account" replace /> : <Login />}
        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/account"
          element={authData ? <Account /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/checkout"
          element={
            authData ? <CheckoutPage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      {/* Conditionally render the appropriate footer */}
      {isFooterOne ? <FooterOne /> : <FooterTwo />}
    </>
  );
};

export default AppRoutes;
