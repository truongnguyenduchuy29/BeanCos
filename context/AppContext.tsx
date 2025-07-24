import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

interface VoucherData {
  id: string;
  code: string;
  discount: string;
  description: string;
  color: string;
  taken: number;
  maxTaken: number;
  applicableProducts: number[]; // Product IDs that can use this voucher
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
  // Copied vouchers
  copiedVouchers: string[];
  addCopiedVoucher: (voucher: string) => void;
  // Voucher data
  currentVouchers: VoucherData[];
  takeVoucher: (voucherId: string) => boolean;
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
  
  // Copied vouchers state
  const [copiedVouchers, setCopiedVouchers] = useState<string[]>([]);
  
  // Voucher system state
  const [currentVouchers, setCurrentVouchers] = useState<VoucherData[]>([
    {
      id: 'v1',
      code: "BEA50",
      discount: "50K",
      description: "Giảm 50K - Chỉ áp dụng cho một số sản phẩm",
      color: "bg-pink-100",
      taken: Math.floor(Math.random() * 80) + 10, // Random taken between 10-89
      maxTaken: 100,
      applicableProducts: [1, 2, 3, 4, 5] // Product IDs
    },
    {
      id: 'v2',
      code: "BEA15",
      discount: "15%",
      description: "Giảm 15% - Chỉ áp dụng cho một số sản phẩm",
      color: "bg-pink-100",
      taken: Math.floor(Math.random() * 80) + 10,
      maxTaken: 100,
      applicableProducts: [6, 7, 8, 9, 10]
    },
    {
      id: 'v3',
      code: "BEAN99K",
      discount: "99K",
      description: "Giảm 99K - Chỉ áp dụng cho một số sản phẩm",
      color: "bg-pink-100",
      taken: Math.floor(Math.random() * 80) + 10,
      maxTaken: 100,
      applicableProducts: [1, 3, 5, 7, 9]
    },
    {
      id: 'v4',
      code: "FREESHIP",
      discount: "0K",
      description: "Miễn phí ship - Chỉ áp dụng cho một số sản phẩm",
      color: "bg-pink-100",
      taken: Math.floor(Math.random() * 80) + 10,
      maxTaken: 100,
      applicableProducts: [2, 4, 6, 8, 10]
    }
  ]);

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

  const addCopiedVoucher = (voucher: string) => {
    setCopiedVouchers(prev => {
      if (!prev.includes(voucher)) {
        return [...prev, voucher];
      }
      return prev;
    });
  };

  const takeVoucher = (voucherId: string): boolean => {
    let success = false;
    setCurrentVouchers(prev => 
      prev.map(voucher => {
        if (voucher.id === voucherId && voucher.taken < voucher.maxTaken) {
          success = true;
          const newTaken = voucher.taken + 1;
          
          // If voucher is now full, generate new voucher
          if (newTaken >= voucher.maxTaken) {
            const voucherTypes = [
              { code: "SAVE20", discount: "20K", description: "Giảm 20K - Chỉ áp dụng cho một số sản phẩm" },
              { code: "MEGA15", discount: "15%", description: "Giảm 15% - Chỉ áp dụng cho một số sản phẩm" },
              { code: "FLASH40", discount: "40K", description: "Flash giảm 40K - Chỉ áp dụng cho một số sản phẩm" },
              { code: "SUPER25", discount: "25%", description: "Super giảm 25% - Chỉ áp dụng cho một số sản phẩm" },
              { code: "ULTRA60", discount: "60K", description: "Ultra giảm 60K - Chỉ áp dụng cho một số sản phẩm" },
              { code: "POWER35", discount: "35%", description: "Power giảm 35% - Chỉ áp dụng cho một số sản phẩm" },
              { code: "BOOST80", discount: "80K", description: "Boost giảm 80K - Chỉ áp dụng cho một số sản phẩm" },
              { code: "TURBO12", discount: "12%", description: "Turbo giảm 12% - Chỉ áp dụng cho một số sản phẩm" }
            ];
            
            const randomType = voucherTypes[Math.floor(Math.random() * voucherTypes.length)];
            const randomProducts = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
            
            return {
              ...voucher,
              ...randomType,
              taken: 0, // Reset counter
              applicableProducts: randomProducts
            };
          }
          
          return { ...voucher, taken: newTaken };
        }
        return voucher;
      })
    );
    return success;
  };

  // Regenerate vouchers every 5 minutes
  useEffect(() => {
    const generateNewVouchers = (): VoucherData[] => {
      const voucherTypes = [
        { code: "BEA50", discount: "50K", description: "Giảm 50K - Chỉ áp dụng cho một số sản phẩm" },
        { code: "BEA15", discount: "15%", description: "Giảm 15% - Chỉ áp dụng cho một số sản phẩm" },
        { code: "BEAN99K", discount: "99K", description: "Giảm 99K - Chỉ áp dụng cho một số sản phẩm" },
        { code: "FREESHIP", discount: "0K", description: "Miễn phí ship - Chỉ áp dụng cho một số sản phẩm" },
        { code: "FLASH30", discount: "30%", description: "Flash sale 30% - Chỉ áp dụng cho một số sản phẩm" },
        { code: "MEGA70K", discount: "70K", description: "Giảm 70K - Chỉ áp dụng cho một số sản phẩm" }
      ];

      return Array.from({ length: 4 }, (_, i) => {
        const randomType = voucherTypes[Math.floor(Math.random() * voucherTypes.length)];
        const randomProducts = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
        return {
          id: `v${i + 1}_${Date.now()}`,
          ...randomType,
          color: "bg-pink-100",
          taken: Math.floor(Math.random() * 30), // Start with some taken
          maxTaken: 100,
          applicableProducts: randomProducts
        };
      });
    };

    const interval = setInterval(() => {
      setCurrentVouchers(generateNewVouchers());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

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
        copiedVouchers,
        addCopiedVoucher,
        currentVouchers,
        takeVoucher,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};