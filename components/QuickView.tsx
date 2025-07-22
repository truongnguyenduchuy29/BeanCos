import React from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  category: string;
  volume: string;
  tags: string[];
  gifts?: string[];
}

interface QuickViewProps {
  product: Product;
  onClose: () => void;
  isOpen: boolean;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose, isOpen }) => {
  const { addToCart, addToWishlist, isInWishlist } = useAppContext();
  
  if (!isOpen) return null;
  
  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };
  
  const handleAddToCart = () => {
    // Convert the product object to match the CartItem structure
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined
    };
    
    addToCart(cartProduct);
  };
  
  const handleAddToWishlist = () => {
    // Convert the product object to match the WishlistItem structure
    const wishlistProduct = {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
      discount: product.discount ? `${product.discount}%` : undefined,
      image: product.imageUrl,
      brand: product.brand,
      tags: product.tags,
      gift: product.gifts ? product.gifts[0] : undefined
    };
    
    addToWishlist(wishlistProduct);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full object-contain h-80"
              />
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-2 left-2">
                  {product.tags.includes("BEST SELLER") && (
                    <span className="block bg-red-600 text-white text-xs px-2 py-0.5 mb-0.5 font-medium">
                      BEST SELLER
                    </span>
                  )}
                  {product.tags.includes("EXCLUSIVE") && (
                    <span className="block bg-blue-800 text-white text-xs px-2 py-0.5 font-medium">
                      EXCLUSIVE
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  {product.brand}
                </span>
              </div>
              
              <h2 className="text-xl font-medium mb-2">{product.name}</h2>
              
              <div className="flex items-baseline mb-4">
                <span className="text-2xl font-bold text-red-600 mr-2">
                  {formatPrice(product.price)}
                </span>
                
                {product.discount > 0 && (
                  <>
                    <span className="text-gray-400 text-sm line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex">
                  <span className="text-gray-600 w-24">Danh mục:</span>
                  <span>{product.category}</span>
                </div>
                
                <div className="flex">
                  <span className="text-gray-600 w-24">Dung tích:</span>
                  <span>{product.volume}</span>
                </div>
              </div>
              
              {/* Gifts */}
              {product.gifts && product.gifts.length > 0 && (
                <div className="mb-6 border border-red-200 rounded p-3 bg-red-50">
                  <div className="text-sm font-medium text-red-600 mb-2">
                    🎁 Quà tặng kèm:
                  </div>
                  <ul className="text-sm space-y-1">
                    {product.gifts.map((gift, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{gift}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="mt-auto flex flex-col space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
                
                <button 
                  onClick={handleAddToWishlist}
                  className="w-full border border-pink-500 text-pink-500 py-3 rounded-lg hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Thêm vào yêu thích</span>
                </button>
                
                <Link 
                  to={`/product/${product.id}`}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-center"
                >
                  Xem chi tiết sản phẩm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView; 