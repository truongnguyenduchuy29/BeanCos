import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import productData from "../db/product.json";
import { useAppContext } from "../context/AppContext";
import { Heart, Search, ShoppingBag } from "lucide-react";
import QuickView from "../components/QuickView";

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
  const [sortBy, setSortBy] = useState<string>("default");
  const productsPerPage = 12; // Changed from 8 to 12
  const brandsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null); // Add ref for products section
  
  // New state for QuickView modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Get context for wishlist and cart functionality
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  // List of price ranges
  const priceRanges = [
    { label: "Dưới 100.000đ", min: 0, max: 100000 },
    { label: "Từ 100.000đ - 300.000đ", min: 100000, max: 300000 },
    { label: "Từ 300.000đ - 500.000đ", min: 300000, max: 500000 },
    { label: "Từ 500.000đ - 700.000đ", min: 500000, max: 700000 },
    { label: "Trên 700.000đ", min: 700000, max: Infinity },
  ];

  // List of brands with images
  const brands: Brand[] = [
    { id: 1, name: "Azclear", imageUrl: "/src/img/brand_1.jpg" },
    { id: 2, name: "Anessa", imageUrl: "/src/img/brand_2.jpg" },
    { id: 3, name: "Dove", imageUrl: "/src/img/brand_3.jpg" },
    { id: 4, name: "Cetaphil", imageUrl: "/src/img/brand_4.jpg" },
    { id: 5, name: "Cerave", imageUrl: "/src/img/brand_5.jpg" },
    { id: 6, name: "Eucerin", imageUrl: "/src/img/brand_6.jpg" },
    { id: 7, name: "Evelin", imageUrl: "/src/img/thuonghieu_10.jpg" },
    { id: 8, name: "Innisfree", imageUrl: "/src/img/thuonghieu_11.jpg" },
    { id: 9, name: "Kiehl's", imageUrl: "/src/img/thuonghieu_12.jpg" },
    { id: 10, name: "L'oreal", imageUrl: "/src/img/thuonghieu_14.jpg" },
    { id: 11, name: "La Roche Posay", imageUrl: "/src/img/thuonghieu_15.jpg" },
    { id: 12, name: "Paula's Choice", imageUrl: "/src/img/thuonghieu_5.jpg" },
  ];

  // Banner images for top section
  const banners = [
    {
      id: 1,
      title: "DƯỢC MỸ PHẨM CHÍNH HÃNG",
      subtitle: "TỪ PHÁP",
      buttonText: "Mua ngay",
      imageUrl: "/src/img/img_3banner_1.jpg",
    },
    {
      id: 2,
      title: "DƯỢC MỸ PHẨM TỪ ĐỨC",
      subtitle: "",
      buttonText: "Mua ngay",
      imageUrl: "/src/img/img_3banner_2.jpg",
    },
    {
      id: 3,
      title: "MỸ PHẨM UNILEVER",
      subtitle: "",
      buttonText: "Mua ngay",
      imageUrl: "/src/img/img_3banner_3.jpg",
    },
  ];

  const [searchParams] = useSearchParams();
  
  // Load products from JSON data and check URL parameters
  // First effect to load products from JSON
  useEffect(() => {
    console.log("Loading products from JSON");
    const loadedProducts = productData.products as Product[];
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);
  
  // Second effect to handle URL parameters
  useEffect(() => {
    if (products.length === 0) return; // Skip if products not loaded
    
    // Check for category in URL parameters
    const categoryParam = searchParams.get('category');
    console.log(`URL parameter: category=${categoryParam}`);
    
    if (categoryParam) {
      // First check if it matches any product categories
      const productsWithCategory = products.filter(p => p.category === categoryParam);
      
      if (productsWithCategory.length > 0) {
        console.log(`Found ${productsWithCategory.length} products with category "${categoryParam}"`);
        setSelectedCategory(categoryParam);
        setSelectedProductType(null);
      } else {
        // Try matching as product type
        const productsWithType = products.filter(p => p.type === categoryParam);
        if (productsWithType.length > 0) {
          console.log(`Found ${productsWithType.length} products with type "${categoryParam}"`);
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
    let filtered = [...products];

    if (selectedCategory) {
      console.log(`Filtering by category: "${selectedCategory}"`);
      const beforeFilter = filtered.length;
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
      console.log(`Filtered by category "${selectedCategory}": ${beforeFilter} → ${filtered.length} products`);
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
      console.log(`Filtered by type/category "${selectedProductType}": ${beforeFilter} → ${filtered.length} products`);
      
      // If no products found, show a message
      if (filtered.length === 0) {
        console.log(`No products found for "${selectedProductType}". Available types:`, 
          [...new Set(products.map(p => p.type))]);
        console.log(`Available categories:`, 
          [...new Set(products.map(p => p.category))]);
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
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Sort products
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
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
  ]);

  // Scroll brand carousel
  const scrollBrands = (direction: "left" | "right") => {
    if (brandsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      brandsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    setSortBy("default");
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
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) + 'đ' : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined
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
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) + 'đ' : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined
    };
    
    // Add product to cart and navigate to cart page
    addToCart(cartProduct);
    navigate('/cart');
  };

  return (
    <div className="product-page bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-base">
            <Link to="/" className="text-gray-600 hover:text-pink-500">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            {selectedCategory || selectedProductType ? (
              <>
                <button
                  onClick={resetToAllProducts}
                  className="text-gray-600 hover:text-pink-500"
                >
                  Tất cả sản phẩm
                </button>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span className="text-pink-500">
                  {selectedCategory || selectedProductType}
                </span>
              </>
            ) : (
              <span className="text-pink-500">Tất cả sản phẩm</span>
            )}
          </nav>
        </div>
      </div>

      {/* Banner Section */}
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative rounded-md overflow-hidden border border-gray-200"
            >
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-36 object-cover"
              />
              <div className="absolute top-0 left-0 p-4">
                <h3 className="text-lg font-semibold text-green-700">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-base text-green-700">{banner.subtitle}</p>
                )}
                <button className="mt-2 px-4 py-1.5 bg-white text-green-700 rounded-full text-sm hover:bg-gray-100 transition">
                  {banner.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Carousel */}
      <div className="container mx-auto px-4 py-5">
        <h2 className="text-xl font-semibold mb-4">TÌM KIẾM NHIỀU</h2>
        <div className="relative">
          <button
            onClick={() => scrollBrands("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            &lt;
          </button>
          <div
            ref={brandsRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-none w-24 text-center cursor-pointer"
                onClick={() => handleBrandChange(brand.name)}
              >
                <div
                  className={`border ${
                    selectedBrand === brand.name
                      ? "border-pink-500"
                      : "border-gray-200"
                  } rounded-lg p-2 mb-2`}
                >
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="w-full h-12 object-contain"
                  />
                </div>
                <p className="text-sm truncate">{brand.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollBrands("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Main Content with Sidebar and Products */}
      <div className="mx-auto px-4 py-6" style={{ maxWidth: "1300px" }}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-[280px] mb-4 lg:mb-0">
            {/* Categories */}
            <div className="mb-5">
              <div className="bg-purple-100 p-3 rounded-t-md">
                <h3 className="text-sm font-bold text-purple-900">
                  DANH MỤC SẢN PHẨM
                </h3>
              </div>
              <div className="border border-gray-200 p-3 rounded-b-md">
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2.5">
                    <button
                      className={`w-full text-left ${
                        selectedCategory === category
                          ? "text-pink-500 font-medium"
                          : "text-gray-700"
                      } text-sm hover:text-pink-400 transition-colors`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Types */}
            <div className="mb-5">
              <div className="bg-purple-100 p-3 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">
                  LOẠI SẢN PHẨM
                </h3>
              </div>
              <div className="border border-gray-200 p-3 rounded-b-md max-h-48 overflow-y-auto">
                {productTypes.map((type) => (
                  <div key={type} className="flex items-center mb-2.5">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={selectedProductType === type}
                      onChange={() => handleProductTypeChange(type)}
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <div className="bg-purple-100 p-3 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">
                  CHỌN MỨC GIÁ
                </h3>
              </div>
              <div className="border border-gray-200 p-3 rounded-b-md">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center mb-2.5">
                    <input
                      type="checkbox"
                      id={`price-${index}`}
                      checked={
                        selectedPriceRange === `${range.min}-${range.max}`
                      }
                      onChange={() =>
                        handlePriceRangeChange(`${range.min}-${range.max}`)
                      }
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      htmlFor={`price-${index}`}
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-5">
              <div className="bg-purple-100 p-3 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">
                  THƯƠNG HIỆU
                </h3>
              </div>
              <div className="border border-gray-200 p-3 rounded-b-md max-h-48 overflow-y-auto">
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mb-2.5">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skin Types */}
            <div className="mb-5">
              <div className="bg-purple-100 p-3 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">
                  LOẠI DA
                </h3>
              </div>
              <div className="border border-gray-200 p-3 rounded-b-md">
                {skinTypes.map((skinType) => (
                  <div key={skinType} className="flex items-center mb-2.5">
                    <input
                      type="checkbox"
                      id={`skin-${skinType}`}
                      checked={selectedSkinType === skinType}
                      onChange={() => handleSkinTypeChange(skinType)}
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      htmlFor={`skin-${skinType}`}
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      {skinType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:flex-1" ref={productsRef}>
            {/* Top bar with title and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-xl font-semibold uppercase mb-2 sm:mb-0">
                {selectedCategory || selectedProductType || "TẤT CẢ SẢN PHẨM"}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-md">
                <div className="text-5xl mb-3">😕</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-gray-500 mb-4">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.
                </p>
                <button
                  onClick={resetToAllProducts}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card group relative border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
                >
                  {/* Brand Logo */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="w-12 h-7 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <img
                        src={
                          brands.find((b) => b.name === product.brand)
                            ?.imageUrl || "/src/img/logo.webp"
                        }
                        alt={product.brand}
                        className="max-h-5 max-w-8"
                      />
                    </div>
                  </div>{" "}
                  {/* Wishlist button */}
                  <button 
                    onClick={() => handleToggleWishlist(product)}
                    className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full ${isInWishlist(product.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-500 hover:text-pink-500'} border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all shadow-sm hover:shadow-md`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  {/* Product Image Container */}
                  <div className="pt-10 px-3 pb-3 relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick view & Buy overlay (appears on hover) */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <button
                        onClick={() => handleQuickView(product)}
                        className="mb-3 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-pink-100 transition-colors shadow-md"
                      >
                        <Search className="w-5 h-5 text-pink-500" />
                      </button>
                      <button 
                        onClick={() => handleBuyNow(product)}
                        className="px-5 py-1.5 bg-pink-500 text-white text-sm font-medium rounded hover:bg-pink-600 transition-colors shadow-md flex items-center space-x-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                  {/* Tags (Best Seller, Exclusive) */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-10 left-0">
                      {product.tags.includes("BEST SELLER") && (
                        <span className="block bg-red-600 text-white text-[11px] px-2 py-0.5 mb-0.5 font-medium">
                          BEST SELLER
                        </span>
                      )}
                      {product.tags.includes("EXCLUSIVE") && (
                        <span className="block bg-blue-800 text-white text-[11px] px-2 py-0.5 font-medium">
                          EXCLUSIVE
                        </span>
                      )}
                    </div>
                  )}
                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium mb-2.5 h-10 overflow-hidden line-clamp-2 group-hover:text-pink-500 transition">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-baseline flex-wrap">
                      <span className="text-red-600 font-bold text-base mr-2">
                        {formatPrice(product.price)}đ
                      </span>

                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-400 text-xs line-through">
                            {formatPrice(product.originalPrice)}đ
                          </span>
                          <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                            -{product.discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Gift info */}
                    {product.gifts && product.gifts.length > 0 && (
                      <div className="mt-2 border border-red-200 rounded p-1.5 bg-red-50">
                        <div className="flex items-center">
                          <span className="text-red-500 mr-1.5">
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
                                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                              />
                            </svg>
                          </span>
                          <span className="text-xs text-red-500 line-clamp-1 font-medium">
                            {`${product.gifts.length} quà tặng kèm`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 mb-[40px] flex justify-center">
                <div className="flex space-x-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center text-base rounded-md ${
                        currentPage === index + 1
                          ? "bg-pink-500 text-white font-medium shadow-md"
                          : "border border-gray-300 hover:bg-gray-100 text-gray-600"
                      } transition-all duration-200`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
      
      <Footer />
    </div>
  );
};

export default ProductPage;
