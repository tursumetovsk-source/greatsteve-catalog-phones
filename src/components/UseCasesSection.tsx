import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, Coffee, Zap, Search, Package } from 'lucide-react';

const PERKS = [
  { icon: Coffee, text: 'Угостим кофе пока ждёте' },
  { icon: Zap,    text: 'Ремонт при вас от 30 минут' },
  { icon: Search, text: 'Бесплатная диагностика' },
  { icon: Package, text: 'Оригинальные запчасти' },
];

export default function UseCasesSection() {
  const [phone, setPhone] = useState('+7 ');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith('+7 ')) v = '+7 ' + v.replace(/^\+?7?\s*/, '');
    setPhone(v);
  };

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) return;
    const text = encodeURIComponent(`Здравствуйте, прошу перезвонить. Мой номер: ${phone}`);
    window.open(`https://wa.me/77775181111?text=${text}`, '_blank');
  };

  return (
    <section className="bg-[#F5F5F7] px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

        {/* Левая карточка — текст */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 flex flex-col justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Наш офис</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-none mb-6">
              Приходите в наш офис в центре города
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm mb-8">
              Пока ваша техника находится в надежных руках
            </p>

            {/* Перки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {PERKS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 bg-[#F5F5F7] rounded-xl px-4 py-3">
                    <Icon className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.75} />
                    <span className="text-sm font-medium text-gray-600">{p.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
            <a href="https://go.2gis.com/BrzTD" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-colors text-sm group">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
              Алматы, Гоголя 75/1 уг. ул.Тулебаева
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
            </a>
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
              Ежедневно 09:00 — 20:00
            </div>
            <a href="tel:+77775181111"
              className="flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-colors text-sm group">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
              8 777 518 11 11
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
            </a>
          </div>
        </motion.div>

        {/* Правая карточка — тёмная */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 flex flex-col justify-between min-h-[420px]"
          style={{ background: '#111111' }}
        >
          {/* Абстрактный декор */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            {/* Большой размытый круг — синий, правый верх */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            {/* Средний круг — фиолетовый, левый низ */}
            <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)', filter: 'blur(36px)' }} />
            {/* Маленький акцент — голубой, по центру */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            {/* Тонкие дуги SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 500 500" fill="none">
              <circle cx="420" cy="80" r="120" stroke="white" strokeWidth="1" />
              <circle cx="420" cy="80" r="180" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="420" r="100" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Лого */}
          <div className="relative z-10 mb-8">
            <img src="/logo-gs.webp" alt="Greatsteve" className="h-8 opacity-60" />
          </div>

          {/* Заголовок */}
          <div className="relative z-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 mb-4">Записаться</p>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-3">
              Оставьте<br />заявку
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              и получите лучший сервис в городе
            </p>
          </div>

          {/* Шаги */}
          <div className="relative z-10 flex flex-col gap-4 my-8">
            {[
              { n: '01', text: 'Оставьте номер телефона' },
              { n: '02', text: 'Мы перезвоним за 5 минут' },
              { n: '03', text: 'Приходите — сделаем при вас' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[11px] font-mono text-white/20 w-6 shrink-0">{step.n}</span>
                <div className="h-[1px] w-6 bg-white/10 shrink-0" />
                <span className="text-white/50 text-sm">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Форма */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                className="flex-1 rounded-xl py-3.5 px-5 text-white text-sm placeholder:text-white/25 focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                className="bg-white text-black px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-100 active:scale-95 transition-all whitespace-nowrap disabled:opacity-50"
                disabled={phone.replace(/\D/g, '').length < 11}
              >
                Жду звонка
              </button>
            </div>
            <p className="text-white/15 text-xs mt-3">Не передаём данные третьим лицам</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
