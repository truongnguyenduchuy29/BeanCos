import React, { useState } from 'react';

const SkincareRoutine = () => {
  const [activeStep, setActiveStep] = useState<'5' | '9'>('5');

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
          {/* Skincare Icons */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5H16V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5L9 3H15L16 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5H14C15.1046 5 16 5.89543 16 7V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V7C8 5.89543 8.89543 5 10 5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 8V10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 12H10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 16H10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H15C16.1046 5 17 5.89543 17 7V15C17 17.2091 15.2091 19 13 19H11C8.79086 19 7 17.2091 7 15V7C7 5.89543 7.89543 5 9 5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 8H14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6H14C15.1046 6 16 6.89543 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8C8 6.89543 8.89543 6 10 6Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6V4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7C8 5.89543 8.89543 5 10 5H14C15.1046 5 16 5.89543 16 7V15C16 18.3137 13.3137 21 10 21C6.68629 21 4 18.3137 4 15V11" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 11H4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Second Row of Icons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8L9 18C9 19.1046 9.89543 20 11 20V20C12.1046 20 13 19.1046 13 18L13 6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 8L9 4.5C9 4.22386 9.22386 4 9.5 4L12.5 4C12.7761 4 13 4.22386 13 4.5L13 6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 6H15C15.5523 6 16 6.44772 16 7V11C16 11.5523 15.5523 12 15 12H13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H16V17C16 18.6569 14.6569 20 13 20H11C9.34315 20 8 18.6569 8 17V6Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 10H14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 14H14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 6L10 4H14L16 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 15L15.8971 9.5H8.10289L12 15Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H15C16.1046 5 17 5.89543 17 7V17C17 18.1046 16.1046 19 15 19H9C7.89543 19 7 18.1046 7 17V7C7 5.89543 7.89543 5 9 5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 7H14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Step Options */}
          <div className="flex justify-center gap-8 mt-6">
            <button 
              className={`px-6 py-2 text-lg font-medium rounded-full ${activeStep === '5' ? 'text-white bg-pink-500' : 'text-pink-500 border border-pink-500'}`}
              onClick={() => setActiveStep('5')}
            >
              5 Bước
            </button>
            <button 
              className={`px-6 py-2 text-lg font-medium rounded-full ${activeStep === '9' ? 'text-white bg-pink-500' : 'text-pink-500 border border-pink-500'}`}
              onClick={() => setActiveStep('9')}
            >
              9 Bước
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkincareRoutine;