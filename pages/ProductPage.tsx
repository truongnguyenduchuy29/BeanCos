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
  const productsPerPage = 8;
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
    setProducts(productData.products);
    setFilteredProducts(productData.products);
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
    <div className="product-page">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="relative rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-0 left-0 p-4">
                <h3 className="text-lg font-semibold text-green-700">{banner.title}</h3>
                {banner.subtitle && <p className="text-sm text-green-700">{banner.subtitle}</p>}
                <button className="mt-2 px-4 py-1 bg-white text-green-700 rounded-full text-sm hover:bg-gray-100 transition">
                  {banner.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Carousel */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">TÌM KIẾM NHIỀU</h2>
        <div className="relative">
          <button 
            onClick={() => scrollBrands('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            &lt;
          </button>
          <div 
            ref={brandsRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex-none w-24 text-center cursor-pointer"
                onClick={() => handleBrandChange(brand.name)}
              >
                <div className={`border ${selectedBrand === brand.name ? 'border-pink-500' : 'border-gray-200'} rounded-lg p-2 mb-2`}>
                  <img 
                    src={brand.imageUrl} 
                    alt={brand.name} 
                    className="w-full h-12 object-contain"
                  />
                </div>
                <p className="text-xs truncate">{brand.name}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollBrands('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Main Content with Sidebar and Products */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 pr-0 lg:pr-6 mb-6 lg:mb-0">
            {/* Categories */}
            <div className="mb-6">
              <div className="bg-purple-100 p-3 rounded-t-lg">
                <h3 className="text-base font-semibold text-purple-900">DANH MỤC SẢN PHẨM</h3>
              </div>
              <div className="border border-gray-200 p-4 rounded-b-lg">
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-3">
                    <button 
                      className={`flex items-center justify-between w-full text-left ${selectedCategory === category ? 'text-pink-500' : 'text-gray-700'}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span>{category}</span>
                      <span className="text-lg">{selectedCategory === category ? '-' : '+'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Types */}
            <div className="mb-6">
              <div className="bg-purple-100 p-3 rounded-t-lg">
                <h3 className="text-base font-semibold text-purple-900">LOẠI SẢN PHẨM</h3>
              </div>
              <div className="border border-gray-200 p-4 rounded-b-lg max-h-60 overflow-y-auto">
                {productTypes.map((type) => (
                  <div key={type} className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={selectedProductType === type}
                      onChange={() => handleProductTypeChange(type)}
                      className="mr-2"
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-gray-700 cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="bg-purple-100 p-3 rounded-t-lg">
                <h3 className="text-base font-semibold text-purple-900">CHỌN MỨC GIÁ</h3>
              </div>
              <div className="border border-gray-200 p-4 rounded-b-lg">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id={`price-${index}`}
                      checked={selectedPriceRange === `${range.min}-${range.max}`}
                      onChange={() => handlePriceRangeChange(`${range.min}-${range.max}`)}
                      className="mr-2"
                    />
                    <label htmlFor={`price-${index}`} className="text-sm text-gray-700 cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <div className="bg-purple-100 p-3 rounded-t-lg">
                <h3 className="text-base font-semibold text-purple-900">THƯƠNG HIỆU</h3>
              </div>
              <div className="border border-gray-200 p-4 rounded-b-lg max-h-60 overflow-y-auto">
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skin Types */}
            <div className="mb-6">
              <div className="bg-purple-100 p-3 rounded-t-lg">
                <h3 className="text-base font-semibold text-purple-900">LOẠI DA</h3>
              </div>
              <div className="border border-gray-200 p-4 rounded-b-lg">
                {["Da dầu", "Da khô", "Da nhạy cảm", "Da thường", "Da hỗn hợp"].map((skinType) => (
                  <div key={skinType} className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id={`skin-${skinType}`}
                      checked={selectedSkinType === skinType}
                      onChange={() => handleSkinTypeChange(skinType)}
                      className="mr-2"
                    />
                    <label htmlFor={`skin-${skinType}`} className="text-sm text-gray-700 cursor-pointer">
                      {skinType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Top bar with title and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-xl font-semibold uppercase mb-2 sm:mb-0">TẤT CẢ SẢN PHẨM</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sắp xếp:</span>
                <select 
                  value={sortBy} 
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Wishlist button */}
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-pink-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Brand Logo */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="w-14 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <img 
                        src={brands.find(b => b.name === product.brand)?.imageUrl || "/src/img/logo.webp"} 
                        alt={product.brand} 
                        className="max-h-6 max-w-10"
                      />
                    </div>
                  </div>

                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="pt-12 px-4 pb-4">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-44 object-contain"
                      />
                    </div>
                  </Link>

                  {/* Tags (Best Seller, Exclusive) */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-16 left-0">
                      {product.tags.includes("BEST SELLER") && (
                        <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 mb-1">
                          BEST SELLER
                        </span>
                      )}
                      {product.tags.includes("EXCLUSIVE") && (
                        <span className="inline-block bg-blue-800 text-white text-xs px-2 py-1 ml-0">
                          EXCLUSIVE
                        </span>
                      )}
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium mb-2 h-10 overflow-hidden line-clamp-2 group-hover:text-pink-500 transition">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-baseline mb-2">
                      <span className="text-red-600 font-semibold mr-2">{formatPrice(product.price)}đ</span>
                      
                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}đ</span>
                          <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Gift info */}
                    {product.gifts && product.gifts.length > 0 && (
                      <div className="border border-red-300 rounded p-2 bg-red-50 mt-2">
                        <div className="flex items-center">
                          <span className="text-red-500 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          </span>
                          <span className="text-xs text-red-500">
                            {`Có ${product.gifts.length} lựa chọn quà tặng khi mua hàng`}
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
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
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