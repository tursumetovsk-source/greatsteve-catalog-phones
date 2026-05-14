const STATS = [
  { num: '5 000+', label: 'ремонтов выполнено', index: '01' },
  { num: '12 мес',  label: 'гарантия на ремонт',  index: '02' },
  { num: '30 мин',  label: 'средний ремонт',       index: '03' },
  { num: '4.9',     label: 'рейтинг клиентов',     index: '04' },
  { num: '2019',    label: 'работаем с этого года', index: '05' },
];

const CARD_H = 220;
const GAP = 16;

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  return (
    <div
      className="bg-white rounded-[24px] p-8 flex flex-col justify-between shrink-0"
      style={{
        width: 260,
        height: CARD_H,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)',
      }}
    >
      <span className="text-[11px] font-medium text-[#CACACA] tracking-[0.15em] self-end">
        {stat.index}
      </span>
      <p className="text-[3.8rem] font-black text-[#0D0D0D] leading-none tracking-tight tabular-nums">
        {stat.num}
      </p>
      <div className="flex flex-col gap-2">
        <div className="h-[1px] bg-[#E8E8E8]" />
        <p className="text-[15px] text-[#9A9A9A] font-medium leading-snug">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function VerticalMarquee({ stat, reverse }: { stat: typeof STATS[0]; reverse?: boolean }) {
  const items = [stat, stat, stat, stat, stat, stat];
  const trackH = items.length * (CARD_H + GAP);

  return (
    <div style={{ height: 480, overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: GAP,
          animation: `vert-scroll 10s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          willChange: 'transform',
        }}
      >
        {[...items, ...items].map((s, i) => (
          <StatCard key={i} stat={s} />
        ))}
      </div>
      <style>{`
        @keyframes vert-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-${trackH}px); }
        }
      `}</style>
    </div>
  );
}

const DIRECTIONS = [false, true, true, false, true];

export default function BackedBySection() {
  return (
    <section className="bg-[#2C2C2E] pt-8 md:pt-10 pb-4" style={{ overflow: 'clip' }}>

      {/* Заголовок */}
      <div className="max-w-[88rem] mx-auto px-4 md:px-6 mb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 mb-2">В цифрах</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          Нам доверяют
        </h2>
      </div>

      {/* Мобиль: простая сетка */}
      <div className="md:hidden px-4 grid grid-cols-2 gap-3 pb-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-[20px] p-5 flex flex-col justify-between"
            style={{ minHeight: 140, boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)' }}
          >
            <span className="text-[10px] font-medium text-[#CACACA] tracking-[0.15em] self-end">{stat.index}</span>
            <p className="text-[2.2rem] font-black text-[#0D0D0D] leading-none tracking-tight tabular-nums">
              {stat.num}
            </p>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="h-[1px] bg-[#E8E8E8]" />
              <p className="text-[12px] text-[#9A9A9A] font-medium leading-snug">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Планшет и десктоп: 3D эффект */}
      <div
        className="hidden md:flex relative w-full flex-row items-center justify-center"
        style={{ height: 520, perspective: 400 }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 z-10"
          style={{ background: 'linear-gradient(to bottom, #EBEBEB, transparent)' }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 z-10"
          style={{ background: 'linear-gradient(to top, #EBEBEB, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{ width: 160, background: 'linear-gradient(to right, #EBEBEB, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{ width: 160, background: 'linear-gradient(to left, #EBEBEB, transparent)' }} />

        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform: 'translateX(-120px) translateY(0px) translateZ(-120px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
          }}
        >
          {STATS.map((stat, i) => (
            <VerticalMarquee key={i} stat={stat} reverse={DIRECTIONS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
