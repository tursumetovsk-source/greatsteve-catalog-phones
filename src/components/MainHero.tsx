import { useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MainHero.css';

export default function MainHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const row = section.querySelector<HTMLElement>('.gs-hero-wordmark')!;
    const pill = section.querySelector<HTMLElement>('.gs-hero-pill')!;
    const overlay = section.querySelector<HTMLElement>('.gs-hero-hairline')!;
    const paper = section.querySelector<HTMLElement>('.gs-hero-paper')!;
    const footer = section.querySelector<HTMLElement>('.gs-hero-bottom')!;
    const nav = document.querySelector<HTMLElement>('.gs-home-nav');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');
    let animations: Animation[] = [];
    let disposed = false;
    let introAllowed = true;
    let frame = 0;

    const stop = () => {
      animations.forEach(animation => animation.cancel());
      animations = [];
      section.dataset.reveal = 'ready';
    };

    const open = (entrance = true) => {
      stop();
      if (reduced.matches) return;
      const bounds = pill.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(row).fontSize);
      const dimension = mobile.matches ? 'height' : 'width';
      const finalSize = mobile.matches ? bounds.height : bounds.width;
      const sizes = mobile.matches
        ? [1.5, 1.5, finalSize * .1, finalSize * .55, finalSize]
        : [fontSize * .012, fontSize * .012, fontSize * .16, bounds.height, finalSize];
      const offsets = [0, .14, .3, .58, 1];
      const options: KeyframeAnimationOptions = { duration: 2100, fill: 'both' };
      const animate = (element: HTMLElement, keyframes: Keyframe[], loop = false) => {
        const frames = loop ? [
          ...keyframes.map(frame => ({ ...frame, offset: (frame.offset ?? 1) * .2625 })),
          ...[...keyframes].reverse().map(frame => ({ ...frame, offset: .6125 + (1 - (frame.offset ?? 1)) * .2625 })),
          { ...keyframes[0], offset: 1 },
        ] : keyframes;
        animations.push(element.animate(frames, loop ? { ...options, duration: 8000, iterations: Infinity } : options));
      };
      animate(pill, sizes.map((size, index) => ({
        [dimension]: `${size}px`, offset: offsets[index],
        easing: index < 2 ? 'cubic-bezier(.5,0,.3,1)' : 'cubic-bezier(.4,0,.2,1)',
        clipPath: index === 0 ? (mobile.matches ? 'inset(0 50%)' : 'inset(50% 0)') : 'inset(0)',
      })), true);
      animate(row, [
        { gap: '.026em', offset: 0 }, { gap: '.026em', offset: .14 },
        { gap: '.05em', offset: .58 }, { gap: '.085em', offset: 1 },
      ], true);
      animate(overlay, [{ opacity: 1, offset: 0 }, { opacity: 1, offset: .14 }, { opacity: 0, offset: .3 }, { opacity: 0, offset: 1 }], true);
      if (entrance) animate(paper, [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .45 }, { opacity: 1, offset: .78 }, { opacity: 1 }]);
      if (entrance) animate(footer, [
        { opacity: 0, transform: 'translateY(45px)', offset: 0 },
        { opacity: 0, transform: 'translateY(45px)', offset: .52 },
        { opacity: 1, transform: 'translateY(0)', offset: .9 },
        { opacity: 1, transform: 'translateY(0)' },
      ]);
      if (nav && entrance) animate(nav, [
        { opacity: 0, transform: 'translateY(-140%)', offset: 0 },
        { opacity: 0, transform: 'translateY(-140%)', offset: .5 },
        { opacity: 1, transform: 'translateY(0)', offset: .86 },
        { opacity: 1, transform: 'translateY(0)' },
      ]);
      const startTime = document.timeline.currentTime;
      animations.forEach(animation => { animation.startTime = startTime; });
    };

    const drawScroll = () => {
      frame = 0;
      const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / 240));
      section.style.setProperty('--scene-scale', `${1 - progress * .04}`);
      section.style.setProperty('--scene-logo', `${progress}`);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(drawScroll); };
    const reset = () => { introAllowed = false; open(false); drawScroll(); };
    document.fonts.ready.then(() => {
      if (disposed) return;
      section.dataset.reveal = 'ready';
      if (introAllowed) open();
    });
    drawScroll();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', reset);
    reduced.addEventListener('change', reset);
    return () => {
      disposed = true;
      stop();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', reset);
      reduced.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section ref={sectionRef} className="gs-hero" data-reveal="pending" aria-labelledby="main-title">
      <div className="gs-hero-paper" aria-hidden="true">
        <svg viewBox="0 0 1440 960" preserveAspectRatio="none" fill="none">
          {Array.from({ length: 15 }, (_, index) => (
            <path key={index} d={`M ${-450 + index * 68} 1040 C ${850 + index * 25} 920, ${-600 + index * 75} 300, ${900 + index * 65} -130`} stroke="white" strokeWidth={1.2 + index * .18} opacity={.55 + index * .02} />
          ))}
        </svg>
      </div>
      <div className="gs-hero-stage">
        <div className="gs-hero-wordmark">
          <span className="gs-hero-word" aria-hidden="true">GREAT</span>
          <div className="gs-hero-pill">
            <picture className="gs-hero-scene">
              <source type="image/webp" srcSet="/main/pill-phones-transparent.webp" />
              <img src="/main/pill-phones-transparent.png" width="1536" height="1024" alt="Два iPhone цвета бургунди и компоненты для ремонта" fetchPriority="high" />
            </picture>
            <img className="gs-hero-scene-logo" src="/logo-gs.webp" width="180" height="28" alt="GreatSteve" />
            <div className="gs-hero-hairline" aria-hidden="true" />
          </div>
          <span className="gs-hero-word" aria-hidden="true">STEVE</span>
        </div>
      </div>
      <div className="gs-hero-bottom">
        <div className="gs-hero-copy">
          <div>
            <p className="gs-hero-kicker">ДАДИМ ТЕХНИКЕ ВТОРУЮ ЖИЗНЬ</p>
            <h1 id="main-title">Ремонт телефонов<br />в Алматы</h1>
          </div>
          <div className="gs-hero-details">
            <p className="gs-hero-description">iPhone, Samsung, Xiaomi и MacBook.<br />Понятная стоимость. Забота о каждой детали.</p>
            <div className="gs-hero-actions">
              <Link to="/remont" className="gs-hero-primary">Выбрать ремонт <ArrowUpRight size={19} /></Link>
              <Link to="/tradein" className="gs-hero-secondary">Купить / Продать <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </div>
        <div className="gs-hero-footer">
          <a href="https://go.2gis.com/BrzTD" target="_blank" rel="noopener noreferrer" className="gs-hero-address"><MapPin size={15} /> Алматы, Гоголя 75/1 <span>Ежедневно 10:00–20:00</span></a>
          <span className="gs-hero-footer-note">APPLE & ANDROID / REPAIR & TRADE-IN</span>
        </div>
      </div>
    </section>
  );
}
