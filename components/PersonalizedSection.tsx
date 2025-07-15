import React, { useState } from 'react';
import ProductCard from './ProductCard';

const PersonalizedSection = () => {
  const [activeTab, setActiveTab] = useState('cleanser');

  const tabs = [
    { id: 'cleanser', label: 'TẨY TRANG', active: true },
    { id: 'face-wash', label: 'SỮA RỬA MẶT' },
    { id: 'toner', label: 'TONER' },
  ];

  const products = [
    {
      id: 6,
      name: 'Tẩy trang SVR Sebiaclear Eau Micellaire sạch sâu',
      price: '395.000₫',
      originalPrice: '450.000₫',
      discount: '-13%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'SVR',
      tags: ['BEST SELLER']
    },
    {
      id: 7,
      name: 'Tẩy trang sạch sâu La Roche Posay Effaclar Micellar Water',
      price: '395.000₫',
      originalPrice: '450.000₫',
      discount: '-13%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'La Roche-Posay',
      tags: ['EXCLUSIVE', 'BEST SELLER']
    },
    {
      id: 8,
      name: "L'Oreal Paris 3in1 Micellar Water Tím",
      price: '195.000₫',
      originalPrice: '240.000₫',
      discount: '-19%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: "L'OREAL"
    },
    {
      id: 9,
      name: 'Dầu tẩy trang Hada Labo Advanced Nourish Hyaluronic...',
      price: '170.000₫',
      originalPrice: '205.000₫',
      discount: '-17%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 10,
      name: 'Tẩy trang bioderma Sensibio H2O Solution Micellaire dịu nhẹ',
      price: '160.000₫',
      originalPrice: '190.000₫',
      discount: '-16%',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'BIODERMA',
      tags: ['BEST SELLER']
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-500 mb-4">DÀNH RIÊNG CHO BẠN</h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500'
                } whitespace-nowrap`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors">
            Xem sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSection;