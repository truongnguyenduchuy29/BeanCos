import React from 'react';
import { Award, Users, Heart, Shield, Truck, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: 'Chất lượng đảm bảo',
      description: 'Sản phẩm chính hãng 100% từ các thương hiệu uy tín'
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: 'Đội ngũ chuyên nghiệp',
      description: 'Tư vấn viên giàu kinh nghiệm, nhiệt tình hỗ trợ khách hàng'
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: 'Khách hàng là ưu tiên',
      description: 'Luôn đặt sự hài lòng của khách hàng lên hàng đầu'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: 'Bảo hành uy tín',
      description: 'Chính sách đổi trả linh hoạt, bảo hành chu đáo'
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng toàn quốc, nhanh chóng và an toàn'
    },
    {
      icon: <Phone className="w-8 h-8 text-red-500" />,
      title: 'Hỗ trợ 24/7',
      description: 'Hotline hỗ trợ khách hàng 24/7 mọi lúc mọi nơi'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Thành lập công ty',
      description: 'Bean Mỹ Phẩm được thành lập với sứ mệnh mang đến những sản phẩm chăm sóc da chất lượng cao'
    },
    {
      year: '2019',
      title: 'Mở rộng thương hiệu',
      description: 'Trở thành đại lý chính thức của hơn 50 thương hiệu mỹ phẩm nổi tiếng'
    },
    {
      year: '2020',
      title: 'Ra mắt website',
      description: 'Phát triển hệ thống bán hàng online, phục vụ khách hàng toàn quốc'
    },
    {
      year: '2021',
      title: '100+ thương hiệu',
      description: 'Hợp tác với hơn 100 thương hiệu mỹ phẩm hàng đầu thế giới'
    },
    {
      year: '2022',
      title: 'Mở cửa hàng',
      description: 'Khai trương cửa hàng đầu tiên tại TP. Hồ Chí Minh'
    },
    {
      year: '2023',
      title: 'Phát triển mạnh',
      description: 'Đạt hơn 100,000 khách hàng tin tưởng và sử dụng sản phẩm'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            Về Bean Mỹ Phẩm
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Với sứ mệnh "Khách hàng là ưu tiên số 1", chúng tôi luôn mang lại giá trị tốt nhất 
            cho khách hàng thông qua những sản phẩm chăm sóc da chất lượng cao từ các thương hiệu uy tín.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Bean Mỹ Phẩm được thành lập vào năm 2018 với mong muốn mang đến cho khách hàng 
                  Việt Nam những sản phẩm chăm sóc da chất lượng cao từ các thương hiệu nổi tiếng thế giới.
                </p>
                <p>
                  Chúng tôi tự hào là đại lý phân phối chính thức của hơn 100 thương hiệu mỹ phẩm 
                  hàng đầu như La Roche-Posay, CeraVe, Vichy, Bioderma, Paula's Choice và nhiều thương hiệu khác.
                </p>
                <p>
                  Với đội ngũ tư vấn viên chuyên nghiệp và giàu kinh nghiệm, chúng tôi cam kết 
                  mang đến cho khách hàng những giải pháp chăm sóc da phù hợp nhất.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Bean Mỹ Phẩm Store"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-pink-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm">Thương hiệu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn Bean Mỹ Phẩm?
            </h2>
            <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Hành trình phát triển
            </h2>
            <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Liên hệ với chúng tôi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Phone className="w-8 h-8 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Hotline</h3>
              <p className="text-pink-500 font-bold text-xl">1900 6750</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">@</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-pink-500 font-bold">support@sapo.vn</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Địa chỉ</h3>
              <p className="text-gray-600">70 Lữ Gia, Phường 15, Quận 11, TP. HCM</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;