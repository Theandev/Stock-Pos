import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
