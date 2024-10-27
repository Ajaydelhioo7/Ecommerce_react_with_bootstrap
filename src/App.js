import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <AppRoutes /> {/* Use AppRoutes for centralized routing */}
      </Router>
    </CartProvider>
  );
}

export default App;
