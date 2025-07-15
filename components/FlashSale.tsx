import React, { useState, useEffect, useRef } from 'react';
import { Heart, Search, ShoppingCart } from 'lucide-react';

// CSS for the animated progress bar and other styles
const customStyles = `
  @keyframes progress_bar_fill {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 0;
    }
  }
  
  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    max-width: 500px;
  }
  
  .marquee-content {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 15s linear infinite;
  }
  
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  
  .flash-sale-header {
    color: #ffeb3b;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.25rem;
  }
  
  .flash-sale-header img {
    margin-right: 0.5rem;
  }
  
  .product-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.5rem;
    position: relative;
    background: white;
    transition: all 0.3s;
    transform: translateY(0);
  }
  
  .product-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-8px);
  }
  
  .product-image {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .product-image img {
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover .product-image img {
    transform: scale(1.05);
  }
  
  .product-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.5rem;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  
  .current-price {
    color: #e83a45;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  
  .original-price {
    color: #9ca3af;
    text-decoration: line-through;
    font-size: 0.75rem;
  }
  
  .discount-badge {
    background-color: #e83a45;
    color: white;
    font-size: 0.75rem;
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    margin-left: auto;
  }
  
  .countdown-bar {
    min-height: 20px;
    width: 100%;
    position: relative;
    margin-bottom: 5px;
  }
  
  .countdown-bar .bar-bg {
    width: 100%;
    height: 16px;
    border-radius: 7px;
    position: relative;
    background: #e83a45;
    z-index: 1;
    margin-top: 5px;
  }
  
  .countdown-bar .bar-progress {
    position: absolute;
    height: 16px;
    border-radius: 7px;
    background-color: #e83a45;
    z-index: 2;
    left: 0;
    top: 0;
    background-size: 40px 40px;
    animation: progress_bar_fill 2s linear infinite;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.25) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0.25) 75%,
      transparent 75%,
      transparent
    );
  }
  
  .countdown-bar .sale-icon {
    position: absolute;
    left: 3px;
    top: -6px;
    z-index: 3;
    width: 18px;
    height: 21px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .countdown-bar .bar-text {
    position: absolute;
    top: 0;
    z-index: 4;
    color: white;
    font-size: 12px;
    line-height: 16px;
    left: 50%;
    font-weight: 400;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
  }
  
  .gift-badge {
    border: 1px solid #e83a45;
    border-radius: 0.125rem;
    padding: 0.25rem;
    font-size: 0.75rem;
    color: #e83a45;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }
  
  .gift-badge:hover {
    background-color: rgba(232, 58, 69, 0.05);
  }
  
  .gift-badge span {
    margin-right: 0.25rem;
  }
  
  .product-labels {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.75rem;
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    font-weight: 500;
  }
  
  .label-exclusive {
    background-color: #1e40af;
    color: white;
  }
  
  .label-bestseller {
    background-color: #e83a45;
    color: white;
  }
  
  .hover-buttons {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    background-color: rgba(0, 0, 0, 0);
    z-index: 5;
  }
  
  .product-card:hover .hover-buttons {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .hover-buttons .button-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .search-button {
    background-color: white;
    border-radius: 9999px;
    padding: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .product-card:hover .search-button {
    opacity: 1;
    transform: translateY(0);
  }
  
  .search-button:hover {
    background-color: #f3f4f6;
  }
  
  .buy-button {
    background-color: white;
    color: #2563eb;
    border-radius: 9999px;
    padding: 0.5rem 1.25rem;
    font-weight: 500;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .product-card:hover .buy-button {
    opacity: 1;
    transform: translateY(0);
  }
  
  .buy-button:hover {
    background-color: #2563eb;
    color: white;
  }
`;

