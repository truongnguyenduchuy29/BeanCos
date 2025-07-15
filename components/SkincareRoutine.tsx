import { useState } from "react";

const SkincareRoutine = () => {
  const [activeStep, setActiveStep] = useState<"5" | "9">("5");

  // Icons cho 9 bước skincare - Modern & Clean Design
  const skincareIcons = [
    // Icon 1: Cleanser - Sữa rửa mặt
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
      <circle cx="12" cy="9" r="2"/>
      <path d="M12 19c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
    </svg>,
    
    // Icon 2: Toner - Xịt khoáng
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 2h8c1.1 0 2 .9 2 2v2h-2V4H8v2H6V4c0-1.1.9-2 2-2z"/>
      <path d="M6 8h12v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8zm2 2v8h8v-8H8z"/>
      <circle cx="10" cy="12" r=".5"/>
      <circle cx="14" cy="12" r=".5"/>
      <circle cx="12" cy="14" r=".5"/>
    </svg>,
    
    // Icon 3: Essence - Tinh chất
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
      <circle cx="12" cy="10" r="1"/>
      <path d="M7 19h10v2H7z"/>
    </svg>,
    
    // Icon 4: Serum - Serum
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 2h6v2H9V2z"/>
      <path d="M8 6h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm1 3v10h6V9H9z"/>
      <path d="M12 4v2"/>
      <circle cx="12" cy="12" r="2" opacity="0.6"/>
      <circle cx="10" cy="15" r="1" opacity="0.4"/>
      <circle cx="14" cy="11" r="1" opacity="0.4"/>
    </svg>,
    
    // Icon 5: Moisturizer - Kem dưỡng ẩm
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" opacity="0.7"/>
      <circle cx="12" cy="12" r="2" opacity="0.5"/>
    </svg>,
    
    // Icon 6: Sunscreen - Kem chống nắng
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
      <path d="M5.99 4.58L4.58 5.99c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0zm12.02 12.02l1.41 1.41c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.41-1.41c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41z"/>
    </svg>,
    
    // Icon 7: Eye Cream - Kem mắt
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="12" cy="12" r="1.5" opacity="0.6"/>
    </svg>,
    
    // Icon 8: Face Mask - Mặt nạ
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
      <path d="M20.5 6H18V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H3.5C2.7 6 2 6.7 2 7.5S2.7 9 3.5 9H6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9h2.5c.8 0 1.5-.7 1.5-1.5S21.3 6 20.5 6zM16 17H8V4h8v13z"/>
      <path d="M12 15c1.66 0 3-1.34 3-3H9c0 1.66 1.34 3 3 3z" opacity="0.5"/>
    </svg>,
    
    // Icon 9: Night Cream - Kem đêm
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z"/>
      <circle cx="9" cy="9" r="1" opacity="0.8"/>
      <circle cx="15" cy="11" r="1.5" opacity="0.6"/>
      <circle cx="11" cy="14" r="1" opacity="0.7"/>
    </svg>
  ];

  const displayedIcons = skincareIcons.slice(0, activeStep === "5" ? 5 : 9);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1223px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-violet-500 mb-2">
            Bộ quy trình Chăm Sóc Da Hàn Quốc được tuyển chọn của Bean!!
          </h2>
          <div className="flex justify-center items-center my-2">
            <img src="/src/img/icon_title.png" alt="Divider" className="h-5" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Skincare Icons - Dynamic Grid */}
          <div className={`grid gap-6 justify-center transition-all duration-500 ease-in-out ${
            activeStep === "5" ? "grid-cols-5" : "grid-cols-5 lg:grid-cols-9"
          }`}>
            {displayedIcons.map((icon, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 hover:from-violet-100 hover:to-pink-100 transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-xl cursor-pointer group border border-violet-100 hover:border-violet-200 animate-fadeInUp"
                style={{ 
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="text-violet-500 group-hover:text-violet-700 transition-all duration-500 transform group-hover:scale-110 mb-2">
                  {icon}
                </div>
                <div className="text-xs font-medium text-violet-600 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                  Bước {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Step Options */}
          <div className="flex justify-center gap-6 mt-12">
            <button
              className={`relative px-10 py-4 text-lg font-semibold rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 overflow-hidden ${
                activeStep === "5"
                  ? "text-white bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg shadow-violet-300/50"
                  : "text-violet-600 bg-white border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50"
              }`}
              onClick={() => setActiveStep("5")}
            >
              <span className="relative z-10">✨ 5 Bước Cơ Bản</span>
              {activeStep === "5" && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-400 opacity-20 animate-pulse"></div>
              )}
            </button>
            <button
              className={`relative px-10 py-4 text-lg font-semibold rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 overflow-hidden ${
                activeStep === "9"
                  ? "text-white bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg shadow-violet-300/50"
                  : "text-violet-600 bg-white border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50"
              }`}
              onClick={() => setActiveStep("9")}
            >
              <span className="relative z-10">🌟 9 Bước Hoàn Hảo</span>
              {activeStep === "9" && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-400 opacity-20 animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Custom gradient hover effect */
        .group:hover .text-violet-500 {
          background: linear-gradient(45deg, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default SkincareRoutine;
