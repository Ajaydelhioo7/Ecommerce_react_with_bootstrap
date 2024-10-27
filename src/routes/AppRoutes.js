import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Books from "../pages/Books";
import CoursesPage from "../pages/CoursesPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/books" element={<Books />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
      <Route path="/checkout" element={<CheckoutPage />} />{" "}
      {/* Checkout page */}
    </Routes>
  );
};

export default AppRoutes;
