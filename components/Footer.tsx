import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-200 to-blue-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-4">THÔNG TIN CHUNG</h3>
            <p className="text-sm text-gray-600 mb-4">
              Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mang lại giá trị tốt nhất
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Địa chỉ:</span> 70 Lữ Gia, Phường 15, Quận 11, TP. Hồ Chí Minh</p>
              <p><span className="font-semibold">Điện thoại:</span> <a href="tel:19006750" className="text-pink-500 hover:underline">1900 6750</a></p>
              <p><span className="font-semibold">Email:</span> <a href="mailto:support@sapo.vn" className="text-pink-500 hover:underline">support@sapo.vn</a></p>
            </div>
            <a href="tel:19006750" className="bg-pink-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-pink-600 transition-colors flex items-center w-max">
              <Phone className="w-4 h-4 mr-2" />
              1900 6750
            </a>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <a href="#" className="hover:text-blue-500 transition-colors">Chính sách thành viên</a></li>
              <li>• <a href="#" className="hover:text-blue-500 transition-colors">Chính sách thanh toán</a></li>
              <li>• <a href="#" className="hover:text-blue-500 transition-colors">Hướng dẫn mua hàng</a></li>
              <li>• <a href="#" className="hover:text-blue-500 transition-colors">Bảo mật thông tin cá nhân</a></li>
              <li>• <a href="#" className="hover:text-blue-500 transition-colors">Chính sách cộng tác viên</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">HỖ TRỢ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Kinh doanh: <a href="tel:1900800111" className="text-pink-500 hover:underline">1900 800 111</a></li>
              <li>• Bảo hành: <a href="tel:1900800222" className="text-pink-500 hover:underline">1900 800 222</a></li>
              <li>• Khiếu nại: <a href="tel:1900800333" className="text-pink-500 hover:underline">1900 800 333</a></li>
              <li>• <a href="/contact" className="hover:text-blue-500 transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">LIÊN KẾT XÃ HỘI</h3>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <h4 className="font-bold text-gray-800 mb-3">PHƯƠNG THỨC THANH TOÁN</h4>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-white p-2 rounded border flex items-center justify-center">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3521564-2944982.png" alt="MasterCard" className="h-5" />
              </div>
              <div className="bg-white p-2 rounded border flex items-center justify-center">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-visa-card-3521370-2944776.png" alt="VISA" className="h-5" />
              </div>
              <div className="bg-white p-2 rounded border flex items-center justify-center">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-jcb-5-675728.png" alt="JCB" className="h-5" />
              </div>
              <div className="bg-white p-2 rounded border flex items-center justify-center">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-zalopay-4316535-3607319.png" alt="ZaloPay" className="h-5" />
              </div>
            </div>

            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-sm mb-2">Zalo Mini Apps</h5>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded mr-3 flex items-center justify-center">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://zalo.me/beanmypham" 
                       alt="Zalo QR Code" 
                       className="w-12 h-12" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Quét mã QR để mua hàng nhanh chóng</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6">
          <div className="bg-pink-500 text-white text-center py-3 rounded">
            <p className="text-sm">© Bản quyền thuộc về Mr. Bean | Cung cấp bởi Sapo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;