import React, { useState, useEffect } from 'react';

const ProductSection = () => {
  const [showSection, setShowSection] = useState(false);
   
  // Add custom CSS to the head
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .voucher-gradient {
        background: linear-gradient(to right, #f8e1eb, #f0e6f8);
      }
      .section_product {
        position: relative;
        margin-bottom: 40px;
        background-color: white;
        padding: 20px 0;
      }
      @media (max-width: 991px) {
        .section_product {
          margin-bottom: 25px;
        }
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .section-title {
        color: #e91e63;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0;
      }
      .view-all {
        background-color: #e91e63;
        color: white;
        padding: 6px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        transition: all 0.3s;
      }
      .view-all:hover {
        background-color: #c2185b;
      }
      .view-all svg {
        margin-left: 6px;
      }
      .product-grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
      }
      @media (max-width: 1200px) {
        .product-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      @media (max-width: 991px) {
        .product-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 767px) {
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .product-item {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 8px;
        position: relative;
        background-color: white;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
      }
      .product-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-8px);
      }
      .product-image-container {
        position: relative;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
      }
      .product-image {
        max-height: 160px;
        object-fit: contain;
        transition: transform 0.3s;
      }
      .product-item:hover .product-image {
        transform: scale(1.05);
      }
      .wishlist-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: transparent;
        border: none;
        color: #9e9e9e;
        cursor: pointer;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s, color 0.3s;
      }
      .product-item:hover .wishlist-button {
        opacity: 1;
      }
      .wishlist-button:hover {
        color: #e91e63;
      }
      .brand-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 2;
        background-color: white;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        padding: 2px 4px;
      }
      .brand-badge img {
        height: 20px;
        width: auto;
      }
      .product-tags {
        display: flex;
        gap: 4px;
        margin-top: 8px;
      }
      .product-tag {
        display: inline-block;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }
      .product-tag.exclusive {
        background-color: #1e3a8a;
      }
      .product-tag.best-seller {
        background-color: #b91c1c;
      }
      .product-name {
        font-size: 14px;
        font-weight: 500;
        color: #212121;
        margin: 8px 0;
        line-height: 1.4;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .product-price {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .current-price {
        color: #e91e63;
        font-weight: 700;
        font-size: 16px;
        margin-right: 8px;
      }
      .original-price {
        color: #9e9e9e;
        text-decoration: line-through;
        font-size: 12px;
      }
      .discount-badge {
        margin-left: auto;
        background-color: #e91e63;
        color: white;
        padding: 2px 4px;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 500;
      }
      .product-count {
        position: relative;
        width: 100%;
        height: 16px;
        margin-bottom: 8px;
      }
      .count-item {
        width: 100%;
        height: 16px;
        border-radius: 8px;
        position: relative;
        background: #f5f5f5;
        z-index: 1;
      }
      .count-item .countdown {
        position: absolute;
        height: 16px;
        border-radius: 8px;
        background-color: #e91e63;
        z-index: 2;
        left: 0;
        top: 0;
        background-size: 40px 40px;
        animation: progress_bar_fill 2s linear infinite;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.25) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 255, 255, 0.25) 75%,
          transparent 75%,
          transparent
        );
      }
      .count-item .sale-bag {
        background: url('//bizweb.dktcdn.net/100/490/275/themes/913829/assets/sale_bag.png?1751952556342') 0 no-repeat;
        width: 18px;
        height: 21px;
        background-size: contain;
        position: absolute;
        left: 3px;
        top: -6px;
        z-index: 3;
      }
      .count-item .count-text {
        font-size: 12px;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 4;
        color: #fff;
        line-height: 16px;
        left: 50%;
        font-weight: 400;
        transform: translateX(-50%);
        text-align: center;
      }
      .gift-badge {
        border: 1px solid #e91e63;
        border-radius: 2px;
        padding: 4px 8px;
        font-size: 12px;
        color: #e91e63;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
      }
      .gift-badge .gift-icon {
        margin-right: 4px;
      }
      @keyframes progress_bar_fill {
        from {
          background-position: 0 0;
        }
        to {
          background-position: 40px 0;
        }
      }
      .navigation-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        cursor: pointer;
        color: #616161;
        transition: all 0.3s;
      }
      .navigation-button:hover {
        background-color: #e91e63;
        color: white;
        border-color: #e91e63;
      }
      .navigation-button.prev {
        left: -18px;
      }
      .navigation-button.next {
        right: -18px;
      }
      .banner-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 20px;
        margin-bottom: 0;
        max-width: 100%;
      }
      @media (max-width: 767px) {
        .banner-container {
          grid-template-columns: 1fr;
        }
      }
      .banner-item {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        height: 150px;
        transition: transform 0.3s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .banner-item:hover {
        transform: translateY(-3px);
      }
      .banner-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.5s ease;
      }
      .banner-item:hover img {
        transform: scale(1.03);
      }
      .category-links-container {
        position: relative;
        display: flex;
        justify-content: center;
        margin-top: 16px;
        padding: 0;
        background-color: transparent;
      }
      .category-links {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        gap: 8px;
        margin: 0;
        overflow-x: auto;
        padding: 0;
        -ms-overflow-style: none;
        scrollbar-width: none;
        max-width: 100%;
      }
      .category-links::-webkit-scrollbar {
        display: none;
      }
      .category-link {
        background-color: white;
        border: 1px solid #e0e0e0;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        color: #424242;
        transition: all 0.3s;
        white-space: nowrap;
        flex-shrink: 0;
        text-align: center;
        min-width: 100px;
      }
      .category-link:hover {
        border-color: #e91e63;
        color: #e91e63;
      }
      .product-hover-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 5;
      }
      .product-item:hover .product-hover-overlay {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .hover-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .search-button {
        background-color: white;
        border-radius: 9999px;
        padding: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
      }
      .product-item:hover .search-button {
        opacity: 1;
        transform: translateY(0);
      }
      .search-button:hover {
        background-color: #f3f4f6;
      }
      .buy-button {
        background-color: white;
        color: #2563eb;
        border-radius: 9999px;
        padding: 0.5rem 1.25rem;
        font-weight: 500;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        transform: translateY(10px);
      }
      .product-item:hover .buy-button {
        opacity: 1;
        transform: translateY(0);
      }
      .buy-button:hover {
        background-color: #2563eb;
        color: white;
      }
      .add-to-cart-button {
        background-color: white;
        color: #e91e63;
        border-radius: 9999px;
        padding: 8px 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transform: translateY(10px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      .product-item:hover .add-to-cart-button {
        transform: translateY(0);
        opacity: 1;
      }
      .add-to-cart-button:hover {
        background-color: #e91e63;
        color: white;
      }
    `;
    // Append to head
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);
useEffect(() => {
  // Add animation after component mounts
  setShowSection(true);

  // For staggered animation of products
  const timer = setTimeout(() => {
    const products = document.querySelectorAll('.product-item');
    products.forEach((product, index) => {
      setTimeout(() => {
        (product as HTMLElement).style.opacity = '1';
        (product as HTMLElement).style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 300);

  return () => clearTimeout(timer);
}, []);

  const vouchers = [
    { 
      code: 'BEA50', 
      discount: '50K',
      description: 'Mã giảm 50K cho đơn hàng tối thiểu 750.000đ.',
      color: 'bg-pink-100'
    },
    { 
      code: 'BEA15', 
      discount: '15%',
      description: 'Mã giảm 15% cho đơn hàng tối thiểu 1.500.000đ.',
      color: 'bg-pink-100'
    },
    { 
      code: 'BEAN99K', 
      discount: '99K',
      description: 'Mã giảm 99K cho đơn hàng tối thiểu 950.000đ.',
      color: 'bg-pink-100'
    },
    { 
      code: 'FREESHIP', 
      discount: '0K',
      description: 'Nhập mã FREESHIP miễn phí vận chuyển.',
      color: 'bg-pink-100'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Tinh chất sáng da Serum Vichy Liftactiv Specialist',
      price: 1275000,
      originalPrice: 1310000,
      discount: 3,
      image: '../src/img/slider_1.webp',
      brand: 'VICHY',
      brandImage: '../src/img/thuonghieu_15.jpg',
      tags: ['EXCLUSIVE'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 156
    },
    {
      id: 2,
      name: 'Tẩy da chết vật lý Bioderma Sebium Gel Gommant',
      price: 390000,
      originalPrice: 390000,
      discount: 0,
      image: '../src/img/slider_1.webp',
      brand: 'BIODERMA',
      brandImage: '../src/img/bioderma-logo.png',
      tags: [],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 89
    },
    {
      id: 3,
      name: "Tẩy da chết Paula's Choice Skin Perfecting Gel Exfoliant",
      price: 339000,
      originalPrice: 390000,
      discount: 13,
      image: '../src/img/slider_1.webp',
      brand: "PAULA'S CHOICE",
      brandImage: '../src/img/1.png',
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng',
      sold: 245
    },
    {
      id: 4,
      name: 'Simple Smoothing Facial Scrub',
      price: 75000,
      originalPrice: 95000,
      discount: 21,
      image: '../src/img/slider_1.webp',
      brand: 'SIMPLE',
      brandImage: '../src/img/images.png',
      tags: ['BEST SELLER'],
      gift: 'Có 2 lựa chọn quà tặng khi mua hàng',
      sold: 178
    },
    {
      id: 5,
      name: 'Tinh chất La Roche-Posay Hyalu B5 Serum phục hồi da',
      price: 770000,
      originalPrice: 890000,
      discount: 13,
      image: '../src/img/slider_1.webp',
      brand: 'LA ROCHE-POSAY',
      brandImage: '../src/img/thuonghieu_11.jpg',
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 1 lựa chọn quà tặng khi mua hàng',
      sold: 324
    },
  ];

  const categories = [
    { name: 'Tẩy trang', url: '#' },
    { name: 'Kem dưỡng da', url: '#' },
    { name: 'Sữa rửa mặt', url: '#' },
    { name: 'Toner nước cân bằng', url: '#' },
    { name: 'Treatment đặc trị', url: '#' },
    { name: 'Serum trị mụn', url: '#' }
  ];

  const banners = [
    {
      id: 1,
      image: "../src/img/img_3banner_1.jpg",
      alt: "Eucerin",
      url: "#"
    },
    {
      id: 2,
      image: "../src/img/img_3banner_2.jpg",
      alt: "Anessa",
      url: "#"
    },
    {
      id: 3,
      image: "../src/img/img_3banner_3.jpg",
      alt: "Klairs",
      url: "#"
    }
  ];

  // Format price with dot separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
  };

  return (
    <>
      {/* Vouchers Section */}
      <section className="py-6 bg-white">
        <div className="mx-auto px-4" style={{ width: '1223px', maxWidth: '100%' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vouchers.map((voucher, index) => (
              <div 
                key={index} 
                className="border border-purple-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-20 h-20 ${voucher.color} rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm border border-pink-100`}>
                      {voucher.discount === '0K' ? (
                        <span className="text-pink-600">0K</span>
                      ) : (
                        <span className="text-pink-600">{voucher.discount}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="font-bold text-pink-600 text-lg">NHẬP MÃ: {voucher.code}</div>
                    <div className="text-sm text-gray-600 my-1">{voucher.description}</div>
                    <div className="flex justify-between items-center mt-2">
                      <button className="bg-purple-100 text-purple-700 text-xs py-1.5 px-3 rounded-full hover:bg-purple-200 transition-colors">
                        Sao chép mã
                      </button>
                      <a href="#" className="text-xs text-blue-500 hover:underline">Điều kiện</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Section */}
      <section className="section_product">
        <div className="mx-auto px-4" style={{ width: '1223px', maxWidth: '100%' }}>
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">CHĂM SÓC DA</h2>
            <a href="#" className="view-all">
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Product Grid with Navigation */}
          <div className="relative">
            <button className="navigation-button prev">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="product-grid">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="product-item"
                  style={{ 
                    opacity: 0, 
                    transform: 'translateY(20px)', 
                    transition: 'opacity 0.5s, transform 0.5s'
                  }}
                >
                  {/* Wishlist Button */}
                  <button className="wishlist-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  {/* Brand Badge */}
                  <div className="brand-badge">
                    <img 
                      src={product.brandImage} 
                      alt={product.brand} 
                    />
                  </div>
                  
                  {/* Product Image */}
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="product-hover-overlay">
                      <div className="hover-buttons">
                        <button className="search-button">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                        <button className="buy-button">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                          <span>Mua ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Tags */}
                  <div className="product-tags">
                    {product.tags && product.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={`product-tag ${
                          tag === 'EXCLUSIVE' ? 'exclusive' : 
                          tag === 'BEST SELLER' ? 'best-seller' : ''
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="product-name">
                    {product.name}
                  </h3>
                  
                  {/* Prices */}
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.discount > 0 && (
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                    {product.discount > 0 && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                  </div>
                  
                  {/* Sold Count with Progress Bar */}
                  <div className="product-count">
                    <div className="count-item">
                      <div className="sale-bag"></div>
                      <div 
                        className="countdown" 
                        style={{ width: `${Math.min(product.sold / 4, 100)}%` }}
                      ></div>
                      <span className="count-text">Đã bán {product.sold} sp</span>
                    </div>
                  </div>
                  
                  {/* Gift Badge */}
                  <div className="gift-badge">
                    <span className="gift-icon">🎁</span>
                    {product.gift}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="navigation-button next">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Banner Section */}
      <div className="mx-auto px-4 mb-4" style={{ width: '1223px', maxWidth: '100%' }}>
        <div className="banner-container">
          {banners.map((banner) => (
            <a 
              key={banner.id} 
              href={banner.url} 
              className="banner-item"
              style={{ 
                opacity: showSection ? 1 : 0,
                transform: showSection ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s, transform 0.5s',
                transitionDelay: `${0.1 + banner.id * 0.1}s`
              }}
            >
              <img src={banner.image} alt={banner.alt} />
            </a>
          ))}
        </div>
      </div>
      
      {/* Category Links */}
      <div className="mx-auto px-4 mb-8" style={{ width: '1223px', maxWidth: '100%' }}>
        <div className="category-links-container">
          <div className="category-links">
            {categories.map((category, index) => (
              <a key={index} href={category.url} className="category-link">
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Body Care Section - CHĂM SÓC CƠ THỂ */}
      <section className="section_product">
        <div className="mx-auto px-4" style={{ width: '1223px', maxWidth: '100%' }}>
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">CHĂM SÓC CƠ THỂ</h2>
            <a href="#" className="view-all">
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Product Grid with Navigation */}
          <div className="relative">
            <button className="navigation-button prev">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="product-grid">
              {/* Product 1 */}
              <div className="product-item" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <button className="wishlist-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <div className="brand-badge">
                  <img src="../src/img/thuonghieu_5.jpg" alt="La Roche-Posay" />
                </div>
                
                <div className="product-image-container">
                  <img src="../src/img/slider_1.webp" alt="Tinh chất La Roche-Posay" className="product-image" />
                  
                  {/* Hover Overlay */}
                  <div className="product-hover-overlay">
                    <div className="hover-buttons">
                      <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="buy-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-tags">
                  <span className="product-tag exclusive">EXCLUSIVE</span>
                  <span className="product-tag best-seller">BEST SELLER</span>
                </div>
                
                <h3 className="product-name">
                  Tinh chất La Roche-Posay Hyalu B5 Serum phục hồi da
                </h3>
                
                <div className="product-price">
                  <span className="current-price">770.000₫</span>
                  <span className="discount-badge">-9%</span>
                </div>
                
                <div className="product-count">
                  <div className="count-item">
                    <div className="sale-bag"></div>
                    <div className="countdown" style={{ width: `75%` }}></div>
                    <span className="count-text">Đã bán 156 sp</span>
                  </div>
                </div>
                
                <div className="gift-badge">
                  <span className="gift-icon">🎁</span>
                  Có 1 lựa chọn quà tặng khi mua hàng
                </div>
              </div>
              
              {/* Product 2 */}
              <div className="product-item" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <button className="wishlist-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <div className="brand-badge">
                  <img src="../src/img/slider_1.webp" alt="Timeless" />
                </div>
                
                <div className="product-image-container">
                  <img src="../src/img/slider_1.webp" alt="Tinh chất serum Timeless" className="product-image" />
                  
                  {/* Hover Overlay */}
                  <div className="product-hover-overlay">
                    <div className="hover-buttons">
                      <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="buy-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-tags">
                  <span className="product-tag exclusive">EXCLUSIVE</span>
                </div>
                
                <h3 className="product-name">
                  Tinh chất serum Timeless Vitamin B5 làm dịu và phục hồi da
                </h3>
                
                <div className="product-price">
                  <span className="current-price">395.000₫</span>
                  <span className="original-price">436.000₫</span>
                  <span className="discount-badge">-9%</span>
                </div>
                
                <div className="product-count">
                  <div className="count-item">
                    <div className="sale-bag"></div>
                    <div className="countdown" style={{ width: `45%` }}></div>
                    <span className="count-text">Đã bán 89 sp</span>
                  </div>
                </div>
                
                <div className="gift-badge">
                  <span className="gift-icon">🎁</span>
                  Có 3 lựa chọn quà tặng khi mua hàng
                </div>
              </div>
              
              {/* Product 3 */}
              <div className="product-item" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <button className="wishlist-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <div className="brand-badge">
                  <img src="../src/img/slider_1.webp" alt="Lucenbase" />
                </div>
                
                <div className="product-image-container">
                  <img src="../src/img/slider_1.webp" alt="Tinh chất phục hồi Lucenbase" className="product-image" />
                  
                  {/* Hover Overlay */}
                  <div className="product-hover-overlay">
                    <div className="hover-buttons">
                      <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="buy-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-tags"></div>
                
                <h3 className="product-name">
                  Tinh chất phục hồi Lucenbase B56 Essence Serum
                </h3>
                
                <div className="product-price">
                  <span className="current-price">210.000₫</span>
                  <span className="original-price">219.000₫</span>
                  <span className="discount-badge">-4%</span>
                </div>
                
                <div className="product-count">
                  <div className="count-item">
                    <div className="sale-bag"></div>
                    <div className="countdown" style={{ width: `60%` }}></div>
                    <span className="count-text">Đã bán 245 sp</span>
                  </div>
                </div>
                
                <div className="gift-badge">
                  <span className="gift-icon">🎁</span>
                  Có 4 lựa chọn quà tặng khi mua hàng
                </div>
              </div>
              
              {/* Product 4 */}
              <div className="product-item" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <button className="wishlist-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <div className="brand-badge">
                  <img src="../src/img/slider_1.webp" alt="Dr.Wu" />
                </div>
                
                <div className="product-image-container">
                  <img src="../src/img/slider_1.webp" alt="Tinh chất kiềm dầu phục hồi Dr.Wu" className="product-image" />
                  
                  {/* Hover Overlay */}
                  <div className="product-hover-overlay">
                    <div className="hover-buttons">
                      <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="buy-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-tags">
                  <span className="product-tag best-seller">BEST SELLER</span>
                </div>
                
                <h3 className="product-name">
                  Tinh chất kiềm dầu phục hồi Dr.Wu DermaLab
                </h3>
                
                <div className="product-price">
                  <span className="current-price">460.000₫</span>
                </div>
                
                <div className="product-count">
                  <div className="count-item">
                    <div className="sale-bag"></div>
                    <div className="countdown" style={{ width: `45%` }}></div>
                    <span className="count-text">Đã bán 178 sp</span>
                  </div>
                </div>
                
                <div className="gift-badge">
                  <span className="gift-icon">🎁</span>
                  Có 3 lựa chọn quà tặng khi mua hàng
                </div>
              </div>
              
              {/* Product 5 */}
              <div className="product-item" style={{ opacity: 1, transform: 'translateY(0)' }}>
                <button className="wishlist-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <div className="brand-badge">
                  <img src="../src/img/slider_1.webp" alt="SVR" />
                </div>
                
                <div className="product-image-container">
                  <img src="../src/img/slider_1.webp" alt="Toner giảm mụn SVR Sebiaclear" className="product-image" />
                  
                  {/* Hover Overlay */}
                  <div className="product-hover-overlay">
                    <div className="hover-buttons">
                      <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="buy-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-tags">
                  <span className="product-tag exclusive">EXCLUSIVE</span>
                  <span className="product-tag best-seller">BEST SELLER</span>
                </div>
                
                <h3 className="product-name">
                  Toner giảm mụn SVR Sebiaclear Micro Peel cân bằng da
                </h3>
                
                <div className="product-price">
                  <span className="current-price">285.000₫</span>
                </div>
                
                <div className="product-count">
                  <div className="count-item">
                    <div className="sale-bag"></div>
                    <div className="countdown" style={{ width: `80%` }}></div>
                    <span className="count-text">Đã bán 324 sp</span>
                  </div>
                </div>
                
                <div className="gift-badge">
                  <span className="gift-icon">🎁</span>
                  Có 1 lựa chọn quà tặng khi mua hàng
                </div>
              </div>
            </div>
            
            <button className="navigation-button next">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Additional Banners */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
              <img src="../src/img/img_32banner_1.jpg" alt="Da dầu mụn nên dùng mỹ phẩm nào" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            </a>
            <a href="#" className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
              <img src="../src/img/img_32banner_2.jpg" alt="Purging là gì nên làm gì khi da bị" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            </a>
            <a href="#" className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
              <img src="../src/img/img_32banner_3.jpg" alt="Treatment là gì các hoạt chất điều trị mụn" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            </a>
          </div>
          
          {/* Category Links for Body Care */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a href="#" className="category-link">Sữa tắm</a>
            <a href="#" className="category-link">Sữa dưỡng thể</a>
            <a href="#" className="category-link">Tẩy tế bào chết</a>
            <a href="#" className="category-link">Xịt khử mùi</a>
            <a href="#" className="category-link">Kem tẩy lông</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;