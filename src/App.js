import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/common/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header />
            <AppRoutes />
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
