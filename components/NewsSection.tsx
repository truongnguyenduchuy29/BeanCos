const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Da dầu mụn và mỹ phẩm dành cho da dầu và mụn",
      excerpt:
        "1. DA CỦA CHÚNG TA CÓ CẤU TẠO NHƯ THẾ NÀO NHỈ ? Da gồm 3 lớp...",
      date: "12.07.2023",
      image: "../src/img/da-dau-mun-nen-dung-my-pham-nao.webp",
      category: "Da Dầu",
    },
    {
      id: 2,
      title: "Treatment là gì? các hoạt chất điều trị mụn, nám, tàn nhang",
      excerpt:
        '1.Treatment là gì ? Các bạn có thể đã google dịch từ "treatment" và ra kết quả...',
      date: "12.07.2023",
      image: "../src/img/treatment-la-gi-cac-hoat-chat-dieu-tri-mun.webp",
      category: "BHA",
      tags: ["Lần đầu dùng", "treatment", "BAN", "cần làm thế nào?"],
    },
    {
      id: 3,
      title: "Purging là gì? Nên làm gì khi da bị purging?",
      excerpt:
        "Purging là hiện tượng xảy ra bình thường trên da khi lần đa có tác động...",
      date: "12.07.2023",
      image: "../../src/img/purging-la-gi-nen-lam-gi-khi-da-bi.webp",
      tags: ["PURGING", "BREAK OUT"],
      beforeAfter: true,
    },
    {
      id: 4,
      title: "Toner là gì? Sự khác nhau giữa Lotion và Nước Hoa Hồng?",
      excerpt:
        "1. Khái niệm 1.1 Toner toner hay còn gọi là nước cân bằng da, còn ở Phương Tây...",
      date: "12.07.2023",
      image: "../src/img/toner-la-gi-su-khac-nhau-giua-lotion.webp",
      category: "LOTION",
      subtitle: "CÁCH PHÂN BIỆT",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-[1223px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">TIN NỔI BẬT</h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.date}
                  </div>
                </div>

                {item.category && (
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.category === "BHA"
                          ? "bg-red-500 text-white"
                          : item.category === "LOTION"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                )}

                {item.tags && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          tag === "PURGING"
                            ? "bg-green-600 text-white"
                            : tag === "BREAK OUT"
                            ? "bg-red-600 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.beforeAfter && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="w-12 h-8 bg-white rounded border-2 border-gray-300"></div>
                    <div className="w-12 h-8 bg-white rounded border-2 border-gray-300"></div>
                  </div>
                )}
              </div>

              <div className="p-4">
                {item.subtitle && (
                  <p className="text-sm text-gray-500 mb-2">{item.subtitle}</p>
                )}
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {item.excerpt}
                </p>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold transition-colors">
                  Đọc tiếp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
