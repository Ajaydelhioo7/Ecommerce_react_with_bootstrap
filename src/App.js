import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/common/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import store from "./redux/store";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { loading } = useAuth(); // Only using loading for now

  // To avoid rendering the app before auth state is resolved
  if (loading) {
    return <div>Loading...</div>; // Show a loader or fallback UI
  }

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
