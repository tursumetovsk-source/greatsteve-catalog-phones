import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';

const DEVICES = [
  'iPhone', 'Samsung', 'Xiaomi', 'iPad / Планшет',
  'MacBook / Ноутбук', 'Apple Watch', 'Другое устройство',
];

const STEPS = [
  { num: '01', text: 'Заполните форму' },
  { num: '02', text: 'Мы перезвоним за 5 минут' },
  { num: '03', text: 'Ваш гаджет в надёжных руках' },
];

export default function RequestForm() {
  const [phone, setPhone]     = useState('+7 ');
  const [name, setName]       = useState('');
  const [device, setDevice]   = useState('');
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith('+7 ')) v = '+7 ' + v.replace(/^\+?7?\s*/, '');
    setPhone(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Требуем 11 цифр: код страны 7 + 10 цифр номера
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) return;
    setLoading(true);

    const text = [
      '📱 *Новая заявка с сайта Greatsteve*',
      name   ? `👤 Имя: ${name}`     : null,
      `📞 Телефон: ${phone}`,
      device ? `🔧 Устройство: ${device}` : null,
    ].filter(Boolean).join('\n');

    // Telegram
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch (_) { /* если апи нет — просто игнорируем */ }

    // WhatsApp
    const waText = [
      'Здравствуйте, оставляю заявку с сайта.',
      name   ? `Имя: ${name}`         : null,
      `Телефон: ${phone}`,
      device ? `Устройство: ${device}` : null,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/77775181111?text=${encodeURIComponent(waText)}`, '_blank');

    setLoading(false);
    setDone(true);
  };

  return (
    <section id="request-form" className="relative py-14 md:py-24 pb-20 md:pb-36 px-4 md:px-6 overflow-hidden">

      {/* Фоновое фото на весь блок */}
      <img
        src="/main/za9vki.jpeg"
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />

      <div className="max-w-[88rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* Левая колонка */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 md:mb-6">
              <span style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.35) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Оставьте</span><br />
              <span style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>заявку</span>
            </h2>


            {/* Шаги */}
            <div className="flex flex-col gap-5 mb-12">
              {STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-base font-bold text-white/20 tabular-nums">{s.num}</span>
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-white/70 text-lg font-medium">{s.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Контакты */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone,   text: '8 777 518 11 11' },
                { icon: MapPin,  text: 'Алматы, Гоголя 75/1 уг. ул.Тулебаева' },
                { icon: Clock,   text: 'Ежедневно 10:00 — 20:00' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-white/40 text-base">
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Правая колонка — форма */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="liquid-glass rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-white/25 shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-5"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        WhatsApp открылся — мы уже видим ваш запрос<br />и свяжемся в течение 5 минут.
                      </p>
                    </div>
                    <button
                      onClick={() => { setDone(false); setName(''); setPhone('+7 '); setDevice(''); }}
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
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">Запишитесь на ремонт</p>
                      <p className="text-white/40 text-sm">Заполните форму — остальное сделаем мы</p>
                    </div>

                    {/* Имя */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Ваше имя</label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Как к вам обращаться?"
                        className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all"
                      />
                    </div>

                    {/* Телефон */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___ __ __"
                        className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all"
                      />
                    </div>

                    {/* Устройство */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Устройство</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpen(!open)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-left flex items-center justify-between focus:outline-none focus:border-white/25 transition-all"
                        >
                          <span className={device ? 'text-white' : 'text-white/20'}>
                            {device || 'Выберите устройство'}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                        </button>
                        <AnimatePresence>
                          {open && (
                            <motion.ul
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-20 mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                            >
                              {DEVICES.map(d => (
                                <li key={d}>
                                  <button
                                    type="button"
                                    onClick={() => { setDevice(d); setOpen(false); }}
                                    className="w-full text-left px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                  >
                                    {d}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Кнопка */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full bg-white text-black py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-60"
                    >
                      {loading ? 'Отправляем...' : 'Отправить заявку'}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>

                    <p className="text-center text-xs text-white/20 leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