const FlashSale = () => {
  const products = [
    {
      id: 1,
      name: 'Nước cân bằng ngừa mụn La Roche-Posay Effaclar Astringent Lotion',
      image: '../src/img/slider_1.webp',
      brand: 'LA ROCHE-POSAY',
      brandLogo: '../src/img/thuonghieu_10.jpg',
      currentPrice: 305000,
      originalPrice: 380000,
      discount: 20,
      sold: 218,
      gifts: 2,
      labels: ['EXCLUSIVE', 'BEST SELLER'],
      soldPercentage: 75
    },
    {
      id: 2,
      name: 'Sữa Rửa Mặt Cerave Hydrating Facial Cleanser',
      image: '../src/img/slider_1.webp',
      brand: 'CERAVE',
      brandLogo: '../src/img/thuonghieu_5.jpg',
      currentPrice: 287000,
      originalPrice: 287000,
      discount: 0,
      sold: 160,
      gifts: 3,
      labels: ['EXCLUSIVE', 'BEST SELLER'],
      soldPercentage: 60
    },
    {
      id: 3,
      name: 'Simple Kind To Skin Soothing Facial Toner',
      image: '../src/img/slider_1.webp',
      brand: 'SIMPLE',
      brandLogo: '../src/img/images.png',
      currentPrice: 80000,
      originalPrice: 135000,
      discount: 41,
      sold: 166,
      gifts: 1,
      labels: ['EXCLUSIVE'],
      soldPercentage: 65
    },
    {
      id: 4,
      name: 'Sữa rửa mặt ngừa mụn La Roche-Posay Effaclar Purifying Foaming Gel',
      image: '../src/img/slider_1.webp',
      brand: 'LA ROCHE-POSAY',
      brandLogo: '../src/img/thuonghieu_10.jpg',
      currentPrice: 290000,
      originalPrice: 355000,
      discount: 18,
      sold: 259,
      gifts: 2,
      labels: ['BEST SELLER'],
      soldPercentage: 80
    },
    {
      id: 5,
      name: 'Simple Kind To Skin Refreshing Facial Wash',
      image: '../src/img/slider_1.webp',
      brand: 'SIMPLE',
      brandLogo: '../src/img/images.png',
      currentPrice: 95000,
      originalPrice: 105000,
      discount: 10,
      sold: 170,
      gifts: 4,
      labels: ['EXCLUSIVE', 'BEST SELLER'],
      soldPercentage: 70
    },
  ];

  // Format price with dot separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Countdown timer
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 28,
    seconds: 57
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 bg-white section_flash_sale">
      <style>{customStyles}</style>
      <div className="mx-auto px-2" style={{ width: '1223px', maxWidth: '100%' }}>
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-3">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-3">
            <div className="flex items-center mb-2 md:mb-0">
              <div className="flash-sale-header">
                <img src="../src/img/flash.png" alt="Flash" className="w-6 h-6" />
                Flash Sale
              </div>
              <div className="marquee-container ml-4">
                <div className="marquee-content">
                  Giảm ngay 120k (áp dụng cho các đơn hàng trên 500k)
                </div>
              </div>
            </div>
            <div className="text-white text-sm font-medium flex items-center">
              <span className="mr-2">Kết thúc sau:</span>
              <div className="flex space-x-1">
                <div className="bg-black bg-opacity-30 px-2 py-1 rounded">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <span>:</span>
                <div className="bg-black bg-opacity-30 px-2 py-1 rounded">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <span>:</span>
                <div className="bg-black bg-opacity-30 px-2 py-1 rounded">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white p-3 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {products.map((product) => (
                <div key={product.id} className="product-card group">
                  {/* Wishlist */}
                  <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors duration-300">
                    <Heart className="w-6 h-6" />
                  </button>
                  
                  {/* Brand Logo */}
                  <div className="absolute top-2 left-2 z-10">
                    <img 
                      src={product.brandLogo}
                      alt={product.brand} 
                      className="h-8 w-auto rounded" 
                    />
                  </div>
                  
                  {/* Product Image with Hover Effects */}
                  <div className="product-image">
                    {/* Main product image */}
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="hover-buttons">
                      <div className="button-group">
                        <button className="search-button">
                          <Search className="w-5 h-5 text-blue-600" />
                        </button>
                        <button className="buy-button">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Mua ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="product-labels">
                    {product.labels.map((label, idx) => (
                      <span 
                        key={idx} 
                        className={`label ${
                          label === 'EXCLUSIVE' ? 'label-exclusive' : 
                          label === 'BEST SELLER' ? 'label-bestseller' : ''
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="product-name">
                    {product.name}
                  </h3>
                  
                  {/* Prices */}
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.currentPrice)}đ</span>
                    {product.discount > 0 && (
                      <span className="original-price">{formatPrice(product.originalPrice)}đ</span>
                    )}
                    {product.discount > 0 && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                  </div>
                  
                  {/* Sold Count - Using the CSS from the provided code */}
                  <div className="countdown-bar">
                    <div className="bar-bg">
                      <div 
                        className="bar-progress"
                        style={{ width: `${product.soldPercentage}%` }}
                      ></div>
                      <div className="sale-icon" style={{ backgroundImage: 'url(../src/img/sale_bag.png)' }}></div>
                      <span className="bar-text">
                        🔥 Đã bán {product.sold} sp
                      </span>
                    </div>
                  </div>
                  
                  {/* Gift Badge */}
                  <div className="gift-badge">
                    <span>🎁</span>
                    Có {product.gifts} lựa chọn quà tặng khi mua sp
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-3 space-x-1">
            <span className="w-5 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full hover:bg-white transition-colors duration-300 cursor-pointer"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;