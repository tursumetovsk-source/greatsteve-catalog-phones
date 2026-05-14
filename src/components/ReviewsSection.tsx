import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import REVIEWS_DATA from '../data/reviews.json';

const REVIEWS = REVIEWS_DATA;

const SOURCE_COLORS: Record<string, string> = {
  Google: 'bg-white text-gray-800 border border-gray-200',
  '2GIS': 'bg-[#1DC761]/10 text-[#1DC761] border border-[#1DC761]/20',
  Yandex: 'bg-[#FC3F1D]/10 text-[#FC3F1D] border border-[#FC3F1D]/20',
};

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="w-[320px] shrink-0 bg-white rounded-[1.5rem] p-6 flex flex-col gap-4 shadow-sm border border-gray-100/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-900 text-[15px]">{review.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
        </div>
        <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${SOURCE_COLORS[review.source]}`}>
          {review.source}
        </span>
      </div>
      <div className="flex gap-0.5">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-600 text-[13.5px] leading-[1.65]">"{review.text}"</p>
    </div>
  );
}

const row1 = [...REVIEWS, ...REVIEWS];
const row2 = [...REVIEWS.slice(3), ...REVIEWS.slice(0, 3), ...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)];

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F7] overflow-hidden">

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-6 max-w-[88rem] mx-auto mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-5"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
            Отзывы реальных людей
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed">
            Мы ценим каждого клиента и гордимся нашей репутацией.
          </p>
        </div>

        {/* Рейтинг */}
        <div className="flex items-center gap-4 self-start md:self-auto shrink-0 bg-white rounded-2xl px-5 py-3.5 md:px-6 md:py-4 shadow-sm border border-gray-100">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">4.9</div>
            <div className="flex gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="w-px h-8 md:h-10 bg-gray-200" />
          <div>
            <div className="text-2xl font-bold text-gray-900">5000+</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">довольных клиентов</div>
          </div>
        </div>
      </motion.div>

      {/* Marquee row 1 — left */}
      <div className="mb-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-4 animate-marquee-left w-max">
          {row1.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      {/* Marquee row 2 — right */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-4 animate-marquee-right w-max">
          {row2.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      {/* Ссылки на платформы */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 md:mt-16 flex flex-col items-center gap-6 px-4"
      >
        <p className="text-gray-500 text-base font-medium">Больше отзывов по ссылкам:</p>
        <div className="flex items-center gap-10 md:gap-16 flex-wrap justify-center">

          {/* Google */}
          <a href="https://maps.app.goo.gl/LpUCFnMLB33Z2JFt5" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 320 80" className="h-8 md:h-10" xmlns="http://www.w3.org/2000/svg" overflow="visible">
              <text fontFamily="Arial, sans-serif" fontWeight="700" fontSize="72" y="66">
                <tspan fill="#4285F4">G</tspan>
                <tspan fill="#EA4335">o</tspan>
                <tspan fill="#FBBC05">o</tspan>
                <tspan fill="#4285F4">g</tspan>
                <tspan fill="#34A853">l</tspan>
                <tspan fill="#EA4335">e</tspan>
              </text>
            </svg>
          </a>

          {/* Яндекс */}
          <a href="https://yandex.kz/maps/ru/-/CPgnIDn0" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 280 60" className="h-8 md:h-10" xmlns="http://www.w3.org/2000/svg" overflow="visible">
              <text fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" y="48" fill="#FC3F1D">Яндекс</text>
            </svg>
          </a>

          {/* 2GIS */}
          <a href="https://2gis.kz/almaty/search/greatsteve" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 120 40" className="h-9 md:h-11" xmlns="http://www.w3.org/2000/svg">
              {/* Green rounded rect background */}
              <rect x="0" y="0" width="40" height="40" rx="10" fill="#1DC761"/>
              {/* White location pin */}
              <circle cx="20" cy="17" r="7" fill="white"/>
              <circle cx="20" cy="17" r="3.5" fill="#1DC761"/>
              <polygon points="20,30 15,21 25,21" fill="white"/>
              {/* 2GIS text */}
              <text x="50" y="30" fontSize="26" fontFamily="Arial, sans-serif" fontWeight="900" fill="#1DC761" letterSpacing="1">2GIS</text>
            </svg>
          </a>

        </div>
      </motion.div>

    </section>
  );
}
