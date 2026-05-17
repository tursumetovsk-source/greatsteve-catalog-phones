import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';

const TradeinScene3D = lazy(() => import('../components/TradeinScene3D'));
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Tablet, Headphones, Watch } from 'lucide-react';

const WA_URL = 'https://wa.me/77775181111';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'GreatSteve — Продажа и выкуп техники в Алматы',
  url: 'https://greatsteve.kz/tradein',
  telephone: '+77775181111',
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
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Б/У техника Apple и Android',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'iPhone б/у Алматы', description: 'Подержанные iPhone 13, 14, 15 с гарантией. Полная диагностика перед продажей.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'MacBook б/у Алматы', description: 'Б/У MacBook Air и Pro M1–M4. Проверены перед продажей, гарантия.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Выкуп iPhone в Алматы', description: 'Продайте iPhone за 10 минут. Бесплатная оценка, оплата сразу наличными или переводом.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trade-in iPhone Алматы', description: 'Сдайте старый iPhone — получите скидку на покупку нового.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Выкуп Samsung и Android', description: 'Выкупаем Samsung Galaxy, Xiaomi, Redmi и другие Android-устройства.' } },
    ],
  },
};

const AppleIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.88 1.5 0 2.8.64 3.63 1.76-3.06 1.76-2.54 5.86.42 7.05-.69 1.72-1.63 3.3-2.63 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>;
const AndroidIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.022 3.503C15.5413 8.2435 13.8296 7.8285 12 7.8285c-1.8296 0-3.5413.415-5.1371 1.1218l-2.022-3.503a.416.416 0 1 0-.7197.4155l1.9973 3.4592C2.6889 11.1946.3423 14.655.025 18.8242h23.95C23.6577 14.655 21.3111 11.1946 17.8815 9.3214"/></svg>;

const DEVICE_CATEGORIES = [
  { name: 'iPhone', icon: AppleIcon },
  { name: 'Samsung', icon: Smartphone },
  { name: 'MacBook', icon: Laptop },
  { name: 'iPad', icon: Tablet },
  { name: 'AirPods', icon: Headphones },
  { name: 'Apple Watch', icon: Watch },
  { name: 'Ноутбуки', icon: Laptop },
  { name: 'Android', icon: AndroidIcon },
];

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
    { '@type': 'ListItem', position: 2, name: 'Купить и продать iPhone', item: 'https://greatsteve.kz/tradein' },
  ],
};

const FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Как продать iPhone в Алматы быстро?',
      acceptedAnswer: { '@type': 'Answer', text: 'Пришлите фото iPhone в WhatsApp на +7 777 518 11 11 — ответим с ценой за 10 минут. Приедьте на Гоголя 75/1 уг. ул.Тулебаева, проверим устройство и выплатим сразу наличными или переводом.' },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит б/у iPhone в Алматы?',
      acceptedAnswer: { '@type': 'Answer', text: 'Цены на б/у iPhone в GreatSteve: iPhone 13 от 130 000 ₸, iPhone 14 от 160 000 ₸, iPhone 15 от 200 000 ₸. Все устройства проходят полную диагностику и продаются с гарантией.' },
    },
    {
      '@type': 'Question',
      name: 'Что такое Trade-in iPhone и как это работает?',
      acceptedAnswer: { '@type': 'Answer', text: 'Trade-in — обмен старого iPhone на новый со скидкой. Вы сдаёте свой iPhone, мы его оцениваем и вычитаем стоимость из цены нового. Быстрая оценка, перенос данных и настройка на месте.' },
    },
    {
      '@type': 'Question',
      name: 'Какие устройства вы выкупаете в Алматы?',
      acceptedAnswer: { '@type': 'Answer', text: 'Выкупаем iPhone (все модели от X), MacBook Air и Pro, iPad, Apple Watch, Samsung Galaxy S/A/Z, Xiaomi, Redmi и другие Android-устройства. Оценка бесплатно, оплата сразу.' },
    },
    {
      '@type': 'Question',
      name: 'Можно ли купить б/у iPhone с гарантией в Алматы?',
      acceptedAnswer: { '@type': 'Answer', text: 'Да. Все б/у iPhone в GreatSteve проходят полную диагностику — проверяем экран, аккумулятор, камеру и Face ID. Продаём с гарантией. Алматы, Гоголя 75/1 уг. ул.Тулебаева, ежедневно 10:00–20:00.' },
    },
  ],
};

