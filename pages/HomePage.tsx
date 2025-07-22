import { useState, useEffect, useCallback } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";
import productData from "../db/product.json";
import { useAppContext } from "../context/AppContext";
import QuickView from "../components/QuickView";

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  
  // State for quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // State for animations and interactions
  const [showSection, setShowSection] = useState(false);
  const [activeTab, setActiveTab] = useState("cleanser");

  // Product data from JSON
  const products = productData.products;

  // Flash Sale countdown state
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 28,
    seconds: 57,
  });

  useEffect(() => {
    setShowSection(true);
    const timer = setTimeout(() => {
      const categories = document.querySelectorAll(".category-item");
      categories.forEach((category, index) => {
        setTimeout(() => {
          (category as HTMLElement).style.opacity = "1";
          (category as HTMLElement).style.transform = "translateY(0)";
        }, index * 50);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect for Flash Sale
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // Functions for handling product interactions
  const handleQuickView = useCallback((product: any) => {
    // Find the full product data
    const fullProduct = products.find(p => p.id === product.id);
    if (fullProduct) {
      setQuickViewProduct(fullProduct);
      setIsQuickViewOpen(true);
    }
  }, [products]);
  
  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
  }, []);
  
  const handleToggleWishlist = useCallback((product: any, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Format product for wishlist
    const wishlistProduct = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? product.price : `${formatFlashSalePrice(product.price)}đ`,
      originalPrice: product.originalPrice ? 
        (typeof product.originalPrice === 'string' ? product.originalPrice : `${formatFlashSalePrice(product.originalPrice)}đ`) : 
        undefined,
      discount: product.discount ? 
        (typeof product.discount === 'string' ? product.discount : `-${product.discount}%`) : 
        undefined,
      image: product.image || product.imageUrl,
      brand: product.brand,
      tags: product.tags || product.labels,
    };
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistProduct);
    }
  }, [addToWishlist, removeFromWishlist, isInWishlist]);
  
  const handleBuyNow = useCallback((product: any, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Format product for cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? product.price : `${formatFlashSalePrice(product.price)}đ`,
      originalPrice: product.originalPrice ? 
        (typeof product.originalPrice === 'string' ? product.originalPrice : `${formatFlashSalePrice(product.originalPrice)}đ`) : 
        undefined,
      discount: product.discount ? 
        (typeof product.discount === 'string' ? product.discount : `-${product.discount}%`) : 
        undefined,
      image: product.image || product.imageUrl,
      brand: product.brand,
      tags: product.tags || product.labels,
      quantity: 1
    };
    
    // Add to cart and navigate
    addToCart(cartProduct);
    navigate('/cart');
  }, [addToCart, navigate]);

  // Data
  const categories = [
    { name: "Bộ sản phẩm", image: "../src/img/danhmuc_1.jpg" },
    { name: "Mẹ & Bé", image: "../src/img/danhmuc_2.jpg" },
    { name: "Phụ kiện làm đẹp", image: "../src/img/danhmuc_3.jpg" },
    { name: "Thực phẩm chức năng", image: "../src/img/danhmuc_4.jpg" },
    { name: "Mỹ phẩm cho nam", image: "../src/img/danhmuc_5.jpg" },
    { name: "Trang điểm", image: "../src/img/danhmuc_6.jpg" },
    { name: "Nước hoa", image: "../src/img/danhmuc_7.jpg" },
    { name: "Chăm sóc da mặt", image: "../src/img/danhmuc_8.jpg" },
    { name: "Chăm sóc răng miệng", image: "../src/img/danhmuc_9.jpg" },
    { name: "Chăm sóc tay chân", image: "../src/img/danhmuc_10.jpg" },
    { name: "Chăm sóc tóc", image: "../src/img/danhmuc_11.jpg" },
    { name: "Chăm sóc cơ thể", image: "../src/img/danhmuc_12.jpg" },
    { name: "Chăm sóc mặt", image: "../src/img/danhmuc_13.jpg" },
    { name: "Sản phẩm khác", image: "../src/img/danhmuc_14.jpg" },
  ];

  // Get flash sale products from JSON data (products with discount > 0)
  const flashSaleProducts = products
    .filter((product) => product.discount > 0)
    .slice(0, 5)
    .map((product) => ({
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      brand: product.brand,
      brandLogo: "../src/img/bioderma-logo.png", // Default brand logo
      currentPrice: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      sold: Math.floor(Math.random() * 300) + 100, // Random sold count
      gifts: Math.floor(Math.random() * 5) + 1, // Random gift count
      labels: product.tags || [],
      soldPercentage: Math.floor(Math.random() * 80) + 20, // Random percentage
    }));

  // Định nghĩa ánh xạ giữa tab ID và loại sản phẩm
  const tabToProductType: Record<string, string> = {
    cleanser: "Tẩy trang",
    "face-wash": "Sữa rửa mặt",
    toner: "Toner",
  };

  // Lọc sản phẩm dựa vào tab được chọn
  const getFilteredProducts = (type: string) => {
    // Xác định loại sản phẩm theo tab
    const productType = tabToProductType[type];

    // Lọc sản phẩm theo type
    const filteredProducts = products
      .filter((product) => {
        // Dựa vào activeTab, có thể lọc theo type hoặc category hoặc một tiêu chí khác
        if (type === "cleanser") {
          return (
            product.category?.includes("Tẩy trang") ||
            product.type?.includes("Tẩy trang")
          );
        } else if (type === "face-wash") {
          return (
            product.category?.includes("Sữa rửa mặt") ||
            product.type?.includes("Sữa rửa mặt")
          );
        } else if (type === "toner") {
          return (
            product.category?.includes("Toner") ||
            product.type?.includes("Toner")
          );
        }
        return false;
      })
      .slice(0, 5);

    // Nếu không có sản phẩm phù hợp, trả về 5 sản phẩm đầu tiên với nhãn theo tab
    if (filteredProducts.length === 0) {
      return products.slice(0, 5).map((product) => ({
        id: product.id,
        name: product.name,
        price: `${product.price.toLocaleString()}₫`,
        originalPrice: product.originalPrice
          ? `${product.originalPrice.toLocaleString()}₫`
          : undefined,
        discount: product.discount > 0 ? `-${product.discount}%` : undefined,
        image: product.imageUrl,
        brand: product.brand,
        tags: product.tags || [],
        tabType: productType, // Thêm thông tin về tab để hiển thị
      }));
    }

    // Chuyển đổi dữ liệu sản phẩm sang định dạng ProductCard
    return filteredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: `${product.price.toLocaleString()}₫`,
      originalPrice: product.originalPrice
        ? `${product.originalPrice.toLocaleString()}₫`
        : undefined,
      discount: product.discount > 0 ? `-${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags || [],
      tabType: productType, // Thêm thông tin về tab đang được chọn
    }));
  };

  // Lấy danh sách sản phẩm theo tab đang được chọn
  const personalizedProducts = getFilteredProducts(activeTab);

  const formatFlashSalePrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const newsItems = [
    {
      id: 1,
      title: "Da dầu mụn và mỹ phẩm dành cho da dầu và mụn",
      excerpt:
        "1. DA CỦA CHÚNG TA CÓ CẤU TẠO NHƯ THẾ NÀO NHỈ ? Da gồm 3 lớp...",
      date: "12.07.2023",
      image: "../src/img/da-dau-mun-nen-dung-my-pham-nao.webp",
      category: "Da Dầu",
    },
    {
      id: 2,
      title: "Treatment là gì? các hoạt chất điều trị mụn, nám, tàn nhang",
      excerpt:
        '1.Treatment là gì ? Các bạn có thể đã google dịch từ "treatment" và ra kết quả...',
      date: "12.07.2023",
      image: "../src/img/treatment-la-gi-cac-hoat-chat-dieu-tri-mun.webp",
      category: "BHA",
      tags: ["Lần đầu dùng", "treatment", "BAN", "cần làm thế nào?"],
    },
    {
      id: 3,
      title: "Purging là gì? Nên làm gì khi da bị purging?",
      excerpt:
        "Purging là hiện tượng xảy ra bình thường trên da khi lần đa có tác động...",
      date: "12.07.2023",
      image: "../../src/img/purging-la-gi-nen-lam-gi-khi-da-bi.webp",
      tags: ["PURGING", "BREAK OUT"],
      beforeAfter: true,
    },
    {
      id: 4,
      title: "Toner là gì? Sự khác nhau giữa Lotion và Nước Hoa Hồng?",
      excerpt:
        "1. Khái niệm 1.1 Toner toner hay còn gọi là nước cân bằng da, còn ở Phương Tây...",
      date: "12.07.2023",
      image: "../src/img/toner-la-gi-su-khac-nhau-giua-lotion.webp",
      category: "LOTION",
      subtitle: "CÁCH PHÂN BIỆT",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-10 md:py-10 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
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
              <div className="flex justify-center space-x-6 mt-6 lg:hidden">
                <a
                  href="#"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold"
                >
                  QUÀ TẶNG FULLSIZE
                </a>
                <a
                  href="#"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold"
                >
                  MUA 1 TẶNG 6
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative z-10">
                <img
                  src="../src/img/slider_1.webp"
                  alt="Featured AHC Products"
                  className="w-64 md:w-80 lg:w-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-40 h-40 rounded-full bg-blue-100/60 top-10 right-10 blur-md"></div>
        <div className="absolute w-60 h-60 rounded-full bg-blue-100/60 bottom-5 left-5 blur-md"></div>
      </section>

      {/* Category Section */}
      <section
        className={`py-5 sm:py-6 lg:py-8 bg-gray-50 transition-all duration-700 ${
          showSection ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="mx-auto px-2 sm:px-4"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          <div className="flex flex-col items-center mb-5 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-purple-500 mb-2">
              DANH MỤC HOT
            </h2>
            <div className="relative w-28 sm:w-36 h-6 flex justify-center">
              <div className="h-0.5 w-full bg-pink-300 absolute top-1/2 transform -translate-y-1/2"></div>
              <div className="bg-gray-50 p-1 z-10 relative">
                <img
                  src="../src/img/icon_title.png"
                  alt="title decoration"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            {categories.slice(0, 7).map((category, index) => (
              <a
                key={index}
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group category-item"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "opacity 0.5s, transform 0.5s",
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-purple-50 rounded-lg p-2 sm:p-3 mb-2 w-full aspect-square flex items-center justify-center overflow-hidden transition-transform transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-sm text-center font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {category.name}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
            {categories.slice(7).map((category, index) => (
              <a
                key={index + 7}
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group category-item"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "opacity 0.5s, transform 0.5s",
                  transitionDelay: `${(index + 7) * 50}ms`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-purple-50 rounded-lg p-2 sm:p-3 mb-2 w-full aspect-square flex items-center justify-center overflow-hidden transition-transform transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-sm text-center font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {category.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-3 sm:py-4 bg-white section_flash_sale">
        <style>
          {`
            @keyframes progress_bar_fill {
              0% { background-position: 0 0; }
              100% { background-position: 40px 0; }
            }
            
            .marquee-container {
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
              max-width: 500px;
            }
            
            .marquee-content {
              display: inline-block;
              white-space: nowrap;
              animation: marquee 15s linear infinite;
            }
            
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            
            .flash-sale-header {
              color: #ffeb3b;
              display: flex;
              align-items: center;
              font-weight: bold;
              font-size: 1rem;
            }
            
            @media (min-width: 640px) {
              .flash-sale-header { font-size: 1.25rem; }
            }
            
            .flash-sale-header img { margin-right: 0.5rem; }
            
            .product-card {
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              padding: 0.375rem;
              position: relative;
              background: white;
              transition: all 0.3s;
              transform: translateY(0);
            }
            
            @media (min-width: 640px) {
              .product-card { padding: 0.5rem; }
            }
            
            .product-card:hover {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
              transform: translateY(-4px);
            }
            
            @media (min-width: 640px) {
              .product-card:hover { transform: translateY(-8px); }
            }
            
            .product-image {
              height: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
              margin-bottom: 0.375rem;
            }
            
            @media (min-width: 640px) {
              .product-image {
                height: 140px;
                margin-bottom: 0.5rem;
              }
            }
            
            @media (min-width: 1024px) {
              .product-image { height: 150px; }
            }
            
            .product-image img {
              max-height: 100%;
              object-fit: contain;
              transition: transform 0.3s ease;
            }
            
            .product-card:hover .product-image img {
              transform: scale(1.05);
            }
            
            .countdown-bar {
              min-height: 20px;
              width: 100%;
              position: relative;
              margin-bottom: 5px;
            }
            
            .countdown-bar .bar-bg {
              width: 100%;
              height: 16px;
              border-radius: 7px;
              position: relative;
              background: #fddde6;
              z-index: 1;
              margin-top: 5px;
            }
            
            .countdown-bar .bar-progress {
              position: absolute;
              height: 16px;
              border-radius: 7px;
              background-color: #e83a45;
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
            
            .countdown-bar .sale-icon {
              position: absolute;
              left: 3px;
              top: -6px;
              z-index: 3;
              width: 18px;
              height: 21px;
              background-size: contain;
              background-repeat: no-repeat;
            }
            
            .countdown-bar .bar-text {
              position: absolute;
              top: 0;
              z-index: 4;
              color: white;
              font-size: 12px;
              line-height: 16px;
              left: 50%;
              font-weight: 400;
              transform: translateX(-50%);
              width: 100%;
              text-align: center;
            }
            
            .hover-buttons {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              transition: opacity 0.3s;
              background-color: rgba(0, 0, 0, 0);
              z-index: 5;
            }
            
            .product-card:hover .hover-buttons {
              opacity: 1;
              background-color: rgba(0, 0, 0, 0.2);
            }
            
            .hover-buttons .button-group {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
          `}
        </style>
        <div
          className="mx-auto px-1 sm:px-2"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-2 sm:p-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex items-center">
                <div className="flash-sale-header text-base sm:text-lg">
                  <img
                    src="../src/img/flash.png"
                    alt="Flash"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  Flash Sale
                </div>
                <div className="marquee-container ml-2 sm:ml-4 max-w-[200px] sm:max-w-[500px]">
                  <div className="marquee-content text-xs sm:text-sm">
                    Giảm ngay 120k (áp dụng cho các đơn hàng trên 500k)
                  </div>
                </div>
              </div>
              <div className="text-white text-xs sm:text-sm font-medium flex items-center">
                <span className="mr-1 sm:mr-2">Kết thúc sau:</span>
                <div className="flex space-x-1">
                  <div className="bg-black bg-opacity-30 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                    {String(countdown.hours).padStart(2, "0")}
                  </div>
                  <span className="text-xs sm:text-sm">:</span>
                  <div className="bg-black bg-opacity-30 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                    {String(countdown.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-xs sm:text-sm">:</span>
                  <div className="bg-black bg-opacity-30 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                    {String(countdown.seconds).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white p-2 sm:p-3 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                {flashSaleProducts.map((product) => (
                  <div key={product.id} className="product-card group">
                    {/* Wishlist */}
                    <button 
                      onClick={(e) => handleToggleWishlist(product, e)}
                      className={`absolute top-1 sm:top-2 right-1 sm:right-2 z-10 w-7 h-7 rounded-full ${
                        isInWishlist(product.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-400'
                      } border border-gray-200 flex items-center justify-center hover:bg-pink-50 hover:text-pink-500 transition-colors duration-300 shadow-sm`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Brand Logo */}
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10">
                      <img
                        src={product.brandLogo}
                        alt={product.brand}
                        className="h-6 sm:h-8 w-auto rounded"
                      />
                    </div>

                    {/* Product Image with Hover Effects */}
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />

                        {/* Hover Overlay */}
                        <div className="hover-buttons">
                          <div className="button-group">
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuickView(product);
                              }}
                              className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-100"
                            >
                              <Search className="w-5 h-5 text-blue-600" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Buy Now clicked', product.id);
                                // Sử dụng trực tiếp hàm handleBuyNow đã được định nghĩa
                                handleBuyNow({
                                  id: product.id,
                                  name: product.name,
                                  price: product.currentPrice,
                                  originalPrice: product.originalPrice,
                                  discount: product.discount,
                                  image: product.image,
                                  brand: product.brand,
                                  labels: product.labels || []
                                });
                              }}
                              className="bg-pink-500 text-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center gap-2 hover:bg-pink-600 transition-colors"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Mua ngay</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Labels */}
                    <div className="flex gap-1 mb-2 flex-wrap">
                      {product.labels.map((label, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-1 rounded font-medium ${
                            label === "EXCLUSIVE"
                              ? "bg-blue-600 text-white"
                              : label === "BEST SELLER"
                              ? "bg-red-600 text-white"
                              : ""
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Product Name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-8 sm:h-10 hover:text-pink-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Prices */}
                    <div className="flex items-center mb-1 flex-wrap gap-1">
                      <span className="text-red-600 font-bold text-xs sm:text-sm">
                        {formatFlashSalePrice(product.currentPrice)}đ
                      </span>
                      {product.discount > 0 && (
                        <span className="text-gray-400 line-through text-xs">
                          {formatFlashSalePrice(product.originalPrice)}đ
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-red-600 text-white text-xs px-1 rounded ml-auto">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Sold Count */}
                    <div className="countdown-bar">
                      <div className="bar-bg">
                        <div
                          className="bar-progress"
                          style={{ width: `${product.soldPercentage}%` }}
                        ></div>
                        <div
                          className="sale-icon"
                          style={{
                            backgroundImage: "url(../src/img/sale_bag.png)",
                          }}
                        ></div>
                        <span className="bar-text">
                          🔥 Đã bán {product.sold} sp
                        </span>
                      </div>
                    </div>

                    {/* Gift Badge */}
                    <div className="border border-red-600 rounded text-xs text-red-600 p-1 flex items-center justify-center">
                      <span className="mr-1">🎁</span>
                      Có {product.gifts} lựa chọn quà tặng khi mua hàng
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-2 sm:mt-3 space-x-1">
              <span className="w-4 h-2 sm:w-5 sm:h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full hover:bg-white transition-colors duration-300 cursor-pointer"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <ProductSection />
      
      {/* Personalized Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div
          className="mx-auto px-4"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-3 sm:mb-4">
              DÀNH RIÊNG CHO BẠN
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-1">
            <div className="flex bg-white rounded-lg p-1 shadow-md">
              {[
                { id: "cleanser", label: "TẨY TRANG" },
                { id: "face-wash", label: "SỮA RỬA MẶT" },
                { id: "toner", label: "TONER" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-500"
                  } whitespace-nowrap`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {personalizedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative pb-[100%] overflow-hidden">
                  {product.brand && (
                    <div className="absolute top-2 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded z-10">
                      {product.brand}
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
                      isInWishlist(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
                    } shadow-sm`}
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-medium ${
                            tag === 'EXCLUSIVE' ? 'bg-blue-600 text-white' : 
                            tag === 'BEST SELLER' ? 'bg-red-500 text-white' : 
                            'bg-yellow-500 text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add to Cart Button - appears on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickView(product);
                        }}
                        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      >
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                        className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-2 mb-3 flex-wrap">
                    <span className="text-lg font-bold text-red-500">{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        {product.discount && (
                          <span className="text-sm text-red-500 font-semibold">{product.discount}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/products"
              className="text-black px-6 py-2 rounded-full font-medium text-sm sm:text-base transition-opacity hover:opacity-90 inline-block shadow-sm hover:shadow-md"
              style={{ background: "linear-gradient(90deg, #b5c5ff, #fcd1ff)" }}
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 max-w-[1223px]">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2 sm:mb-3">
              TIN NỔI BẬT
            </h2>
            <div className="w-10 sm:w-12 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium">
                      {item.date}
                    </div>
                  </div>
                </div>

                <div className="p-2 sm:p-3">
                  {item.subtitle && (
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                      {item.subtitle}
                    </p>
                  )}
                  <h3 className="font-semibold text-gray-800 mb-1.5 line-clamp-2 text-xs sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <button className="text-blue-500 hover:text-blue-700 text-[10px] sm:text-xs font-medium transition-colors">
                    Đọc tiếp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView 
          product={quickViewProduct} 
          isOpen={isQuickViewOpen} 
          onClose={handleCloseQuickView} 
        />
      )}
    </div>
  );
};

export default HomePage;
