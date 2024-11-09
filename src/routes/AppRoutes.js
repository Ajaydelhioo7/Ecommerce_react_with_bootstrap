import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Books from "../pages/Books";
import CoursesPage from "../pages/CoursesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FooterOne from "../components/common/Footer/FooterOne";
import FooterTwo from "../components/common/Footer/FooterTwo";
import TestSeriesPage from "../pages/TestSeriesPage";

const AppRoutes = () => {
  const location = useLocation();

  // Determine which footer to display based on the route
  const isFooterOne = !["/checkout", "/cart"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
        <Route path="/checkout" element={<CheckoutPage />} />{" "}
        <Route path="/test-series" element={<TestSeriesPage />} />
        {/* Checkout page */}
      </Routes>

      {/* Conditionally render the appropriate footer */}
      {isFooterOne ? <FooterOne /> : <FooterTwo />}
    </>
  );
};

export default AppRoutes;
