import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FlashSale from './components/FlashSale';
import ProductSection from './components/ProductSection';
import BrandSection from './components/BrandSection';
import PersonalizedSection from './components/PersonalizedSection';
import SkincareRoutine from './components/SkincareRoutine';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

// Import pages
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/wishlist':
        return <WishlistPage />;
      case '/cart':
        return <CartPage />;
      case '/search':
        return <SearchPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <HeroBanner />
            <CategorySection />
            <FlashSale />
            <ProductSection />
            <BrandSection />
            <PersonalizedSection />
            <SkincareRoutine />
            <NewsSection />
            <Footer />
          </div>
        );
    }
  };

  return (
    <AppProvider>
      {renderPage()}
    </AppProvider>
  );
}

export default App;