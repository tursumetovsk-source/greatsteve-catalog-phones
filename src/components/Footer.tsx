import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const NAV = [
  { label: 'Ремонт', to: '/remont' },
  { label: 'Купить / Продать', to: '/tradein' },
  { label: 'О компании', to: '/company' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* Верхняя часть — большой CTA */}
      <div className="relative px-4 md:px-6 pt-14 md:pt-20 pb-12 md:pb-16 border-b border-white/8">
        {/* Фоновое фото */}
        <img
          src="/podval.jpeg"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain object-center opacity-10 pointer-events-none"
          style={{ transform: 'scale(1.1)' }}
        />

        <div className="max-w-[88rem] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-row gap-2 sm:gap-3">
            <a
              href="https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white text-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href="https://t.me/+77775181111"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/10 text-white border border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-white/15 transition-colors"
            >
              <TelegramIcon />
              Telegram
            </a>
            <a
              href="https://www.instagram.com/greatstevekz?igsh=emFueHdkODYwNnA1"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/10 text-white border border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-white/15 transition-colors"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Средняя часть — контакты и навигация */}
      <div className="px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-[88rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Логотип + договор */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <img src="/logo-gs.webp" alt="Greatsteve" className="h-7 w-auto object-contain object-left" />
            <a href="/dogovor.docx" download className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-4 py-2 rounded-full self-start mt-3">
              Договор присоединения
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Контакты</p>
            <a href="tel:+77775181111" className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
              8 777 518 11 11
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="mailto:greatstevekz1@icloud.com" className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
              greatstevekz1@icloud.com
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Навигация */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Страницы</p>
            {NAV.map(link => (
              <Link key={link.to} to={link.to} className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
                {link.label}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Адрес и часы */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Где нас найти</p>
            <p className="text-base font-medium text-white/70">Алматы, Гоголя 75/1 уг. ул.Тулебаева</p>
            <p className="text-base text-white/40">Ежедневно 10:00 — 20:00</p>
            <p className="text-base text-white/40 mt-1">БИН: 901128401389</p>
          </div>

        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="px-4 md:px-6 py-5 border-t border-white/8">
        <div className="max-w-[88rem] mx-auto flex items-center justify-end">
          <p className="text-xs text-white/30">© 2026 Greatsteve. Все права защищены.</p>
        </div>
      </div>

    </footer>
  );
}
