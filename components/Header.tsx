import React, { useState } from 'react';
import { Search, Phone, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const { wishlist, cart, searchQuery, setSearchQuery, isAuthenticated, user } = useAppContext();

  const productCategories = [
    {
      title: 'CHĂM SÓC DA',
      items: [
        'Tẩy trang',
        'Kem dưỡng da',
        'Sữa rửa mặt',
        'Toner nước cân bằng',
        'Treatment đặc trị',
        'Serum trị mụn'
      ]
    },
    {
      title: 'CHĂM SÓC CƠ THỂ',
      items: [
        'Sữa tắm',
        'Sữa dưỡng thể',
        'Tẩy tế bào chết',
        'Kem tẩy lông',
        'Xịt khử mùi'
      ]
    },
    {
      title: 'CHĂM SÓC TÓC',
      items: [
        'Dầu xả tóc',
        'Dầu gội',
        'Kem ủ tóc',
        'Xịt dưỡng tóc'
      ]
    }
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
      <div className="bg-purple-300 text-sm text-purple-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            Chào mừng bạn đến với Bean Mỹ Phẩm!
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-purple-600 cursor-pointer">Hệ thống cửa hàng</a>
            {!isAuthenticated ? (
              <>
                <a href="/register" className="hover:text-purple-600 cursor-pointer">Đăng ký</a>
                <a href="/login" className="hover:text-purple-600 cursor-pointer">Đăng nhập</a>
              </>
            ) : (
              <span>Xin chào, {user?.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src="../src/img/logo.webp" alt="Bean Mỹ Phẩm" className="h-16" />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-200 p-2 rounded-full text-gray-400 hover:text-purple-500">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact and actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center text-pink-500">
                <div className="mr-2">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-700">Hotline</div>
                  <div className="text-sm font-semibold">1900 6750</div>
                </div>
              </div>

              <a href="/wishlist" className="flex items-center text-pink-500 hover:text-pink-600 transition-colors">
                <div className="mr-2 relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-gray-700">Yêu thích</div>
                  <div className="text-sm">sản phẩm</div>
                </div>
              </a>

              <a href="/cart" className="relative flex items-center text-pink-500 hover:text-pink-600 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <div className="ml-2">
                  <div className="text-sm">0 sản phẩm</div>
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-200 p-1 rounded-full text-gray-400">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t border-b hidden md:block mt-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <ul className="flex space-x-10 py-3">
                <li>
                  <a href="/" className="text-blue-500 font-medium border-b-2 border-blue-500 pb-2">
                    TRANG CHỦ
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
                    GIỚI THIỆU
                  </a>
                </li>
                <li className="relative group">
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                  >
                    SẢN PHẨM
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  
                  {/* Product Dropdown */}
                  {isProductDropdownOpen && (
                    <div
                      className="absolute top-full left-0 bg-white shadow-xl border rounded-lg p-6 z-50 w-max"
                      onMouseEnter={() => setIsProductDropdownOpen(true)}
                      onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {productCategories.map((category, index) => (
                          <div key={index} className="min-w-[200px]">
                            <h3 className="font-bold text-gray-800 mb-3 text-sm">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <a href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                     className="text-sm text-gray-600 hover:text-blue-500 transition-colors block">
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <a href="/products" className="text-gray-700 hover:text-blue-500 transition-colors">
                    SẢN PHẨM
                  </a>
                </li>
                <li>
                  <a href="/news" className="text-gray-700 hover:text-blue-500 transition-colors">
                    TIN TỨC
                  </a>
                </li>
                <li>
                  <a href="/routine" className="text-teal-500 hover:text-teal-600 transition-colors">
                    ROUTINE SKINCARE
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-700 hover:text-blue-500 transition-colors">
                    LIÊN HỆ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-4">
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <a href="/" className="block text-blue-500 font-medium py-2">
                    TRANG CHỦ
                  </a>
                </li>
                <li>
                  <a href="/about" className="block text-gray-700 hover:text-blue-500 transition-colors py-2">
                    GIỚI THIỆU
                  </a>
                </li>
                <li>
                  <a href="/products" className="block text-gray-700 hover:text-blue-500 transition-colors py-2">
                    SẢN PHẨM
                  </a>
                </li>
                <li>
                  <a href="/news" className="block text-gray-700 hover:text-blue-500 transition-colors py-2">
                    TIN TỨC
                  </a>
                </li>
                <li>
                  <a href="/routine" className="block text-teal-500 hover:text-teal-600 transition-colors py-2">
                    ROUTINE SKINCARE
                  </a>
                </li>
                <li>
                  <a href="/contact" className="block text-gray-700 hover:text-blue-500 transition-colors py-2">
                    LIÊN HỆ
                  </a>
                </li>
                <li className="border-t pt-4">
                  <a href="/wishlist" className="flex items-center text-pink-500 py-2">
                    <Heart className="w-5 h-5 mr-2" />
                    Yêu thích ({wishlist.length})
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;