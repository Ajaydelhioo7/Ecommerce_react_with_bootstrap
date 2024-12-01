import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Books from "../pages/Books";
import Account from "../pages/Account";
import CoursesPage from "../pages/CoursesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage"; // Import CheckoutPage
import FooterOne from "../components/common/Footer/FooterOne";
import FooterTwo from "../components/common/Footer/FooterTwo";
import TestSeriesPage from "../pages/TestSeriesPage";
import Login from "../components/common/Login/Login";
import Register from "../components/common/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"; // Import ProtectedRoute

const AppRoutes = () => {
  const location = useLocation();

  // Determine which footer to display based on the route
  const isFooterOne = !["/checkout", "/cart"].includes(location.pathname);

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Conditionally render the appropriate footer */}
      {isFooterOne ? <FooterOne /> : <FooterTwo />}
    </>
  );
};

export default AppRoutes;
