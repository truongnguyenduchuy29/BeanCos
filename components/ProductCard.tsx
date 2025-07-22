import React from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  brand?: string;
  tags?: string[];
  gift?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
  onBuyNow?: () => void;
  onToggleWishlist?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onBuyNow, onToggleWishlist }) => {
  const { addToWishlist, removeFromWishlist, addToCart, isInWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onToggleWishlist) {
      onToggleWishlist();
    } else {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onBuyNow) {
      onBuyNow();
    } else {
      addToCart(product);
    }
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView();
    }
    // If no onQuickView prop, do nothing - could add default behavior here if needed
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative pb-[100%] overflow-hidden">
        {product.brand && (
          <div className="absolute top-2 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded z-10">
            {product.brand}
          </div>
        )}
        
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
          } shadow-sm`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {product.tags && product.tags.length > 0 && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-medium ${
                  tag === 'EXCLUSIVE' ? 'bg-blue-600 text-white' : 
                  tag === 'BEST SELLER' ? 'bg-red-500 text-white' : 
                  'bg-yellow-500 text-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button - appears on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickView}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </button>
            
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 mb-3 flex-wrap">
          <span className="text-lg font-bold text-red-500">{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
              {product.discount && (
                <span className="text-sm text-red-500 font-semibold">{product.discount}</span>
              )}
            </>
          )}
        </div>
        
        {product.gift && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded mt-2">
            🎁 {product.gift}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;