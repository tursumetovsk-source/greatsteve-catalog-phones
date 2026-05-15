import { motion } from 'motion/react';
import { MapPin, Users, Shield, TrendingUp, Star, ArrowUpRight, Sparkle, ArrowRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function AboutBentoSection() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-[88rem] mx-auto">


        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

          {/* Карточка 1 — Большая, с видео и timeline */}
          <motion.div
            {...fade(0.05)}
            className="md:col-span-7 md:row-span-2 rounded-[2rem] overflow-hidden relative min-h-[420px] md:min-h-[520px] group bg-black"
          >
            {/* Фоновое изображение — нижний слой (fallback если видео не загрузится) */}
            <img
              src="/company/store-interior.jpg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              alt="Сервисный центр GreatSteve — офис в Алматы"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Видео поверх изображения с opacity-50 — создаёт эффект наложения */}
            <video
              autoPlay loop muted playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/15" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-center justify-center gap-2">
                <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] text-white/60 font-medium">О компании</span>
                <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
              </div>

              <div>
                <img src="/logo-gs.webp" alt="Greatsteve" className="h-6 md:h-7 w-auto object-contain mb-4 md:mb-6 opacity-60" />

                {/* Timeline */}
                <div className="grid gap-3 mb-6 md:mb-8">
                  {[
                    { year: '2019', role: 'Основание компании',  place: 'Алматы' },
                    { year: '2021', role: 'Расширение команды',  place: 'Greatsteve' },
                    { year: '2023', role: 'Более 2000 ремонтов', place: 'Milestone' },
                    { year: '2025', role: '5000+ ремонтов',      place: 'Сейчас' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3 text-[13px] md:text-[16px]">
                      <span className="text-white/45 font-medium tabular-nums shrink-0">{item.year}</span>
                      <Sparkle className="h-2.5 w-2.5 md:h-3 md:w-3 text-white/30 shrink-0" strokeWidth={1.5} />
                      <span className="text-white/80 font-semibold flex-1 min-w-0 truncate">{item.role}</span>
                      <span className="text-white/35 text-right text-[11px] md:text-[13px] shrink-0 hidden sm:block">{item.place}</span>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="liquid-glass inline-flex items-center gap-2 text-white/80 text-sm md:text-base px-4 md:px-5 py-2.5 md:py-3 rounded-full">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    Гоголя 75/1 уг. ул.Тулебаева
                  </span>
                  <span className="liquid-glass inline-flex items-center gap-2 text-white/80 text-sm md:text-base px-4 md:px-5 py-2.5 md:py-3 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Работаем ежедневно
                  </span>
                  <span className="liquid-glass inline-flex items-center gap-2 text-white/80 text-sm md:text-base px-4 md:px-5 py-2.5 md:py-3 rounded-full">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
                    Рейтинг 4.9
                  </span>
                </div>
                <Link
                  to="/company"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Подробнее о компании
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Карточка 2 — Профессионализм */}
          <motion.div
            {...fade(0.1)}
            className="md:col-span-5 rounded-[2rem] bg-[#EEF4FF] p-6 md:p-9 flex flex-col justify-between min-h-[200px] group hover:bg-[#E4EDFF] transition-colors duration-300"
          >
            <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Профессионализм</h3>
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                  <ArrowUpRight className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Используем только оригинальные запчасти и оборудование. Контролируем каждый этап и ведём отчётность.
              </p>
            </div>
          </motion.div>

          {/* Карточка 3 — Команда */}
          <motion.div
            {...fade(0.15)}
            className="md:col-span-5 rounded-[2rem] bg-[#1C1C1E] text-white p-6 md:p-9 flex flex-col justify-between min-h-[200px]"
          >
            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white/70" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Наша команда</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Инженеры</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Опыт от 3 лет. Регулярное обучение и высокий уровень клиентского сервиса.
              </p>
            </div>
          </motion.div>


          {/* Карточка нижняя — широкая */}
          <motion.div
            {...fade(0.4)}
            className="md:col-span-12 rounded-[2rem] relative overflow-hidden min-h-[200px] md:min-h-[180px]"
          >
            <div className="absolute inset-0 bg-[#05101A]" />
            <div className="orb-a absolute top-0 left-0 w-[700px] h-[400px] bg-blue-600 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/2" />
            <div className="orb-b absolute bottom-0 right-0 w-[500px] h-[350px] bg-violet-600 rounded-full blur-[100px] translate-x-1/4 translate-y-1/2" />

            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-blue-400 text-xs md:text-base font-semibold uppercase tracking-widest">Не только ремонтируем, но и продаём</span>
                </div>
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                  Загляните в наш Instagram
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
                  чехлы, зарядные устройства, наушники, телефоны, и многое другое. Мы собрали полезные товары по адекватной цене в одном месте.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 mt-4 md:mt-0">
                <a
                  href="https://www.instagram.com/greatstevekz?igsh=emFueHdkODYwNnA1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform w-full sm:w-auto justify-center shadow-[0_0_15px_rgba(253,29,29,0.3)]"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wide">Подписаться</span>
                </a>
                <div className="flex items-center gap-2 shrink-0 bg-white/5 border border-white/10 px-4 py-3 rounded-full w-full sm:w-auto justify-center">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-white/60 text-sm font-medium">Посмотрите отзывы ниже</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
