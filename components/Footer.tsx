import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-300 via-purple-200 to-blue-200 pt-6 sm:pt-8 pb-0">
      <div className="max-w-[1223px] mx-auto px-2 sm:px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
              THÔNG TIN CHUNG
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mang lại
              giá trị tốt nhất
            </p>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <p className="mb-1">
                <span className="font-medium">Địa chỉ:</span> 70 Lữ Gia, Phường
                15, Quận 11, TP. Hồ Chí Minh
              </p>
              <p className="mb-1">
                <span className="font-medium">Điện thoại:</span>{" "}
                <a href="tel:19006750" className="text-red-500 hover:underline">
                  1900 6750
                </a>
              </p>
              <p className="mb-1">
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:support@sapo.vn"
                  className="text-red-500 hover:underline"
                >
                  support@sapo.vn
                </a>
              </p>
            </div>
            <a
              href="tel:19006750"
              className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-full mt-3 sm:mt-4 hover:bg-red-600 transition-colors flex items-center w-max text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12C22 10.6868 21.7413 9.38647 21.2388 8.1731C20.7362 6.95996 19.9997 5.85742 19.0711 4.92896C18.1425 4.00024 17.0401 3.26367 15.8268 2.76123C14.6136 2.25854 13.3132 2 12 2V4C13.0506 4 14.0909 4.20703 15.0615 4.60889C16.0321 5.01099 16.914 5.60034 17.6569 6.34326C18.3997 7.08594 18.989 7.96802 19.391 8.93848C19.7931 9.90918 20 10.9495 20 12H22Z"
                  fill="currentColor"
                />
                <path
                  d="M2 10V5C2 4.44775 2.44772 4 3 4H8C8.55228 4 9 4.44775 9 5V9C9 9.55225 8.55228 10 8 10H6C6 14.4182 9.58172 18 14 18V16C14 15.4478 14.4477 15 15 15H19C19.5523 15 20 15.4478 20 16V21C20 21.5522 19.5523 22 19 22H14C7.37258 22 2 16.6274 2 10Z"
                  fill="currentColor"
                />
                <path
                  d="M17.5433 9.70386C17.8448 10.4319 18 11.2122 18 12H16.2C16.2 11.4485 16.0914 10.9023 15.8803 10.3928C15.6692 9.88306 15.3599 9.42017 14.9698 9.03027C14.5798 8.64014 14.1169 8.33081 13.6073 8.11963C13.0977 7.90869 12.5515 7.80005 12 7.80005V6C12.7879 6 13.5681 6.15527 14.2961 6.45679C15.024 6.7583 15.6855 7.2002 16.2426 7.75732C16.7998 8.31445 17.2418 8.97583 17.5433 9.70386Z"
                  fill="currentColor"
                />
              </svg>
              1900 6750
            </a>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                •{" "}
                <a href="#" className="hover:text-red-500 transition-colors">
                  Chính sách thành viên
                </a>
              </li>
              <li>
                •{" "}
                <a href="#" className="hover:text-red-500 transition-colors">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                •{" "}
                <a href="#" className="hover:text-red-500 transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                •{" "}
                <a href="#" className="hover:text-red-500 transition-colors">
                  Bảo mật thông tin cá nhân
                </a>
              </li>
              <li>
                •{" "}
                <a href="#" className="hover:text-red-500 transition-colors">
                  Chính sách cộng tác viên
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">HỖ TRỢ</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                • Kinh doanh:{" "}
                <a
                  href="tel:1900800111"
                  className="text-red-500 hover:underline"
                >
                  1900 800 111
                </a>
              </li>
              <li>
                • Bảo hành:{" "}
                <a
                  href="tel:1900800222"
                  className="text-red-500 hover:underline"
                >
                  1900 800 222
                </a>
              </li>
              <li>
                • Khiếu nại:{" "}
                <a
                  href="tel:1900800333"
                  className="text-red-500 hover:underline"
                >
                  1900 800 333
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/contact"
                  className="hover:text-red-500 transition-colors"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
              LIÊN KẾT XÃ HỘI
            </h3>
            <div className="flex space-x-2 mb-4 sm:mb-6">
              <a
                href="#"
                className="bg-[#1877f2] text-white p-2 rounded flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:opacity-90 transition-opacity"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="#"
                className="bg-[#1DA1F2] text-white p-2 rounded flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:opacity-90 transition-opacity"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="#"
                className="bg-[#FF0000] text-white p-2 rounded flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:opacity-90 transition-opacity"
              >
                <Youtube className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="#"
                className="bg-[#C13584] text-white p-2 rounded flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3">
              PHƯƠNG THỨC THANH TOÁN
            </h4>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <div className="bg-white p-1 rounded border flex items-center justify-center">
                <img
                  src="/src/img/payment-1.png"
                  alt="MasterCard"
                  className="h-6 sm:h-7"
                />
              </div>
              <div className="bg-white p-1 rounded border flex items-center justify-center">
                <img src="/src/img/payment-2.png" alt="VISA" className="h-6 sm:h-7" />
              </div>
              <div className="bg-white p-1 rounded border flex items-center justify-center">
                <img src="/src/img/payment-3.png" alt="JCB" className="h-6 sm:h-7" />
              </div>
              <div className="bg-white p-1 rounded border flex items-center justify-center">
                <img
                  src="/src/img/payment-4.png"
                  alt="ZaloPay"
                  className="h-6 sm:h-7"
                />
              </div>
            </div>

            <div className="bg-white p-2 sm:p-3 rounded border">
              <h5 className="font-semibold text-xs sm:text-sm mb-2">Zalo Mini Apps</h5>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded mr-2 sm:mr-3 flex items-center justify-center">
                  <img
                    src="/src/img/qrzalo.jpg"
                    alt="Zalo QR Code"
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-600">
                    Quét mã QR để mua hàng
                    <br />
                    nhanh chóng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-2 sm:pt-3">
          <div className="bg-[#e91e63] text-white text-center py-2 rounded-sm">
            <p className="text-xs sm:text-sm">
              © Bản quyền thuộc về Mr. Bean | Cung cấp bởi Sapo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
