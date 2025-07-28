import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import pageData from "../db/page.json";

interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  sections: Array<{
    title?: string;
    content?: string;
    subsections?: Array<{
      title: string;
      content: string;
    }>;
  }>;
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

const NewPage = () => {
  const [articles] = useState<Article[]>(pageData as Article[]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [articles]);

  // Get excerpt for any article type
  const getArticleExcerpt = (article: Article): string => {
    return (
      (article.sections && article.sections[0]?.content) ||
      "Nội dung bài viết..."
    );
  };

  // Get image for any article type - convert to public path
  const getArticleImage = (article: Article): string => {
    if (article.image) {
      // If already starts with /img/, return as is
      if (article.image.startsWith('/img/')) {
        return article.image;
      }
      // Convert /src/img/ to /img/ for public folder
      return article.image.replace('/src/img/', '/img/');
    }
    return "/img/da-dau-mun-nen-dung-my-pham-nao.webp";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="mx-auto px-4" style={{ maxWidth: "1230px" }}>
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-500">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-blue-500">Tin tức</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto px-4 py-8" style={{ maxWidth: "1230px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">TIN TỨC</h1>
              <div className="w-16 h-1 bg-pink-500"></div>
            </div>

            {/* Main Articles Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Featured Article - Left Side */}
              {articles.length > 0 && (
                <Link 
                  to={`/article/${articles[0].id}`}
                  className="relative bg-white rounded-lg shadow-md overflow-hidden block hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={getArticleImage(articles[0])}
                      alt={articles[0].title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                        Thứ Tư, 12/07/2023
                      </div>
                      <h2 className="text-lg font-bold mb-2 leading-tight">
                        {articles[0].title}
                      </h2>
                      <h3 className="text-sm font-medium mb-1">
                        {getArticleExcerpt(articles[0]).substring(0, 50)}...
                      </h3>
                      <p className="text-xs opacity-90">
                        {getArticleExcerpt(articles[0]).substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Right Side Articles Grid */}
              <div className="grid grid-cols-1 gap-4">
                {articles.slice(1, 3).map((article: Article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex"
                  >
                    <div className="relative w-24 h-20 flex-shrink-0">
                      <img
                        src={getArticleImage(article)}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1">
                        <div className="bg-blue-500 text-white px-1 py-0.5 rounded text-xs font-medium">
                          {article.date}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1 text-xs leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {getArticleExcerpt(article)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {articles.slice(3).map((article: Article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  <div className="relative">
                    <img
                      src={getArticleImage(article)}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {article.date || "12/07/2023"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                      {getArticleExcerpt(article)}
                    </p>
                    <span className="text-xs text-black font-medium border-b border-black hover:text-pink-500 hover:border-pink-500 transition-colors">
                      Đọc tiếp
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Navigation Menu */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">DANH MỤC</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-pink-500 text-sm transition-colors"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-pink-500 text-sm transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/products"
                      className="text-gray-700 hover:text-pink-500 text-sm transition-colors"
                    >
                      Sản phẩm
                    </Link>
                    <span className="text-gray-400">+</span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-pink-500 text-sm font-medium"
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routine"
                    className="text-gray-700 hover:text-pink-500 text-sm transition-colors"
                  >
                    Routine Skincare
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-pink-500 text-sm transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Latest News */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-4">TIN TỨC NỔI BẬT</h3>
              <div className="space-y-4">
                {articles.slice(0, 4).map((article: Article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="flex items-start space-x-3 hover:bg-white hover:bg-opacity-50 p-2 rounded transition-colors"
                  >
                    <img
                      src={getArticleImage(article)}
                      alt={article.title}
                      className="w-16 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {article.date}
                      </p>
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

export default NewPage;
