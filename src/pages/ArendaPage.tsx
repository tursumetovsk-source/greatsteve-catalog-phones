import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, CheckCircle, CreditCard, Building, XCircle, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

const ARENDA_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Аренда iPhone в рассрочку без банка — GreatSteve Алматы',
  url: 'https://greatsteve.kz/arenda',
  provider: {
    '@type': 'LocalBusiness',
    name: 'GreatSteve',
    telephone: '+77775181111',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
  },
  description: 'Возьмите iPhone 13, 14 или 15 в рассрочку без банка в Алматы. Первый взнос от 45 000 ₸, платёж 24 000 ₸/мес. Только удостоверение личности.',
  offers: {
    '@type': 'Offer',
    price: '45000',
    priceCurrency: 'KZT',
    description: 'Первоначальный взнос от 45 000 ₸. Ежемесячный платёж 24 000 ₸. Срок 9 месяцев.',
  },
};

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
    { '@type': 'ListItem', position: 2, name: 'Рассрочка iPhone', item: 'https://greatsteve.kz/arenda' },
  ],
};

const WA_URL = "https://wa.me/77775183311?text=%D0%90%D1%80%D0%B5%D0%BD%D0%B4%D0%B0+iPhone+%E2%80%94+%D1%85%D0%BE%D1%87%D1%83+%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C+%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 })
        .from('.hero-title-1', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-title-2', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-sub',    { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-price',  { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-btn',    { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2600"
          alt="iPhone в рассрочку без банка в Алматы — GreatSteve" className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-black/50 to-pink-500/10" />
      </div>
      <div className="max-w-7xl mx-auto w-full z-10 mt-auto">
        <div className="max-w-3xl">
          <div className="hero-eyebrow inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/20 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(37,211,102,0.15)]">
            <span className="text-sm font-bold uppercase tracking-widest text-white">Без банка. Без справок.</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-4 flex flex-col gap-1">
            <span className="hero-title-1 text-white">iPhone в рассрочку</span>
            <span className="hero-title-2 italic text-white/60 text-3xl sm:text-4xl md:text-7xl">без банка в Алматы.</span>
          </h1>
          <p className="hero-sub text-base md:text-xl text-[#86868b] max-w-xl my-6 font-medium">
            Взял сегодня — решил потом.<br className="hidden md:block" /> Только удостоверение личности.
          </p>
          <div className="hero-price flex flex-wrap items-baseline gap-2 mb-8">
            <span className="text-[#86868b] text-xs">от</span>
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-white">45 000 ₸</span>
            <span className="text-[#86868b] text-xs">→ потом 24 000 ₸/мес</span>
          </div>
          <div className="hero-btn flex flex-col sm:flex-row gap-4">
            <a href="#cta" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-[15px] hover:scale-[1.03] transition-transform shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              Оформить заявку
            </a>
            <a href={WA_URL} target="_blank" rel="noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full font-semibold text-[15px] text-white hover:bg-white/15 transition-colors flex items-center gap-2 justify-center">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StepsGrid = () => {
  const steps = [
    { num: '01', title: 'Выбираешь модель', desc: 'iPhone 13, 14 или 15 — 128 или 256 GB. Подбираем под твой бюджет.' },
    { num: '02', title: 'Платишь первый взнос', desc: '45 000 ₸ — и телефон у тебя в руках уже сегодня.' },
    { num: '03', title: 'Платишь 24 000 ₸/мес', desc: 'Небольшие ежемесячные платежи без скрытых комиссий.' },
    { num: '04', title: 'Выкупаешь или возвращаешь', desc: 'Через 9 месяцев телефон твой. Или вернуть — без проблем.' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
      {steps.map((step, i) => (
        <div key={i} className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
          <div className="text-5xl md:text-7xl font-bold text-[#25D366]/20 mb-6 group-hover:text-[#25D366]/40 transition-colors">{step.num}</div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-white">{step.title}</h3>
          <p className="text-sm md:text-base text-[#86868b] leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  );
};

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: ref.current, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/arenda/a.jpg" alt="" loading="lazy" className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-4">ПРОСТО</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-white">Как это работает</h2>
          <p className="text-lg md:text-xl text-[#86868b]">Никаких банков, никаких ожиданий</p>
        </div>
        <div className="feature-card"><StepsGrid /></div>
      </div>
    </section>
  );
};

const Requirements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.req-card');
      cards.forEach((card: unknown, i: number) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card as Element,
          start: 'top top+=100',
          endTrigger: cards[i + 1] as Element,
          end: 'top top+=100',
          pin: true, pinSpacing: false, scrub: true,
          animation: gsap.to(card as Element, { scale: 0.95, opacity: 0.2, filter: 'blur(10px)', ease: 'none' }),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { title: 'Удостоверение личности', desc: 'Казахстанское удостоверение. Никаких справок о доходах.', icon: <CreditCard className="w-6 h-6 text-white" /> },
    { title: 'Первый взнос от 45 000 ₸', desc: 'Наличными или переводом — как будет удобно вам.', icon: <span className="text-2xl">💸</span> },
    { title: 'Желание уйти с iPhone', desc: 'Телефон выдаём в день обращения. Без ожидания.', icon: <Smartphone className="w-6 h-6 text-white" /> },
  ];

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-6 bg-[#F0F2F5] min-h-[150vh]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-4">ЧТО НУЖНО</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900 flex items-center justify-center gap-4">
            Всего <span className="bg-gray-900 text-white px-4 rounded-full italic">3</span> вещи
          </h2>
        </div>
        <div className="relative">
          {steps.map((step, i) => (
            <div key={i} className="req-card w-full rounded-[2.5rem] p-8 md:p-16 mb-16 md:mb-24 min-h-[35vh] flex flex-col justify-center border border-white/10"
              style={{ zIndex: steps.length - i, background: '#0a0a0c' }}>
              <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                {step.icon}
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 text-white">{step.title}</h3>
              <p className="text-base md:text-xl text-[#86868b] max-w-xl">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Conditions = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.condition-card',
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/arenda/b.jpg" alt="" loading="lazy" className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center mb-12 flex flex-col items-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-4">УСЛОВИЯ</p>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white">Стандартные условия</h2>
      </div>
      <div className="max-w-3xl mx-auto relative z-10 condition-card">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem]">
          <h3 className="text-2xl font-bold mb-8 text-white">Условия оплаты</h3>
          <div className="flex flex-col gap-6">
            {[
              { label: 'Срок', value: '9 месяцев', green: false },
              { label: 'Первый взнос', value: '45 000 ₸', green: true },
              { label: 'Ежемесячный платёж', value: '24 000 ₸', green: true },
              { label: 'Документы', value: 'Только удостоверение', green: false },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-2">
                <span className="text-[#86868b]">{row.label}</span>
                <span className={`font-bold text-lg ${row.green ? 'text-[#25D366]' : 'text-white'}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-4">Доступные модели</h4>
            <div className="grid grid-cols-2 gap-3">
              {['iPhone 13 · 128 GB', 'iPhone 13 · 256 GB', 'iPhone 14 · 128 GB', 'iPhone 14 · 256 GB', 'iPhone 15 · 128 GB', 'iPhone 15 · 256 GB'].map((model) => (
                <div key={model} className="px-4 py-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/5 text-sm text-[#25D366] font-medium text-center">{model}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.compare-card',
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const vsBank = [
    { text: 'Справка о доходах', bad: true },
    { text: 'Кредитная история', bad: true },
    { text: 'Ждать одобрения', bad: true },
    { text: 'Комиссии и скрытые платежи', bad: true },
  ];
  const vsSteve = [
    { text: 'Только удостоверение', bad: false },
    { text: 'История не нужна', bad: false },
    { text: 'Забираешь сегодня', bad: false },
    { text: 'Можно вернуть телефон', bad: false },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/arenda/c.jpg" alt="" loading="lazy" className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-4">СРАВНЕНИЕ</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-white flex flex-wrap justify-center items-center gap-4">
            GreatSteve <span className="text-white/50 italic font-serif">vs</span> Банк
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="compare-card bg-white/5 backdrop-blur-md border border-red-500/10 rounded-[2rem] p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
              <Building className="w-6 h-6 text-red-500" />
              <h3 className="text-xl md:text-2xl font-bold text-white">Банк</h3>
            </div>
            {vsBank.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-medium text-sm md:text-base text-white">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="compare-card bg-white/5 backdrop-blur-md border border-[#25D366]/20 rounded-[2rem] p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
              <h3 className="text-xl md:text-2xl font-bold text-white">GreatSteve</h3>
            </div>
            {vsSteve.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <span className="font-medium text-sm md:text-base text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MODELS = ['iPhone 13 · 128 GB', 'iPhone 13 · 256 GB', 'iPhone 14 · 128 GB', 'iPhone 14 · 256 GB', 'iPhone 15 · 128 GB', 'iPhone 15 · 256 GB'];

const CTA = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [model, setModel] = useState('');
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith('+7 ')) v = '+7 ' + v.replace(/^\+?7?\s*/, '');
    setPhone(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) return;
    setLoading(true);

    const text = [
      '📱 *Заявка на рассрочку iPhone — GreatSteve*',
      name ? `👤 Имя: ${name}` : null,
      `📞 Телефон: ${phone}`,
      model ? `📦 Модель: ${model}` : null,
    ].filter(Boolean).join('\n');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch (_) {}

    const waText = [
      'Здравствуйте, оставляю заявку на рассрочку iPhone.',
      name ? `Имя: ${name}` : null,
      `Телефон: ${phone}`,
      model ? `Модель: ${model}` : null,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/77775183311?text=${encodeURIComponent(waText)}`, '_blank');

    setLoading(false);
    setDone(true);
  };

  return (
    <section id="cta" className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/arenda/d.jpg" alt="" loading="lazy" className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-5"
            >
              <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#25D366]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  WhatsApp открылся — мы уже видим ваш запрос<br />и свяжемся в течение 15 минут.
                </p>
              </div>
              <button
                onClick={() => { setDone(false); setName(''); setPhone('+7 '); setModel(''); }}
                className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
              >
                Отправить ещё одну
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-2">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">Хотите узнать как получить iPhone с самой выгодной ценой?</h2>
                <p className="text-[#86868b] text-sm md:text-base">Оставь заявку — подберём модель под бюджет и свяжемся за 15 минут.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Телефон *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___ __ __"
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Интересующая модель</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setModelOpen(!modelOpen)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-left flex items-center justify-between focus:outline-none focus:border-white/25 transition-all"
                  >
                    <span className={model ? 'text-white' : 'text-white/20'}>{model || 'Выберите модель'}</span>
                    <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${modelOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                  </button>
                  <AnimatePresence>
                    {modelOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                      >
                        {MODELS.map(m => (
                          <li key={m}>
                            <button
                              type="button"
                              onClick={() => { setModel(m); setModelOpen(false); }}
                              className="w-full text-left px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {m}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-white text-black py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {loading ? 'Отправляем...' : 'Оформить заявку'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-center text-xs text-white/20 leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default function ArendaPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900">
      <SEOHead
        title="Аренда iPhone в Алматы — рассрочка без банка | GreatSteve"
        description="Возьмите iPhone 13, 14 или 15 в рассрочку без банка в Алматы. Первый взнос от 45 000 ₸, платёж 24 000 ₸/мес. Только удостоверение личности. Забираете сегодня. Гоголя 75/1 уг. ул.Тулебаева."
        keywords="аренда iPhone Алматы, рассрочка iPhone без банка Алматы, iPhone в кредит Алматы, купить iPhone в рассрочку, iPhone 14 рассрочка Алматы, iPhone 15 рассрочка Алматы, iPhone без справок Алматы"
        canonical="/arenda"
        ogImage="/arenda/a.jpg"
        schema={[ARENDA_SCHEMA, BREADCRUMB]}
      />
      <Navbar />
      <Hero />
      <Features />
      <Requirements />
      <Conditions />
      <Comparison />
      <CTA />
      <Footer />
    </div>
  );
}
