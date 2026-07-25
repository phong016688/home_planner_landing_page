import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, User, Tag, Sparkles, QrCode, BookOpen, Download } from 'lucide-react';
import { ARTICLES } from '../content/articles';
import { translations, type Language } from '../content/i18n';

const HOME_APP_STORE_URL = 'https://apps.apple.com/us/app/home-planner-ai/id6751722422';
const HOME_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.mentos_koder.homedecorai';

const HomeStoreButtons = () => (
  <div className="flex gap-2 shrink-0">
    <a href={HOME_APP_STORE_URL} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-full bg-stone-950 text-white text-xs font-extrabold">App Store</a>
    <a href={HOME_PLAY_STORE_URL} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-full border border-stone-300 bg-white text-stone-900 text-xs font-extrabold">Google Play</a>
  </div>
);

// --- Articles Index Page Component ---
export const ArticlesIndexView = ({ lang, onOpenDownload }: { lang: Language; onOpenDownload: () => void }) => {
  const _t = translations[lang] || translations.vi;
  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200 rounded-full">
          <BookOpen className="w-3.5 h-3.5" /> Kiến Thức & Hướng Dẫn Thiết Kế AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Cẩm Nang Interior & Exterior AI
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Khám phá các bài viết chuyên sâu về công nghệ thiết kế không gian sống, giải pháp cải tạo nhà cửa, thiết kế góc thú cưng và mẹo ứng dụng AI cho ngôi nhà mơ ước.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {ARTICLES.map((article, idx) => (
          <motion.article 
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col hover:border-blue-500 hover:shadow-xl transition-all group"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img 
                src={article.image} 
                alt={article.title} 
                onError={(event) => {
                  event.currentTarget.src = '/hero_room_redesign.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-stone-400 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {article.readTime}</span>
                </div>

                <h2 className="text-xl font-black text-stone-900 group-hover:text-blue-600 transition-colors leading-snug">
                  <Link to={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Keywords & Read Button */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      #{kw}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/articles/${article.slug}`} 
                  className="text-xs font-extrabold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0 ml-2"
                >
                  Đọc Tiếp &rarr;
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Download App CTA Banner */}
      <div className="mt-16 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-stone-700">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
            <Sparkles className="w-4 h-4 fill-current" /> Dùng Thử Miễn Phí Trên Điện Thoại
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">Biến Ý Tưởng Thiết Kế Thành Hiện Thực Với AI</h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg">Tải ngay ứng dụng Home Planner AI trên iOS và Android để trải nghiệm thiết kế phòng, thay màu sơn ngoại thất và tạo góc nuôi thú cưng chỉ trong 10 giây.</p>
        </div>

        <HomeStoreButtons />
      </div>
    </div>
  );
};

// --- Single Article Detail Page Component ---
export const ArticleDetailView = ({ lang, onOpenDownload }: { lang: Language; onOpenDownload: () => void }) => {
  const _t = translations[lang] || translations.vi;
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-black text-stone-900">Bài viết không tồn tại</h2>
        <p className="text-xs text-stone-500">Bài viết bạn tìm kiếm có thể đã bị đổi tên hoặc không khả dụng.</p>
        <Link to="/articles" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
          <ArrowLeft size={16} /> Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  const otherArticles = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Back Button */}
      <Link to="/articles" className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ArrowLeft size={16} /> Tất cả bài viết
      </Link>

      <article className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Article Metadata & Header */}
        <div className="space-y-4 border-b border-stone-100 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-blue-50 text-blue-600 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-[10px] border border-blue-200">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-stone-400"><Calendar size={13} /> {article.date}</span>
            <span className="flex items-center gap-1 text-stone-400"><Clock size={13} /> {article.readTime}</span>
            <span className="flex items-center gap-1 text-stone-400"><User size={13} /> {article.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed italic font-medium bg-stone-50 p-4 rounded-2xl border border-stone-100">
            "{article.excerpt}"
          </p>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-200 shadow-md">
          <img
            src={article.image}
            alt={article.title}
            onError={(event) => {
              event.currentTarget.src = '/hero_room_redesign.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article HTML Content */}
        <div 
          className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-stone-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-stone-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Tags */}
        <div className="pt-8 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-400 flex items-center gap-1"><Tag size={13} /> Từ khóa:</span>
          {article.keywords.map((kw, i) => (
            <span key={i} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              #{kw}
            </span>
          ))}
        </div>

        {/* Download App In-Article Card */}
        <div className="bg-blue-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-black">Thử Ngay Với Ảnh Phòng Của Bạn!</h4>
            <p className="text-xs text-blue-100">Tải ứng dụng Home Planner AI hoàn toàn miễn phí trên iOS & Android.</p>
          </div>
          <HomeStoreButtons />
        </div>
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <div className="mt-16 space-y-6">
          <h3 className="text-2xl font-black text-stone-900">Bài viết liên quan</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherArticles.map((rel) => (
              <div key={rel.slug} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3 hover:border-blue-500 transition-all">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">{rel.category}</span>
                <h4 className="font-extrabold text-base text-stone-900 hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to={`/articles/${rel.slug}`}>{rel.title}</Link>
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2">{rel.excerpt}</p>
                <Link to={`/articles/${rel.slug}`} className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  Xem chi tiết &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
