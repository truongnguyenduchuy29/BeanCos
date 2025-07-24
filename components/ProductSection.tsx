import { useState, useEffect } from "react";
import productData from "../db/product.json";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingBag } from "lucide-react";
import QuickView from "./QuickView";
import CheckoutModal from "./CheckoutModal";
import OrderSuccessModal from "./OrderSuccessModal";
import VoucherConditionsModal from "./VoucherConditionsModal";
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

  const [showSection, setShowSection] = useState(false);

  // State for quick view modal
  const [quickViewProduct, setQuickViewProduct] =
    useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // State for checkout modal
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  // State for voucher copy animation
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // State for voucher conditions modal
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(
    null
  );

  // Add custom CSS to the head
  useEffect(() => {
    // Create style element
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
.voucher-card {
  border-radius: 10px;
  padding: 10px;
  background: linear-gradient(to right, #fce4ec, #f3e5f5);
  border: 1px solid #f3e5f5;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.voucher-card:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.voucher-badge {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(to bottom, #f8bbd0, #e1bee7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #d81b60;
  font-size: 20px;
  border: 2px dashed white;
}
.voucher-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.voucher-code {
  color: #d81b60;
  font-weight: 700;
  font-size: 16px;
}
.voucher-desc {
  font-size: 13px;
  color: #555;
  margin-top: 4px;
}
.voucher-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.voucher-copy {
  background-color: #f3e5f5;
  color: #6a1b9a;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 9999px;
}
.voucher-link {
  color: #2196f3;
  font-size: 12px;
  text-decoration: underline;
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
          padding: 15px 0;
        }
      }
      @media (max-width: 767px) {
        .section_product {
          padding: 10px 0;
        }
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      @media (max-width: 767px) {
        .section-header {
          flex-direction: column;
          gap: 10px;
          text-align: center;
        }
      }
      .section-title {
        color: #e91e63;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0;
      }
      @media (max-width: 991px) {
        .section-title {
          font-size: 20px;
        }
      }
      @media (max-width: 767px) {
        .section-title {
          font-size: 18px;
        }
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
        text-decoration: none;
      }
      @media (max-width: 767px) {
        .view-all {
          padding: 8px 12px;
          font-size: 12px;
        }
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
        overflow-x: auto;
        padding-bottom: 10px;
        scrollbar-width: thin;
        scrollbar-color: #e91e63 #f5f5f5;
      }
      .product-grid::-webkit-scrollbar {
        height: 6px;
      }
      .product-grid::-webkit-scrollbar-track {
        background: #f5f5f5;
        border-radius: 10px;
      }
      .product-grid::-webkit-scrollbar-thumb {
        background-color: #e91e63;
        border-radius: 10px;
      }
      @media (max-width: 1400px) {
        .product-grid {
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
      }
      @media (max-width: 1200px) {
        .product-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
      }
      @media (max-width: 991px) {
        .product-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
      }
      @media (max-width: 767px) {
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
      }
      @media (max-width: 480px) {
        .product-grid {
          grid-template-columns: 1fr;
          gap: 12px;
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
      @media (max-width: 767px) {
        .product-item {
          padding: 6px;
          border-radius: 6px;
        }
      }
      @media (max-width: 480px) {
        .product-item {
          padding: 8px;
        }
      }
      .product-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-8px);
      }
      @media (max-width: 767px) {
        .product-item:hover {
          transform: translateY(-4px);
        }
      }
      .product-image-container {
        position: relative;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 180px;
        z-index: 1;
      }
      @media (max-width: 991px) {
        .product-image-container {
          height: 160px;
          padding-top: 15px;
        }
      }
      @media (max-width: 767px) {
        .product-image-container {
          height: 140px;
          padding-top: 10px;
        }
      }
      @media (max-width: 480px) {
        .product-image-container {
          height: 180px;
          padding-top: 15px;
        }
      }
      .product-image {
        max-height: 160px;
        object-fit: contain;
        transition: transform 0.3s;
      }
      @media (max-width: 991px) {
        .product-image {
          max-height: 140px;
        }
      }
      @media (max-width: 767px) {
        .product-image {
          max-height: 120px;
        }
      }
      @media (max-width: 480px) {
        .product-image {
          max-height: 160px;
        }
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
        z-index: 25;
        opacity: 0;
        transition: opacity 0.3s, color 0.3s;
        padding: 4px;
      }
      @media (max-width: 767px) {
        .wishlist-button {
          top: 4px;
          right: 4px;
          opacity: 1;
        }
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
      @media (max-width: 767px) {
        .brand-badge {
          top: 4px;
          left: 4px;
          padding: 1px 3px;
        }
      }
      .brand-badge img {
        height: 20px;
        width: auto;
      }
      @media (max-width: 767px) {
        .brand-badge img {
          height: 16px;
        }
      }
      .product-tags {
        display: flex;
        gap: 4px;
        margin-top: 8px;
        flex-wrap: wrap;
      }
      @media (max-width: 767px) {
        .product-tags {
          gap: 2px;
          margin-top: 4px;
        }
      }
      .product-tag {
        display: inline-block;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }
      @media (max-width: 767px) {
        .product-tag {
          padding: 1px 4px;
          font-size: 8px;
        }
      }
      @media (max-width: 480px) {
        .product-tag {
          padding: 2px 5px;
          font-size: 9px;
        }
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
      @media (max-width: 991px) {
        .product-name {
          font-size: 13px;
          height: 36px;
          margin: 6px 0;
        }
      }
      @media (max-width: 767px) {
        .product-name {
          font-size: 12px;
          height: 32px;
          margin: 4px 0;
          -webkit-line-clamp: 2;
        }
      }
      @media (max-width: 480px) {
        .product-name {
          font-size: 14px;
          height: 40px;
          margin: 6px 0;
        }
      }
      .product-price {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 4px;
      }
      @media (max-width: 767px) {
        .product-price {
          margin-bottom: 6px;
          gap: 2px;
        }
      }
      .current-price {
        color: #e91e63;
        font-weight: 700;
        font-size: 16px;
        margin-right: 8px;
      }
      @media (max-width: 991px) {
        .current-price {
          font-size: 15px;
          margin-right: 6px;
        }
      }
      @media (max-width: 767px) {
        .current-price {
          font-size: 14px;
          margin-right: 4px;
        }
      }
      @media (max-width: 480px) {
        .current-price {
          font-size: 16px;
          margin-right: 6px;
        }
      }
      .original-price {
        color: #9e9e9e;
        text-decoration: line-through;
        font-size: 12px;
      }
      @media (max-width: 767px) {
        .original-price {
          font-size: 11px;
        }
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
      @media (max-width: 767px) {
        .discount-badge {
          font-size: 10px;
          padding: 1px 3px;
        }
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
      @media (max-width: 991px) {
        .gift-badge {
          padding: 3px 6px;
          font-size: 11px;
        }
      }
      @media (max-width: 767px) {
        .gift-badge {
          padding: 2px 4px;
          font-size: 10px;
        }
      }
      @media (max-width: 480px) {
        .gift-badge {
          padding: 3px 6px;
          font-size: 11px;
        }
      }
      .gift-badge .gift-icon {
        margin-right: 4px;
      }
      @media (max-width: 767px) {
        .gift-badge .gift-icon {
          margin-right: 2px;
        }
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
      @media (max-width: 991px) {
        .navigation-button {
          width: 32px;
          height: 32px;
        }
      }
      @media (max-width: 767px) {
        .navigation-button {
          display: none;
        }
      }
      .navigation-button:hover {
        background-color: #e91e63;
        color: white;
        border-color: #e91e63;
      }
      .navigation-button.prev {
        left: -18px;
      }
      @media (max-width: 991px) {
        .navigation-button.prev {
          left: -16px;
        }
      }
      .navigation-button.next {
        right: -18px;
      }
      @media (max-width: 991px) {
        .navigation-button.next {
          right: -16px;
        }
      }
      .banner-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 20px;
        margin-bottom: 0;
        max-width: 100%;
      }
      @media (max-width: 991px) {
        .banner-container {
          gap: 12px;
          margin-top: 16px;
        }
      }
      @media (max-width: 767px) {
        .banner-container {
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 12px;
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
      @media (max-width: 991px) {
        .banner-item {
          height: 120px;
        }
      }
      @media (max-width: 767px) {
        .banner-item {
          height: 100px;
        }
      }
      @media (max-width: 480px) {
        .banner-item {
          height: 120px;
        }
      }
      .banner-item:hover {
        transform: translateY(-3px);
      }
      @media (max-width: 767px) {
        .banner-item:hover {
          transform: translateY(-2px);
        }
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
      @media (max-width: 767px) {
        .category-links-container {
          margin-top: 12px;
        }
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
      @media (max-width: 991px) {
        .category-links {
          gap: 6px;
          justify-content: flex-start;
        }
      }
      @media (max-width: 767px) {
        .category-links {
          gap: 4px;
          padding: 0 4px;
        }
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
        text-decoration: none;
      }
      @media (max-width: 991px) {
        .category-link {
          padding: 6px 12px;
          font-size: 13px;
          min-width: 80px;
        }
      }
      @media (max-width: 767px) {
        .category-link {
          padding: 4px 8px;
          font-size: 12px;
          min-width: 60px;
        }
      }
      .category-link:hover {
        border-color: #e91e63;
        color: #e91e63;
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
      const products = document.querySelectorAll(".product-item");
      products.forEach((product, index) => {
        setTimeout(() => {
          (product as HTMLElement).style.opacity = "1";
          (product as HTMLElement).style.transform = "translateY(0)";
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

  const handleCopyVoucher = (voucher: VoucherData) => {
    // Check if voucher is still available
    if (voucher.taken >= voucher.maxTaken) {
      alert("Voucher đã hết lượt lấy!");
      return;
    }

    // Try to take the voucher
    const success = takeVoucher(voucher.id);
    if (!success) {
      alert("Không thể lấy voucher này!");
      return;
    }

    // Generate random voucher code
    const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase();
    const randomCode = voucher.code + randomSuffix;

    // Copy to clipboard
    navigator.clipboard.writeText(randomCode);

    // Add to copied vouchers list in context
    addCopiedVoucher(randomCode);

    // Show copied animation
    setCopiedVoucher(voucher.code);

    // Reset animation after 2 seconds
    setTimeout(() => {
      setCopiedVoucher(null);
    }, 2000);

    // Check if voucher is now full (will be updated in next render)
    if (voucher.taken + 1 >= voucher.maxTaken) {
      // Show notification that voucher has changed
      setTimeout(() => {
        alert(
          "🎉 Voucher đã hết lượt! Voucher mới đã được cập nhật với ưu đài khác!"
        );
      }, 2500);
    }
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
                className={`border border-purple-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-500 ${
                  voucher.taken === 0
                    ? "animate-pulse bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300"
                    : ""
                }`}
              >
                <div className="flex p-3 sm:p-4">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 ${
                        voucher.color
                      } rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm border border-pink-100 transition-all duration-300 ${
                        voucher.taken === 0 ? "animate-bounce" : ""
                      }`}
                    >
                      {voucher.discount === "0K" ? (
                        <span className="text-pink-600">0K</span>
                      ) : (
                        <span className="text-pink-600">
                          {voucher.discount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <div
                      className={`font-bold text-pink-600 text-sm sm:text-lg truncate transition-all duration-300 ${
                        voucher.taken === 0 ? "text-green-600" : ""
                      }`}
                    >
                      NHẬP MÃ: {voucher.code}
                      {voucher.taken === 0 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">
                          MỚI!
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 my-1 line-clamp-2">
                      {voucher.description}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            voucher.taken === 0 ? "bg-green-500" : "bg-pink-500"
                          }`}
                          style={{
                            width: `${
                              (voucher.taken / voucher.maxTaken) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 flex-wrap gap-1">
                      <button
                        onClick={() => handleCopyVoucher(voucher)}
                        disabled={voucher.taken >= voucher.maxTaken}
                        className={`text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 ${
                          voucher.taken >= voucher.maxTaken
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : voucher.taken === 0
                            ? "bg-green-100 text-green-700 border border-green-200 animate-pulse hover:bg-green-200"
                            : copiedVoucher === voucher.code
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        }`}
                      >
                        {voucher.taken >= voucher.maxTaken ? (
                          "Hết lượt"
                        ) : voucher.taken === 0 ? (
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
                            Sao chép mã mới
                          </span>
                        ) : copiedVoucher === voucher.code ? (
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
                          "Sao chép mã"
                        )}
                      </button>
                      <button
                        onClick={() => handleShowConditions(voucher)}
                        className="text-xs text-blue-500 hover:underline"
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
    </>
  );
};

export default ProductSection;
