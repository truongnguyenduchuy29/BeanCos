import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import productData from '../db/product.json';
import { useAppContext } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import QuickView from '../components/QuickView';

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
function isRelatedProduct(
  obj: Product | RelatedProduct
): obj is RelatedProduct {
  return 'imageUrl' in obj && !('gifts' in obj);
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [viewedProducts, setViewedProducts] = useState<RelatedProduct[]>([]);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);

  // States for image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // States for quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Get context for wishlist and cart functionality
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } =
    useAppContext();
  const navigate = useNavigate();

  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
      originalPrice: productToToggle.originalPrice
        ? formatPrice(productToToggle.originalPrice) + 'đ'
        : undefined,
      discount: productToToggle.discount
        ? `${productToToggle.discount}%`
        : undefined,
      image: imageUrl,
      brand: productToToggle.brand,
      tags: productToToggle.tags,
      gift:
        isProduct(productToToggle) && productToToggle.gifts
          ? productToToggle.gifts[0]
          : undefined,
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
      originalPrice: product.originalPrice
        ? formatPrice(product.originalPrice) + 'đ'
        : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined,
      quantity: quantity,
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
    const productQuantity =
      product && productToBuy.id === product.id ? quantity : 1;

    const cartProduct = {
      id: productToBuy.id,
      name: productToBuy.name,
      price: formatPrice(productToBuy.price) + 'đ',
      originalPrice: productToBuy.originalPrice
        ? formatPrice(productToBuy.originalPrice) + 'đ'
        : undefined,
      discount: productToBuy.discount ? `${productToBuy.discount}%` : undefined,
      image: imageUrl,
      brand: productToBuy.brand,
      tags: productToBuy.tags,
      gift:
        isProduct(productToBuy) && productToBuy.gifts
          ? productToBuy.gifts[0]
          : undefined,
      quantity: productQuantity,
    };

    // Add product to cart and navigate to cart page
    addToCart(cartProduct);
    navigate('/cart');
  };

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
          localStorage.getItem('recentlyViewed') || '[]'
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
            'recentlyViewed',
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
  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
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
      const detailsSection = document.querySelector('.product-details-tabs');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div className="mx-auto px-4" style={{ maxWidth: '1230px' }}>
          <nav className="flex items-center text-base">
            <Link
              to="/"
              className="text-gray-600 hover:text-pink-500"
              onClick={() => {
                // Scroll to top when navigating to home page
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
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
                  behavior: 'smooth',
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
      <div className="mx-auto px-4 py-8" style={{ maxWidth: '1230px' }}>
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
                            ? 'border-pink-500'
                            : 'border-gray-200'
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
                        product.status === 'Còn hàng'
                          ? 'text-green-600'
                          : 'text-red-500'
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
                        Tiết kiệm:{' '}
                        {formatPrice(product.originalPrice - product.price)}đ so
                        với giá thị trường
                      </span>
                    </div>
                  </div>

                  {/* Gift Section */}
                  {product.gifts && product.gifts.length > 0 && (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="bg-red-500 rounded-full p-1.5 mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
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
                          </div>
                          <h3 className="text-red-700 font-semibold text-lg">
                            🎁 Quà tặng khuyến mãi
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {product.gifts.map((gift, index) => (
                            <div
                              key={index}
                              className="flex items-center p-2 bg-white bg-opacity-60 rounded-md"
                            >
                              <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium">
                                {gift}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quantity and Add to Cart */}
                  <div className="mb-6">
                    <div className="flex items-center mb-6">
                      <span className="mr-4 font-semibold text-gray-700">
                        Số lượng:
                      </span>
                      <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 transition-colors duration-200 font-semibold text-gray-600 hover:text-gray-800"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          className="w-16 text-center py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset font-semibold"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange('increase')}
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 transition-colors duration-200 font-semibold text-gray-600 hover:text-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      THÊM VÀO GIỎ HÀNG
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className={`border-2 ${
                        isInWishlist(product.id)
                          ? 'bg-pink-100 border-pink-500'
                          : 'border-pink-600 hover:bg-pink-50'
                      } text-pink-600 px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center`}
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          isInWishlist(product.id) ? 'fill-pink-600' : ''
                        }`}
                      />
                      <span className="ml-2 hidden sm:block">
                        {isInWishlist(product.id)
                          ? 'Đã yêu thích'
                          : 'Yêu thích'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[320px]">
            {/* Company Policies Sidebar */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-6 text-purple-900 uppercase text-center">
                🏪 Chính sách của chúng tôi
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                  <div className="min-w-[48px] h-12 flex items-center justify-center mr-4 bg-purple-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <span className="text-gray-800 font-medium">
                    Miễn phí vận chuyển tại TP.HCM
                  </span>
                </div>
                <div className="flex items-center p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                  <div className="min-w-[48px] h-12 flex items-center justify-center mr-4 bg-purple-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <span className="text-gray-800 font-medium">
                    Bảo hành chính hãng toàn quốc
                  </span>
                </div>
                <div className="flex items-center p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                  <div className="min-w-[48px] h-12 flex items-center justify-center mr-4 bg-purple-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <span className="text-gray-800 font-medium">
                    Cam kết chính hãng 100%
                  </span>
                </div>
                <div className="flex items-center p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                  <div className="min-w-[48px] h-12 flex items-center justify-center mr-4 bg-purple-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <span className="text-gray-800 font-medium">
                    1 đổi 1 nếu mỹ phẩm lỗi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden product-details-tabs">
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-pink-50">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('description');
                  setTimeout(() => {
                    const contentSection =
                      document.querySelector('.tab-content');
                    if (contentSection) {
                      contentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }, 100);
                }}
                className={`py-4 px-8 text-sm font-semibold transition-all duration-300 relative ${
                  activeTab === 'description'
                    ? 'text-pink-600 bg-white shadow-sm'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-white hover:bg-opacity-50'
                } rounded-t-lg -mb-px`}
              >
                📋 Thông tin chi tiết
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('policy');
                  setTimeout(() => {
                    const contentSection =
                      document.querySelector('.tab-content');
                    if (contentSection) {
                      contentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }, 100);
                }}
                className={`py-4 px-8 text-sm font-semibold transition-all duration-300 relative ${
                  activeTab === 'policy'
                    ? 'text-pink-600 bg-white shadow-sm'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-white hover:bg-opacity-50'
                } rounded-t-lg -mb-px`}
              >
                🔄 Chính sách đổi trả
                {activeTab === 'policy' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"></div>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 tab-content">
            {activeTab === 'description' && (
              <div>
                <div
                  className={`mt-8 ${
                    showFullDescription
                      ? ''
                      : 'max-h-96 overflow-hidden relative'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <span className="ml-2">THÔNG TIN CHI TIẾT</span>
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-xl p-6 mb-6">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold w-1/3 rounded-l-lg">
                            Thương hiệu
                          </td>
                          <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                            {product.brand}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold rounded-l-lg">
                            Xuất xứ thương hiệu
                          </td>
                          <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                            {product.origin || 'Pháp'}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold rounded-l-lg">
                            Loại sản phẩm
                          </td>
                          <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                            {product.type}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold rounded-l-lg">
                            Loại Da
                          </td>
                          <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                            {product.skinType}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold rounded-l-lg">
                            Trọng lượng
                          </td>
                          <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                            {product.volume}
                          </td>
                        </tr>
                        {product.ingredients &&
                          product.ingredients.length > 0 && (
                            <tr>
                              <td className="py-4 px-4 bg-gradient-to-r from-purple-100 to-pink-100 font-semibold rounded-l-lg">
                                Thành phần chính
                              </td>
                              <td className="py-4 px-4 bg-white font-medium text-gray-700 rounded-r-lg">
                                <div className="space-y-1">
                                  {product.ingredients.map(
                                    (ingredient, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                                        {ingredient}
                                      </div>
                                    )
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    📝 <span className="ml-2">MÔ TẢ SẢN PHẨM</span>
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="text-gray-800 leading-relaxed">
                      <p className="mb-4 text-lg font-medium bg-white bg-opacity-70 p-4 rounded-lg">
                        {product.description}
                      </p>
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                          <h4 className="font-bold text-xl mt-4 mb-4 text-green-700 flex items-center">
                            <span className="ml-2">Công dụng chính:</span>
                          </h4>
                          <div className="grid gap-3">
                            {product.benefits.map((benefit, index) => (
                              <div
                                key={index}
                                className="flex items-start p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg"
                              >
                                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
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
                                <span className="text-gray-800 font-medium">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!showFullDescription && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'policy' && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="ml-2">CHÍNH SÁCH ĐỔI TRẢ</span>
                </h3>
                <div className="bg-white bg-opacity-70 p-6 rounded-lg mb-6">
                  <p className="mb-6 text-lg text-gray-700 font-medium">
                    Chúng tôi cam kết bảo vệ quyền lợi khách hàng với chính sách
                    đổi trả sản phẩm linh hoạt:
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-start p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">7</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Đổi trả miễn phí 7 ngày
                        </h4>
                        <p className="text-gray-600">
                          Đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm lỗi do
                          nhà sản xuất.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">💯</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Hoàn tiền 100%
                        </h4>
                        <p className="text-gray-600">
                          Hoàn tiền 100% nếu sản phẩm không đúng như mô tả.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">⚠️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Điều kiện áp dụng
                        </h4>
                        <p className="text-gray-600">
                          Không áp dụng đổi trả với sản phẩm đã qua sử dụng hoặc
                          bao bì đã mở.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">🚚</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Phí vận chuyển
                        </h4>
                        <p className="text-gray-600">
                          Khách hàng chịu phí vận chuyển khi đổi trả vì lý do cá
                          nhân.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <button
              className="flex items-center justify-center w-full text-center py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={toggleFullDescription}
            >
              <span className="mr-2 text-lg">
                {showFullDescription
                  ? 'Thu gọn thông tin'
                  : 'Xem thông tin chi tiết'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${
                  showFullDescription ? 'rotate-180' : ''
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              SẢN PHẨM LIÊN QUAN
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
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
                      className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full ${
                        isInWishlist(product.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-500 hover:text-pink-500'
                      } border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all shadow-sm hover:shadow-md`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isInWishlist(product.id) ? 'fill-current' : ''
                        }`}
                      />
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
                            const fullProduct = (
                              productData.products as Product[]
                            ).find((p) => p.id === product.id);
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
                        behavior: 'smooth',
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              SẢN PHẨM ĐÃ XEM
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full"></div>
          </div>
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
                      className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full ${
                        isInWishlist(product.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-500 hover:text-pink-500'
                      } border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all shadow-sm hover:shadow-md`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isInWishlist(product.id) ? 'fill-current' : ''
                        }`}
                      />
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
                            const fullProduct = (
                              productData.products as Product[]
                            ).find((p) => p.id === product.id);
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
                        behavior: 'smooth',
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
