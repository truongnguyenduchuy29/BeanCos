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
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Modal States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  // State for voucher copy animation
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // State for voucher conditions modal
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(null);

  // State for voucher timers
  const [voucherTimers, setVoucherTimers] = useState<{[key: string]: number}>({});

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
      const newTimers: {[key: string]: number} = {};
      
      currentVouchers.forEach(voucher => {
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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Add custom CSS to the head
  useEffect(() => {
    // Create style element
    const style = document.createElement("style");
    style.textContent = `
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

  const handleCopyVoucher = (voucher: VoucherData, event?: React.MouseEvent) => {
    // Get button position if event is provided
    if (event) {
      const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
      setToastPosition({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top
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

    // Add to copied vouchers list in context
    addCopiedVoucher(randomCode);

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

  // Get categories from JSON data (unique categories)
  const categories = [
    ...new Set(productData.products.map((product) => product.category)),
  ]
    .slice(0, 6)
    .map((category) => ({
      name: category,
      url: "#",
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
      {/* Vouchers Section */}
      <section className="py-4 sm:py-6 bg-white">
        <div
          className="mx-auto px-2 sm:px-4"
          style={{ width: "1223px", maxWidth: "100%" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
            {currentVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className={`border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-1000 transform ${
                  voucher.isActive && voucherTimers[voucher.id] 
                    ? "border-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 animate-pulse scale-100"
                    : "border-gray-300 bg-gray-100 opacity-75 scale-95"
                }`}
              >
                <div className="flex p-3 sm:p-4">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 ${
                        voucher.color
                      } rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm border border-pink-100 transition-all duration-1000 ${
                        voucher.isActive && voucherTimers[voucher.id] ? "animate-bounce" : "opacity-50"
                      }`}
                    >
                      {voucher.discount === "0K" ? (
                        <span className={`${voucher.isActive && voucherTimers[voucher.id] ? "text-pink-600" : "text-gray-400"}`}>0K</span>
                      ) : (
                        <span className={`${voucher.isActive && voucherTimers[voucher.id] ? "text-pink-600" : "text-gray-400"}`}>
                          {voucher.discount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <div
                      className={`font-bold text-sm sm:text-lg truncate transition-all duration-1000 ${
                        voucher.isActive && voucherTimers[voucher.id] ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      NHẬP MÃ: {voucher.code}
                      {voucher.isActive && voucherTimers[voucher.id] && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">
                          MỚI!
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 my-1 line-clamp-2">
                      {voucher.description}
                    </div>

                    {/* Timer Display */}
                    {voucher.isActive && voucherTimers[voucher.id] ? (
                      <div className="mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-red-500 transition-all duration-1000"
                              style={{
                                width: `${Math.max(0, (voucherTimers[voucher.id] / (15 * 60 * 1000)) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-red-600 font-mono bg-red-100 px-2 py-1 rounded animate-pulse">
                            {formatTimeRemaining(voucherTimers[voucher.id])}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-gray-400 w-0"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                          Hết hạn
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-2 flex-wrap gap-1">
                      <button
                        onClick={(e) => handleCopyVoucher(voucher, e)}
                        disabled={!voucher.isActive || !voucherTimers[voucher.id]}
                        className={`text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-1000 transform ${
                          !voucher.isActive || !voucherTimers[voucher.id]
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed scale-95"
                            : copiedVoucher === voucher.id
                            ? "bg-green-100 text-green-700 border border-green-200 scale-110 animate-pulse"
                            : "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 hover:scale-105"
                        }`}
                      >
                        {!voucher.isActive || !voucherTimers[voucher.id] ? (
                          "Hết hạn"
                        ) : copiedVoucher === voucher.id ? (
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Đã sao chép
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Sao chép mã
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleShowConditions(voucher)}
                        className="text-xs text-blue-500 hover:underline transition-all duration-300"
                      >
                        Điều kiện
                      </button>
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

      {/* Category Links */}
      <div
        className="mx-auto px-2 sm:px-4 mb-6 sm:mb-8"
        style={{ width: "1223px", maxWidth: "100%" }}
      >
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
