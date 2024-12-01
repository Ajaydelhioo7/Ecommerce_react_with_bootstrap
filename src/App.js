import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <AppRoutes /> {/* Use AppRoutes for centralized routing */}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
