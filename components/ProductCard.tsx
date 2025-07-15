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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative">
        {product.brand && (
          <div className="absolute top-2 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded z-10">
            {product.brand}
          </div>
        )}
        
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.tags && (
          <div className="absolute bottom-2 left-2 flex space-x-1">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded font-semibold ${
                  tag === 'EXCLUSIVE' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button - appears on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 hover:bg-pink-600"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-8 md:h-10">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm md:text-lg font-bold text-red-500">{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice}</span>
              <span className="text-xs md:text-sm text-red-500 font-semibold">{product.discount}</span>
            </>
          )}
        </div>
        
        {product.gift && (
          <div className="text-xs text-red-500 bg-red-50 p-1 md:p-2 rounded">
            🎁 {product.gift}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;