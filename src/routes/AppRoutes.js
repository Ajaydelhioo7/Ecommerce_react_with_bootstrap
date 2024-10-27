// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Books from "../pages/Books";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
};

export default AppRoutes;
