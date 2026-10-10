import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/remont', label: 'Ремонт' },
  { to: '/tradein', label: 'Купить / Продать' },
  { to: '/company', label: 'О компании' },
];
const WHATSAPP = 'https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта';

export default function HomeNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const controls = menuRef.current!.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button, a');
    controls[0].focus();
    const close = () => { setIsOpen(false); toggleRef.current?.focus(); };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    desktop.addEventListener('change', close);
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', close);
      document.removeEventListener('keydown', keydown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="gs-home-nav">
        <Link to="/" className="gs-home-logo gs-glass" aria-label="GreatSteve — главная"><img src="/logo-gs.webp" alt="GreatSteve" width="180" height="28" /></Link>
        <nav className="gs-home-links gs-glass" aria-label="Основная навигация">
          {LINKS.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}
        </nav>
        <a className="gs-home-contact gs-glass" href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-contact-placement="home_navigation"><span className="gs-status-dot" /> Написать нам <ArrowUpRight size={16} /></a>
        <button ref={toggleRef} className="gs-home-toggle gs-glass" onClick={() => setIsOpen(true)} aria-label="Открыть меню" aria-expanded={isOpen} aria-controls="home-mobile-menu"><Menu size={21} /></button>
      </header>
      {isOpen && (
        <div ref={menuRef} id="home-mobile-menu" className="gs-home-menu" role="dialog" aria-modal="true" aria-label="Навигация GreatSteve">
          <button className="gs-home-menu-close gs-glass" onClick={() => { setIsOpen(false); toggleRef.current?.focus(); }} aria-label="Закрыть меню"><X size={23} /></button>
          <img src="/logo-gs.webp" className="gs-menu-logo" alt="GreatSteve" />
          <nav aria-label="Мобильная навигация">
            {LINKS.map((link, index) => <Link key={link.to} to={link.to} style={{ animationDelay: `${100 + index * 60}ms` }} onClick={() => setIsOpen(false)}>{link.label} <ArrowUpRight size={24} /></Link>)}
          </nav>
          <div className="gs-menu-contact">
            <a className="gs-hero-primary" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><span className="gs-status-dot" /> WhatsApp <ArrowUpRight size={18} /></a>
            <a href="tel:+77775181111"><Phone size={17} /> +7 777 518 11 11</a>
            <p>Алматы, Гоголя 75/1<br />Ежедневно 10:00–20:00</p>
          </div>
        </div>
      )}
    </>
  );
}
