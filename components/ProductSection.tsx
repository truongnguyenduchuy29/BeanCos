import { useState, useEffect } from "react";
import productData from "../db/product.json";

const ProductSection = () => {
  const [showSection, setShowSection] = useState(false);

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
        z-index: 2;
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
      @media (max-width: 767px) {
        .hover-buttons {
          gap: 0.25rem;
          flex-direction: column;
        }
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
      @media (max-width: 767px) {
        .search-button {
          padding: 0.25rem;
          opacity: 1;
          transform: translateY(0);
        }
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
      @media (max-width: 767px) {
        .buy-button {
          padding: 0.25rem 0.75rem;
          font-size: 12px;
          gap: 0.25rem;
          opacity: 1;
          transform: translateY(0);
        }
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

  const vouchers = [
    {
      code: "BEA50",
      discount: "50K",
      description: "Mã giảm 50K cho đơn hàng tối thiểu 750.000đ.",
      color: "bg-pink-100",
    },
    {
      code: "BEA15",
      discount: "15%",
      description: "Mã giảm 15% cho đơn hàng tối thiểu 1.500.000đ.",
      color: "bg-pink-100",
    },
    {
      code: "BEAN99K",
      discount: "99K",
      description: "Mã giảm 99K cho đơn hàng tối thiểu 950.000đ.",
      color: "bg-pink-100",
    },
    {
      code: "FREESHIP",
      discount: "0K",
      description: "Nhập mã FREESHIP miễn phí vận chuyển.",
      color: "bg-pink-100",
    },
  ];

  // Get products from JSON data
  const products = productData.products.slice(0, 5).map((product) => ({
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
            {vouchers.map((voucher, index) => (
              <div
                key={index}
                className="border border-purple-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex p-3 sm:p-4">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 ${voucher.color} rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm border border-pink-100`}
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
                    <div className="font-bold text-pink-600 text-sm sm:text-lg truncate">
                      NHẬP MÃ: {voucher.code}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 my-1 line-clamp-2">
                      {voucher.description}
                    </div>
                    <div className="flex justify-between items-center mt-2 flex-wrap gap-1">
                      <button className="bg-purple-100 text-purple-700 text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-full hover:bg-purple-200 transition-colors">
                        Sao chép mã
                      </button>
                      <a
                        href="#"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Điều kiện
                      </a>
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
            <a href="#" className="view-all">
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
            </a>
          </div>

          {/* Product Grid with Navigation */}
          <div className="relative">
            <button className="navigation-button prev">
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

            <div className="product-grid">
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
                  {/* Wishlist Button */}
                  <button className="wishlist-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* Brand Badge */}
                  <div className="brand-badge">
                    <img src={product.brandImage} alt={product.brand} />
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                        <button className="buy-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
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
                  <h3 className="product-name">{product.name}</h3>

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

            <button className="navigation-button next">
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
    </>
  );
};

export default ProductSection;
