import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SLIDES = [
  { src: '/main/gs-main1.jpeg', webp: '/main/gs-main1.webp', webpMobile: '/main/gs-main1-mobile.webp', alt: 'Сервисный центр GreatSteve — ремонт iPhone в Алматы' },
  { src: '/main/gs-main3.jpeg', webp: '/main/gs-main3.webp', webpMobile: '/main/gs-main3-mobile.webp', alt: 'Ремонт и скупка техники Apple в Алматы' },
];

export default function MainHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ opacity: i === currentSlide ? 1 : 0, transition: 'opacity 1.2s ease-in-out' }}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.webpMobile} type="image/webp" />
              <source srcSet={slide.webp} type="image/webp" />
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover"
                fetchPriority={i === 0 ? 'high' : 'low'}
              />
            </picture>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/65 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 z-10"></div>
      </div>
      
      <div className="max-w-[88rem] w-full mx-auto relative z-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 md:mb-8 max-w-4xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.35) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Ремонт и продажа{' '}<br className="hidden md:block" />
          техники Apple{' '}<br className="hidden md:block" />
          в Алматы
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white/80 mb-8 md:mb-10 max-w-2xl leading-relaxed px-2 sm:px-0"
        >
          Мы объединяем премиальный уровень сервиса, оригинальные комплектующие и многолетний опыт, чтобы ваша техника служила долго и верно
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0"
        >
          <Link to="/remont" className="inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-medium text-base hover:bg-gray-100 transition-all duration-200 w-full sm:w-auto">
            Выбрать ремонт
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/tradein" className="inline-flex items-center justify-center gap-2 bg-black/50 backdrop-blur-md text-white border border-white/20 px-7 py-3.5 rounded-full font-medium text-base hover:bg-black/70 transition-all duration-200 w-full sm:w-auto">
            Продажа/Скупка
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
