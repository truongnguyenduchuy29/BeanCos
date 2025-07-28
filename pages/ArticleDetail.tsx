import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import pageData from '../db/page.json';
import productData from '../db/product.json';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface Section {
  title?: string;
  content?: string;
  subsections?: Array<{
    title: string;
    content: string;
    layers?: string[];
    products?: Array<{
      name: string;
      price: string;
      image: string;
      description: string;
      url: string;
    }>;
  }>;
}

interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  sections: Section[];
  conclusion: string;
  tags: string[];
  relatedArticles?: Array<{
    id: string;
    title: string;
    image: string;
    date: string;
    url: string;
  }>;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  imageUrl: string;
  description: string;
  brand: string;
  category: string;
  origin: string;
  type: string;
  skinType: string;
  volume: string;
  ingredients: string[];
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: '',
  });

  useEffect(() => {
    // Find the article by ID
    const foundArticle = (pageData as Article[]).find(
      (article) => article.id === id
    );
    setArticle(foundArticle || null);

    // Set related articles (all articles except current one)
    const allArticles = pageData as Article[];
    const related = allArticles.filter((art) => art.id !== id);
    setRelatedArticles(related);

    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Load mock comments for demo
    setComments([
      {
        id: '1',
        name: 'Nguyễn Thị Lan',
        email: 'lan@example.com',
        content:
          'Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ kiến thức về skincare.',
        date: '13/07/2023',
      },
      {
        id: '2',
        name: 'Trần Văn Nam',
        email: 'nam@example.com',
        content:
          'Mình đã thử các sản phẩm được giới thiệu và thấy hiệu quả rất tốt.',
        date: '14/07/2023',
      },
    ]);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.email && newComment.content) {
      const comment: Comment = {
        id: Date.now().toString(),
        name: newComment.name,
        email: newComment.email,
        content: newComment.content,
        date: new Date().toLocaleDateString('vi-VN'),
      };
      setComments([...comments, comment]);
      setNewComment({ name: '', email: '', content: '' });
    }
  };

  if (!article) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="mx-auto px-4 py-8" style={{ maxWidth: '1230px' }}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Bài viết không tồn tại
            </h1>
            <Link
              to="/news"
              className="text-pink-500 hover:text-pink-600 underline"
            >
              Quay lại trang tin tức
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderSection = (section: Section, index: number) => {
    return (
      <div key={index} className="mb-10">
        {section.title && (
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-1 h-8 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {section.title}
            </h2>
          </div>
        )}
        {section.content && (
          <p className="text-gray-700 mb-6 leading-relaxed text-lg bg-gray-50 p-6 rounded-xl border-l-4 border-pink-400">
            {section.content}
          </p>
        )}

        {section.subsections &&
          section.subsections.map((subsection, subIndex: number) => (
            <div
              key={subIndex}
              className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start mb-4">
                <div className="bg-pink-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {subsection.content}
                  </p>
                </div>
              </div>

              {subsection.layers && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Chi tiết:
                  </h4>
                  <ul className="space-y-3">
                    {subsection.layers.map(
                      (layer: string, layerIndex: number) => (
                        <li key={layerIndex} className="flex items-start">
                          <div className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{layer}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {subsection.products && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 text-pink-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15a1 1 0 102 0v-3a1 1 0 10-2 0v3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sản phẩm được đề xuất
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subsection.products.map(
                      (product, productIndex: number) => {
                        // Tìm sản phẩm thật trong database
                        const productDatabase = productData as {
                          products: Product[];
                        };
                        const realProduct =
                          productDatabase.products.find(
                            (p: Product) =>
                              (p.name.toLowerCase().includes('la roche') &&
                                productIndex === 0) ||
                              (p.name.toLowerCase().includes('some by mi') &&
                                productIndex === 1) ||
                              (p.name.toLowerCase().includes('bioderma') &&
                                productIndex === 2) ||
                              (p.name.toLowerCase().includes('kiehl') &&
                                productIndex === 3)
                          ) ||
                          productDatabase.products[productIndex] ||
                          product;

                        return (
                          <Link
                            key={productIndex}
                            to={`/product/${
                              realProduct.id || productIndex + 1
                            }`}
                            className="group bg-white border-2 border-transparent rounded-xl p-5 hover:border-pink-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="relative flex-shrink-0">
                                <img
                                  src={realProduct.imageUrl || product.image}
                                  alt={realProduct.name || product.name}
                                  className="w-20 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      '/src/img/da-dau-mun-nen-dung-my-pham-nao.webp';
                                  }}
                                />
                                {realProduct.discount > 0 && (
                                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -{realProduct.discount}%
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                  {realProduct.name || product.name}
                                </h5>
                                <div className="flex items-center mb-2">
                                  <span className="text-pink-600 font-bold text-lg">
                                    {realProduct.price
                                      ? `${realProduct.price.toLocaleString()}₫`
                                      : product.price}
                                  </span>
                                  {realProduct.originalPrice &&
                                    realProduct.originalPrice >
                                      realProduct.price && (
                                      <span className="text-gray-400 text-sm line-through ml-2">
                                        {realProduct.originalPrice.toLocaleString()}
                                        ₫
                                      </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                                  {realProduct.description ||
                                    product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                                      {realProduct.brand || 'Skincare'}
                                    </span>
                                  </div>
                                  <button className="text-pink-500 text-xs font-medium hover:text-pink-600 transition-colors">
                                    Xem chi tiết →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="mx-auto px-4" style={{ maxWidth: '1230px' }}>
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-500">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link to="/news" className="text-gray-600 hover:text-pink-500">
              Tin tức
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-blue-500 truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto px-4 py-8" style={{ maxWidth: '1230px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Article Header */}
              <div className="relative">
                <img
                  src={article.image ? (article.image.startsWith('/img/') ? article.image : article.image.replace('/src/img/', '/img/')) : '/img/da-dau-mun-nen-dung-my-pham-nao.webp'}
                  alt={article.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {article.date}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-white drop-shadow-lg">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-white/90">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {article.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm">
                        Tác giả:{' '}
                        <span className="font-medium">{article.author}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                {/* Article Sections */}
                {article.sections.map((section, index) =>
                  renderSection(section, index)
                )}

                {/* Conclusion */}
                {article.conclusion && (
                  <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3 mr-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Kết luận
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      {article.conclusion}
                    </p>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 font-bold text-lg">
                        Chia sẻ bài viết:
                      </span>
                      <div className="flex space-x-3">
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                          <span>Facebook</span>
                        </button>
                        <button className="bg-gradient-to-r from-sky-400 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-sky-500 hover:to-sky-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                          <span>Twitter</span>
                        </button>
                        <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Copy Link</span>
                        </button>
                      </div>
                    </div>
                    <Link
                      to="/news"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      <span>Quay lại tin tức</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-12">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-1 h-10 rounded-full mr-4"></div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Bình luận ({comments.length})
                </h3>
              </div>

              {/* Comment Form */}
              <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50 rounded-2xl shadow-xl border-2 border-pink-100 p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800">
                    Để lại bình luận của bạn
                  </h4>
                </div>
                <form onSubmit={handleCommentSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={newComment.name}
                        onChange={(e) =>
                          setNewComment({ ...newComment, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/80"
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={newComment.email}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/80"
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Nội dung bình luận *
                    </label>
                    <textarea
                      id="content"
                      required
                      rows={5}
                      value={newComment.content}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          content: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all duration-300 bg-white/80"
                      placeholder="Chia sẻ ý kiến của bạn về bài viết..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span>Gửi bình luận</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Comments List */}
              {comments.length > 0 && (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {comment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-bold text-gray-800 text-lg">
                              {comment.name}
                            </h5>
                            <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {comment.date}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-4 bg-gray-50 p-4 rounded-xl">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4">
                            <button className="text-pink-500 text-sm font-bold hover:text-pink-600 transition-colors flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              <span>Trả lời</span>
                            </button>
                            <button className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              <span>Thích</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {comments.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-600 mb-2">
                    Chưa có bình luận nào
                  </h4>
                  <p className="text-gray-500 text-lg">
                    Hãy là người đầu tiên chia sẻ ý kiến về bài viết này!
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        document.getElementById('content')?.focus()
                      }
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Viết bình luận đầu tiên
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Navigation Menu */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl shadow-lg p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-5 text-center text-lg">
                DANH MỤC
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="flex items-center text-gray-700 hover:text-pink-500 text-sm transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/50"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex items-center text-gray-700 hover:text-pink-500 text-sm transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/50"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/50 transition-all duration-300">
                    <Link
                      to="/products"
                      className="flex items-center text-gray-700 hover:text-pink-500 text-sm transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                        />
                      </svg>
                      Sản phẩm
                    </Link>
                    <span className="text-gray-400 text-lg font-bold">+</span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="flex items-center text-pink-500 text-sm font-bold py-2 px-3 rounded-lg bg-white/70 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routine"
                    className="flex items-center text-gray-700 hover:text-pink-500 text-sm transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/50"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    Routine Skincare
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center text-gray-700 hover:text-pink-500 text-sm transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/50"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured News Section */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl shadow-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-4 text-center">
                TIN TỨC NỔI BẬT
              </h3>
              <div className="space-y-4">
                {relatedArticles
                  .slice(0, 4)
                  .map((article: Article, index: number) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="block hover:bg-white/50 rounded-lg p-2 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              index === 0
                                ? '/src/img/da-dau-mun-nen-dung-my-pham-nao.webp'
                                : index === 1
                                ? '/src/img/treatment-la-gi-cac-hoat-chat-dieu-tri-mun.webp'
                                : index === 2
                                ? '/src/img/purging-la-gi-nen-lam-gi-khi-da-bi.webp'
                                : '/src/img/toner-la-gi-su-khac-nhau-giua-lotion.webp'
                            }
                            alt={article.title}
                            className="w-16 h-12 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/src/img/da-dau-mun-nen-dung-my-pham-nao.webp';
                            }}
                          />
                          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-tl-lg rounded-br-lg font-bold">
                            12/07/2023
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors leading-tight">
                            {index === 0
                              ? 'Da dầu mụn và mỹ phẩm dành cho da dầu và mụn'
                              : index === 1
                              ? 'Treatment là gì? các hoạt chất điều trị mụn, nám,...'
                              : index === 2
                              ? 'Purging là gì? Nên làm gì khi da bị purging?'
                              : 'Toner là gì? Sự khác nhau giữa Lotion và...'}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {index === 0
                              ? 'Da dầu mụn và mỹ phẩm dành cho da dầu và mụn'
                              : index === 1
                              ? '1. Khái niệm 1.1 Toner Toner hay còn gọi là nước cân bằng da, còn ở Phương Tây...'
                              : index === 2
                              ? '1. Da dầu là gì? Da dầu là loại da có bề mặt da bóng loáng, lỗ chân...'
                              : '1. Da khô là gì? Da khô là tình trạng da bị thiếu nước, da trở nên...'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
