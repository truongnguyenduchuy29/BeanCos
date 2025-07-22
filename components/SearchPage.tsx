import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const { setSearchQuery } = useAppContext();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data - in real app, this would come from API
  const allProducts = useMemo(() => [
    {
      id: 1,
      name: 'Tinh chất sáng da Serum Vichy Liftactiv Specialist',
      price: '1.275.000₫',
      originalPrice: '1.310.000₫',
      discount: '-3%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'VICHY',
      tags: ['EXCLUSIVE'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng'
    },
    {
      id: 2,
      name: 'Tẩy da chết vật lý Bioderma Sebium Gel Gommant',
      price: '390.000₫',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'BIODERMA',
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng'
    },
    {
      id: 3,
      name: "Tẩy da chết Paula's Choice Skin Perfecting Gel Exfoliant",
      price: '339.000₫',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: "PAULA'S CHOICE",
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 3 lựa chọn quà tặng khi mua hàng'
    },
    {
      id: 4,
      name: 'Simple Smoothing Facial Scrub',
      price: '75.000₫',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'SIMPLE',
      tags: ['BEST SELLER'],
      gift: 'Có 2 lựa chọn quà tặng khi mua hàng'
    },
    {
      id: 5,
      name: 'Tinh chất La Roche-Posay Hyalu B5 Serum phục hồi da',
      price: '770.000₫',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'LA ROCHE-POSAY',
      tags: ['EXCLUSIVE', 'BEST SELLER'],
      gift: 'Có 1 lựa chọn quà tặng khi mua hàng'
    },
  ], []);

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    setLocalSearchQuery(query);
    setSearchQuery(query);
  }, [setSearchQuery]);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by search query
    if (localSearchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(localSearchQuery.toLowerCase()))
      );
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace(/[^\d]/g, ''));
        switch (priceRange) {
          case 'under-100k':
            return price < 100000;
          case '100k-500k':
            return price >= 100000 && price <= 500000;
          case '500k-1m':
            return price >= 500000 && price <= 1000000;
          case 'over-1m':
            return price > 1000000;
          default:
            return true;
        }
      });
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [localSearchQuery, sortBy, priceRange, selectedBrand, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    // Update URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('q', localSearchQuery);
    window.history.pushState({}, '', newUrl.toString());
  };

  const brands = ['VICHY', 'BIODERMA', "PAULA'S CHOICE", 'SIMPLE', 'LA ROCHE-POSAY'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500">
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Bộ lọc
            </button>
          </form>
          
          {localSearchQuery && (
            <p className="text-gray-600">
              Kết quả tìm kiếm cho "<span className="font-semibold">{localSearchQuery}</span>": 
              <span className="font-semibold text-pink-500 ml-1">{filteredProducts.length} sản phẩm</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Bộ lọc
              </h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sắp xếp theo
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="name">Tên A-Z</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="all">Tất cả</option>
                  <option value="under-100k">Dưới 100.000₫</option>
                  <option value="100k-500k">100.000₫ - 500.000₫</option>
                  <option value="500k-1m">500.000₫ - 1.000.000₫</option>
                  <option value="over-1m">Trên 1.000.000₫</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thương hiệu
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="all">Tất cả thương hiệu</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSortBy('default');
                  setPriceRange('all');
                  setSelectedBrand('all');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="text-gray-500 mb-6">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
                <button
                  onClick={() => {
                    setLocalSearchQuery('');
                    setSearchQuery('');
                    setSortBy('default');
                    setPriceRange('all');
                    setSelectedBrand('all');
                  }}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;