import React from 'react';
import { Heart } from 'lucide-react';

const FlashSale = () => {
  const products = [
    {
      id: 1,
      name: 'Nước cân bằng ngừa mụn La Roche-Posay Effaclar Astringent Lotion',
      image: '../src/img/slider_1.webp',
      brand: 'LA ROCHE-POSAY',
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

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <img src="../src/img/flash.png" alt="Flash" className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold text-yellow-300">Flash Sale</h2>
              <div className="ml-4 text-white">Giảm ngay 20% tổng giá trị đơn hàng. Số lượng có hạn</div>
            </div>
            <div className="text-white text-sm font-medium">
              Chương trình đã hết hạn
            </div>
          </div>

          {/* Products */}
          <div className="bg-white p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-2 relative bg-white">
                  {/* Wishlist */}
                  <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500">
                    <Heart className="w-6 h-6" />
                  </button>
                  
                  {/* Brand Label */}
                  <div className="absolute top-2 left-2">
                    <img 
                      src={`../src/img/thuonghieu_${product.id}.jpg`} 
                      alt={product.brand} 
                      className="h-8 w-auto rounded" 
                    />
                  </div>
                  
                  {/* Product Image */}
                  <div className="flex justify-center py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 object-contain"
                    />
                  </div>
                  
                  {/* Labels */}
                  <div className="flex space-x-1 mb-2">
                    {product.labels.map((label, idx) => (
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
                    <span className="text-red-600 font-bold mr-2">{formatPrice(product.currentPrice)}đ</span>
                    {product.discount > 0 && (
                      <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}đ</span>
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
                      style={{ width: `${product.soldPercentage}%` }}
                    ></div>
                  </div>
                  
                  {/* Gift Badge */}
                  <div className="border border-red-500 rounded-sm p-1 text-xs text-red-500 flex items-center justify-center">
                    <span className="mr-1">🎁</span>
                    Có {product.gifts} lựa chọn quà tặng khi mua sp
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-1">
            <span className="w-5 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;