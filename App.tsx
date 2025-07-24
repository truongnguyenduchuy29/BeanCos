import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import { AppProvider } from "./context/AppContext";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import Skincare from "./pages/Skincare";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NewPage from "./pages/NewPage";
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/routine" element={<Skincare />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/news" element={<NewPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
