import React from 'react';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-10 md:py-10 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Text Section */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mb-1">
              DA SÁNG CHÀO HÈ
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
              DEAL SANG QUÀ XỊN
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              ƯU ĐÃI LÊN ĐẾN 80%
            </p>

            {/* Visible on mobile only */}
            <div className="flex justify-center space-x-6 mt-6 lg:hidden">
              <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                QUÀ TẶNG FULLSIZE
              </a>
              <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                MUA 1 TẶNG 6
              </a>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="flex-1 flex justify-center items-center relative">
            {/* Main Featured Product */}
            <div className="relative z-10">
              <img
                src="../src/img/slider_1.webp"
                alt="Featured AHC Products"
                className="w-64 md:w-80 lg:w-96 object-contain"
              />
            </div>

            {/* Product Bubbles - Hidden on mobile */}
            <div className="absolute hidden lg:block" style={{ left: '-30px', top: '10%' }}>
              <div className="relative">
                <div className="bg-white rounded-full p-4 shadow-lg mb-2">
                  <img
                    src="../src/img/slider_1.webp"
                    alt="AHC Products"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                    QUÀ TẶNG FULLSIZE
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute hidden lg:block" style={{ right: '20px', bottom: '15%' }}>
              <div className="relative">
                <div className="bg-white rounded-full p-4 shadow-lg mb-2">
                  <img
                    src="../src/img/slider_1.webp"
                    alt="Gift Set"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                    MUA 1 TẶNG 6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Bubbles */}
      <div className="absolute w-40 h-40 rounded-full bg-blue-100/60 top-10 right-10 blur-md"></div>
      <div className="absolute w-60 h-60 rounded-full bg-blue-100/60 bottom-5 left-5 blur-md"></div>
    </section>
  );
};

export default HeroBanner;