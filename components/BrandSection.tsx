import React from 'react';

const BrandSection = () => {
  const brands = [
    {
      name: 'La Roche-Posay',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Innisfree',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Cerave',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: "L'oreal",
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: "Kiehl's",
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">THƯƠNG HIỆU NỔI BẬT</h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Tự hào là Đại lý phân phối chính thức của hơn{' '}
            <span className="font-bold text-blue-600">100 thương hiệu</span>{' '}
            mỹ phẩm hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 md:w-24 md:h-24 object-contain mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-sm md:text-lg font-semibold text-gray-800 text-center">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;