import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  brand?: string;
  tags?: string[];
  gift?: string;
  quantity?: number; // Add optional quantity property
}

interface CartItem extends Product {
  quantity: number;
}

interface AppContextType {
  wishlist: Product[];
  cart: CartItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  isInWishlist: (productId: number) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  // Animation states
  cartAnimation: boolean;
  wishlistAnimation: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Animation states
  const [cartAnimation, setCartAnimation] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (!prev.find(item => item.id === product.id)) {
        // Trigger wishlist animation
        setWishlistAnimation(true);
        setTimeout(() => setWishlistAnimation(false), 600);
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      // Trigger cart animation
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        cart,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        cartAnimation,
        wishlistAnimation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};