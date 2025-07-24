import React from 'react';
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
  };
}

const VoucherConditionsModal: React.FC<VoucherConditionsModalProps> = ({
  isOpen,
  onClose,
  voucher
}) => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();

  if (!isOpen) return null;

  // Get applicable products from the voucher
  const applicableProducts = productData.products.filter(product =>
    voucher.applicableProducts.includes(product.id)
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleBuyNow = (product: { id: number; name: string; price: number; originalPrice?: number; discount?: number; imageUrl: string; brand: string; tags?: string[] }) => {
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Điều kiện áp dụng voucher</h2>
            <p className="text-lg text-pink-600 font-semibold mt-1">
              {voucher.code} - {voucher.discount}
            </p>
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Sản phẩm áp dụng voucher này:
            </h3>
            <p className="text-gray-600">
              Voucher chỉ có thể sử dụng cho những sản phẩm dưới đây
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicableProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
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
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Mua ngay</span>
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
                * Voucher chỉ áp dụng cho {applicableProducts.length} sản phẩm được hiển thị
              </p>
              <p className="text-sm text-gray-600">
                * Không thể kết hợp với các chương trình khuyến mãi khác
              </p>
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
