import { useState, useEffect, useRef, useCallback } from 'react';

const BrandSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create a reference for auto sliding interval
  const autoSlideIntervalRef = useRef<number | null>(null);
  
  // Brand items
  const brands = [
    {
      name: 'La Roche-Posay',
      image: '../src/img/brand_1.jpg'
    },
    {
      name: 'Innisfree',
      image: '../src/img/brand_2.jpg'
    },
    {
      name: 'Cerave',
      image: '../src/img/brand_3.jpg'
    },
    {
      name: "L'oreal",
      image: '../src/img/brand_4.jpg'
    },
    {
      name: "Kiehl's",
      image: '../src/img/brand_5.jpg'
    },
    {
      name: "Paula's Choice",
      image: '../src/img/brand_6.jpg'
    }
  ];

  const itemsPerView = 5; // Show 5 brands at a time on desktop
  const maxSlides = Math.max(0, brands.length - itemsPerView);

  // Setup animations and auto sliding
  const startAutoSlide = useCallback(() => {
    if (autoSlideIntervalRef.current) {
      window.clearInterval(autoSlideIntervalRef.current);
    }
    
    autoSlideIntervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev < maxSlides ? prev + 1 : 0));
    }, 3000);
  }, [maxSlides]);

  useEffect(() => {
    // Animate brands in on initial load
    const timer = setTimeout(() => {
      const brandElements = document.querySelectorAll('.brand-item');
      brandElements.forEach((brand, index) => {
        setTimeout(() => {
          (brand as HTMLElement).style.opacity = '1';
          (brand as HTMLElement).style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 300);

    // Setup auto sliding
    startAutoSlide();
    
    return () => {
      clearTimeout(timer);
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [startAutoSlide]);

  // Pause auto sliding on hover
  useEffect(() => {
    if (isHovered) {
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    } else {
      startAutoSlide();
    }
    
    return () => {
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [isHovered, startAutoSlide]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev < maxSlides ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : maxSlides));
  };

  return (
    <section className="section_brand py-8 bg-white">
      <div className="mx-auto px-4" style={{ width: '1223px', maxWidth: '100%' }}>
        {/* Title and description */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400">THƯƠNG HIỆU NỔI BẬT</h2>
          <div className="relative w-40 h-6 flex justify-center mt-2">
            <div className="h-0.5 w-full bg-pink-500 absolute top-1/2 transform -translate-y-1/2"></div>
            <div className="bg-white p-1 z-10 relative">
              <img src="../src/img/icon_title.png" alt="title decoration" className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-700 mt-3 mx-auto">
            Tự hào là Đại lý phân phối chính thức của hơn{' '}
            <span className="font-bold text-pink-600">100</span>{' '}
            <span className="text-pink-600 font-bold">thương hiệu</span> mỹ phẩm hàng đầu
          </p>
        </div>

        {/* Brand slider */}
        <div 
          className="relative mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
            >
              {brands.map((brand, index) => (
                <div 
                  key={index} 
                  className="brand-item flex-shrink-0 w-1/5 px-2"
                  style={{ 
                    opacity: 0, 
                    transform: 'translateY(20px)',
                    transition: 'all 0.5s ease',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="bg-blue-50 rounded-lg p-6 aspect-square flex items-center justify-center overflow-hidden">
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-center mt-3 font-medium">{brand.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-100 transition-all z-10"
            style={{ opacity: currentSlide > 0 ? 1 : 0.5 }}
            disabled={currentSlide <= 0}
            aria-label="Previous brands"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-100 transition-all z-10"
            style={{ opacity: currentSlide < maxSlides ? 1 : 0.5 }}
            disabled={currentSlide >= maxSlides}
            aria-label="Next brands"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;