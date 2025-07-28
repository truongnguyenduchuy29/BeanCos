import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import productData from '../db/product.json';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{
    id: number;
    name: string;
    brand: string; 
    price: number;
    imageUrl: string;
  }>>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { wishlist, cart, searchQuery, setSearchQuery, isAuthenticated, user, cartAnimation, wishlistAnimation } =
    useAppContext();
  const currentLocation = useLocation();

  // Placeholder messages for carousel effect
  const placeholderMessages = [
    "Bạn muốn tìm gì?",
    "Tìm kem dưỡng da...",
    "Tìm serum...", 
    "Tìm toner...",
    "Tìm sữa rửa mặt...",
    "Tìm mỹ phẩm...",
  ];

  // Carousel effect for placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => 
        (prevIndex + 1) % placeholderMessages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderMessages.length]);

  // Search suggestions logic
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      // Filter products based on search query
      const filtered = productData.products
        .filter(product => 
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.brand.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase()) ||
          product.type.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
  }) => {
    setSearchQuery(product.name);
    setShowSearchSuggestions(false);
    window.location.href = `/product/${product.id}`;
  };  // Add global click handler to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProductDropdownOpen(false);
    };
    
    // Add event listener when dropdown is open
    if (isProductDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProductDropdownOpen]);
  
  // Reset dropdown state when URL changes (by using searchParams from React Router)
  const location = window.location;
  
  useEffect(() => {
    setIsProductDropdownOpen(false);
  }, [location.pathname, location.search]);

  const productCategories = [
    {
      title: "CHĂM SÓC DA",
      items: [
        "Tẩy trang",
        "Kem dưỡng da",
        "Kem dưỡng",
        "Kem dưỡng ẩm",
        "Kem dưỡng kiềm dầu",
        "Sữa rửa mặt",
        "Toner",
        "Serum dưỡng ẩm",
        "Serum kiềm dầu",
        "Serum chống lão hóa",
        "Nước cân bằng",
        "Gel tẩy da chết",
        "Sữa rửa mặt tẩy tế bào chết",
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Always navigate to products page with search query
      // ProductPage will handle showing results or "no products found" message
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm font-medium flex items-center">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Chào mừng bạn đến với Bean Mỹ Phẩm! ✨
          </div>
          <div className="hidden md:flex space-x-6 items-center text-sm">
            <a
              href="#"
              className="hover:text-yellow-300 transition-all duration-300 flex items-center group"
            >
              <svg
                className="w-4 h-4 mr-1 group-hover:animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Hệ thống cửa hàng
            </a>
            {!isAuthenticated ? (
              <>
                <a
                  href="/register"
                  className="hover:text-yellow-300 transition-all duration-300 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
                >
                  Đăng ký
                </a>
                <a
                  href="/login"
                  className="hover:text-yellow-300 transition-all duration-300 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
                >
                  Đăng nhập
                </a>
              </>
            ) : (
              <span className="font-medium bg-white/20 px-3 py-1 rounded-full">
                👋 Xin chào, {user?.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="../src/img/logo.webp"
                  alt="Bean Mỹ Phẩm"
                  className="h-12 sm:h-14 md:h-16 object-contain"
                />
              </a>
            </div>

            {/* Search bar */}
            <div className="hidden md:block w-full max-w-xl mx-4 relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={placeholderMessages[placeholderIndex]}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => {
                      if (searchQuery.trim() && searchSuggestions.length > 0) {
                        setShowSearchSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowSearchSuggestions(false), 200);
                    }}
                    className="w-full px-6 py-3 pl-12 pr-16 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm shadow-lg transition-all duration-300 hover:shadow-xl bg-gray-50/50 backdrop-blur-sm"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 p-2 rounded-full text-white transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <p className="text-xs text-red-500 font-semibold">
                          {product.price.toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                  ))}
                  {searchQuery.trim() && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => {
                          setShowSearchSuggestions(false);
                          window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Xem tất cả kết quả cho "{searchQuery}"
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Custom CSS for placeholder animation */}
              <style>{`
                @keyframes placeholderCarousel {
                  0%, 100% { 
                    background: linear-gradient(90deg, transparent 0%, transparent 100%);
                  }
                  50% { 
                    background: linear-gradient(90deg, rgba(147, 51, 234, 0.05) 0%, transparent 100%);
                  }
                }
                
                .search-input::placeholder {
                  animation: fadeInOut 3s infinite;
                  transition: all 0.3s ease;
                }
                
                @keyframes fadeInOut {
                  0%, 20%, 80%, 100% { opacity: 1; }
                  40%, 60% { opacity: 0.7; }
                }
              `}</style>
            </div>

            {/* Contact and actions */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Hotline */}
              <div className="flex items-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-full px-4 py-2 border border-pink-100">
                <div className="mr-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">
                    Hotline 24/7
                  </div>
                  <div className="text-sm font-bold text-pink-600">
                    1900 6750
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex items-center group hover:bg-pink-50 rounded-full px-3 py-2 transition-all duration-300"
              >
                <div
                  className={`mr-3 relative bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 group-hover:scale-110 transition-all duration-300 ${
                    wishlistAnimation ? 'animate-bounce scale-110' : ''
                  }`}
                >
                  <Heart className="w-4 h-4 text-white" />
                  <span
                    className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg transition-all duration-300 ${
                      wishlistAnimation ? 'animate-pulse scale-125' : ''
                    }`}
                  >
                    {wishlist.length}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600 group-hover:text-pink-600 transition-colors">
                    Yêu thích
                  </div>
                  <div className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {wishlist.length} sản phẩm
                  </div>
                </div>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center group hover:bg-pink-50 rounded-full px-3 py-2 transition-all duration-300 relative"
              >
                <div
                  className={`mr-3 relative bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 group-hover:scale-110 transition-all duration-300 ${
                    cartAnimation ? 'animate-bounce scale-110' : ''
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span
                    className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg transition-all duration-300 ${
                      cartAnimation ? 'animate-pulse scale-125' : ''
                    }`}
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600 group-hover:text-pink-600 transition-colors">
                    Giỏ hàng
                  </div>
                  <div className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3 relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={placeholderMessages[placeholderIndex]}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => {
                  if (searchQuery.trim() && searchSuggestions.length > 0) {
                    setShowSearchSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowSearchSuggestions(false), 200);
                }}
                className="search-input w-full px-3 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-purple-100 p-1 rounded-full text-purple-500 hover:bg-purple-200"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Mobile Search Suggestions */}
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg mr-2"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-xs text-gray-800 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-gray-500">{product.brand}</p>
                      <p className="text-[10px] text-red-500 font-semibold">
                        {product.price.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
                {searchQuery.trim() && (
                  <div className="p-2 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => {
                        setShowSearchSuggestions(false);
                        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                      }}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Xem tất cả kết quả cho "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t border-b hidden md:block mt-3">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <ul className="flex space-x-6 lg:space-x-10">
                <li>
                  <Link
                    to="/"
                    className={`text-sm font-medium block py-2.5 ${
                      currentLocation.pathname === '/' 
                        ? "text-blue-500 border-b-2 border-blue-500 pb-1.5" 
                        : "text-gray-700 hover:text-blue-500 transition-colors"
                    }`}
                  >
                    TRANG CHỦ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`text-sm font-medium block py-2.5 ${
                      currentLocation.pathname === '/about' 
                        ? "text-blue-500 border-b-2 border-blue-500 pb-1.5" 
                        : "text-gray-700 hover:text-blue-500 transition-colors"
                    }`}
                  >
                    GIỚI THIỆU
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    to="/products"
                    className={`flex items-center text-sm font-medium pb-2.5 pt-2.5 ${
                      currentLocation.pathname === '/products' || currentLocation.pathname.startsWith('/product') 
                        ? "text-blue-500 border-b-2 border-blue-500 pb-1.5" 
                        : "text-gray-700 hover:text-blue-500 transition-colors"
                    }`}
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                    onClick={(e) => {
                      // Allow navigating to /products when clicking directly on the link
                      // but don't close dropdown on hover/mouseover
                      if (e.type === 'click') {
                        setIsProductDropdownOpen(false);
                      }
                    }}
                  >
                    SẢN PHẨM
                    <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                  </Link>

                  {/* Product Dropdown */}
                  {isProductDropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-100 rounded-lg p-8 z-50"
                      onMouseEnter={() => setIsProductDropdownOpen(true)}
                      onMouseLeave={() => setIsProductDropdownOpen(false)}
                      onClick={(e) => {
                        // Don't close if clicking inside the dropdown itself
                        e.stopPropagation();
                      }}
                      style={{
                        marginTop: "1px",
                        width: "600px",
                        maxWidth: "90vw",
                      }}
                    >
                      <div className="flex justify-center w-full">
                        {productCategories.map((category, index) => (
                          <div key={index} className="flex flex-col w-full max-w-md">
                            <h3 className="font-medium text-blue-600 mb-4 text-base border-b border-gray-200 pb-2 text-center">
                              {category.title}
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                              {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={`/products?category=${encodeURIComponent(
                                      item
                                    )}`}
                                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 py-1.5 pl-2 rounded-md hover:bg-blue-50/50"
                                    onClick={() => {
                                      // Ensure dropdown closes properly on category click
                                      setIsProductDropdownOpen(false);
                                      // Allow default navigation behavior
                                    }}
                                  >
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                {/* Removed duplicate SẢN PHẨM menu item */}
                <li>
                  <Link
                    to="/news"
                    className={`text-sm font-medium block py-2.5 ${
                      currentLocation.pathname === '/news' 
                        ? "text-blue-500 border-b-2 border-blue-500 pb-1.5" 
                        : "text-gray-700 hover:text-blue-500 transition-colors"
                    }`}
                  >
                    TIN TỨC
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routine"
                    className={`text-sm font-medium block py-2.5 ${
                      currentLocation.pathname === '/routine' 
                        ? "text-teal-500 border-b-2 border-teal-500 pb-1.5" 
                        : "text-teal-500 hover:text-teal-600 transition-colors"
                    }`}
                  >
                    ROUTINE SKINCARE
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`text-sm font-medium block py-2.5 ${
                      currentLocation.pathname === '/contact' 
                        ? "text-blue-500 border-b-2 border-blue-500 pb-1.5" 
                        : "text-gray-700 hover:text-blue-500 transition-colors"
                    }`}
                  >
                    LIÊN HỆ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-3 animate-fadeIn">
            {/* Mobile Menu Items */}
            <div className="mt-5 space-y-4 px-2">
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-pink-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProductDropdownOpen(!isProductDropdownOpen);
                  }}
                  className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <span>Sản phẩm</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isProductDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isProductDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {productCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="font-medium text-gray-900 py-1">
                          {category.title}
                        </h3>
                        <div className="ml-2 space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item}
                              to={`/products?category=${encodeURIComponent(
                                item
                              )}`}
                              className="block py-1 text-sm text-gray-600 hover:text-pink-500 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className="block py-2 text-gray-700 hover:text-pink-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-gray-700 hover:text-pink-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
              
              {/* Add links for Wishlist and Cart */}
              <Link
                to="/wishlist"
                className="flex items-center py-2 text-gray-700 hover:text-pink-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4 mr-2" />
                <span>Yêu thích ({wishlist.length})</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center py-2 text-gray-700 hover:text-pink-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </Link>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 mt-1">
              <a href="/login" className="text-xs text-purple-600 font-medium">
                Đăng nhập
              </a>
              <a
                href="/register"
                className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full"
              >
                Đăng ký
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