const STEPS = [
  { num: '01', title: 'Оценка',  desc: 'Пришлите фото в WhatsApp — ответим с ценой за 10 минут.' },
  { num: '02', title: 'Осмотр', desc: 'Ждём Вас на Гоголя 75/1 уг. ул. Тулебаева. Проверим устройство на месте.' },
  { num: '03', title: 'Оплата', desc: 'Выплатим сразу наличными или переводом. Без ожиданий.' },
];

export default function TradeinPage() {
  const [activeTab, setActiveTab] = useState('Продажа');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tabContent: Record<string, { title: string, text: string }> = {
    'Продажа': {
      title: 'Продаём',
      text: 'Подержанные смартфоны с гарантией — каждый аппарат проходит полную диагностику перед продажей.',
    },
    'Выкуп': {
      title: 'Выкупаем',
      text: 'iPhone, MacBook, iPad, Apple Watch, Samsung Galaxy, Xiaomi, Redmi и другие Android-устройства. Оценка за 10 минут, оплата сразу.',
    },
    'Trade-in': {
      title: 'Trade-in',
      text: 'Сдайте старое устройство и получите скидку на новое. Быстрая оценка, перенос данных и настройка на месте.',
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead
        title="Купить и продать iPhone, MacBook в Алматы — GreatSteve"
        description="Купите б/у iPhone 13, 14, 15 с гарантией или продайте свой за 10 минут. Выкуп MacBook, Samsung, Android. Trade-in. Оплата сразу наличными. Алматы, Гоголя 75/1 уг. ул.Тулебаева."
        keywords="купить б/у iPhone Алматы, продать iPhone Алматы, скупка iPhone Алматы, б/у iPhone с гарантией, купить подержанный iPhone, б/у MacBook Алматы, продать MacBook Алматы, trade-in iPhone Алматы, выкуп телефонов Алматы, скупка Samsung Алматы, б/у телефоны Алматы"
        canonical="/tradein"
        ogImage="/tradein-bg.jpg"
        schema={[SCHEMA, FAQ, BREADCRUMB]}
      />
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        aria-label="Купить и продать iPhone, MacBook, Samsung в Алматы — GreatSteve"
        style={{
          position: 'relative', width: '100%', minHeight: '100dvh', overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <img
          src="/tradein-bg.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />

        {/* 3D Canvas */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Suspense fallback={null}>
            <TradeinScene3D mobile={isMobile} />
          </Suspense>
        </div>

        {/* Hero текст — поверх 3D сцены */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          textAlign: 'center',
          paddingBottom: 'clamp(0px, 30vh, 30vh)',
          paddingLeft: 16, paddingRight: 16,
          pointerEvents: 'none',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em',
              color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontWeight: 500,
            }}
          >
            Продажа · Выкуп · Trade-in · Алматы
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(38px, 6.5vw, 82px)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
              marginBottom: 32,
              background: 'linear-gradient(160deg, #ffffff 0%, #bfdbfe 60%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Купить · Продать<br />
            iPhone · MacBook · Samsung
          </motion.h1>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', pointerEvents: 'auto', justifyContent: 'center' }}
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(255,255,255,0.95)', color: '#111',
                borderRadius: 100, padding: '14px 36px',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.95)'; }}
            >
              Узнать цену
            </a>
            <a
              href="tel:+77775181111"
              style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.5)', color: '#fff',
                borderRadius: 100, padding: '14px 36px',
                fontSize: 14, fontWeight: 500, textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              8 777 518 11 11
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── STATEMENT SECTION ─── */}
      <section
        className="py-16 md:py-[120px] px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #dbeafe 0%, #eff6ff 30%, #ffffff 100%)' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Apple-style Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}
          >
            {['Продажа', 'Выкуп', 'Trade-in'].map((text) => {
              const isActive = activeTab === text;
              return (
                <button
                  key={text}
                  onClick={() => setActiveTab(text)}
                  style={{
                    background: isActive ? '#111' : 'rgba(0,0,0,0.04)',
                    color: isActive ? '#fff' : '#1d1d1f',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 100,
                    padding: '16px 36px',
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                  onMouseEnter={(e) => { 
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.08)'; 
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'; 
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    }
                  }}
                >
                  {text}
                </button>
              );
            })}
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: 'clamp(36px, 5vw, 62px)',
              lineHeight: 1.06, letterSpacing: '-0.03em',
              fontWeight: 700, color: '#111', marginBottom: 40,
            }}
          >
            Новая жизнь<br />вашей техники
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ width: 48, height: 1, background: 'rgba(0,0,0,0.15)', margin: '0 auto 40px', transformOrigin: 'left' }}
          />

          {/* Dynamic Card */}
          <div style={{ minHeight: 220, position: 'relative', maxWidth: 860, margin: '0 auto 52px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: '#fff',
                  borderRadius: 24,
                  padding: '40px 48px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                  textAlign: 'left',
                  border: '1px solid rgba(0,0,0,0.03)'
                }}
              >
                <p style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.35)', marginBottom: 16 }}>
                  {tabContent[activeTab].title}
                </p>
                <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#111', lineHeight: 1.5, fontWeight: 500 }}>
                  {tabContent[activeTab].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#111', borderRadius: 100,
              padding: '13px 32px', fontSize: 14,
              fontWeight: 600, color: '#fff', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#333'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#111'; }}
          >
            Узнать цену в WhatsApp
          </motion.a>
        </div>
      </section>

      {/* ─── DEVICES GRID ─── */}
      <section className="py-16 md:py-[100px] px-6" style={{ background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: '#111', margin: 0 }}
            >
              Что мы продаем
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ 
                background: '#fff', 
                border: '1px solid rgba(0,0,0,0.05)', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)', 
                padding: '8px 16px', 
                borderRadius: 100, 
                fontSize: 13, 
                fontWeight: 600, 
                color: '#111' 
              }}
            >
              Trade-in только на iPhone
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '20px' }}>
            {DEVICE_CATEGORIES.map((item, i) => (
              <motion.a
                key={item.name}
                href={`${WA_URL}?text=${encodeURIComponent(`Здравствуйте, интересует ${item.name} — хочу узнать цену`)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: '0 15px 50px rgba(0, 122, 255, 0.55)',
                  borderColor: 'rgba(0, 122, 255, 0.8)'
                }}
                style={{
                  aspectRatio: '1 / 1',
                  background: '#ffffff',
                  borderRadius: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxShadow: '0 0 35px rgba(0, 122, 255, 0.3)',
                  border: '2px solid rgba(0, 122, 255, 0.4)',
                  position: 'relative',
                  willChange: 'transform, box-shadow, border-color'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, color: '#007AFF' }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#111', marginBottom: 16, opacity: 0.7 }}
                >
                  <item.icon size={48} style={{ width: 48, height: 48 }} strokeWidth={1} />
                </motion.div>

                <motion.span
                  whileHover={{ color: '#007AFF' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.name}
                </motion.span>
              </motion.a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.2)', borderRadius: 100,
                padding: '14px 40px', fontSize: 13,
                color: '#111', textDecoration: 'none',
                transition: 'border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#111'; (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#111'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#111'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.2)'; }}
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 md:py-[110px] px-6" style={{ background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111', margin: '0 0 16px' }}
            >
              Как это работает
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '18px', color: 'rgba(0,0,0,0.5)', margin: 0 }}
            >
              Три простых шага к успешной сделке
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24, marginBottom: 32 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 md:p-[48px_40px]"
                style={{
                  background: '#f5f5f7',
                  borderRadius: 32,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  willChange: 'transform',
                }}
              >
                <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#111', margin: '0 0 16px', lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 17, color: 'rgba(0,0,0,0.5)', lineHeight: 1.5, margin: 0, flexGrow: 1 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* New Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12"
            style={{
              background: '#1d1d1f',
              borderRadius: 32,
              padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 48px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '80%', height: '200%', background: 'radial-gradient(ellipse at center, rgba(0, 122, 255, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
              <h3 style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 12px', lineHeight: 1.3 }}>
                Заодно можете сразу обновить свое устройство или технику на месте
              </h3>
              <p style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                Или же обменять по программе Trade-in.
              </p>
            </div>
            
            <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <a
                href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#fff', color: '#111',
                  padding: '16px 36px', borderRadius: 100,
                  fontSize: 16, fontWeight: 600, textDecoration: 'none',
                  display: 'inline-block', transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#007AFF';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#fff';
                  (e.currentTarget as HTMLElement).style.color = '#111';
                }}
              >
                Trade-in
              </a>
              <Link
                to="/remont"
                style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
              >
                Нужен ремонт перед продажей? →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

useGLTF.preload('/3d%20models/iphone_15_pro.glb');

useGLTF.preload('/3d%20models/macbook.glb');

useGLTF.preload('/3d%20models/apple_watch_series_7_-_free_watch-face_sdctm.glb');
