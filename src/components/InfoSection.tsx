import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

type LogoProps = { className?: string; style?: React.CSSProperties };

const AppleLogo = ({ className, style }: LogoProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const SamsungLogo = ({ className, style }: LogoProps) => (
  <svg className={className} style={style} viewBox="0 0 220 72" fill="currentColor">
    <ellipse cx="110" cy="36" rx="107" ry="32" fill="none" stroke="currentColor" strokeWidth="4"/>
    <text x="110" y="47" textAnchor="middle" fontSize="26" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="4" fill="currentColor">SAMSUNG</text>
  </svg>
);

const LOGOS: Record<string, React.FC<LogoProps>> = {
  Samsung: SamsungLogo,
  MacBook: AppleLogo,
  iPad: AppleLogo,
  'Apple Watch': AppleLogo,
};

const WA = 'https://wa.me/77775181111?text=';

const SMALL_DEVICES = [
  {
    id: '02',
    name: 'Samsung',
    sub: 'Galaxy S, A, Z серии',
    accent: '#1428A0',
    services: ['AMOLED дисплей', 'Батарея', 'Корпус и стекло'],
    from: '10 000 ₸',
  },
  {
    id: '03',
    name: 'MacBook',
    sub: 'Air, Pro, M1–M4',
    accent: '#1D1D1F',
    services: ['Клавиатура и тачпад', 'Дисплей', 'SSD и RAM'],
    from: '20 000 ₸',
  },
  {
    id: '04',
    name: 'iPad',
    sub: 'Air, Pro, Mini',
    accent: '#007AFF',
    services: ['Экран и стекло', 'Батарея', 'Разъём зарядки'],
    from: '12 000 ₸',
  },
  {
    id: '05',
    name: 'Apple Watch',
    sub: 'Series 4–10, Ultra',
    accent: '#1D1D1F',
    services: ['Дисплей', 'Батарея', 'Корпус'],
    from: '8 000 ₸',
  },
];

export default function InfoSection() {
  return (
    <section className="bg-[#F5F5F7] px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-[88rem] mx-auto">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div>
            <p className="text-black/30 text-xs font-semibold uppercase tracking-widest mb-3">Все устройства</p>
            <h2 className="text-gray-900 text-4xl md:text-6xl font-bold tracking-tight leading-none">
              Выберите<br />устройство
            </h2>
          </div>
        </motion.div>

        {/* Bento сетка */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:grid-rows-2">

          {/* iPhone — большая карточка */}
          <motion.a
            href={`${WA}${encodeURIComponent('Здравствуйте, хочу узнать цену на ремонт iPhone')}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between cursor-pointer md:row-span-2 min-h-[300px] md:min-h-0 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1"
          >
            {/* Верхняя цветная линия */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem] bg-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-end mb-8">
                <AppleLogo className="w-10 h-10 text-gray-200" />
              </div>

              <h3 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">iPhone</h3>
              <p className="text-gray-400 text-sm mb-6">Все модели · с X по 17 Pro Max</p>

              <div className="flex flex-col gap-2.5">
                {['Замена экрана и стекла', 'Батарея и зарядка', 'Камера и Face ID', 'Платы и контроллеры'].map(s => (
                  <div key={s} className="flex items-center gap-3 text-gray-500 text-base md:text-lg">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-300" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between mt-10">
              <div>
                <p className="text-gray-400 text-xs mb-1">от</p>
                <p className="text-gray-900 text-3xl font-bold">15 000 ₸</p>
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#007AFF] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.a>

          {/* Маленькие карточки */}
          {SMALL_DEVICES.map((d, i) => {
            const Logo = LOGOS[d.name];
            return (
              <motion.a
                key={d.id}
                href={`${WA}${encodeURIComponent(`Здравствуйте, хочу узнать цену на ремонт ${d.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
                className="group relative overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-7 flex flex-col justify-between cursor-pointer transition-all duration-500 min-h-[220px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                {/* Верхняя цветная линия */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: d.accent }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-end mb-5">
                    {Logo && (
                      <Logo
                        className={`${d.name === 'Samsung' ? 'h-5 w-24' : 'h-8 w-8'} opacity-15 group-hover:opacity-30 transition-opacity duration-300`}
                        style={{ color: d.accent }}
                      />
                    )}
                  </div>

                  <h3 className="text-gray-900 text-3xl font-bold tracking-tight mb-1">{d.name}</h3>
                  <p className="text-gray-400 text-xs mb-5">{d.sub}</p>

                  <div className="flex flex-col gap-2.5">
                    {d.services.map(s => (
                      <div key={s} className="flex items-center gap-2.5 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-300" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between mt-6">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">от</p>
                    <p className="text-gray-900 text-2xl font-bold">{d.from}</p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0"
                    style={{ backgroundColor: d.accent }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </motion.a>
            );
          })}

        </div>
      </div>
    </section>
  );
}
