import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import productData from '../db/product.json';
import { useAppContext } from '../context/AppContext';
import { Heart, Search, ShoppingBag } from 'lucide-react';
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
  imageUrl1?: string; // Added optional imageUrl1 property
  tags: string[];
  gifts?: string[];
}

// Define the brand interface
interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [sortBy, setSortBy] = useState<string>('default');
  const productsPerPage = 12; // Changed from 8 to 12
  const brandsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null); // Add ref for products section

  // New state for QuickView modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Mobile filter sidebar state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get context for wishlist and cart functionality
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } =
    useAppContext();
  const navigate = useNavigate();

  // List of price ranges
  const priceRanges = [
    { label: 'Dưới 100.000đ', min: 0, max: 100000 },
    { label: 'Từ 100.000đ - 300.000đ', min: 100000, max: 300000 },
    { label: 'Từ 300.000đ - 500.000đ', min: 300000, max: 500000 },
    { label: 'Từ 500.000đ - 700.000đ', min: 500000, max: 700000 },
    { label: 'Trên 700.000đ', min: 700000, max: Infinity },
  ];

  // List of brands with images
  const brands: Brand[] = [
    { id: 1, name: 'Azclear', imageUrl: '/src/img/brand_1.jpg' },
    { id: 2, name: 'Anessa', imageUrl: '/src/img/brand_2.jpg' },
    { id: 3, name: 'Dove', imageUrl: '/src/img/brand_3.jpg' },
    { id: 4, name: 'Cetaphil', imageUrl: '/src/img/brand_4.jpg' },
    { id: 5, name: 'Cerave', imageUrl: '/src/img/brand_5.jpg' },
    { id: 6, name: 'Eucerin', imageUrl: '/src/img/brand_6.jpg' },
    { id: 7, name: 'Evelin', imageUrl: '/src/img/thuonghieu_10.jpg' },
    { id: 8, name: 'Innisfree', imageUrl: '/src/img/thuonghieu_11.jpg' },
    { id: 9, name: "Kiehl's", imageUrl: '/src/img/thuonghieu_12.jpg' },
    { id: 10, name: "L'oreal", imageUrl: '/src/img/thuonghieu_14.jpg' },
    { id: 11, name: 'La Roche Posay', imageUrl: '/src/img/thuonghieu_15.jpg' },
    { id: 12, name: "Paula's Choice", imageUrl: '/src/img/thuonghieu_5.jpg' },
  ];

  // Banner images for top section
  const banners = [
    {
      id: 1,
      title: 'DƯỢC MỸ PHẨM CHÍNH HÃNG',
      subtitle: 'TỪ PHÁP',
      buttonText: 'Mua ngay',
      imageUrl: '/src/img/img_3banner_1.jpg',
    },
    {
      id: 2,
      title: 'DƯỢC MỸ PHẨM TỪ ĐỨC',
      subtitle: '',
      buttonText: 'Mua ngay',
      imageUrl: '/src/img/img_3banner_2.jpg',
    },
    {
      id: 3,
      title: 'MỸ PHẨM UNILEVER',
      subtitle: '',
      buttonText: 'Mua ngay',
      imageUrl: '/src/img/img_3banner_3.jpg',
    },
  ];

  const [searchParams] = useSearchParams();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Load products from JSON data and check URL parameters
  // First effect to load products from JSON
  useEffect(() => {
    console.log('Loading products from JSON');
    const loadedProducts = productData.products as Product[];
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);

  // Second effect to handle URL parameters
  useEffect(() => {
    if (products.length === 0) return; // Skip if products not loaded

    // Check for search query in URL parameters
    const searchParam = searchParams.get('search');
    if (searchParam) {
      console.log(`URL parameter: search=${searchParam}`);

      // Filter products based on search query
      const searchFiltered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchParam.toLowerCase()) ||
          product.category.toLowerCase().includes(searchParam.toLowerCase()) ||
          product.type.toLowerCase().includes(searchParam.toLowerCase())
      );

      console.log(
        `Found ${searchFiltered.length} products matching search "${searchParam}"`
      );
      setFilteredProducts(searchFiltered);

      // Reset all filters when searching
      setSelectedCategory(null);
      setSelectedProductType(null);
      setSelectedBrand(null);
      setSelectedSkinType(null);
      setSelectedPriceRange(null);
      return; // Exit early to avoid category filtering
    }

    // Check for category in URL parameters
    const categoryParam = searchParams.get('category');
    console.log(`URL parameter: category=${categoryParam}`);

    if (categoryParam) {
      // First check if it matches any product categories
      const productsWithCategory = products.filter(
        (p) => p.category === categoryParam
      );

      if (productsWithCategory.length > 0) {
        console.log(
          `Found ${productsWithCategory.length} products with category "${categoryParam}"`
        );
        setSelectedCategory(categoryParam);
        setSelectedProductType(null);
      } else {
        // Try matching as product type
        const productsWithType = products.filter(
          (p) => p.type === categoryParam
        );
        if (productsWithType.length > 0) {
          console.log(
            `Found ${productsWithType.length} products with type "${categoryParam}"`
          );
          setSelectedProductType(categoryParam);
          setSelectedCategory(null);
        } else {
          // Last resort - check if it matches either
          console.log(`Trying fallback matching for "${categoryParam}"`);
          setSelectedProductType(categoryParam);
          setSelectedCategory(null);
        }
      }

      // Reset other filters
      setSelectedBrand(null);
      setSelectedSkinType(null);
      setSelectedPriceRange(null);
    } else {
      // If no category in URL, reset filters
      setSelectedProductType(null);
      setSelectedCategory(null);
    }
  }, [searchParams, products]);

  // Filter products based on selected filters
  useEffect(() => {
    // If there's a search parameter, don't apply other filters
    const searchParam = searchParams.get('search');
    if (searchParam) {
      return; // Exit early, search filtering is handled in the URL parameters effect
    }

    let filtered = [...products];

    if (selectedCategory) {
      console.log(`Filtering by category: "${selectedCategory}"`);
      const beforeFilter = filtered.length;
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
      console.log(
        `Filtered by category "${selectedCategory}": ${beforeFilter} → ${filtered.length} products`
      );
    }

    if (selectedProductType) {
      // Check both type and category fields to handle special cases like "Toner"
      console.log(`Filtering by product type: "${selectedProductType}"`);
      const beforeFilter = filtered.length;
      filtered = filtered.filter(
        (product) =>
          product.type === selectedProductType ||
          product.category === selectedProductType
      );
      console.log(
        `Filtered by type/category "${selectedProductType}": ${beforeFilter} → ${filtered.length} products`
      );

      // If no products found, show a message
      if (filtered.length === 0) {
        console.log(
          `No products found for "${selectedProductType}". Available types:`,
          [...new Set(products.map((p) => p.type))]
        );
        console.log(`Available categories:`, [
          ...new Set(products.map((p) => p.category)),
        ]);
      }
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (selectedSkinType) {
      filtered = filtered.filter((product) =>
        product.skinType.includes(selectedSkinType)
      );
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Sort products
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change

    // Scroll to products section when filters change
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    products,
    selectedCategory,
    selectedProductType,
    selectedBrand,
    selectedSkinType,
    selectedPriceRange,
    sortBy,
    searchParams, // Add searchParams to dependencies
  ]);

  // Scroll brand carousel
  const scrollBrands = (direction: 'left' | 'right') => {
    if (brandsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      brandsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Extract unique categories, product types, brands, and skin types
  const categories = [...new Set(products.map((product) => product.category))];
  const productTypes = [...new Set(products.map((product) => product.type))];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const skinTypes = [...new Set(products.map((product) => product.skinType))];

  // Handle pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Navigate to new URL with search params
  const [, setSearchParams] = useSearchParams();

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);

    // Update URL when category changes
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }

    // Close mobile filter on selection
    setIsMobileFilterOpen(false);

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProductTypeChange = (type: string) => {
    const newType = selectedProductType === type ? null : type;
    setSelectedProductType(newType);

    // Update URL when product type changes
    if (newType) {
      setSearchParams({ category: newType });
    } else {
      setSearchParams({});
    }

    // Close mobile filter on selection
    setIsMobileFilterOpen(false);

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBrandChange = (brand: string) => {
    const newBrand = selectedBrand === brand ? null : brand;
    setSelectedBrand(newBrand);

    // Clear category and product type filters when selecting a brand
    if (newBrand) {
      setSelectedCategory(null);
      setSelectedProductType(null);
      setSearchParams({ brand: newBrand });
    } else if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else if (selectedProductType) {
      setSearchParams({ category: selectedProductType });
    } else {
      setSearchParams({});
    }

    // Close mobile filter on selection
    setIsMobileFilterOpen(false);

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSkinTypeChange = (skinType: string) => {
    const newSkinType = selectedSkinType === skinType ? null : skinType;
    setSelectedSkinType(newSkinType);

    // Update URL parameters
    if (newSkinType) {
      setSearchParams({ skinType: newSkinType });
    } else if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else if (selectedProductType) {
      setSearchParams({ category: selectedProductType });
    } else if (selectedBrand) {
      setSearchParams({ brand: selectedBrand });
    } else {
      setSearchParams({});
    }

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(selectedPriceRange === range ? null : range);

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Reset all filters to show all products
  const resetToAllProducts = () => {
    setSelectedCategory(null);
    setSelectedProductType(null);
    setSelectedBrand(null);
    setSelectedSkinType(null);
    setSelectedPriceRange(null);
    setSortBy('default');
    setSearchParams({});

    // Scroll to products section
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // New functions for wishlist, cart, and quick view
  const handleToggleWishlist = (product: Product) => {
    // Format product data to match the wishlist item structure
    const wishlistProduct = {
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
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistProduct);
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const handleBuyNow = (product: Product) => {
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
    };

    // Add product to cart and navigate to cart page
    addToCart(cartProduct);
    navigate('/cart');
  };

  return (
    <div className="product-page bg-gradient-to-br from-gray-50 via-white to-pink-50 min-h-screen">
      <Header />

      {/* Modern Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-pink-500 transition-colors duration-200 flex items-center"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Trang chủ
            </Link>
            <svg
              className="w-4 h-4 mx-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {searchParams.get('search') ? (
              <span className="text-pink-600 font-medium bg-pink-50 px-3 py-1 rounded-full">
                🔍 Kết quả: "{searchParams.get('search')}"
              </span>
            ) : selectedCategory || selectedProductType ? (
              <>
                <button
                  onClick={resetToAllProducts}
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                >
                  Tất cả sản phẩm
                </button>
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-pink-600 font-medium bg-pink-50 px-3 py-1 rounded-full">
                  📦 {selectedCategory || selectedProductType}
                </span>
              </>
            ) : (
              <span className="text-pink-600 font-medium bg-pink-50 px-3 py-1 rounded-full">
                Tất cả sản phẩm
              </span>
            )}
          </nav>
        </div>
      </div>

      {/* Enhanced Banner Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                background:
                  index === 0
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : index === 1
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-48 object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-lg font-medium mb-3">
                      {banner.subtitle}
                    </p>
                  )}
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {banner.buttonText} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Brand Carousel */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🏷️ Thương Hiệu Nổi Bật
          </h2>
          <p className="text-gray-600">
            Khám phá các thương hiệu uy tín hàng đầu
          </p>
        </div>
        <div className="relative bg-white rounded-2xl shadow-lg p-6">
          <button
            onClick={() => scrollBrands('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            ref={brandsRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-none w-28 text-center cursor-pointer group"
                onClick={() => handleBrandChange(brand.name)}
              >
                <div
                  className={`border-2 ${
                    selectedBrand === brand.name
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                  } rounded-2xl p-4 mb-3 transition-all duration-300 transform group-hover:scale-105 bg-white`}
                >
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="w-full h-16 object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <p
                  className={`text-sm font-medium ${
                    selectedBrand === brand.name
                      ? 'text-pink-600'
                      : 'text-gray-700'
                  } group-hover:text-pink-500 transition-colors duration-300`}
                >
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollBrands('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content with Sidebar and Products */}
      <div
        className="mx-auto px-2 sm:px-4 py-4 sm:py-6"
        style={{ maxWidth: '1300px' }}
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Mobile-First Compact Sidebar Filters */}
          <div
            className={`w-full lg:w-[280px] mb-4 lg:mb-0 ${
              isMobileFilterOpen
                ? 'fixed inset-0 z-50 lg:relative lg:z-auto p-4 overflow-y-auto bg-gray-50'
                : 'hidden lg:block'
            } transition-all duration-300`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:sticky lg:top-4 mt-4 lg:mt-0">
              {/* Filter Header with Reset */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                  <span className="ml-1">Bộ Lọc</span>
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="lg:hidden ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </h2>
                <button
                  onClick={resetToAllProducts}
                  className="text-xs text-pink-500 hover:text-pink-600 font-medium bg-pink-50 px-2 py-1 rounded-full transition-colors"
                >
                  Xóa
                </button>
              </div>

              {/* Mobile Horizontal Scroll Container */}
              <div className="lg:space-y-4">
                {/* Categories - Mobile optimized */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="ml-1">Danh mục</span>
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {categories.slice(0, 6).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-pink-500 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                        }`}
                      >
                        {category.length > 8
                          ? category.slice(0, 8) + '...'
                          : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Types - Mobile grid */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="ml-1">Loại SP</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
                    {productTypes.slice(0, 6).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleProductTypeChange(type)}
                        className={`text-xs px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg transition-all text-left truncate ${
                          selectedProductType === type
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                        }`}
                        title={type}
                      >
                        {type.length > 8 ? type.slice(0, 8) + '...' : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range - Compact mobile version */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="ml-1">Giá</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-1">
                    {priceRanges.slice(0, 3).map((range, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handlePriceRangeChange(`${range.min}-${range.max}`)
                        }
                        className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-left transition-all ${
                          selectedPriceRange === `${range.min}-${range.max}`
                            ? 'bg-green-500 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-green-100 hover:text-green-600'
                        }`}
                      >
                        {range.label.replace('Từ ', '').replace('đ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands - Mobile horizontal scroll */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="ml-1">Thương hiệu</span>
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {uniqueBrands.slice(0, 8).map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandChange(brand)}
                        className={`text-xs px-1.5 sm:px-2 py-1 rounded-full transition-all whitespace-nowrap ${
                          selectedBrand === brand
                            ? 'bg-purple-500 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                        }`}
                      >
                        {brand.length > 6 ? brand.slice(0, 6) + '...' : brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Types - Compact */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="ml-1">Loại da</span>
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {skinTypes.slice(0, 4).map((skinType) => (
                      <button
                        key={skinType}
                        onClick={() => handleSkinTypeChange(skinType)}
                        className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all whitespace-nowrap ${
                          selectedSkinType === skinType
                            ? 'bg-yellow-500 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-600'
                        }`}
                      >
                        {skinType}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Product Grid */}
          <div className="flex-1" ref={productsRef}>
            {/* Mobile-First Top bar with title, stats and sort */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mr-2 sm:mr-4"></div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 line-clamp-2">
                      {searchParams.get('search')
                        ? `🔍 Kết quả: "${searchParams.get('search')}"`
                        : selectedCategory ||
                          selectedProductType ||
                          ' Tất Cả Sản Phẩm'}
                    </h2>
                    {/* Mobile Filter Toggle Button - 3 gạch hamburger menu */}
                    <button
                      onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                      className="lg:hidden ml-auto p-2 bg-gray-100 hover:bg-pink-100 rounded-xl transition-colors duration-300 border border-gray-200"
                      title="Bộ lọc"
                    >
                      <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                        <div
                          className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                            isMobileFilterOpen
                              ? 'rotate-45 translate-y-1.5'
                              : ''
                          }`}
                        ></div>
                        <div
                          className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                            isMobileFilterOpen ? 'opacity-0' : ''
                          }`}
                        ></div>
                        <div
                          className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                            isMobileFilterOpen
                              ? '-rotate-45 -translate-y-1.5'
                              : ''
                          }`}
                        ></div>
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-600"></div>
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 mr-1 sm:mr-3 hidden sm:inline">
                      Sắp xếp:
                    </span>
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className="bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      <option value="default"> Mặc định</option>
                      <option value="price-asc"> Giá ↑</option>
                      <option value="price-desc"> Giá ↓</option>
                      <option value="name-asc"> A-Z</option>
                      <option value="name-desc"> Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Product Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 border border-dashed border-gray-300 rounded-xl mx-2 sm:mx-0">
                <div className="text-4xl sm:text-5xl mb-3">😕</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2 px-4">
                  {searchParams.get('search')
                    ? `Không tìm thấy sản phẩm nào cho "${searchParams.get(
                        'search'
                      )}"`
                    : 'Không tìm thấy sản phẩm nào'}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 px-4">
                  {searchParams.get('search')
                    ? `Không có sản phẩm nào phù hợp với từ khóa "${searchParams.get(
                        'search'
                      )}". Hãy thử tìm kiếm với từ khóa khác hoặc xem tất cả sản phẩm.`
                    : 'Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.'}
                </p>
                <button
                  onClick={resetToAllProducts}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-0">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"></div>

                    {/* Brand Logo - Mobile optimized */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
                      <div className="w-8 h-6 sm:w-12 sm:h-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md sm:rounded-lg flex items-center justify-center shadow-sm">
                        <img
                          src={
                            brands.find((b) => b.name === product.brand)
                              ?.imageUrl || '/src/img/logo.webp'
                          }
                          alt={product.brand}
                          className="max-h-3 max-w-6 sm:max-h-5 sm:max-w-8"
                        />
                      </div>
                    </div>

                    {/* Wishlist button - Mobile optimized */}
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full ${
                        isInWishlist(product.id)
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200'
                          : 'bg-white/90 text-gray-500 hover:text-pink-500 hover:bg-white shadow-md'
                      } backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                    >
                      <Heart
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          isInWishlist(product.id) ? 'fill-current' : ''
                        }`}
                      />
                    </button>

                    {/* Premium Tags - Mobile optimized */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-8 sm:top-12 left-0 z-20">
                        {product.tags.includes('BEST SELLER') && (
                          <span className="block bg-gradient-to-r from-red-500 to-red-600 text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 mb-0.5 sm:mb-1 font-bold tracking-wide shadow-lg rounded-r-full">
                            ⭐{' '}
                            <span className="hidden sm:inline">
                              BEST SELLER
                            </span>
                            <span className="sm:hidden">HOT</span>
                          </span>
                        )}
                        {product.tags.includes('EXCLUSIVE') && (
                          <span className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 font-bold tracking-wide shadow-lg rounded-r-full">
                            💎{' '}
                            <span className="hidden sm:inline">EXCLUSIVE</span>
                            <span className="sm:hidden">NEW</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Product Image Container - Mobile optimized */}
                    <div className="pt-8 sm:pt-12 px-2 sm:px-4 pb-2 sm:pb-4 relative overflow-hidden">
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-32 sm:h-52 object-contain transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Floating glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                      </div>

                      {/* Premium hover overlay - Desktop only */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hidden sm:block">
                          <button
                            onClick={() => handleQuickView(product)}
                            className="mb-2 sm:mb-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                          >
                            <Search className="w-3 h-3 sm:w-5 sm:h-5 text-pink-500" />
                          </button>
                          <button
                            onClick={() => handleBuyNow(product)}
                            className="px-3 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm border border-pink-400"
                          >
                            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Mua ngay</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info - Mobile optimized */}
                    <div className="p-2 sm:p-5 relative z-10">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                      >
                        <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 h-8 sm:h-10 overflow-hidden line-clamp-2 text-gray-800 group-hover:text-pink-600 transition-colors duration-300 leading-tight sm:leading-relaxed">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline justify-between flex-wrap mb-2 sm:mb-3">
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                          <span className="text-pink-600 font-bold text-sm sm:text-lg">
                            {formatPrice(product.price)}đ
                          </span>
                          {product.discount > 0 && (
                            <span className="text-gray-400 text-xs sm:text-sm line-through">
                              {formatPrice(product.originalPrice)}đ
                            </span>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold shadow-md">
                            -{product.discount}%
                          </span>
                        )}
                      </div>

                      {/* Mobile Buy Button */}
                      <div className="sm:hidden mb-2">
                        <button
                          onClick={() => handleBuyNow(product)}
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Mua ngay</span>
                        </button>
                      </div>

                      {/* Premium Gift info - Mobile optimized */}
                      {product.gifts && product.gifts.length > 0 && (
                        <div className="mt-2 sm:mt-3 border border-red-200 sm:border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 bg-gradient-to-r from-red-50 to-pink-50">
                          <div className="flex items-center">
                            <span className="text-red-500 mr-1 sm:mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 sm:h-4 sm:w-4"
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
                            </span>
                            <span className="text-[10px] sm:text-xs text-red-600 font-semibold">
                              🎁 {`${product.gifts.length} quà tặng`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Premium card border effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile-Optimized Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 flex justify-center px-2 sm:px-0">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium sm:mr-4">
                      📄 Trang {currentPage}/{totalPages}
                    </span>
                    <div className="flex space-x-1 sm:space-x-2 flex-wrap justify-center">
                      {/* Mobile: Show fewer pages */}
                      {totalPages <= 7 ? (
                        Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => {
                              setCurrentPage(index + 1);
                              setTimeout(() => {
                                if (productsRef.current) {
                                  productsRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                  });
                                }
                              }, 100);
                            }}
                            className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                              currentPage === index + 1
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transform scale-110'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-pink-200 hover:text-pink-500'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))
                      ) : (
                        <>
                          {/* First page */}
                          <button
                            onClick={() => {
                              setCurrentPage(1);
                              setTimeout(() => {
                                if (productsRef.current) {
                                  productsRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                  });
                                }
                              }, 100);
                            }}
                            className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                              currentPage === 1
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transform scale-110'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-pink-200 hover:text-pink-500'
                            }`}
                          >
                            1
                          </button>

                          {/* Previous page if not near start */}
                          {currentPage > 3 && (
                            <span className="text-gray-400 px-1">...</span>
                          )}

                          {/* Current page area */}
                          {Array.from(
                            { length: Math.min(3, totalPages - 2) },
                            (_, i) => {
                              const pageNum = Math.max(
                                2,
                                Math.min(currentPage - 1 + i, totalPages - 1)
                              );
                              if (pageNum <= 1 || pageNum >= totalPages)
                                return null;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => {
                                    setCurrentPage(pageNum);
                                    setTimeout(() => {
                                      if (productsRef.current) {
                                        productsRef.current.scrollIntoView({
                                          behavior: 'smooth',
                                          block: 'start',
                                        });
                                      }
                                    }, 100);
                                  }}
                                  className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                                    currentPage === pageNum
                                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transform scale-110'
                                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-pink-200 hover:text-pink-500'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                          )}

                          {/* Next pages if not near end */}
                          {currentPage < totalPages - 2 && (
                            <span className="text-gray-400 px-1">...</span>
                          )}

                          {/* Last page */}
                          {totalPages > 1 && (
                            <button
                              onClick={() => {
                                setCurrentPage(totalPages);
                                setTimeout(() => {
                                  if (productsRef.current) {
                                    productsRef.current.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start',
                                    });
                                  }
                                }, 100);
                              }}
                              className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                                currentPage === totalPages
                                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 transform scale-110'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-pink-200 hover:text-pink-500'
                              }`}
                            >
                              {totalPages}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        ></div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
