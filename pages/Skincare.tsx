import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import productData from '../db/product.json';
import { useAppContext } from '../context/AppContext';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  brand?: string;
}

// Interface phù hợp với loại dữ liệu cart item trong AppContext
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  brand?: string;
  quantity: number;
}

const Skincare: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tẩy trang');
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number[]>>({
    'Tẩy trang': [],
    'Sữa rửa mặt': [],
    'Toner': [],
    'Serum': [],
    'Treatment': [],
    'Kem dưỡng da': []
  });
  
  // Lưu trữ các sản phẩm theo danh mục để tính tổng tiền
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({
    'Tẩy trang': [],
    'Sữa rửa mặt': [],
    'Toner': [],
    'Serum': [],
    'Treatment': [],
    'Kem dưỡng da': []
  });
  
  // Lưu trữ tổng tiền chung cho tất cả danh mục
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Categories based on the images
  const categories = [
    { 
      id: 1, 
      name: 'Tẩy trang', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_1.jpg?1753153721916' 
    },
    { 
      id: 2, 
      name: 'Sữa rửa mặt', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_2.jpg?1753153721916' 
    },
    { 
      id: 3, 
      name: 'Toner', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_3.jpg?1753153721916' 
    },
    { 
      id: 4, 
      name: 'Serum', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_4.jpg?1753153721916' 
    },
    { 
      id: 5, 
      name: 'Treatment', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_5.jpg?1753153721916' 
    },
    { 
      id: 6, 
      name: 'Kem dưỡng da', 
      imageUrl: 'https://bizweb.dktcdn.net/100/490/275/themes/913829/assets/skin_danhmuc_6.jpg?1753153721916' 
    },
  ];
  
  // Hàm để lấy sản phẩm ngẫu nhiên từ các danh mục khác cho Treatment
  const getRandomProductsForTreatment = () => {
    const otherCategories = ['Tẩy trang', 'Sữa rửa mặt', 'Toner', 'Serum', 'Kem dưỡng da'];
    const allProducts = productData.products;
    const treatmentProducts: Product[] = [];
    
    // Chọn ngẫu nhiên 4 sản phẩm từ các danh mục khác
    for (let i = 0; i < 4; i++) {
      // Chọn ngẫu nhiên một danh mục
      const randomCategoryIndex = Math.floor(Math.random() * otherCategories.length);
      const randomCategory = otherCategories[randomCategoryIndex];
      
      // Lọc các sản phẩm thuộc danh mục đã chọn
      const categoryProducts = allProducts.filter(p => p.category === randomCategory);
      
      if (categoryProducts.length > 0) {
        // Chọn ngẫu nhiên một sản phẩm từ danh mục đó
        const randomProductIndex = Math.floor(Math.random() * categoryProducts.length);
        const randomProduct = categoryProducts[randomProductIndex];
        
        // Thêm vào danh sách sản phẩm Treatment và đảm bảo không trùng lặp
        if (!treatmentProducts.some(p => p.id === randomProduct.id)) {
          treatmentProducts.push(randomProduct);
        }
      }
    }
    
    // Đảm bảo có đủ 4 sản phẩm
    while (treatmentProducts.length < 4 && allProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const randomProduct = allProducts[randomIndex];
      
      if (!treatmentProducts.some(p => p.id === randomProduct.id)) {
        treatmentProducts.push(randomProduct);
      }
    }
    
    return treatmentProducts;
  };

  // Tải và lưu trữ sản phẩm cho tất cả các danh mục khi component khởi tạo
  useEffect(() => {
    const allProducts = productData.products;
    const productsMap: Record<string, Product[]> = {
      'Tẩy trang': [],
      'Sữa rửa mặt': [],
      'Toner': [],
      'Serum': [],
      'Treatment': [],
      'Kem dưỡng da': []
    };
    
    // Lấy sản phẩm cho các danh mục thông thường
    categories.forEach(category => {
      if (category.name !== 'Treatment') {
        productsMap[category.name] = allProducts
          .filter(product => product.category === category.name)
          .slice(0, 4); // Chỉ lấy tối đa 4 sản phẩm cho mỗi danh mục
      }
    });
    
    // Lấy sản phẩm ngẫu nhiên cho danh mục Treatment
    productsMap['Treatment'] = getRandomProductsForTreatment();
    
    setProductsByCategory(productsMap);
    
    // Set sản phẩm cho danh mục hiện tại
    setProducts(productsMap[selectedCategory] || []);
  }, []);

  // Cập nhật sản phẩm khi chuyển danh mục
  useEffect(() => {
    setProducts(productsByCategory[selectedCategory] || []);
  }, [selectedCategory, productsByCategory]);
  
  // Tính toán tổng tiền dựa trên tất cả sản phẩm được chọn từ tất cả danh mục
  useEffect(() => {
    let total = 0;
    
    // Duyệt qua tất cả các danh mục
    Object.keys(selectedProducts).forEach(category => {
      const selectedIds = selectedProducts[category];
      const categoryProducts = productsByCategory[category] || [];
      
      // Cộng dồn giá tiền của các sản phẩm được chọn trong danh mục
      selectedIds.forEach(id => {
        const product = categoryProducts.find(p => p.id === id);
        if (product) {
          total += product.price;
        }
      });
    });
    
    setTotalPrice(total);
  }, [selectedProducts, productsByCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) => {
      const currentSelected = [...prev[selectedCategory]];
      const index = currentSelected.indexOf(productId);
      
      if (index !== -1) {
        currentSelected.splice(index, 1);
      } else {
        currentSelected.push(productId);
      }
      
      return {
        ...prev,
        [selectedCategory]: currentSelected
      };
    });
  };

  // Navigate to product page with category filter
  const navigateToProductPage = (category: string = selectedCategory) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Add all selected products to cart from all categories
  const handleAddToCart = () => {
    // Lấy tất cả sản phẩm đã chọn từ tất cả danh mục
    let allSelectedProducts: Product[] = [];
    
    Object.keys(selectedProducts).forEach(category => {
      const selectedIds = selectedProducts[category];
      const categoryProducts = productsByCategory[category] || [];
      
      const selected = categoryProducts.filter(product => selectedIds.includes(product.id));
      allSelectedProducts = [...allSelectedProducts, ...selected];
    });
    
    // Thêm tất cả sản phẩm vào giỏ hàng
    allSelectedProducts.forEach(product => {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: `${product.price.toLocaleString()}₫`,
        image: product.imageUrl,
        brand: product.brand,
        quantity: 1
      };
      addToCart(cartItem);
    });
    
    // Xóa tất cả sản phẩm đã chọn
    const resetSelected: Record<string, number[]> = {};
    Object.keys(selectedProducts).forEach(category => {
      resetSelected[category] = [];
    });
    
    setSelectedProducts(resetSelected);
    setTotalPrice(0);
    
    // Navigate to cart page
    navigate('/cart');
  };

  return (
    <div className="bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <Link to="/" className="hover:text-pink-500 transition-colors">Trang chủ</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-pink-500">Routine Skincare</span>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all
                ${selectedCategory === category.name 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-800 hover:text-purple-900'}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="w-16 h-16 mb-2 rounded-full overflow-hidden">
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center font-medium">{category.name}</div>
            </div>
          ))}
        </div>
        
        <hr className="border-dashed border-gray-300 my-8" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Full width background panel with centered category title */}
            <div className="bg-purple-100 p-4 mb-4 rounded-lg">
              <div className="flex justify-center">
                <span 
                  className="px-6 py-1 bg-blue-100 text-blue-600 font-bold rounded-md cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => navigateToProductPage()}
                >
                  {selectedCategory}
                </span>
              </div>
            </div>
            
            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-md p-4 flex items-start bg-white">
                    <div className="flex-shrink-0 mr-2">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-pink-500"
                        checked={selectedProducts[selectedCategory]?.includes(product.id) || false}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                    </div>
                    <div 
                      className="flex-shrink-0 w-20 h-20 border rounded overflow-hidden cursor-pointer"
                      onClick={() => navigateToProductPage()}
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 
                        className="font-medium text-gray-800 mb-1 text-sm cursor-pointer hover:text-pink-500"
                        onClick={() => navigateToProductPage()}
                      >
                        {product.name}
                      </h3>
                      <p className="text-pink-500 font-medium">{product.price.toLocaleString()}₫</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Không có sản phẩm nào trong danh mục này.
                </div>
              )}
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="w-full lg:w-1/4">
            <div className="bg-purple-100 rounded-lg p-4 text-center sticky top-4">
              <div className="font-medium text-xl mb-2">Tổng tiền</div>
              <div className="text-pink-500 font-medium text-xl mb-4">
                {totalPrice > 0 ? totalPrice.toLocaleString() : 0}₫
              </div>
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors w-full"
                disabled={totalPrice === 0}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Skincare;
