import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import productData from "../db/product.json";

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
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("default");
  const productsPerPage = 12; // Changed from 8 to 12
  const brandsRef = useRef<HTMLDivElement>(null);

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

  // Load products from JSON data
  useEffect(() => {
    // Type assertion to ensure the products match the Product interface
    setProducts(productData.products as Product[]);
    setFilteredProducts(productData.products as Product[]);
  }, []);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedProductType) {
      filtered = filtered.filter((product) => product.type === selectedProductType);
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (selectedSkinType) {
      filtered = filtered.filter((product) => product.skinType.includes(selectedSkinType));
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleProductTypeChange = (type: string) => {
    setSelectedProductType(selectedProductType === type ? null : type);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
  };

  const handleSkinTypeChange = (skinType: string) => {
    setSelectedSkinType(selectedSkinType === skinType ? null : skinType);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(selectedPriceRange === range ? null : range);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="product-page bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-3">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-500">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-pink-500">Tất cả sản phẩm</span>
          </nav>
        </div>
      </div>

      {/* Banner Section */}
      <div className="container mx-auto px-3 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {banners.map((banner) => (
            <div key={banner.id} className="relative rounded-md overflow-hidden border border-gray-200">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-0 left-0 p-3">
                <h3 className="text-base font-semibold text-green-700">{banner.title}</h3>
                {banner.subtitle && <p className="text-sm text-green-700">{banner.subtitle}</p>}
                <button className="mt-1 px-3 py-1 bg-white text-green-700 rounded-full text-xs hover:bg-gray-100 transition">
                  {banner.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Carousel */}
      <div className="container mx-auto px-3 py-4">
        <h2 className="text-lg font-semibold mb-3">TÌM KIẾM NHIỀU</h2>
        <div className="relative">
          <button 
            onClick={() => scrollBrands('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center"
          >
            &lt;
          </button>
          <div 
            ref={brandsRef}
            className="flex overflow-x-auto scrollbar-hide space-x-3 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex-none w-20 text-center cursor-pointer"
                onClick={() => handleBrandChange(brand.name)}
              >
                <div className={`border ${selectedBrand === brand.name ? 'border-pink-500' : 'border-gray-200'} rounded-lg p-1 mb-1`}>
                  <img 
                    src={brand.imageUrl} 
                    alt={brand.name} 
                    className="w-full h-10 object-contain"
                  />
                </div>
                <p className="text-xs truncate">{brand.name}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollBrands('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Main Content with Sidebar and Products */}
      <div className="container mx-auto px-3 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar Filters */}
          <div className="lg:w-1/5 mb-4 lg:mb-0">
            {/* Categories */}
            <div className="mb-4">
              <div className="bg-purple-100 p-2 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">DANH MỤC SẢN PHẨM</h3>
              </div>
              <div className="border border-gray-200 p-2 rounded-b-md">
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <button 
                      className={`flex items-center justify-between w-full text-left ${selectedCategory === category ? 'text-pink-500' : 'text-gray-700'} text-sm`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span>{category}</span>
                      <span>{selectedCategory === category ? '-' : '+'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Types */}
            <div className="mb-4">
              <div className="bg-purple-100 p-2 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">LOẠI SẢN PHẨM</h3>
              </div>
              <div className="border border-gray-200 p-2 rounded-b-md max-h-48 overflow-y-auto">
                {productTypes.map((type) => (
                  <div key={type} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={selectedProductType === type}
                      onChange={() => handleProductTypeChange(type)}
                      className="mr-1.5 h-3.5 w-3.5"
                    />
                    <label htmlFor={`type-${type}`} className="text-xs text-gray-700 cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <div className="bg-purple-100 p-2 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">CHỌN MỨC GIÁ</h3>
              </div>
              <div className="border border-gray-200 p-2 rounded-b-md">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`price-${index}`}
                      checked={selectedPriceRange === `${range.min}-${range.max}`}
                      onChange={() => handlePriceRangeChange(`${range.min}-${range.max}`)}
                      className="mr-1.5 h-3.5 w-3.5"
                    />
                    <label htmlFor={`price-${index}`} className="text-xs text-gray-700 cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-4">
              <div className="bg-purple-100 p-2 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">THƯƠNG HIỆU</h3>
              </div>
              <div className="border border-gray-200 p-2 rounded-b-md max-h-48 overflow-y-auto">
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-1.5 h-3.5 w-3.5"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-xs text-gray-700 cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skin Types */}
            <div className="mb-4">
              <div className="bg-purple-100 p-2 rounded-t-md">
                <h3 className="text-sm font-semibold text-purple-900">LOẠI DA</h3>
              </div>
              <div className="border border-gray-200 p-2 rounded-b-md">
                {["Da dầu", "Da khô", "Da nhạy cảm", "Da thường", "Da hỗn hợp"].map((skinType) => (
                  <div key={skinType} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`skin-${skinType}`}
                      checked={selectedSkinType === skinType}
                      onChange={() => handleSkinTypeChange(skinType)}
                      className="mr-1.5 h-3.5 w-3.5"
                    />
                    <label htmlFor={`skin-${skinType}`} className="text-xs text-gray-700 cursor-pointer">
                      {skinType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-4/5">
            {/* Top bar with title and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <h2 className="text-lg font-semibold uppercase mb-2 sm:mb-0">TẤT CẢ SẢN PHẨM</h2>
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-1">Sắp xếp:</span>
                <select 
                  value={sortBy} 
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded px-2 py-0.5 text-xs"
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentProducts.map((product) => (
                <div key={product.id} className="product-card group relative border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
                  {/* Brand Logo */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <img 
                        src={brands.find(b => b.name === product.brand)?.imageUrl || "/src/img/logo.webp"} 
                        alt={product.brand} 
                        className="max-h-4 max-w-7"
                      />
                    </div>
                  </div>
                  
                  {/* Wishlist button */}
                  <button className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5 text-gray-500 hover:text-pink-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Product Image Container */}
                  <div className="pt-10 px-3 pb-3 relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-40 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Quick view & Buy overlay (appears on hover) */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <Link to={`/product/${product.id}`} className="mb-2 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-pink-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-pink-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </Link>
                      <button className="px-4 py-1 bg-pink-500 text-white text-xs font-medium rounded hover:bg-pink-600 transition-colors">
                        Mua ngay
                      </button>
                    </div>
                  </div>

                  {/* Tags (Best Seller, Exclusive) */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-10 left-0">
                      {product.tags.includes("BEST SELLER") && (
                        <span className="block bg-red-600 text-white text-[10px] px-2 py-0.5 mb-0.5">
                          BEST SELLER
                        </span>
                      )}
                      {product.tags.includes("EXCLUSIVE") && (
                        <span className="block bg-blue-800 text-white text-[10px] px-2 py-0.5">
                          EXCLUSIVE
                        </span>
                      )}
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="p-3">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xs font-medium mb-1 h-8 overflow-hidden line-clamp-2 group-hover:text-pink-500 transition">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-baseline">
                      <span className="text-red-600 font-semibold text-sm mr-1">{formatPrice(product.price)}đ</span>
                      
                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-400 text-[11px] line-through">{formatPrice(product.originalPrice)}đ</span>
                          <span className="ml-1 bg-red-600 text-white text-[10px] px-1 rounded">
                            -{product.discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Gift info */}
                    {product.gifts && product.gifts.length > 0 && (
                      <div className="mt-1 border border-red-200 rounded p-1 bg-red-50">
                        <div className="flex items-center">
                          <span className="text-red-500 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          </span>
                          <span className="text-[10px] text-red-500 line-clamp-1">
                            {`${product.gifts.length} quà tặng kèm`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 mb-11 flex justify-center">
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-6 h-6 flex items-center justify-center text-xs rounded ${
                        currentPage === index + 1
                          ? "bg-pink-500 text-white"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
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

      <Footer />
    </div>
  );
};

export default ProductPage;