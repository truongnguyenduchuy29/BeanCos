
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/ProductDetail'
import { AppProvider } from './context/AppContext'
import CartPage from './components/CartPage'
import WishlistPage from './components/WishlistPage'
import Skincare from './pages/Skincare'
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
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
