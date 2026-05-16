import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import BackedBySection from '../components/BackedBySection';
import { MapPin, Clock, Phone, Instagram, ChevronDown, Navigation, Landmark, TrainFront, ShoppingBag } from 'lucide-react';
import { AntiGravityCanvas } from '../components/ui/particle-effect-for-hero';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://greatsteve.kz/company#business',
  name: 'GreatSteve',
  url: 'https://greatsteve.kz',
  telephone: '+77775181111',
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
    addressLocality: 'Алматы',
    addressCountry: 'KZ',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '10:00',
    closes: '20:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 5000,
  },
};

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
    { '@type': 'ListItem', position: 2, name: 'О компании', item: 'https://greatsteve.kz/company' },
  ],
};

/* ── palette ── */
const C = {
  cream:  '#F7F3EE',
  cream2: '#EDE7DC',
  dark:   '#111111',
  text:   '#0F0F0F',
  muted:  '#8A7A6A',
  accent: '#E05220',
  border: 'rgba(0,0,0,0.10)',
  darkBorder: 'rgba(255,255,255,0.08)',
};

/* ─── Word-by-word reveal ─── */
function SplitReveal({
  text, className, delay = 0, once = true,
}: { text: string; className?: string; delay?: number; once?: boolean }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once, margin: '-40px' }}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Horizontal line draw ─── */
function DrawLine({ delay = 0, color = C.border }: { delay?: number; color?: string }) {
  return (
    <motion.div
      className="h-px w-full"
      style={{ background: color, transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ─── Fade in ─── */
function FadeIn({ children, delay = 0, y = 24, className }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Clip-path image reveal ─── */
function ClipReveal({ src, alt, className, delay = 0 }: {
  src: string; alt: string; className?: string; delay?: number;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src} alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ─── Marquee ─── */
function Marquee({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const repeat = `${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  `;
  return (
    <div ref={ref} className="overflow-hidden py-10 md:py-14" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.cream }}>
      <motion.div style={{ x, willChange: 'transform' }}>
        <p className="whitespace-nowrap font-black uppercase tracking-tighter select-none"
          style={{ fontSize: 'clamp(3rem,8vw,7rem)', color: C.text, opacity: 0.06 }}>
          {repeat}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Historia interactive section ─── */
const TIMELINE: Record<string, string[]> = {
  '2019': [
    'Открытие первого сервиса на Гоголя 75/1 уг. ул.Тулебаева',
    'Специализация на ремонте iPhone и MacBook',
    'Первые 200 довольных клиентов',
  ],
  '2021': [
    'Запуск скупки и продажи техники',
    'Расширение штата мастеров',
    'Более 1 000 выполненных ремонтов',
  ],
  '2023': [
    'Более 2 000 выполненных ремонтов',
    'Рейтинг 4.8 ★ на Google Maps',
    'Новый просторный офис',
  ],
  '2025': [
    '5 000+ клиентов — наша гордость',
    'Рейтинг 4.9 ★',
    'Полный спектр услуг: ремонт, скупка, продажа',
  ],
};

function HistoriaSection() {
  const years = Object.keys(TIMELINE);
  const [active, setActive] = useState('2019');
  const items = TIMELINE[active];

  return (
    <section className="px-6 md:px-14 lg:px-20 pt-20 pb-28 overflow-hidden relative"
      style={{ background: '#F8FAFC' }}>

      <div className="max-w-3xl mx-auto text-center">

        {/* Title */}
        <FadeIn y={16}>
          <h2 className="font-black tracking-tight text-slate-900 mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Наша история
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.1} y={12}>
          <p className="mb-10"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: '#94a3b8',
            }}>
            Качественно работаем с 2019 года
          </p>
        </FadeIn>

        {/* Year tabs */}
        <FadeIn delay={0.15} y={10}>
          <div className="inline-flex items-center gap-1 rounded-full p-1.5 mb-12"
            style={{ background: '#EEF2F7', border: '1px solid rgba(0,0,0,0.06)' }}>
            {years.map(year => (
              <button key={year}
                onClick={() => setActive(year)}
                className="px-4 py-2 text-sm md:px-8 md:py-3 md:text-base rounded-full font-semibold transition-all duration-200"
                style={active === year
                  ? { background: '#3B82F6', color: '#fff', boxShadow: '0 2px 12px rgba(59,130,246,0.35)' }
                  : { background: 'transparent', color: '#64748b' }}>
                {year}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Content */}
        <motion.div key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-4">
          {items.map((item, i) => (
            <p key={i}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                fontWeight: 400,
                color: '#475569',
                lineHeight: 1.65,
              }}>
              {item}
            </p>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ─── Stat counter ─── */
function StatItem({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="text-center md:text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}>
      <p className="font-black tracking-tight leading-none mb-1 text-white"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>{value}</p>
      <p className="text-xs uppercase tracking-widest text-white/35">{label}</p>
    </motion.div>
  );
}

/* ══════════ PAGE ══════════ */
export default function CompanyPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip" style={{ background: C.cream, color: C.text }}>
      <SEOHead
        title="О компании GreatSteve — Сервисный центр в Алматы с 2019 года"
        description="GreatSteve — сервисный центр Apple в Алматы с 2019 года. 5 000+ клиентов, рейтинг 4.9★ на Google и 2ГИС. Ремонт iPhone и MacBook на Гоголя 75/1 уг. ул.Тулебаева. Ежедневно 10:00–20:00."
        keywords="GreatSteve Алматы, сервисный центр Apple Алматы, о компании GreatSteve, GreatSteve отзывы, сервис Гоголя 75/1 уг. ул.Тулебаева Алматы, ремонт iPhone отзывы Алматы, сервисный центр рейтинг Алматы"
        canonical="/company"
        ogImage="/company/great.webp"
        schema={[SCHEMA, BREADCRUMB]}
      />
      <Navbar />

      {/* ══ 1. HERO — particle field ══ */}
      <section className="relative min-h-screen overflow-hidden bg-black cursor-crosshair">

        {/* Particle canvas background */}
        <AntiGravityCanvas />

        {/* Content — centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">

          {/* Logo */}
          <motion.img src="/company/great.webp" alt="GS"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 'clamp(60px, 10vw, 110px)', width: 'auto', marginBottom: '2rem' }}
          />

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
            className="block text-[10px] font-medium uppercase text-white/40 mb-6">
            О компании
          </motion.span>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold tracking-tighter text-white leading-[0.95]"
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                background: 'linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.4))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              GreatSteve
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="text-base md:text-lg text-white/45 max-w-sm leading-relaxed mb-12"
            style={{ fontWeight: 300 }}>
            Сервисный центр в сердце Алматы.
          </motion.p>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">Листать</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4 text-white/25" />
          </motion.div>
        </motion.div>
      </section>


      {/* ══ 3. ИСТОРИЯ ══ */}
      <HistoriaSection />


      {/* ══ 5. БЕНТО — ЦИФРЫ ══ */}
      <section className="px-4 md:px-6 py-20 md:py-28" style={{ background: '#fff' }}>
        <div className="w-full">

          {/* Header */}
          <FadeIn y={16} className="text-center mb-12">
            <h2 className="font-black tracking-tight text-slate-900 mb-4"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}>
              GreatSteve
            </h2>
            <p style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
              lineHeight: 1.65,
              letterSpacing: '0.005em',
              color: '#6b7280',
            }}>
              Мы команда мастеров с опытом. Ремонтируем,<br className="hidden md:block" /> скупаем и продаём технику.
            </p>
          </FadeIn>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-2 md:items-center">

            {/* Card 1 — years */}
            <FadeIn delay={0.05} y={20} className="md:col-span-1">
              <div className="relative rounded-3xl overflow-hidden h-80 md:h-[420px] flex flex-col justify-between p-7"
                style={{ background: 'linear-gradient(145deg, #dbeafe 0%, #93c5fd 60%, #3b82f6 100%)' }}>
                <div>
                  <p className="font-black text-slate-900 leading-none mb-2"
                    style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)' }}>5+ лет</p>
                  <p className="text-slate-700 leading-snug max-w-[220px]"
                    style={{ fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 20px)' }}>
                    Опыта в ремонте и продаже техники Apple
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 2 — clients (tall, center) */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-3xl overflow-hidden h-96 md:h-[500px] flex flex-col justify-end p-7"
                style={{
                  background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
                  boxShadow: '0 16px 40px rgba(15,23,42,0.25)',
                }}>
                <img
                  src="/company/100k.jpg"
                  alt="100К клиентов"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10">
                  <p className="font-black text-white leading-none mb-1"
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)' }}>100К клиентов</p>
                  <p className="text-white/60" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>Доверяющих нам</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — city */}
            <FadeIn delay={0.15} y={20} className="md:col-span-1">
              <div className="relative rounded-3xl overflow-hidden h-80 md:h-[420px] flex flex-col justify-between p-7">
                <img
                  src="/company/karta.jpg"
                  alt="Алматы"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                {/* Тёмный градиент сверху для читаемости текста */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(10,20,50,0.82) 0%, rgba(10,20,50,0.5) 55%, rgba(10,20,50,0.15) 100%)' }} />
                <div className="relative z-10">
                  <p className="font-black text-white leading-none mb-2"
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)' }}>Алматы</p>
                  <p className="text-white/80 leading-snug max-w-[220px]" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                    Единственная франшиза в городе
                  </p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>



      {/* ══ 8. LOCATION ══ */}
      <section className="px-6 md:px-14 lg:px-20 pt-12 pb-24 md:pt-16 md:pb-36" style={{ background: C.cream }}>
        <div className="max-w-[88rem] mx-auto">

          {/* Как доехать */}
          <div className="mb-14">
            <h2 className="font-black text-slate-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
              Как добраться?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { Icon: Navigation, title: 'Адрес', text: 'Гоголя 75/1 уг. ул.Тулебаева, Алматы', color: '#3b82f6' },
                { Icon: Landmark, title: 'Ориентир', text: 'Рядом с Арбатом — пешеходной улицей в центре города', color: '#8b5cf6' },
                { Icon: TrainFront, title: 'Метро', text: 'Станция «Алмалы» — 3 минуты пешком', color: '#ef4444' },
                { Icon: ShoppingBag, title: 'ТРЦ', text: 'Mega Park — в 10 минутах езды', color: '#f59e0b' },
              ].map(({ Icon, title, text, color }) => (
                <div key={title} className="rounded-2xl p-6" style={{ background: '#f5f5f7', border: `1px solid ${C.border}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <p className="font-bold text-slate-900 mb-1 text-base">{title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 map cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: '2ГИС',
                href: 'https://go.2gis.com/BrzTD',
                src: null,
                logo: 'https://2gis.kz/favicon.ico',
                color: '#00B341',
                fallbackLetter: '2',
              },
              {
                label: 'Яндекс Карты',
                href: 'https://yandex.kz/maps/-/CPgzmULh',
                src: 'https://yandex.kz/map-widget/v1/?text=Greatsteve.kz+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B+%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8F+75%2F1&z=17&l=map',
                logo: 'https://yastatic.net/s3/home/serp/yandex-logo-ru_0b98e76.svg',
                color: '#FC3F1D',
                fallbackLetter: 'Я',
              },
              {
                label: 'Google Maps',
                href: 'https://maps.app.goo.gl/Utn9cuXYm2JBEHfg7',
                src: 'https://maps.google.com/maps?q=Greatsteve+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B+%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8F+75%2F1&output=embed&z=17&hl=ru',
                logo: 'https://maps.gstatic.com/mapfiles/maps_lite/favicon_maps.ico',
                color: '#4285F4',
                fallbackLetter: 'G',
              },
            ].map(({ label, href, src, logo, color, fallbackLetter }: { label: string; href: string; src: string | null; logo: string; color: string; fallbackLetter: string }, i) => (
              <FadeIn key={i} delay={i * 0.08} y={20}>
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                  <div className="h-[340px] md:h-[420px]">
                    {src ? (
                      <iframe src={src} width="100%" height="100%" style={{ border: 0 }} title={label} loading="lazy"
                        sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation" />
                    ) : (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center w-full h-full gap-6 hover:opacity-90 transition-opacity"
                        style={{ background: 'linear-gradient(145deg, #0d1f0f 0%, #061209 100%)', textDecoration: 'none' }}>
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{ background: '#00B34120', border: '1px solid #00B34140' }}>
                          <img src={logo} alt="2GIS" className="w-12 h-12 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <div className="text-center">
                          <p className="font-black text-white text-2xl mb-1">2ГИС</p>
                          <p className="text-white/40 text-sm">Гоголя 75/1 уг. ул.Тулебаева · Алматы</p>
                        </div>
                        <div className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                          style={{ background: '#00B341', color: '#fff' }}>
                          <MapPin className="w-4 h-4" />
                          Открыть в 2ГИС
                        </div>
                      </a>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-5 py-4 bg-white"
                    style={{ borderTop: `1px solid ${C.border}` }}>
                    {/* Brand logo + name */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                        style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                        <img src={logo} alt={label} className="w-5 h-5 object-contain"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = 'none';
                            const parent = el.parentElement!;
                            parent.innerHTML = `<span style="font-size:13px;font-weight:800;color:${color}">${fallbackLetter}</span>`;
                          }} />
                      </div>
                      <span className="text-sm font-semibold" style={{ color: C.text }}>{label}</span>
                    </div>
                    {/* Open button */}
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{ background: color, color: '#fff' }}>
                      <MapPin className="w-3 h-3" />
                      Открыть
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
