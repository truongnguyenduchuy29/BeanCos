import React, { useState } from 'react';
import { X, CreditCard, MapPin, Phone, User, Tag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface OrderInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  paymentMethod: 'cod' | 'card' | 'bank';
  note: string;
  voucher: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { cart, copiedVouchers, copiedVoucherData } = useAppContext();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
    note: '',
    voucher: ''
  });

  // Use vouchers from copiedVoucherData instead of currentVouchers
  const availableVouchers = copiedVouchers.map(copiedCode => {
    const voucherData = copiedVoucherData[copiedCode];
    
    if (voucherData) {
      return {
        code: copiedCode, // Use the copied code (with suffix)
        discount: voucherData.discount,
        description: voucherData.description,
        applicableProducts: voucherData.applicableProducts
      };
    }
    return null;
  }).filter(voucher => voucher !== null);

  const calculateSubTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    const subTotal = calculateSubTotal();
    const selectedVoucher = availableVouchers.find(v => v.code === orderInfo.voucher);
    
    if (!selectedVoucher) return 0;
    
    // Check if cart has applicable products for this voucher
    const cartProductIds = cart.map(item => item.id);
    const hasApplicableProducts = selectedVoucher.applicableProducts?.some(productId => 
      cartProductIds.includes(productId)
    );
    
    // If voucher has specific products and none are in cart, no discount
    if (selectedVoucher.applicableProducts && selectedVoucher.applicableProducts.length > 0 && !hasApplicableProducts) {
      return 0;
    }
    
    // Calculate discount based on voucher type
    const discountValue = selectedVoucher.discount;
    
    if (discountValue.includes('K')) {
      // Fixed amount discount (e.g., "99K")
      const amount = parseInt(discountValue.replace('K', '')) * 1000;
      return Math.min(amount, subTotal); // Don't exceed subtotal
    } else if (discountValue.includes('%')) {
      // Percentage discount (e.g., "15%")
      const percentage = parseInt(discountValue.replace('%', '')) / 100;
      return subTotal * percentage;
    } else {
      // Free shipping or other
      return 0;
    }
  };

  const calculateTotal = () => {
    return calculateSubTotal() - calculateDiscount();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleInputChange = (field: keyof OrderInfo, value: string) => {
    setOrderInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleVoucherSelect = (voucherCode: string) => {
    setOrderInfo(prev => ({ ...prev, voucher: voucherCode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!orderInfo.fullName || !orderInfo.phone || !orderInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Process order
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Thanh toán đơn hàng</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={orderInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={orderInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={orderInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Nhập email (tùy chọn)"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Địa chỉ giao hàng *
                  </label>
                  <input
                    type="text"
                    value={orderInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Số nhà, tên đường"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành phố</label>
                    <select
                      value={orderInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                      <option value="ha-noi">Hà Nội</option>
                      <option value="da-nang">Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quận/Huyện</label>
                    <select
                      value={orderInfo.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option value="quan-1">Quận 1</option>
                      <option value="quan-2">Quận 2</option>
                      <option value="quan-3">Quận 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
                    <select
                      value={orderInfo.ward}
                      onChange={(e) => handleInputChange('ward', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Chọn phường/xã</option>
                      <option value="phuong-1">Phường 1</option>
                      <option value="phuong-2">Phường 2</option>
                      <option value="phuong-3">Phường 3</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Phương thức thanh toán
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="cod"
                        checked={orderInfo.paymentMethod === 'cod'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-2"
                      />
                      Thanh toán khi nhận hàng (COD)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="card"
                        checked={orderInfo.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-2"
                      />
                      Thẻ tín dụng/ghi nợ
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="bank"
                        checked={orderInfo.paymentMethod === 'bank'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-2"
                      />
                      Chuyển khoản ngân hàng
                    </label>
                  </div>
                </div>

                {/* Voucher */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Mã giảm giá
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={orderInfo.voucher}
                      onChange={(e) => handleInputChange('voucher', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Nhập mã voucher"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                  
                  {/* Available Vouchers */}
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Voucher có sẵn:</p>
                    <div className="space-y-2">
                      {availableVouchers.length > 0 ? (
                        availableVouchers.map((voucher, index) => {
                          const cartProductIds = cart.map(item => item.id);
                          const hasApplicableProducts = voucher.applicableProducts?.some(productId => 
                            cartProductIds.includes(productId)
                          );
                          const isApplicable = !voucher.applicableProducts || 
                                             voucher.applicableProducts.length === 0 || 
                                             hasApplicableProducts;
                          
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => isApplicable ? handleVoucherSelect(voucher.code) : null}
                              disabled={!isApplicable}
                              className={`w-full text-left p-3 border rounded-md transition-colors ${
                                orderInfo.voucher === voucher.code 
                                  ? 'border-pink-500 bg-pink-50' 
                                  : isApplicable 
                                    ? 'border-gray-200 hover:bg-gray-50' 
                                    : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className={`font-medium ${isApplicable ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {voucher.code} - {voucher.discount}
                                  </span>
                                  <p className={`text-xs ${isApplicable ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {voucher.description}
                                  </p>
                                  {!isApplicable && (
                                    <p className="text-xs text-red-500 mt-1">
                                      Không áp dụng cho sản phẩm trong giỏ hàng
                                    </p>
                                  )}
                                </div>
                                <span className={`text-sm ${isApplicable ? 'text-pink-600' : 'text-gray-400'}`}>
                                  {isApplicable ? 'Áp dụng' : 'Không áp dụng'}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500 italic">Chưa có voucher nào được sao chép</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                  <textarea
                    value={orderInfo.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    rows={3}
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(calculateSubTotal())}</span>
                  </div>
                  {calculateDiscount() > 0 && orderInfo.voucher && (
                    <div className="flex justify-between text-green-600">
                      <div className="flex flex-col">
                        <span>Giảm giá ({orderInfo.voucher}):</span>
                        <span className="text-xs text-gray-500">
                          {availableVouchers.find(v => v.code === orderInfo.voucher)?.description}
                        </span>
                      </div>
                      <span>-{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}
                  {orderInfo.voucher && calculateDiscount() === 0 && (
                    <div className="flex justify-between text-red-500">
                      <div className="flex flex-col">
                        <span>Voucher ({orderInfo.voucher}):</span>
                        <span className="text-xs">Không áp dụng được cho đơn hàng này</span>
                      </div>
                      <span>0₫</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-red-500">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
