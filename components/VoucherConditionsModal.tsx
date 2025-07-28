import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import productData from '../db/product.json';

interface VoucherConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: {
    id: string;
    code: string;
    discount: string;
    description: string;
    applicableProducts: number[];
    expiresAt: number;
    isActive: boolean;
  };
}

const VoucherConditionsModal: React.FC<VoucherConditionsModalProps> = ({
  isOpen,
  onClose,
  voucher,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if voucher is still valid
  const isVoucherValid = voucher.isActive && voucher.expiresAt > currentTime;
  const timeRemaining = Math.max(0, voucher.expiresAt - currentTime);

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get applicable products from the voucher
  const applicableProducts = productData.products
    .filter((product) => voucher.applicableProducts.includes(product.id))
    .filter((product) => product && product.name && product.price) // Filter out invalid products
    .map((product) => ({
      ...product,
      // Ensure discount is properly handled
      discount:
        product.discount && Number(product.discount) > 0
          ? product.discount
          : undefined,
    }));

  const formatPrice = (price: number) => {
    if (!price || price === 0) return '0₫';
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleProductClick = (productId: number) => {
    onClose(); // Đóng modal trước
    navigate(`/product/${productId}`);
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBuyNow = (
    product: {
      id: number;
      name: string;
      price: number;
      originalPrice?: number;
      discount?: number;
      imageUrl: string;
      brand: string;
      tags?: string[];
    },
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent product click

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      originalPrice: product.originalPrice
        ? formatPrice(product.originalPrice)
        : undefined,
      discount: product.discount?.toString(),
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags || [],
      quantity: 1,
    };

    addToCart(cartProduct);
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <style>
        {`
          .voucher-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
          }
          
          .voucher-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
            pointer-events: none;
          }
          
          .voucher-card-pink {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          
          .voucher-card-green {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          
          .voucher-card-orange {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          }
          
          .voucher-card-purple {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          }
          
          .voucher-pattern {
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            border-radius: 50%;
          }
          
          .voucher-dots {
            position: absolute;
            top: 50%;
            left: -10px;
            right: -10px;
            height: 20px;
            background: repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 8px,
              rgba(255,255,255,0.3) 8px,
              rgba(255,255,255,0.3) 12px
            );
            transform: translateY(-50%);
          }
          
          .countdown-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .shimmer {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.2) 50%,
              rgba(255,255,255,0) 100%
            );
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header với voucher cards */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Voucher Khuyến Mãi
              </h2>
              <p className="text-gray-600 mt-1">
                Áp dụng ngay để nhận ưu đãi tốt nhất!
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Current voucher info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Chi tiết voucher đang xem
                </h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xl font-bold text-pink-600">
                    {voucher.code}
                  </span>
                  <span className="text-lg text-gray-700">-</span>
                  <span className="text-xl font-bold text-green-600">
                    {voucher.discount}
                  </span>
                  {isVoucherValid ? (
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                        ✅ Còn hiệu lực
                      </span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-mono countdown-animation">
                        ⏰ {formatTimeRemaining(timeRemaining)}
                      </span>
                    </div>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold">
                      ❌ Hết hạn
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-50">
          {!isVoucherValid && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-red-700 font-bold text-lg">
                    ⚠️ Voucher này đã hết hạn!
                  </p>
                  <p className="text-red-600 text-sm mt-1">
                    Bạn không thể sử dụng voucher này nữa. Vui lòng chọn voucher
                    khác từ danh sách trên.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-blue-500">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Sản phẩm áp dụng voucher
                  </h3>
                  <p className="text-gray-600">
                    {isVoucherValid
                      ? '🎯 Voucher chỉ có thể sử dụng cho những sản phẩm dưới đây'
                      : '📋 Những sản phẩm này đã từng áp dụng voucher (chỉ tham khảo)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid với thiết kế mới */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicableProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image với overlay effect */}
                <div className="relative group">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                  {/* Discount badge với animation */}
                  {product.discount && Number(product.discount) > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      🔥 -{product.discount}%
                    </div>
                  )}

                  {/* Status badge */}
                  {isVoucherValid ? (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                      ✅ Có thể mua
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ❌ Hết hạn
                    </div>
                  )}
                </div>

                {/* Product Info với gradient border */}
                <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                  <h4 className="font-bold text-gray-800 mb-3 text-base leading-tight line-clamp-2 hover:text-pink-600 transition-colors">
                    {product.name}
                  </h4>

                  {/* Brand với icon */}
                  {product.brand && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">
                          B
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                        {product.brand}
                      </span>
                    </div>
                  )}

                  {/* Price với hiệu ứng đẹp */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through bg-gray-100 px-2 py-1 rounded">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                  </div>

                  {/* Buy Now Button với gradient */}
                  <button
                    onClick={(e) => handleBuyNow(product, e)}
                    disabled={!isVoucherValid}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                      isVoucherValid
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 shadow-pink-200'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>
                      {isVoucherValid ? '🛒 Mua ngay' : '❌ Voucher hết hạn'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {applicableProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                Không có sản phẩm nào áp dụng voucher này
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Vui lòng chọn voucher khác
              </p>
            </div>
          )}
        </div>

        {/* Footer với thiết kế gradient */}
        <div className="border-t bg-gradient-to-r from-purple-50 to-pink-50 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">ℹ️</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Áp dụng:</span>{' '}
                    {applicableProducts.length} sản phẩm được hiển thị
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-600">
                      ⚠️
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Lưu ý:</span>{' '}
                    {isVoucherValid
                      ? 'Không kết hợp chương trình khác'
                      : 'Voucher đã hết hạn'}
                  </p>
                </div>
              </div>
              {isVoucherValid && (
                <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-red-500">
                  <p className="text-sm text-red-600 font-bold flex items-center">
                    <span className="animate-pulse mr-2">⏰</span>
                    Voucher sẽ hết hạn sau: {formatTimeRemaining(timeRemaining)}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
            >
              ✖️ Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherConditionsModal;
