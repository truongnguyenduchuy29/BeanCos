import React from 'react';
import { CheckCircle2, Package, Truck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  orderNumber = "DH" + Date.now().toString().slice(-6)
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h2>
          <p className="text-gray-600 mb-4">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
          </p>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Mã đơn hàng</p>
            <p className="text-xl font-bold text-pink-600">#{orderNumber}</p>
          </div>

          {/* Order Status Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Trạng thái đơn hàng</h3>
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-green-600 font-semibold">Đã đặt hàng</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">Đang chuẩn bị</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">Đang giao</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <Home className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">Đã giao</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              📧 Chúng tôi đã gửi email xác nhận đến hộp thư của bạn.
            </p>
            <p className="text-sm text-blue-700 mt-1">
              📱 Bạn sẽ nhận được SMS thông báo khi đơn hàng được giao.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/products"
              onClick={onClose}
              className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold inline-block"
            >
              Tiếp tục mua sắm
            </Link>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Đóng
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Cần hỗ trợ? Liên hệ chúng tôi:
            </p>
            <p className="text-sm font-semibold text-pink-600">
              📞 1900 6750 | 📧 support@beanmypham.vn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
