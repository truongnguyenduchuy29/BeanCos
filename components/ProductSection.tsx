import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductSection = () => {
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    // Add animation after component mounts
    setShowSection(true);

    // For staggered animation of products
    const timer = setTimeout(() => {
      const products = document.querySelectorAll('.product-item');
      products.forEach((product, index) => {
        setTimeout(() => {
          (product as HTMLElement).style.opacity = '1';
          (product as HTMLElement).style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const vouchers = [
    { 
      code: 'BEA50', 
      discount: '50K',
      description: 'Mã giảm 50K cho đơn hàng tối thiểu 750.000đ.',
      color: 'bg-pink-200'
    },
    { 
      code: 'BEA15', 
      discount: '15%',
      description: 'Mã giảm 15% cho đơn hàng tối thiểu 1.500.000đ.',
      color: 'bg-pink-200'
    },
    { 
      code: 'BEAN99K', 
      discount: '99K',
      description: 'Mã giảm 99K cho đơn hàng tối thiểu 950.000đ.',
      color: 'bg-pink-200'
    },
    { 
      code: 'FREESHIP', 
      discount: '0K',
      description: 'Nhập mã FREESHIP miễn phí vận chuyển.',
      color: 'bg-pink-200'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Tinh chất sáng da Serum Vichy Liftactiv Specialist',
      price: 1275000,
      originalPrice: 1310000,
      discount: 3,
      image: '../src/img/slider_1.webp',
      brand: 'VICHY',
      brandImage: '../src/img/thuonghieu_1.jpg',
      tags: ['EXCLUSIVE'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 156
    },
    {
      id: 2,
      name: 'Tẩy da chết vật lý Bioderma Sebium Gel Gommant',
      price: 390000,
      originalPrice: 390000,
      discount: 0,
      image: '../src/img/slider_1.webp',
      brand: 'BIODERMA',
      brandImage: '../src/img/thuonghieu_2.jpg',
      tags: [],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 89
    },
    {
      id: 3,
      name: "Tẩy da chết Paula's Choice Skin Perfecting Gel Exfoliant",
      price: 339000,
      originalPrice: 390000,
      discount: 13,
      image: '../src/img/slider_1.webp',
      brand: "PAULA'S CHOICE",
      brandImage: '../src/img/thuonghieu_3.jpg',
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 245
    },
    {
      id: 4,
      name: 'Simple Smoothing Facial Scrub',
      price: 75000,
      originalPrice: 95000,
      discount: 21,
      image: '../src/img/slider_1.webp',
      brand: 'SIMPLE',
      brandImage: '../src/img/thuonghieu_4.jpg',
      tags: ['BEST SELLER'],
      gift: 'Có 2 lựa chọn quà tặng khi mua hàng',
      sold: 178
    },
    {
      id: 5,
      name: 'Tinh chất La Roche-Posay Hyalu B5 Serum phục hồi da',
      price: 770000,
      originalPrice: 890000,
      discount: 13,
      image: '../src/img/slider_1.webp',
      brand: 'LA ROCHE-POSAY',
      brandImage: '../src/img/thuonghieu_5.jpg',
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 1 lựa chọn quà tặng khi mua hàng',
      sold: 324
    },
  ];

  // Format price with dot separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
  };

  return (
    <>
      {/* Vouchers Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vouchers.map((voucher, index) => (
              <div 
                key={index} 
                className="border border-purple-200 rounded-lg overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 transition-transform duration-300 hover:shadow-md transform hover:scale-[1.02]"
                style={{ 
                  opacity: showSection ? 1 : 0,
                  transform: showSection ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s, transform 0.5s',
                  transitionDelay: `${0.1 + index * 0.1}s`
                }}
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-16 h-16 ${voucher.color} rounded-lg flex items-center justify-center text-pink-600 font-bold text-xl`}>
                      {voucher.discount}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="font-bold text-pink-600">NHẬP MÃ: {voucher.code}</div>
                    <div className="text-xs text-gray-600 my-1">{voucher.description}</div>
                    <div className="flex justify-between items-center mt-auto">
                      <button className="bg-purple-300 text-purple-700 text-xs py-1 px-3 rounded-full hover:bg-purple-400 transition-colors">
                        Sao chép mã
                      </button>
                      <a href="#" className="text-xs text-blue-500 hover:underline">Điều kiện</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Section */}
      <section className={`py-12 bg-gray-50 transition-all duration-700 ${showSection ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          {/* Title Section with Decoration */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
              CHĂM SÓC DA
            </h2>
            <div className="relative w-40 h-6 flex justify-center mb-6">
              <div className="h-0.5 w-full bg-pink-300 absolute top-1/2 transform -translate-y-1/2"></div>
              <div className="bg-gray-50 p-1 z-10 relative">
                <img src="../src/img/icon_title.png" alt="title decoration" className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="product-item border border-gray-200 rounded-lg p-2 relative bg-white transition-all duration-500 hover:shadow-lg"
                style={{ 
                  opacity: 0, 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s, transform 0.5s'
                }}
              >
                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                {/* Brand Label */}
                <div className="absolute top-2 left-2 z-10">
                  <img 
                    src={product.brandImage} 
                    alt={product.brand} 
                    className="h-8 w-auto rounded" 
                  />
                </div>
                
                {/* Product Image */}
                <div className="flex justify-center py-4 mt-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Labels */}
                <div className="flex space-x-1 mb-2">
                  {product.tags && product.tags.map((label, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs px-1 py-0.5 rounded font-medium ${
                        label === 'EXCLUSIVE' ? 'bg-blue-800 text-white' : 
                        label === 'BEST SELLER' ? 'bg-red-600 text-white' : ''
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                
                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
                  {product.name}
                </h3>
                
                {/* Prices */}
                <div className="flex items-center mb-1">
                  <span className="text-red-600 font-bold mr-2">{formatPrice(product.price)}</span>
                  {product.discount > 0 && (
                    <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs px-1 rounded">-{product.discount}%</span>
                  )}
                </div>
                
                {/* Sold Count */}
                <div className="flex items-center text-sm mb-2">
                  <span className="text-red-500 flex items-center text-xs">
                    <span className="inline-block w-4 h-4 mr-1">🔥</span>
                    Đã bán {product.sold} sp
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-red-500 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(product.sold / 4, 100)}%` }}
                  ></div>
                </div>
                
                {/* Gift Badge */}
                <div className="border border-red-500 rounded-sm p-1 text-xs text-red-500 flex items-center justify-center">
                  <span className="mr-1">🎁</span>
                  {product.gift}
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center">
              Xem tất cả sản phẩm
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;