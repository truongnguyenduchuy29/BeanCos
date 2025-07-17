import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, addToCart, isInWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
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

        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.tags && (
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
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-1 sm:space-x-2 hover:bg-pink-600 shadow-md text-xs sm:text-sm"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>
      
      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2 line-clamp-2 h-8 sm:h-10">
          {product.name}
        </h3>
        
        <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-sm sm:text-base font-bold text-red-500">{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">{product.originalPrice}</span>
              <span className="text-[10px] sm:text-xs text-red-500 font-semibold">{product.discount}</span>
            </>
          )}
        </div>
        
        {product.gift && (
          <div className="flex flex-col space-y-1">
            <div className="bg-pink-50 text-pink-600 text-[10px] sm:text-xs px-2 py-1 rounded flex items-center">
              <span className="mr-1">🎁</span>
              {product.gift}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;