import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Nội dung tin nhắn phải có ít nhất 10 ký tự";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <span className="text-gray-600">Trang chủ</span>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-blue-500">Liên hệ</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto px-4 w-[1223px] max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                NƠI GIẢI ĐÁP TOÀN BỘ MỌI THẮC MẮC CỦA BAN?
              </h1>

              <p className="text-gray-600 mb-6">
                Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mang lại
                giá trị tốt nhất
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <span className="font-semibold text-gray-800">Địa chỉ:</span>
                  <span className="ml-2 text-gray-600">
                    70 Lữ Gia, Phường 15, Quận 11, TP. Hồ Chí Minh
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">Hotline:</span>
                  <a
                    href="tel:19006750"
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    1900 6750
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">Email:</span>
                  <a
                    href="mailto:support@sapo.vn"
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    support@sapo.vn
                  </a>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                LIÊN HỆ VỚI CHÚNG TÔI
              </h2>

              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6" role="alert">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="font-bold">Gửi thông tin thành công!</p>
                  </div>
                  <p className="mt-2">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                        errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Nội dung"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-vertical ${
                        errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                  >
                    Gửi thông tin
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-96 lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6305073625167!2d106.64831571478885!3d10.759975292337822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eee37bb29a9%3A0x853b7b2f7ebac9fd!2s70%20L%C3%AF%20Gia%2C%20Ph%C6%B0%E1%BB%9Dng%2015%2C%20Qu%E1%BA%ADn%2011%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bean Mỹ Phẩm Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
