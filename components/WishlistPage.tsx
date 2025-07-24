import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

interface WishlistProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  brand?: string;
  tags?: string[];
}

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  const handleAddToCart = (product: WishlistProduct) => {
    addToCart(product);
    // Navigate to CartPage after adding to cart
    navigate('/cart');
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Sản phẩm yêu thích</h1>
          <span className="ml-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
            {wishlist.length} sản phẩm
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-500 mb-6">
              Hãy thêm những sản phẩm bạn yêu thích để dễ dàng tìm lại sau này
            </p>
            <Link
              to="/products"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  {product.brand && (
                    <div className="absolute top-2 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded z-10">
                      {product.brand}
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-red-500">{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        <span className="text-sm text-red-500 font-semibold">{product.discount}</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Thêm vào giỏ</span>
                  </button>
                  
                  {product.gift && (
                    <div className="text-xs text-red-500 bg-red-50 p-2 rounded mt-2">
                      🎁 {product.gift}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;