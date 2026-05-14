import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, CheckCircle, ArrowRight, CreditCard, AppleIcon, Search, SmartphoneCharging, Building, XCircle, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WA_URL = "https://wa.me/77775183311?text=%28%D0%A2%D0%A2%29+%D0%A5%D0%BE%D1%87%D1%83+%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C+%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5+%D0%B8+%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C+%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82+%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8+%D1%81%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D0%B0";

// --- Components ---

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', duration: 0.3 });
          } else if (self.progress === 0) {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', borderBottom: '1px solid transparent', duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="https://greatsteve.kz" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10" aria-label="Вернуться на сайт">
            <ChevronLeft className="w-5 h-5 text-white" />
          </a>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="GreatSteve" className="h-6 object-contain" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.logo-text')?.classList.remove('hidden');
            }} />
            <div className="logo-text hidden flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f5f5f7]"></span>
              <span className="font-sans font-bold text-lg tracking-tight">GreatSteve</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={WA_URL} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#86868b] hover:text-white transition-colors">
            WhatsApp
          </a>
          <a href="#cta" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
            Хочу iPhone
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
        .from('.hero-title-1', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-title-2', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-price', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-btn', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] flex flex-col pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-[-1]">
        <img 
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2600" 
          alt="Apple iPhone" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        {/* Added subtle pink/orange highlight matching user's image aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-black/50 to-pink-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 mt-auto">
        <div className="max-w-3xl">
          <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 backdrop-blur-md mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#25D366]">Без банка. Без справок.</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-4 flex flex-col gap-1 md:gap-2">
            <span className="hero-title-1 text-white">Оригинальный iPhone</span>
            <span className="hero-title-2 font-serif italic text-white/60 text-3xl sm:text-4xl md:text-7xl">по очень выгодной цене.</span>
          </h1>

          <p className="hero-sub text-base md:text-xl text-[#86868b] max-w-xl my-6 md:my-8 font-medium">
            Взял сегодня — решил потом. <br className="hidden md:block"/>Только удостоверение личности.
          </p>

          <div className="hero-price flex flex-wrap items-baseline gap-2 md:gap-3 mb-8 md:mb-10">
            <span className="text-[#86868b] text-xs md:text-sm">от</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">45 000 ₸</span>
            <span className="text-[#86868b] text-xs md:text-sm">→ потом 24 000 ₸/мес</span>
          </div>

          <div className="hero-btn flex flex-col sm:flex-row gap-4">
            <a href="#cta" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-[15px] hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              Оформить заявку
            </a>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="glass-panel px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-white/10 transition-colors duration-300 flex items-center gap-2 justify-center">
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
    { num: "01", title: "Выбираешь модель", desc: "iPhone 13, 14 или 15 — 128 или 256 GB. Подбираем под твой бюджет." },
    { num: "02", title: "Платишь первый взнос", desc: "45 000 ₸ — и телефон у тебя в руках уже сегодня." },
    { num: "03", title: "Платишь 24 000 ₸/мес", desc: "Небольшие ежемесячные платежи без скрытых комиссий." },
    { num: "04", title: "Выкупаешь или возвращаешь", desc: "Через 9 месяцев телефон твой. Или вернуть — без проблем." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 rounded-[2rem] overflow-hidden border border-white/10 glass-panel">
      {steps.map((step, i) => (
        <div key={i} className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5 last:border-0 relative group hover:bg-white/[0.02] transition-colors">
          <div className="font-sans text-5xl md:text-7xl font-bold text-[#25D366]/20 mb-6 group-hover:text-[#25D366]/40 transition-colors">{step.num}</div>
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
        {
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out'
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative py-16 md:py-24 px-6 pb-20 md:pb-32 overflow-hidden">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/a.jpg" 
          alt="Features Background" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen grayscale scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 md:mb-16">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#25D366] mb-4">ПРОСТО</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">Как это работает</h2>
          <p className="text-lg md:text-xl text-[#86868b]">Никаких банков, никаких ожиданий</p>
        </div>
        <div className="feature-card">
          <StepsGrid />
        </div>
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
        // We do not animate the last card out
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card as Element,
          start: "top top+=100",
          endTrigger: cards[i + 1] as Element,
          end: "top top+=100",
          pin: true,
          pinSpacing: false,
          scrub: true,
          animation: gsap.to(card as Element, {
            scale: 0.95,
            opacity: 0.2,
            filter: "blur(10px)",
            ease: "none"
          })
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { 
      title: "Удостоверение личности", 
      desc: "Казахстанское удостоверение. Никаких справок о доходах.",
      icon: <CreditCard className="w-6 h-6 text-white" />
    },
    { 
      title: "Первый взнос от 45 000 ₸", 
      desc: "Наличными или переводом — как будет удобно вам.",
      icon: <span className="text-2xl">💸</span>
    },
    { 
      title: "Желание уйти с iPhone", 
      desc: "Телефон выдаём в день обращения. Без ожидания.",
      icon: <Smartphone className="w-6 h-6 text-white" />
    }
  ];

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-6 bg-[#050505] min-h-[150vh]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#25D366] mb-4">ЧТО НУЖНО</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center gap-4">
            Всего <span className="bg-white text-black px-4 rounded-full italic font-serif">3</span> вещи
          </h2>
        </div>
        
        <div className="relative">
          {steps.map((step, i) => (
            <div key={i} className={`req-card glass-panel w-full rounded-[2.5rem] p-8 md:p-16 mb-16 md:mb-24 min-h-[35vh] md:min-h-[40vh] flex flex-col justify-center border-t border-white/10 bg-[#0a0a0c] relative`} style={{ zIndex: steps.length - i }}>
               <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                 {step.icon}
               </div>
               <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">{step.title}</h3>
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
        {
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
          y: 0, opacity: 1, duration: 1, ease: 'power3.out'
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/b.jpg" 
          alt="Conditions Background" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen grayscale scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center mb-12 flex flex-col items-center">
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#25D366] mb-4">УСЛОВИЯ</p>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight">Стандартные условия</h2>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 condition-card">
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10">
          <h3 className="text-2xl font-bold mb-8">Условия оплаты</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-2">
              <span className="text-[#86868b]">Срок</span>
              <span className="font-bold text-lg">9 месяцев</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-2">
              <span className="text-[#86868b]">Первый взнос</span>
              <span className="font-bold text-lg text-[#25D366]">45 000 ₸</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-2">
              <span className="text-[#86868b]">Ежемесячный платёж</span>
              <span className="font-bold text-lg text-[#25D366]">24 000 ₸</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-2">
              <span className="text-[#86868b]">Документы</span>
              <span className="font-bold text-lg">Только удостоверение</span>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-4">Доступные модели</h4>
            <div className="flex flex-wrap gap-3">
              {['iPhone 13 · 128 GB', 'iPhone 13 · 256 GB', 'iPhone 14 · 128 GB', 'iPhone 14 · 256 GB', 'iPhone 15 · 128 GB', 'iPhone 15 · 256 GB'].map((model) => (
                <div key={model} className="px-4 py-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/5 text-sm text-[#25D366] font-medium">
                  {model}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.compare-card', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out"
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const vsBank = [
    { text: "Справка о доходах", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { text: "Кредитная история", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { text: "Ждать одобрения", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { text: "Комиссии и скрытые платежи", icon: <XCircle className="w-5 h-5 text-red-500" /> }
  ];

  const vsSteve = [
    { text: "Только удостоверение", icon: <CheckCircle className="w-5 h-5 text-[#25D366]" /> },
    { text: "История не нужна", icon: <CheckCircle className="w-5 h-5 text-[#25D366]" /> },
    { text: "Забираешь сегодня", icon: <CheckCircle className="w-5 h-5 text-[#25D366]" /> },
    { text: "Можно вернуть телефон", icon: <CheckCircle className="w-5 h-5 text-[#25D366]" /> }
  ];

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/c.jpg" 
          alt="Comparison Background" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen grayscale scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#25D366] mb-4">СРАВНЕНИЕ</p>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <span className="font-sans font-bold">GreatSteve</span>
            <span className="text-white/50 italic font-serif lowercase">vs</span>
            <span className="font-sans font-bold">Банк</span>
          </h2>
          <p className="text-[#86868b] text-base md:text-xl">Почему выбирают нас</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Bank */}
          <div className="compare-card glass-panel border border-[rgba(239,68,68,0.1)] bg-[linear-gradient(180deg,rgba(239,68,68,0.05)_0%,rgba(0,0,0,0)_100%)] rounded-[2rem] p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
              <Building className="w-6 h-6 text-red-500" />
              <h3 className="text-xl md:text-2xl font-bold">Банк</h3>
            </div>
            <div className="flex flex-col gap-4">
              {vsBank.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GreatSteve */}
          <div className="compare-card glass-panel border border-[#25D366]/20 bg-[linear-gradient(180deg,rgba(37,211,102,0.05)_0%,rgba(0,0,0,0)_100%)] rounded-[2rem] p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="GreatSteve" className="h-6 object-contain" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.logo-text')?.classList.remove('hidden');
                }} />
                <h3 className="logo-text hidden text-xl md:text-2xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f5f5f7]"></span> GreatSteve
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {vsSteve.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="relative py-20 md:py-32 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/d.jpg" 
          alt="CTA Background" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen grayscale scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="max-w-3xl mx-auto glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
         <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">Готовы к новому iPhone?</h2>
         <p className="text-[#86868b] text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto">
           Оставь заявку — подберём модель под бюджет и свяжемся за 15 минут.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
           <a href={WA_URL} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-[15px] hover:scale-[1.03] transition-transform duration-300">
             Написать в WhatsApp
           </a>
           <a href="#hero" className="bg-[#1a1a1c] border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-[#252525] transition-colors duration-300">
             Вернуться наверх
           </a>
         </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 md:pt-20 pb-10 px-6 rounded-t-[2.5rem] md:rounded-t-[4rem] border-t border-white/5 mx-2 md:mx-4 mt-6 md:mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16 md:mb-20">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2">
              <img src="/logo.png" alt="GreatSteve" className="h-6 object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.logo-text')?.classList.remove('hidden');
              }} />
              <h3 className="logo-text hidden text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f5f5f7]"></span> GreatSteve
              </h3>
            </div>
            <p className="text-[#86868b] text-sm leading-relaxed">
              Оригинальный iPhone по выгодной цене. Без банка и без справок.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
               <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Навигация</h4>
               <div className="flex flex-col gap-3">
                 <a href="#" className="text-sm text-[#86868b] hover:text-white transition-colors">Главная</a>
                 <a href="#how-it-works" className="text-sm text-[#86868b] hover:text-white transition-colors">Условия</a>
                 <a href="/contract.pdf" target="_blank" rel="noreferrer" className="text-sm text-[#86868b] hover:text-white transition-colors">Договор присоединения</a>
               </div>
            </div>
            <div>
               <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Контакты</h4>
               <div className="flex flex-col gap-3">
                 <a href={WA_URL} className="text-sm text-[#86868b] hover:text-white transition-colors">WhatsApp</a>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-[#86868b] flex flex-col gap-1 text-center md:text-left">
            <span>ИП «GREATSTEVE.KZ» · БИН: 901128401389</span>
            <span>Республика Казахстан, г. Алматы, Медеуский район, ул. Гоголя, д. 75</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#86868b]">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a 
      href={WA_URL} 
      target="_blank" 
      rel="noreferrer" 
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-[#25D366]/20"
      aria-label="Написать в WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937 0 3.825-3.113 6.938-6.938 6.938z" />
      </svg>
    </a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Requirements />
      <Conditions />
      <Comparison />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
