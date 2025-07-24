import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import productData from "../db/product.json";
import { useAppContext } from "../context/AppContext";
import { Heart, ShoppingBag } from "lucide-react";
import QuickView from "../components/QuickView";

// Fix the type issues by updating the interfaces and type guards

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  origin?: string;
  type: string;
  skinType: string;
  volume: string;
  ingredients: string[];
  description: string;
  benefits: string[];
  status: string;
  imageUrl: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  tags: string[];
  gifts?: string[];
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  brand: string;
  tags?: string[];
}

// Create a type guard function to check if an object is a Product
function isProduct(obj: Product | RelatedProduct): obj is Product {
  return 'imageUrl' in obj && 'gifts' in obj;
}

// Create a type guard function to check if an object is a RelatedProduct
function isRelatedProduct(obj: Product | RelatedProduct): obj is RelatedProduct {
  return 'imageUrl' in obj && !('gifts' in obj);
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [viewedProducts, setViewedProducts] = useState<RelatedProduct[]>([]);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);

  // States for image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  
  // States for quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Get context for wishlist and cart functionality
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // New functions for handling wishlist, quick view, and buy now
  const handleToggleWishlist = (productToToggle: Product | RelatedProduct) => {
    // Format product data to match the wishlist item structure
    let imageUrl = '';
    
    if (isProduct(productToToggle)) {
      imageUrl = productToToggle.imageUrl;
    } else if (isRelatedProduct(productToToggle)) {
      imageUrl = productToToggle.imageUrl;
    }
    
    const wishlistProduct = {
      id: productToToggle.id,
      name: productToToggle.name,
      price: formatPrice(productToToggle.price) + 'đ',
      originalPrice: productToToggle.originalPrice ? formatPrice(productToToggle.originalPrice) + 'đ' : undefined,
      discount: productToToggle.discount ? `${productToToggle.discount}%` : undefined,
      image: imageUrl,
      brand: productToToggle.brand,
      tags: productToToggle.tags,
      gift: isProduct(productToToggle) && productToToggle.gifts ? productToToggle.gifts[0] : undefined
    };
    
    if (isInWishlist(productToToggle.id)) {
      removeFromWishlist(productToToggle.id);
    } else {
      addToWishlist(wishlistProduct);
    }
  };
  
  const handleQuickView = (productToView: Product) => {
    setQuickViewProduct(productToView);
    setIsQuickViewOpen(true);
  };
  
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Format product data to match the cart item structure
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price) + 'đ',
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) + 'đ' : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined,
      quantity: quantity
    };
    
    addToCart(cartProduct);
  };
  
  const handleBuyNow = (productToBuy: Product | RelatedProduct) => {
    // Format product data to match the cart item structure
    let imageUrl = '';
    
    if (isProduct(productToBuy)) {
      imageUrl = productToBuy.imageUrl;
    } else if (isRelatedProduct(productToBuy)) {
      imageUrl = productToBuy.imageUrl;
    }
    
    // Use selected quantity if it's the main product, otherwise default to 1
    const productQuantity = product && productToBuy.id === product.id ? quantity : 1;
    
    const cartProduct = {
      id: productToBuy.id,
      name: productToBuy.name,
      price: formatPrice(productToBuy.price) + 'đ',
      originalPrice: productToBuy.originalPrice ? formatPrice(productToBuy.originalPrice) + 'đ' : undefined,
      discount: productToBuy.discount ? `${productToBuy.discount}%` : undefined,
      image: imageUrl,
      brand: productToBuy.brand,
      tags: productToBuy.tags,
      gift: isProduct(productToBuy) && productToBuy.gifts ? productToBuy.gifts[0] : undefined,
      quantity: productQuantity
    };
    
    // Add product to cart and navigate to cart page
    addToCart(cartProduct);
    navigate('/cart');
  };

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Load product data
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = (productData.products as Product[]).find(
        (p) => p.id === productId
      );

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.imageUrl);

        // Collect all available product images
        const images = [foundProduct.imageUrl];
        if (foundProduct.imageUrl1) images.push(foundProduct.imageUrl1);
        if (foundProduct.imageUrl2) images.push(foundProduct.imageUrl2);
        if (foundProduct.imageUrl3) images.push(foundProduct.imageUrl3);
        if (foundProduct.imageUrl4) images.push(foundProduct.imageUrl4);
        setProductImages(images);

        // Add to recently viewed products in localStorage
        const recentlyViewed = JSON.parse(
          localStorage.getItem("recentlyViewed") || "[]"
        );
        const productExists = recentlyViewed.some(
          (p: RelatedProduct) => p.id === foundProduct.id
        );

        if (!productExists) {
          const simplifiedProduct = {
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
            originalPrice: foundProduct.originalPrice,
            discount: foundProduct.discount,
            imageUrl: foundProduct.imageUrl,
            brand: foundProduct.brand,
            tags: foundProduct.tags,
          };

          const updatedRecentlyViewed = [
            simplifiedProduct,
            ...recentlyViewed,
          ].slice(0, 5);
          localStorage.setItem(
            "recentlyViewed",
            JSON.stringify(updatedRecentlyViewed)
          );
          setViewedProducts(updatedRecentlyViewed);
        } else {
          setViewedProducts(recentlyViewed);
        }

        // Find related products (same category or brand)
        const related = (productData.products as Product[])
          .filter(
            (p) =>
              (p.category === foundProduct.category ||
                p.brand === foundProduct.brand) &&
              p.id !== foundProduct.id
          )
          .slice(0, 5)
          .map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.discount,
            imageUrl: p.imageUrl,
            brand: p.brand,
            tags: p.tags,
          }));

        setRelatedProducts(related);
      }
    }
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Change selected image
  const handleImageChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Toggle full description
  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
    // Scroll to the product details section after state update
    setTimeout(() => {
      const detailsSection = document.querySelector(".product-details-tabs");
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Function to open image modal
  const openImageModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="mx-auto px-4" style={{ maxWidth: "1230px" }}>
          <nav className="flex items-center text-base">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-pink-500"
              onClick={() => {
                // Scroll to top when navigating to home page
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-pink-500"
              onClick={() => {
                // Scroll to top when navigating to products page
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-pink-500">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="mx-auto px-4 py-8" style={{ maxWidth: "1230px" }}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main product content */}
          <div className="lg:w-[calc(100%-320px)]">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="md:w-2/5">
                  <div
                    className="border border-gray-200 rounded-md p-4 mb-4 cursor-pointer relative group"
                    onClick={() => openImageModal(selectedImage)}
                  >
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-96 object-contain"
                    />
                    {/* Zoom icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex space-x-3 overflow-x-auto py-2">
                    {productImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`border ${
                          selectedImage === imageUrl
                            ? "border-pink-500"
                            : "border-gray-200"
                        } rounded-md p-2 cursor-pointer w-20 h-20 flex-shrink-0 hover:border-pink-400 relative group/thumb`}
                        onClick={() => handleImageChange(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          alt={`${product.name} - Ảnh ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                        {/* Zoom button overlay */}
                        <div
                          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(imageUrl);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:w-3/5">
                  <h1 className="text-2xl font-semibold mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Thương hiệu:</span>
                    <Link
                      to={`/brand/${product.brand}`}
                      className="text-pink-500 hover:underline"
                    >
                      {product.brand}
                    </Link>
                    <span className="mx-4 text-gray-300">|</span>
                    <span className="text-gray-700 mr-2">Tình trạng:</span>
                    <span
                      className={`${
                        product.status === "Còn hàng"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="text-2xl font-bold text-pink-600">
                      {formatPrice(product.price)}đ
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 line-through mr-2">
                        {formatPrice(product.originalPrice)}đ
                      </span>
                      {product.discount > 0 && (
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                          -{product.discount}%
                        </span>
                      )}
                      <span className="ml-2 text-gray-500 text-sm">
                        Tiết kiệm:{" "}
                        {formatPrice(product.originalPrice - product.price)}đ so
                        với giá thị trường
                      </span>
                    </div>
                  </div>

                  {/* Gift Section */}
                  {product.gifts && product.gifts.length > 0 && (
                    <div className="mb-6">
                      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex items-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                            />
                          </svg>
                          <h3 className="text-red-600 font-medium">
                            Quà tặng khuyến mãi
                          </h3>
                        </div>
                        <div className="pl-7">
                          {product.gifts.map((gift, index) => (
                            <div key={index} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                checked
                                readOnly
                                className="mr-2 h-4 w-4"
                              />
                              <span className="text-sm">{gift}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quantity and Add to Cart */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <span className="mr-4">Số lượng:</span>
                      <div className="flex border border-gray-300 rounded">
                        <button
                          onClick={() => handleQuantityChange("decrease")}
                          className="px-3 py-1 border-r border-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                          className="w-12 text-center py-1 focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange("increase")}
                          className="px-3 py-1 border-l border-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleAddToCart}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </button>
                    <button 
                      onClick={() => handleToggleWishlist(product)}
                      className={`border ${isInWishlist(product.id) ? 'bg-pink-100' : ''} border-pink-600 text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-md font-medium transition-colors`}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-pink-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[320px]">
            {/* Company Policies Sidebar */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-900 uppercase">
                Chính sách của chúng tôi
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="min-w-[40px] h-10 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Miễn phí vận chuyển tại TP.HCM
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[40px] h-10 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Bảo hành chính hãng toàn quốc
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[40px] h-10 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Cam kết chính hãng 100%</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[40px] h-10 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">1 đổi 1 nếu mỹ phẩm lỗi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow-sm product-details-tabs">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("description");
                  setTimeout(() => {
                    const contentSection =
                      document.querySelector(".tab-content");
                    if (contentSection) {
                      contentSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 100);
                }}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "description"
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-600 hover:text-pink-500"
                }`}
              >
                Thông tin chi tiết
              </button>
              <button
                onClick={() => {
                  setActiveTab("policy");
                  setTimeout(() => {
                    const contentSection =
                      document.querySelector(".tab-content");
                    if (contentSection) {
                      contentSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 100);
                }}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "policy"
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-600 hover:text-pink-500"
                }`}
              >
                Chính sách đổi trả
              </button>
            </div>
          </div>

          <div className="p-6 tab-content">
            {activeTab === "description" && (
              <div>
                <div
                  className={`mt-8 ${
                    showFullDescription
                      ? ""
                      : "max-h-96 overflow-hidden relative"
                  }`}
                >
                  <h3 className="text-lg font-bold mb-4">THÔNG TIN CHI TIẾT</h3>
                  <table className="w-full border-collapse mb-6">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium w-1/4">
                          Thương hiệu
                        </td>
                        <td className="py-3 px-4">{product.brand}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium">
                          Xuất xứ thương hiệu
                        </td>
                        <td className="py-3 px-4">
                          {product.origin || "Pháp"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium">
                          Loại sản phẩm
                        </td>
                        <td className="py-3 px-4">{product.type}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium">
                          Loại Da
                        </td>
                        <td className="py-3 px-4">{product.skinType}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium">
                          Trọng lượng
                        </td>
                        <td className="py-3 px-4">{product.volume}</td>
                      </tr>
                      {product.ingredients &&
                        product.ingredients.length > 0 && (
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 bg-gray-50 font-medium">
                              Thành phần chính
                            </td>
                            <td className="py-3 px-4">
                              {product.ingredients.map((ingredient, index) => (
                                <div key={index} className="mb-1">
                                  {ingredient}
                                </div>
                              ))}
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>

                  <h3 className="text-lg font-bold mb-4">MÔ TẢ SẢN PHẨM</h3>
                  <div className="text-gray-700">
                    <p className="mb-4">{product.description}</p>
                    {product.benefits && product.benefits.length > 0 && (
                      <>
                        <h4 className="font-semibold mt-4 mb-2">
                          Công dụng chính:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {!showFullDescription && (
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "policy" && (
              <div className="text-gray-700">
                <h3 className="text-lg font-bold mb-4">CHÍNH SÁCH ĐỔI TRẢ</h3>
                <p className="mb-4">
                  Chúng tôi cam kết bảo vệ quyền lợi khách hàng với chính sách
                  đổi trả sản phẩm linh hoạt:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm lỗi do nhà
                    sản xuất.
                  </li>
                  <li>Hoàn tiền 100% nếu sản phẩm không đúng như mô tả.</li>
                  <li>
                    Không áp dụng đổi trả với sản phẩm đã qua sử dụng hoặc bao
                    bì đã mở.
                  </li>
                  <li>
                    Khách hàng chịu phí vận chuyển khi đổi trả vì lý do cá nhân.
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="mt-8">
            <button
              className="flex items-center justify-center w-full text-center py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              onClick={toggleFullDescription}
            >
              <span className="mr-2">
                {showFullDescription
                  ? "Thu gọn thông tin"
                  : "Xem thông tin chi tiết"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  showFullDescription ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-center uppercase">
            SẢN PHẨM LIÊN QUAN
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-4">
                  <div className="relative pt-[100%] overflow-hidden">
                    {/* Discount badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl-sm">
                        -{product.discount}%
                      </div>
                    )}
                    
                    {/* Wishlist button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full ${isInWishlist(product.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-500 hover:text-pink-500'} border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all shadow-sm hover:shadow-md`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Product image with overlay actions */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20">
                      <div className="flex gap-2">
                        {/* Quick view button - Kính lúp */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Find the full product data for quick view
                            const fullProduct = (productData.products as Product[]).find(
                              (p) => p.id === product.id
                            );
                            if (fullProduct) {
                              handleQuickView(fullProduct);
                            }
                          }}
                          className="w-10 h-10 rounded-md bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
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

                        {/* Quick buy button - Mua ngay */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBuyNow(product);
                          }}
                          className="h-10 px-4 rounded-md bg-pink-500 text-white text-sm font-medium flex items-center justify-center hover:bg-pink-600 transition-colors shadow-md"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <h3 className="mt-3 text-sm font-medium h-10 overflow-hidden line-clamp-2 group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-baseline flex-wrap">
                      <span className="text-red-600 font-bold text-base mr-2">
                        {formatPrice(product.price)}đ
                      </span>
                      {product.discount > 0 && (
                        <span className="text-gray-400 text-xs line-through">
                          {formatPrice(product.originalPrice)}đ
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-center uppercase">
            SẢN PHẨM ĐÃ XEM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {viewedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-4">
                  <div className="relative pt-[100%] overflow-hidden">
                    {/* Discount badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl-sm">
                        -{product.discount}%
                      </div>
                    )}
                    
                    {/* Wishlist button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full ${isInWishlist(product.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-500 hover:text-pink-500'} border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all shadow-sm hover:shadow-md`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Product image with overlay actions */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20">
                      <div className="flex gap-2">
                        {/* Quick view button - Kính lúp */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Find the full product data for quick view
                            const fullProduct = (productData.products as Product[]).find(
                              (p) => p.id === product.id
                            );
                            if (fullProduct) {
                              handleQuickView(fullProduct);
                            }
                          }}
                          className="w-10 h-10 rounded-md bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
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

                        {/* Quick buy button - Mua ngay */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBuyNow(product);
                          }}
                          className="h-10 px-4 rounded-md bg-pink-500 text-white text-sm font-medium flex items-center justify-center hover:bg-pink-600 transition-colors shadow-md"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <h3 className="mt-3 text-sm font-medium h-10 overflow-hidden line-clamp-2 group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-baseline flex-wrap">
                      <span className="text-red-600 font-bold text-base mr-2">
                        {formatPrice(product.price)}đ
                      </span>
                      {product.discount > 0 && (
                        <span className="text-gray-400 text-xs line-through">
                          {formatPrice(product.originalPrice)}đ
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-lg p-2">
            <button
              className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Xem chi tiết sản phẩm"
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      
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

export default ProductDetail;
