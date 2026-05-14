import { motion } from 'motion/react';
import { Smartphone, Battery, Monitor, Wrench, Zap, Shield } from 'lucide-react';

const SERVICES = [
  { icon: Monitor,    title: 'Замена экрана',       desc: 'Оригинальные дисплеи с сохранением True Tone и влагозащиты.',      time: '30–60 мин',  num: '01' },
  { icon: Battery,    title: 'Замена аккумулятора', desc: 'АКБ с оригинальным чипом, 100% ёмкость без ошибок в настройках.',  time: '20–40 мин',  num: '02' },
  { icon: Smartphone, title: 'Корпус и кнопки',     desc: 'Замена задней крышки, рамки, кнопок и разъёмов.',                  time: '40–90 мин',  num: '03' },
  { icon: Wrench,     title: 'Ремонт платы',        desc: 'Микропайка, восстановление после воды и механических повреждений.', time: 'от 1 дня',   num: '04' },
  { icon: Zap,        title: 'Разъём зарядки',      desc: 'Замена Lightning, USB-C и micro-USB разъёмов.',                    time: '20–30 мин',  num: '05' },
  { icon: Shield,     title: 'Диагностика',         desc: 'Полная проверка всех систем устройства. Бесплатно при ремонте.',   time: 'бесплатно',  num: '06' },
];

export default function RepairTypesSection() {
  return (
    <section className="px-4 md:px-6 py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[88rem] mx-auto">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14"
        >
          <div>
            <p className="text-black/25 text-xs font-semibold uppercase tracking-widest mb-3">Что мы делаем</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">Виды ремонта</h2>
          </div>
          <p className="text-[#6E6E73] text-base md:text-lg max-w-sm md:text-right leading-relaxed">
            Всё в одном месте — от замены экрана до сложного ремонта платы
          </p>
        </motion.div>

        {/* 2 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.title}
                href="https://wa.me/77775181111?text=Здравствуйте%2C%20хочу%20узнать%20цену"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative bg-[#F5F5F7] rounded-[2rem] p-5 sm:p-8 flex gap-4 sm:gap-6 overflow-hidden hover:bg-[#EBEBED] transition-colors duration-300 cursor-pointer"
              >
                {/* Большой номер на фоне */}
                <span className="absolute right-6 bottom-3 text-[7rem] font-black text-black/[0.04] leading-none select-none pointer-events-none group-hover:text-black/[0.07] transition-colors duration-300">
                  {s.num}
                </span>

                {/* Иконка */}
                <div className="shrink-0">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm"
                    whileHover={{ rotate: -6, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Icon className="w-6 h-6 text-[#1D1D1F]" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Текст */}
                <div className="flex flex-col gap-2 relative z-10 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-[#1D1D1F]">{s.title}</h3>
                    <span className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-wider shrink-0">{s.time}</span>
                  </div>
                  <p className="text-[#6E6E73] text-base leading-relaxed">{s.desc}</p>
                  <motion.span
                    className="text-base font-semibold text-[#0071E3] mt-1 inline-flex items-center gap-1"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Узнать цену →
                  </motion.span>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
