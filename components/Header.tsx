import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const { wishlist, cart, searchQuery, setSearchQuery, isAuthenticated, user } =
    useAppContext();
    
  // Add global click handler to close dropdown when clicking outside
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
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-purple-200 text-sm text-purple-800 py-1.5 sm:py-2 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xs sm:text-sm font-medium">
            Chào mừng bạn đến với Bean Mỹ Phẩm!
          </div>
          <div className="hidden md:flex space-x-5 items-center text-xs sm:text-sm">
            <a
              href="#"
              className="hover:text-purple-700 transition-colors cursor-pointer"
            >
              Hệ thống cửa hàng
            </a>
            {!isAuthenticated ? (
              <>
                <a
                  href="/register"
                  className="hover:text-purple-700 transition-colors cursor-pointer"
                >
                  Đăng ký
                </a>
                <a
                  href="/login"
                  className="hover:text-purple-700 transition-colors cursor-pointer"
                >
                  Đăng nhập
                </a>
              </>
            ) : (
              <span className="font-medium">Xin chào, {user?.name}</span>
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
            <div className="hidden md:block w-full max-w-xl mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Bạn muốn tìm gì?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-purple-100 hover:bg-purple-200 p-1.5 sm:p-2 rounded-full text-purple-500 hover:text-purple-700 transition-colors"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>

            {/* Contact and actions */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center text-pink-500">
                <div className="mr-2 bg-pink-50 rounded-full p-1.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Hotline
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    1900 6750
                  </div>
                </div>
              </div>

              <a
                href="/wishlist"
                className="flex items-center text-pink-500 hover:text-pink-600 transition-colors group"
              >
                <div className="mr-2 relative bg-pink-50 rounded-full p-1.5 group-hover:bg-pink-100 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Yêu thích
                  </div>
                  <div className="text-xs sm:text-sm">sản phẩm</div>
                </div>
              </a>

              <a
                href="/cart"
                className="relative flex items-center text-pink-500 hover:text-pink-600 transition-colors group"
              >
                <div className="relative bg-pink-50 rounded-full p-1.5 group-hover:bg-pink-100 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <div className="ml-2">
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Giỏ hàng
                  </div>
                  <div className="text-xs sm:text-sm">0 sản phẩm</div>
                </div>
              </a>
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
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-purple-100 p-1 rounded-full text-purple-500 hover:bg-purple-200"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t border-b hidden md:block mt-3">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <ul className="flex space-x-6 lg:space-x-10">
                <li>
                  <a
                    href="/"
                    className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1.5 text-sm block py-2.5"
                  >
                    TRANG CHỦ
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium block py-2.5"
                  >
                    GIỚI THIỆU
                  </a>
                </li>
                <li className="relative group">
                  <Link
                    to="/products"
                    className="flex items-center text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium pb-2.5 pt-2.5"
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
                                    onClick={() => setIsProductDropdownOpen(false)}
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
                  <a
                    href="/news"
                    className="text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium block py-2.5"
                  >
                    TIN TỨC
                  </a>
                </li>
                <li>
                  <a
                    href="/routine"
                    className="text-teal-500 hover:text-teal-600 transition-colors text-sm font-medium block py-2.5"
                  >
                    ROUTINE SKINCARE
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium block py-2.5"
                  >
                    LIÊN HỆ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-3 animate-fadeIn">
            <ul className="py-1">
              <li className="border-b border-gray-100">
                <a
                  href="/"
                  className="text-gray-800 font-medium text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  TRANG CHỦ
                </a>
              </li>
              <li className="border-b border-gray-100">
                <a
                  href="/about"
                  className="text-gray-800 text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li className="border-b border-gray-100">
                <Link
                  to="/products"
                  className="text-gray-800 text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  SẢN PHẨM
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <a
                  href="/news"
                  className="text-gray-800 text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  TIN TỨC
                </a>
              </li>
              <li className="border-b border-gray-100">
                <a
                  href="/routine"
                  className="text-teal-600 text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  ROUTINE SKINCARE
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-800 text-sm block py-2 px-4 hover:bg-gray-50 transition-colors"
                >
                  LIÊN HỆ
                </a>
              </li>
            </ul>

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
