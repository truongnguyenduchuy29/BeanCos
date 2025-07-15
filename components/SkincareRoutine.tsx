import React from 'react';

const SkincareRoutine = () => {
  const steps = [
    { icon: '🥛', label: 'Tẩy trang' },
    { icon: '🧴', label: 'Sữa rửa mặt' },
    { icon: '📱', label: 'Toner' },
    { icon: '💧', label: 'Serum' },
    { icon: '⏰', label: 'Dưỡng ẩm' },
    { icon: '📱', label: 'Kem chống nắng' },
    { icon: '❄️', label: 'Mặt nạ' },
    { icon: '🌿', label: 'Tinh chất' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Bộ quy trình Chăm Sóc Da Hàn Quốc được tuyển chọn của Bean!!
          </h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl md:text-2xl mb-2 md:mb-4">
                {step.icon}
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Khám phá quy trình chăm sóc da hoàn hảo với các sản phẩm chất lượng cao từ Bean Mỹ Phẩm
          </p>
          <button className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkincareRoutine;