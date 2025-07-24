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
  voucher
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
  const applicableProducts = productData.products.filter(product =>
    voucher.applicableProducts.includes(product.id)
  ).filter(product => product && product.name && product.price) // Filter out invalid products
  .map(product => ({
    ...product,
    // Ensure discount is properly handled
    discount: product.discount && Number(product.discount) > 0 ? product.discount : undefined
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
      behavior: 'smooth'
    });
  };

  const handleBuyNow = (product: { id: number; name: string; price: number; originalPrice?: number; discount?: number; imageUrl: string; brand: string; tags?: string[] }, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent product click
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
      discount: product.discount?.toString(),
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags || [],
      quantity: 1
    };

    addToCart(cartProduct);
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <style>
        {`
          /* Hide any unwanted '0' text that might appear */
          .voucher-modal span:empty::after {
            content: none !important;
          }
          .voucher-modal div:empty::after {
            content: none !important;
          }
          /* Ensure no pseudo elements show '0' */
          .voucher-modal *::before,
          .voucher-modal *::after {
            content: none !important;
          }
        `}
      </style>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto voucher-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Điều kiện áp dụng voucher</h2>
            <div className="flex items-center space-x-3 mt-1">
              <p className="text-lg text-pink-600 font-semibold">
                {voucher.code} - {voucher.discount}
              </p>
              {isVoucherValid ? (
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    Còn hiệu lực
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-mono">
                    {formatTimeRemaining(timeRemaining)}
                  </span>
                </div>
              ) : (
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-semibold">
                  Hết hạn
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isVoucherValid && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-semibold">Voucher này đã hết hạn!</p>
              </div>
              <p className="text-red-600 text-sm mt-1">
                Bạn không thể sử dụng voucher này nữa. Vui lòng chọn voucher khác.
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Sản phẩm áp dụng voucher này:
            </h3>
            <p className="text-gray-600">
              {isVoucherValid 
                ? "Voucher chỉ có thể sử dụng cho những sản phẩm dưới đây" 
                : "Những sản phẩm này đã từng áp dụng voucher (chỉ tham khảo)"
              }
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicableProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Only show discount badge if discount is valid and > 0 */}
                  {product.discount && Number(product.discount) > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {/* Remove any potential unwanted elements */}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-pink-600 transition-colors">
                    {product.name}
                  </h4>
                  
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded inline-block mb-2">
                      {product.brand}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Buy Now Button */}
                  <button
                    onClick={(e) => handleBuyNow(product, e)}
                    disabled={!isVoucherValid}
                    className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      isVoucherValid 
                        ? "bg-pink-500 text-white hover:bg-pink-600" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isVoucherValid ? "Mua ngay" : "Voucher hết hạn"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {applicableProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Không có sản phẩm nào áp dụng voucher này</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                * Voucher {isVoucherValid ? "chỉ áp dụng" : "đã từng áp dụng"} cho {applicableProducts.length} sản phẩm được hiển thị
              </p>
              <p className="text-sm text-gray-600">
                * {isVoucherValid ? "Không thể kết hợp với các chương trình khuyến mãi khác" : "Voucher đã hết hạn và không thể sử dụng"}
              </p>
              {isVoucherValid && (
                <p className="text-sm text-red-600 font-semibold mt-1">
                  ⏰ Voucher sẽ hết hạn sau: {formatTimeRemaining(timeRemaining)}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherConditionsModal;
