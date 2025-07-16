import { AppProvider } from "./context/AppContext";

// Import pages
import HomePage from "./components/HomePage";
import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case "/wishlist":
        return <WishlistPage />;
      case "/cart":
        return <CartPage />;
      case "/search":
        return <SearchPage />;
      case "/login":
        return <LoginPage />;
      case "/register":
        return <RegisterPage />;
      case "/about":
        return <AboutPage />;
      case "/contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return <AppProvider>{renderPage()}</AppProvider>;
}

export default App;
