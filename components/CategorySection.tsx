import React, { useState, useEffect } from 'react';

const CategorySection = () => {
  const [showSection, setShowSection] = useState(false);
  
  useEffect(() => {
    // Add animation after component mounts
    setShowSection(true);
    
    // For staggered animation of categories
    const timer = setTimeout(() => {
      const categories = document.querySelectorAll('.category-item');
      categories.forEach((category, index) => {
        setTimeout(() => {
          (category as HTMLElement).style.opacity = '1';
          (category as HTMLElement).style.transform = 'translateY(0)';
        }, index * 50);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: 'Bộ sản phẩm', image: '../src/img/danhmuc_1.jpg' },
    { name: 'Mẹ & Bé', image: '../src/img/danhmuc_2.jpg' },
    { name: 'Phụ kiện làm đẹp', image: '../src/img/danhmuc_3.jpg' },
    { name: 'Thực phẩm chức năng', image: '../src/img/danhmuc_4.jpg' },
    { name: 'Mỹ phẩm cho nam', image: '../src/img/danhmuc_5.jpg' },
    { name: 'Trang điểm', image: '../src/img/danhmuc_6.jpg' },
    { name: 'Nước hoa', image: '../src/img/danhmuc_7.jpg' },
    { name: 'Chăm sóc da mặt', image: '../src/img/danhmuc_8.jpg' },
    { name: 'Chăm sóc răng miệng', image: '../src/img/danhmuc_9.jpg' },
    { name: 'Chăm sóc tay chân', image: '../src/img/danhmuc_10.jpg' },
    { name: 'Chăm sóc tóc', image: '../src/img/danhmuc_11.jpg' },
    { name: 'Chăm sóc cơ thể', image: '../src/img/danhmuc_12.jpg' },
    { name: 'Chăm sóc mặt', image: '../src/img/danhmuc_13.jpg' },
    { name: 'Sản phẩm khác', image: '../src/img/danhmuc_14.jpg' },
  ];

  const vouchers = [
    { code: 'BEAN20', discount: '20%', minOrder: 500000, expiry: '30/06/2023' },
    { code: 'BEAN50', discount: '50K', minOrder: 800000, expiry: '30/06/2023' },
    { code: 'BEAN100', discount: '100K', minOrder: 1500000, expiry: '30/06/2023' },
  ];

  return (
    <section className={`py-10 bg-gray-50 transition-all duration-700 ${showSection ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title with decoration */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-2">
            DANH MỤC HOT
          </h2>
          <div className="relative w-40 h-6 flex justify-center">
            <div className="h-0.5 w-full bg-pink-300 absolute top-1/2 transform -translate-y-1/2"></div>
            <div className="bg-gray-50 p-1 z-10 relative">
              <img src="../src/img/icon_title.png" alt="title decoration" className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        {/* Categories Grid - First Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {categories.slice(0, 7).map((category, index) => (
            <a 
              key={index}
              href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group category-item"
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.5s, transform 0.5s',
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-lg p-3 mb-2 w-full aspect-square flex items-center justify-center overflow-hidden transition-transform transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm text-center font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            </a>
          ))}
        </div>
        
      
        
        {/* Categories Grid - Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {categories.slice(7).map((category, index) => (
            <a 
              key={index + 7}
              href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group category-item"
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.5s, transform 0.5s',
                transitionDelay: `${(index + 7) * 50}ms`
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-lg p-3 mb-2 w-full aspect-square flex items-center justify-center overflow-hidden transition-transform transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm text-center font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;