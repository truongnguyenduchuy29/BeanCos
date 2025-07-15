import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <span className="text-gray-600">Trang chủ</span>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-blue-500">Giới thiệu</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">GIỚI THIỆU</h1>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                <span className="text-blue-600">BEAN MỸ PHẨM</span> - Thương
                hiệu mỹ phẩm của người trẻ hiện đại!
              </h2>
              <p className="leading-relaxed">
                Ra đời vào năm 2016, BEAN MỸ PHẨM với sứ mệnh mang lại trải
                nghiệm skincare khoa học dành cho mọi lứa tuổi và giới tính đều
                có thể tiếp cận được kiến thức về mỹ phẩm và tự thiết kế cho
                mình một routine skincare hoàn chỉnh.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                YẾN TÂM MUA HÀNG THẬT
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-gray-700 font-medium text-center">
                  " ĐỐI VỚI SEUN, SẢN PHẨM THẬT LÀ SẢN PHẨM CHÍNH HÃNG VÀ PHẢI
                  CÓ CHỨNG TỪ, XUẤT XỨ RÕ NGUỒN GỐC VÀ CÓ HÓA ĐƠN CHỨNG NHẬN "
                </p>
              </div>
            </div>

            {/* Hero Banner Image */}
            <div className="my-8">
              <img
                src="../src/img/slider_1.webp"
                alt="Bean Mỹ Phẩm - DA SÁNG CHÀO HÈ, DEAL SANG QUÀ XỊN"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <p className="leading-relaxed">
                Với BEAN MỸ PHẨM nghiêm túc lựa chọn và kiểm tra nhãn mác báo
                nguồn gốc lẫn chất lượng của mỹ phẩm là cực kỳ quan trọng đối
                với làn da phải đẹp, bởi sử dụng những sản phẩm làm giả hoặc
                không rõ nguồn gốc có thể khiến làn da bạn bị tổn hại nghiêm
                trọng. Vì thế BEAN MỸ PHẨM hợp tác trực tiếp với nhà phân phối
                chính thức quốc tế và Việt Nam để đảm bảo rằng tất cả những sản
                phẩm bạn mua tại BEAN MỸ PHẨM đều là hàng chính hãng với đầy đủ
                hóa đơn chứng từ của công ty.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-600 font-bold text-center text-lg">
                  HÃY ĐẾN BEAN MỸ PHẨM ĐỂ TRẢI NGHIỆM SỰ KHÁC BIỆT!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
