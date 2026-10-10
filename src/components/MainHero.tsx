import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Crosshair, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MainHero.css';

export default function MainHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const phone = phoneRef.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let x = 50;
    let y = 52;
    let targetX = x;
    let targetY = y;

    const draw = () => {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      const bounds = section.getBoundingClientRect();
      const phoneBounds = phone.getBoundingClientRect();
      section.style.setProperty('--scan-x', `${x}%`);
      section.style.setProperty('--scan-y', `${y}%`);
      section.style.setProperty('--phone-scan-x', `${bounds.left + bounds.width * x / 100 - phoneBounds.left}px`);
      section.style.setProperty('--phone-scan-y', `${bounds.top + bounds.height * y / 100 - phoneBounds.top}px`);
      section.style.setProperty('--shift-x', `${(x - 50) * 0.3}px`);
      section.style.setProperty('--shift-y', `${(y - 50) * 0.2}px`);
      section.style.setProperty('--tilt-x', `${(50 - y) * 0.08}deg`);
      section.style.setProperty('--tilt-y', `${(x - 50) * 0.1}deg`);
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1
        ? requestAnimationFrame(draw)
        : 0;
    };

    const move = (event: PointerEvent) => {
      if (motion.matches || !pointer.matches || event.pointerType !== 'mouse') return;
      const bounds = section.getBoundingClientRect();
      targetX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
      targetY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
      section.dataset.scanning = 'true';
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const reset = () => {
      if (motion.matches) return;
      targetX = 50;
      targetY = 52;
      section.dataset.scanning = 'false';
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const updateMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      x = targetX = 50;
      y = targetY = 52;
      section.removeAttribute('style');
      section.dataset.scanning = 'false';
    };

    section.addEventListener('pointermove', move);
    section.addEventListener('pointerleave', reset);
    motion.addEventListener('change', updateMotion);
    pointer.addEventListener('change', updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', updateMotion);
      pointer.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <section ref={sectionRef} className="gs-hero" aria-labelledby="main-title">
      <div className="gs-hero-grid" aria-hidden="true" />
      <div className="gs-hero-glow" aria-hidden="true" />
      <div className="gs-hero-heading">
        <p className="gs-eyebrow"><span /> СЕРВИС, КОТОРЫЙ ПОНИМАЕТ ТЕХНОЛОГИИ</p>
        <div className="gs-hero-wordmark" aria-hidden="true">GREATSTEVE</div>
      </div>
      <div className="gs-hero-stage" aria-hidden="true">
        <div className="gs-hero-orbit" />
        <div ref={phoneRef} className="gs-hero-phone">
          <picture>
            <source media="(max-width: 767px)" srcSet="/main/phone-sculpture-mobile.webp" />
            <img src="/main/phone-sculpture.webp" width="1254" height="1254" alt="" fetchPriority="high" className="gs-phone-base" />
          </picture>
          <picture className="gs-phone-reveal">
            <source media="(max-width: 767px)" srcSet="/main/phone-sculpture-mobile.webp" />
            <img src="/main/phone-sculpture.webp" width="1254" height="1254" alt="" />
          </picture>
          <span className="gs-phone-badge"><img src="/logo-gs.webp" alt="" /> TECHNOLOGY, REVEALED</span>
        </div>
        <div className="gs-scan-label"><Crosshair size={14} /> <span>ВНУТРИ — ВНИМАНИЕ К ДЕТАЛЯМ</span></div>
        <div className="gs-hero-coordinate">43.2603° N / 76.9475° E</div>
      </div>
      <div className="gs-hero-copy">
        <p className="gs-hero-kicker">ДАДИМ ТЕХНИКЕ ВТОРУЮ ЖИЗНЬ</p>
        <h1 id="main-title">Ремонт телефонов<br />в Алматы</h1>
        <p className="gs-hero-description">iPhone, Samsung, Xiaomi и MacBook.<br />Понятная стоимость. Забота о каждой детали.</p>
        <div className="gs-hero-actions">
          <Link to="/remont" className="gs-hero-primary">Выбрать ремонт <ArrowUpRight size={19} /></Link>
          <Link to="/tradein" className="gs-hero-secondary">Купить / Продать <ArrowUpRight size={17} /></Link>
        </div>
      </div>
      <div className="gs-hero-hint" aria-hidden="true"><Crosshair size={18} /><span>НАВЕДИТЕ КУРСОР<br />И ИССЛЕДУЙТЕ ДЕТАЛИ</span></div>
      <div className="gs-hero-footer">
        <a href="https://go.2gis.com/BrzTD" target="_blank" rel="noopener noreferrer" className="gs-hero-address"><MapPin size={15} /> Алматы, Гоголя 75/1 <span>Ежедневно 10:00–20:00</span></a>
        <a href="#main-services" className="gs-hero-scroll">ДАЛЬШЕ — БОЛЬШЕ <ArrowDown size={16} /></a>
        <span className="gs-hero-footer-note">APPLE & ANDROID / REPAIR & TRADE-IN</span>
      </div>
    </section>
  );
}
