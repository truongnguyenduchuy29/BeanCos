import { useState, useEffect } from "react";
import productData from "../db/product.json";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingBag } from "lucide-react";
import QuickView from "./QuickView";
import CheckoutModal from "./CheckoutModal";
import OrderSuccessModal from "./OrderSuccessModal";
import VoucherConditionsModal from "./VoucherConditionsModal";
import ToastModal from "./ToastModal";
import { Link } from "react-router-dom";

interface QuickViewProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  brand: string;
  tags: string[];
  category: string;
  type: string;
  skinType: string;
  volume: string;
  ingredients: string[];
  description: string;
  benefits: string[];
  status: string;
  gifts?: string[];
}

interface VoucherData {
  id: string;
  code: string;
  discount: string;
  description: string;
  color: string;
  taken: number;
  maxTaken: number;
  applicableProducts: number[];
  expiresAt: number;
  isActive: boolean;
}

const ProductSection = () => {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addCopiedVoucher,
    currentVouchers,
    takeVoucher,
  } = useAppContext();

  // UI States
  const [showSection, setShowSection] = useState(false);

  // Quick View States
  const [quickViewProduct, setQuickViewProduct] =
    useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Modal States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  // State for voucher copy animation
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // State for voucher conditions modal
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(
    null
  );

  // State for voucher timers
  const [voucherTimers, setVoucherTimers] = useState<{ [key: string]: number }>(
    {}
  );

  // State for toast modal
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copiedVoucherCode, setCopiedVoucherCode] = useState("");
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });

  // Auto close toast after duration
  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => {
        setIsToastOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  // Add timer state for each voucher
  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now();
      const newTimers: { [key: string]: number } = {};

      currentVouchers.forEach((voucher) => {
        if (voucher.isActive && voucher.expiresAt > now) {
          newTimers[voucher.id] = Math.max(0, voucher.expiresAt - now);
        }
      });

      setVoucherTimers(newTimers);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [currentVouchers]);

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Add custom CSS to the head
  useEffect(() => {
    // Create style element
    const style = document.createElement("style");
    style.textContent = `
      /* Voucher Animations */
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes glow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
        }
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .voucher-card-active {
        animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
      }
      
      .voucher-gradient-animated {
        background-size: 200% 200%;
        animation: gradient-shift 3s ease infinite;
      }
      
      .voucher-shine {
        position: relative;
        overflow: hidden;
      }
      
      .voucher-shine::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: shimmer 2s infinite;
      }
      
      /* Existing styles */
      .section_product {
        padding: 60px 0;
        background: #f8f9fa;
      }
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
      }
      
      .section-title {
        font-size: 32px;
        font-weight: bold;
        color: #2c3e50;
        position: relative;
      }
      
      .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100px;
        height: 4px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border-radius: 2px;
      }
      
      .view-all {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }
      
      .view-all:hover {
        color: #0056b3;
        transform: translateX(5px);
      }
      
      .product-grid {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 20px;
        padding: 10px 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .product-grid::-webkit-scrollbar {
        display: none;
      }
      
      .product-item {
        flex: 0 0 230px;
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
      }
      
      .product-item:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      }
      
      .brand-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        background: white;
        padding: 5px 10px;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 2;
      }
      
      .brand-badge img {
        height: 20px;
        width: auto;
      }
      
      .product-image-container {
        position: relative;
        margin-bottom: 15px;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      
      .product-tags {
        display: flex;
        gap: 5px;
        margin-bottom: 10px;
        flex-wrap: wrap;
      }
      
      .product-tag {
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .product-tag.exclusive {
        background: #ff6b6b;
        color: white;
      }
      
      .product-tag.best-seller {
        background: #4ecdc4;
        color: white;
      }
      
      .product-name {
        font-size: 14px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 10px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .product-name:hover {
        color: #007bff;
      }
      
      .product-price {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        flex-wrap: wrap;
      }
      
      .current-price {
        font-size: 16px;
        font-weight: bold;
        color: #e74c3c;
      }
      
      .original-price {
        font-size: 12px;
        color: #95a5a6;
        text-decoration: line-through;
      }
      
      .discount-badge {
        background: #e74c3c;
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 8px;
        font-weight: 600;
      }
      
      .gift-badge {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 8px;
        font-size: 11px;
        color: #6c757d;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .gift-icon {
        font-size: 14px;
      }
      
      .navigation-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      .navigation-button:hover {
        background: #007bff;
        color: white;
        transform: translateY(-50%) scale(1.1);
      }
      
      .navigation-button.prev {
        left: -25px;
      }
      
      .navigation-button.next {
        right: -25px;
      }
      
      .banner-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .banner-item {
        display: block;
        border-radius: 15px;
        overflow: hidden;
        transition: transform 0.4s ease;
      }
      
      .banner-item:hover {
        transform: scale(1.05);
      }
      
      .banner-item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      .category-links-container {
        text-align: center;
      }
      
      .category-links {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
      }
      
      .category-link {
        color: #6c757d;
        text-decoration: none;
        font-weight: 500;
        padding: 10px 20px;
        border-radius: 25px;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .category-link:hover {
        color: #007bff;
        border-color: #007bff;
        background: rgba(0, 123, 255, 0.1);
      }
      
      @media (max-width: 768px) {
        .section-title {
          font-size: 24px;
        }
        
        .product-item {
          flex: 0 0 180px;
          padding: 15px;
        }
        
        .product-image {
          height: 150px;
        }
        
        .banner-container {
          grid-template-columns: 1fr;
        }
        
        .category-links {
          flex-direction: column;
          gap: 15px;
        }
        
        .navigation-button {
          display: none;
        }
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
      const items = document.querySelectorAll(".product-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          (item as HTMLElement).style.opacity = "1";
          (item as HTMLElement).style.transform = "translateY(0)";
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Functions for handling product interactions
  const handleQuickView = (
    product: { id: number },
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Find the full product data
    const fullProduct = productData.products.find((p) => p.id === product.id);
    if (fullProduct) {
      setQuickViewProduct(fullProduct as QuickViewProduct);
      setIsQuickViewOpen(true);
    }
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const handleCopyVoucher = (
    voucher: VoucherData,
    event?: React.MouseEvent
  ) => {
    // Get button position if event is provided
    if (event) {
      const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
      setToastPosition({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top,
      });
    }

    // Check if voucher is still active and not expired
    if (!voucher.isActive || voucher.expiresAt <= Date.now()) {
      setToastMessage("Voucher đã hết hạn!");
      setCopiedVoucherCode("");
      setIsToastOpen(true);
      return;
    }

    // Check if voucher is still available
    if (voucher.taken >= voucher.maxTaken) {
      setToastMessage("Voucher đã hết lượt lấy!");
      setCopiedVoucherCode("");
      setIsToastOpen(true);
      return;
    }

    // Try to take the voucher (this will remove it and generate a new one)
    const success = takeVoucher(voucher.id);
    if (!success) {
      setToastMessage("Không thể lấy voucher này!");
      setCopiedVoucherCode("");
      setIsToastOpen(true);
      return;
    }

    // Generate random voucher code
    const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase();
    const randomCode = voucher.code + randomSuffix;

    // Copy to clipboard
    navigator.clipboard.writeText(randomCode);

    // Add to copied vouchers list in context with voucher data
    addCopiedVoucher(randomCode, voucher);

    // Show copied animation with voucher ID (since voucher will be removed)
    setCopiedVoucher(voucher.id);

    // Show success toast
    setToastMessage("Đã sao chép mã");
    setCopiedVoucherCode(randomCode);
    setIsToastOpen(true);

    // Reset animation after 3 seconds (slower animation)
    setTimeout(() => {
      setCopiedVoucher(null);
    }, 3000);
  };

  const handleShowConditions = (voucher: VoucherData) => {
    setSelectedVoucher(voucher);
    setIsConditionsModalOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutModalOpen(false);
    setIsOrderSuccessModalOpen(true);
  };

  const handleCloseOrderSuccess = () => {
    setIsOrderSuccessModalOpen(false);
  };

  const handleToggleWishlist = (
    product: {
      id: number;
      name: string;
      price: number | string;
      originalPrice?: number;
      discount?: number;
      image?: string;
      imageUrl?: string;
      brand: string;
      tags?: string[];
    },
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Format product for wishlist
    const wishlistProduct = {
      id: product.id,
      name: product.name,
      price:
        typeof product.price === "number"
          ? formatPrice(product.price) + "đ"
          : product.price,
      originalPrice: product.originalPrice
        ? typeof product.originalPrice === "number"
          ? formatPrice(product.originalPrice) + "đ"
          : product.originalPrice
        : undefined,
      discount: product.discount
        ? typeof product.discount === "number"
          ? `-${product.discount}%`
          : product.discount
        : undefined,
      image: product.image || product.imageUrl || "",
      brand: product.brand,
      tags: product.tags || [],
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistProduct);
    }
  };

  const handleBuyNow = (
    product: {
      id: number;
      name: string;
      price: number | string;
      originalPrice?: number;
      discount?: number;
      image?: string;
      imageUrl?: string;
      brand: string;
      tags?: string[];
    },
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Format product for cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price:
        typeof product.price === "number"
          ? formatPrice(product.price) + "đ"
          : product.price,
      originalPrice: product.originalPrice
        ? typeof product.originalPrice === "number"
          ? formatPrice(product.originalPrice) + "đ"
          : product.originalPrice
        : undefined,
      discount: product.discount
        ? typeof product.discount === "number"
          ? `-${product.discount}%`
          : product.discount
        : undefined,
      image: product.image || product.imageUrl || "",
      brand: product.brand,
      tags: product.tags || [],
      quantity: 1,
    };

    // Add to cart and navigate
    addToCart(cartProduct);
    navigate("/cart");
  };

  // Get products from JSON data
  const products = productData.products.slice(0, 10).map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    image: product.imageUrl,
    brand: product.brand,
    brandImage: "../src/img/bioderma-logo.png", // Default brand image
    tags: product.tags || [],
    gift: `Có ${
      Math.floor(Math.random() * 3) + 1
    } lựa chọn quà tặng khi mua hàng`,
    sold: Math.floor(Math.random() * 300) + 50,
  }));

  const banners = [
    {
      id: 1,
      image: "../src/img/img_3banner_1.jpg",
      alt: "Eucerin",
      url: "#",
    },
    {
      id: 2,
      image: "../src/img/img_3banner_2.jpg",
      alt: "Anessa",
      url: "#",
    },
    {
      id: 3,
      image: "../src/img/img_3banner_3.jpg",
      alt: "Klairs",
      url: "#",
    },
  ];

  // Format price with dot separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
  };

  return (
    <>
      {/* Vouchers Section với thiết kế mới */}
      <section className="py-6 sm:py-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div
          className="mx-auto px-2 sm:px-4"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🎟️ Voucher Khuyến Mãi</h2>
            <p className="text-gray-600">Nhận ngay ưu đãi hấp dẫn cho đơn hàng của bạn!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-0">
            {currentVouchers.map((voucher, index) => {
              const gradients = [
                'from-pink-500 via-red-500 to-yellow-500',
                'from-green-400 via-blue-500 to-purple-600', 
                'from-purple-500 via-pink-500 to-red-500',
                'from-yellow-400 via-red-500 to-pink-500'
              ];
              const currentGradient = gradients[index % gradients.length];
              
              return (
                <div
                  key={voucher.id}
                  className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 voucher-shine ${
                    voucher.isActive && voucherTimers[voucher.id]
                      ? "scale-100 opacity-100 voucher-card-active"
                      : "scale-95 opacity-75"
                  }`}
                >
                  {/* Background với gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-90 voucher-gradient-animated`}></div>
                  
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full" 
                         style={{
                           backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 1px, transparent 1px), 
                                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 1px, transparent 1px),
                                           radial-gradient(circle at 40% 60%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                           backgroundSize: '50px 50px, 30px 30px, 70px 70px'
                         }}>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 text-white h-full flex flex-col">
                    {/* Voucher Code */}
                    <div className="mb-4">
                      <div className="text-xs font-bold opacity-90 mb-1">NHẬP MÃ:</div>
                      <div className="text-lg font-black tracking-wider">
                        {voucher.code}
                        {voucher.isActive && voucherTimers[voucher.id] && (
                          <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full animate-bounce font-bold">
                            HOT!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Discount */}
                    <div className="mb-4">
                      <div className="text-4xl font-black mb-1">{voucher.discount}</div>
                      <div className="text-xs opacity-90 leading-tight">{voucher.description}</div>
                    </div>

                    {/* Timer */}
                    <div className="mb-4 flex-grow">
                      {voucher.isActive && voucherTimers[voucher.id] ? (
                        <div className="bg-white bg-opacity-20 rounded-full px-3 py-2 backdrop-blur-sm">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-xs font-bold animate-pulse">⏰</span>
                            <span className="text-sm font-mono font-bold">
                              {formatTimeRemaining(voucherTimers[voucher.id])}
                            </span>
                          </div>
                          <div className="mt-2 bg-white bg-opacity-30 rounded-full h-1">
                            <div
                              className="h-1 bg-white rounded-full transition-all duration-1000"
                              style={{
                                width: `${Math.max(
                                  0,
                                  (voucherTimers[voucher.id] / (15 * 60 * 1000)) * 100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-600 bg-opacity-50 rounded-full px-3 py-2 text-center">
                          <span className="text-sm font-bold opacity-75">❌ Hết hạn</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => handleCopyVoucher(voucher, e)}
                        disabled={!voucher.isActive || !voucherTimers[voucher.id]}
                        className={`flex-1 mr-2 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform ${
                          !voucher.isActive || !voucherTimers[voucher.id]
                            ? "bg-gray-500 bg-opacity-50 text-gray-300 cursor-not-allowed"
                            : copiedVoucher === voucher.id
                            ? "bg-green-500 text-white scale-105 animate-pulse"
                            : "bg-white text-gray-800 hover:bg-opacity-90 hover:scale-105 shadow-lg"
                        }`}
                      >
                        {!voucher.isActive || !voucherTimers[voucher.id] ? (
                          "💔 Hết hạn"
                        ) : copiedVoucher === voucher.id ? (
                          "✅ Đã sao chép!"
                        ) : (
                          "📋 Sao chép mã"
                        )}
                      </button>

                      <button
                        onClick={() => handleShowConditions(voucher)}
                        className="text-white hover:text-yellow-200 transition-colors duration-300 text-xs underline font-semibold"
                      >
                        Điều kiện
                      </button>
                    </div>

                    {/* Shine effect */}
                    {voucher.isActive && voucherTimers[voucher.id] && (
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-yellow-300 to-white opacity-50"></div>
                </div>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              ⚡ Số lượng có hạn - Nhanh tay sao chép mã để nhận ưu đãi ngay!
            </p>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="section_product">
        <div
          className="mx-auto px-2 sm:px-4"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">CHĂM SÓC DA</h2>
            <Link to="/products" className="view-all">
              Xem tất cả
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Product Grid with Navigation */}
          <div className="relative">
            <button
              className="navigation-button prev"
              onClick={() => {
                const productGrid = document.querySelector(".product-grid");
                if (productGrid) {
                  productGrid.scrollBy({ left: -300, behavior: "smooth" });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div
              className="product-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 230px)",
                overflowX: "auto",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-item"
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "opacity 0.5s, transform 0.5s",
                  }}
                >
                  {/* Brand Badge */}
                  <div className="brand-badge">
                    <img src={product.brandImage} alt={product.brand} />
                  </div>

                  {/* Product Image */}
                  <div className="relative group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product, e);
                      }}
                      className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
                        isInWishlist(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                      } shadow-sm`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    {/* Add to Cart Button - appears on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-10">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleQuickView(product, e);
                          }}
                          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                        >
                          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBuyNow(product, e);
                          }}
                          className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Mua ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Tags */}
                  <div className="product-tags">
                    {product.tags &&
                      product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`product-tag ${
                            tag === "EXCLUSIVE"
                              ? "exclusive"
                              : tag === "BEST SELLER"
                              ? "best-seller"
                              : ""
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Product Name */}
                  <a href={`/product/${product.id}`} className="block">
                    <h3 className="product-name">{product.name}</h3>
                  </a>

                  {/* Prices */}
                  <div className="product-price">
                    <span className="current-price">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="discount-badge">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Gift Badge */}
                  <div className="gift-badge">
                    <span className="gift-icon">🎁</span>
                    {product.gift}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="navigation-button next"
              onClick={() => {
                const productGrid = document.querySelector(".product-grid");
                if (productGrid) {
                  productGrid.scrollBy({ left: 300, behavior: "smooth" });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <div
        className="mx-auto px-2 sm:px-4 mb-4"
        style={{ width: "1223px", maxWidth: "100%" }}
      >
        <div className="banner-container">
          {banners.map((banner) => (
            <a
              key={banner.id}
              href={banner.url}
              className="banner-item"
              style={{
                opacity: showSection ? 1 : 0,
                transform: showSection ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s, transform 0.5s",
                transitionDelay: `${0.1 + banner.id * 0.1}s`,
              }}
            >
              <img src={banner.image} alt={banner.alt} />
            </a>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={isOrderSuccessModalOpen}
        onClose={handleCloseOrderSuccess}
      />

      {/* Voucher Conditions Modal */}
      {selectedVoucher && (
        <VoucherConditionsModal
          isOpen={isConditionsModalOpen}
          onClose={() => setIsConditionsModalOpen(false)}
          voucher={selectedVoucher}
        />
      )}

      {/* Toast Modal */}
      <ToastModal
        isOpen={isToastOpen}
        message={toastMessage}
        voucherCode={copiedVoucherCode}
        position={toastPosition}
        onClose={() => setIsToastOpen(false)}
        duration={3000}
      />
    </>
  );
};

export default ProductSection;
