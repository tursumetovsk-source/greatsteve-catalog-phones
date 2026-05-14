import { MessageCircle } from 'lucide-react';

const HERO_BRANDS = [
  { name: 'iPhone', style: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px' } },
  { name: 'MACBOOK', style: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' as const } },
  { name: 'iPad', style: { fontFamily: '"Trebuchet MS", sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: '15px', fontStyle: 'italic' as const } },
  { name: 'APPLE WATCH', style: { fontFamily: '"Courier New", monospace', fontWeight: 700, letterSpacing: '0.12em', fontSize: '13px', textTransform: 'uppercase' as const } },
  { name: 'AirPods', style: { fontFamily: 'Palatino, "Book Antiqua", serif', fontWeight: 400, letterSpacing: '-0.01em', fontSize: '16px' } },
  { name: 'iMac', style: { fontFamily: 'Impact, "Arial Narrow", sans-serif', fontWeight: 400, letterSpacing: '0.04em', fontSize: '14px' } },
  { name: 'Samsung', style: { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '14px' } },
  { name: 'ANDROID', style: { fontFamily: 'Roboto, sans-serif', fontWeight: 600, letterSpacing: '0.02em', fontSize: '14px', textTransform: 'uppercase' as const } },
  { name: 'Laptop', style: { fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.01em', fontSize: '15px' } },
  { name: 'Xiaomi', style: { fontFamily: '"Segoe UI", sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: '15px' } },
  { name: 'Oppo', style: { fontFamily: '"Open Sans", sans-serif', fontWeight: 500, letterSpacing: '0.01em', fontSize: '15px' } },
  { name: 'Vivo', style: { fontFamily: '"Ubuntu", sans-serif', fontWeight: 500, letterSpacing: '0.02em', fontSize: '15px', fontStyle: 'italic' as const } },
];

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/remont/ostav-remont.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
        src="/remont/remont.mp4"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 pt-[108px] md:pt-[120px]">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-medium leading-[0.95] tracking-[-0.04em] mb-6 text-white">
            Ремонт iPhone,<br />MacBook и Android<br />в Алматы
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-sm mb-8 md:mb-10 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Оригинальные запчасти и гарантия на ремонт от 3 до 12 месяцев
          </p>
          <a
            href="https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 liquid-glass text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors duration-200 w-max"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>

        <div className="w-full overflow-hidden">
          <div className="marquee-track">
            {[...HERO_BRANDS, ...HERO_BRANDS].map((brand, i) => (
              <div key={i} className="flex items-center mx-7 shrink-0 text-white/50 whitespace-nowrap" style={{ ...brand.style }}>
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
