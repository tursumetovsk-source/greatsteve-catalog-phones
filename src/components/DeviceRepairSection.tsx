import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, ArrowLeft } from 'lucide-react';
import { allModels } from '../data/repairModels';

const WA = 'https://wa.me/77775181111?text=';
type Brand = 'Apple' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo' | 'Huawei';
type DeviceType = 'iPhone' | 'MacBook' | 'iPad' | 'Apple Watch';

// ── Brand icon marks ────────────────────────────────────────────
const XiaomiMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <text x="20" y="26" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="Arial,sans-serif">mi</text>
  </svg>
);

const HuaweiMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 44 44" fill="currentColor">
    <g transform="translate(22,22)">
      {([0,60,120,180,240,300] as number[]).map(r => (
        <path key={r} transform={`rotate(${r})`}
          d="M0-19 C3-19 6-14 6-8 L6-1 C6 2 3 5 0 5 C-3 5-6 2-6-1 L-6-8 C-6-14-3-19 0-19Z" />
      ))}
    </g>
  </svg>
);

const BRAND_MARKS: Record<string, ({ className }: { className?: string }) => JSX.Element> = {
  Xiaomi: XiaomiMark,
  Huawei: HuaweiMark,
};

const OTHER_BRANDS: { id: Brand; name: string; sub: string; color: string; models: string[] }[] = [
  {
    id: 'Xiaomi', name: 'Xiaomi', sub: 'Redmi, POCO, Xiaomi', color: '#FF6900',
    models: [
      'Xiaomi 15 Ultra', 'Xiaomi 15 Pro', 'Xiaomi 15',
      'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14',
      'Xiaomi 13 Ultra', 'Xiaomi 13',
      'Redmi Note 14 Pro+', 'Redmi Note 14 Pro', 'Redmi Note 14',
      'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
      'Poco X7 Pro', 'Poco X7', 'Poco X6 Pro',
      'Poco F6 Pro', 'Poco F6',
      'Redmi 14C', 'Redmi 13C', 'Redmi 13',
    ],
  },
  {
    id: 'Oppo', name: 'OPPO', sub: 'Find, Reno, A серии', color: '#1F2B5F',
    models: [
      'OPPO Find X8 Pro', 'OPPO Find X8',
      'OPPO Find X7 Ultra', 'OPPO Find X7 Pro', 'OPPO Find X7',
      'OPPO Reno 13 Pro', 'OPPO Reno 13',
      'OPPO Reno 12 Pro', 'OPPO Reno 12',
      'OPPO Reno 11 Pro', 'OPPO Reno 11',
      'OPPO A3 Pro', 'OPPO A3',
      'OPPO A98', 'OPPO A78', 'OPPO A58',
    ],
  },
  {
    id: 'Vivo', name: 'vivo', sub: 'X, V, Y серии', color: '#415FFF',
    models: [
      'Vivo X200 Ultra', 'Vivo X200 Pro', 'Vivo X200',
      'Vivo X100 Ultra', 'Vivo X100 Pro', 'Vivo X100',
      'Vivo V40 Pro', 'Vivo V40',
      'Vivo V30 Pro', 'Vivo V30',
      'Vivo Y200 Pro', 'Vivo Y200',
      'Vivo Y100', 'Vivo Y78', 'Vivo Y36',
    ],
  },
  {
    id: 'Huawei', name: 'Huawei', sub: 'Pura, Mate, Nova серии', color: '#CF0A2C',
    models: [
      'Huawei Pura 70 Ultra', 'Huawei Pura 70 Pro+', 'Huawei Pura 70 Pro', 'Huawei Pura 70',
      'Huawei Mate 70 Pro+', 'Huawei Mate 70 Pro', 'Huawei Mate 70',
      'Huawei Mate 60 Pro+', 'Huawei Mate 60 Pro', 'Huawei Mate 60',
      'Huawei P60 Pro', 'Huawei P60',
      'Huawei Nova 13 Pro', 'Huawei Nova 13',
      'Huawei Nova 12 Ultra', 'Huawei Nova 12 Pro', 'Huawei Nova 12',
    ],
  },
];

const APPLE_DEVICES: { id: DeviceType; name: string; sub: string; img?: string; from: string }[] = [
  { id: 'iPhone',      name: 'iPhone',      sub: 'с X по 17 Pro Max',  img: '/devices/models/iphone-17-pro-max.png', from: 'от 15 000 ₸' },
  { id: 'MacBook',     name: 'MacBook',     sub: 'Air, Pro, M1–M4',                                                  from: 'от 20 000 ₸' },
  { id: 'iPad',        name: 'iPad',        sub: 'Air, Pro, Mini',                                                   from: 'от 12 000 ₸' },
  { id: 'Apple Watch', name: 'Apple Watch', sub: 'Series 4–10, Ultra',                                              from: 'от 8 000 ₸'  },
];

type ModelCard = { name: string; img: string };

const APPLE_WATCH_MODELS: ModelCard[] = [
  { name: 'Apple Watch SE',      img: '/devices/models/apple-watch-se.webp'      },
  { name: 'Apple Watch 4',       img: '/devices/models/apple-watch-4.webp'       },
  { name: 'Apple Watch 5',       img: '/devices/models/apple-watch-5.webp'       },
  { name: 'Apple Watch 6',       img: '/devices/models/apple-watch-6.webp'       },
  { name: 'Apple Watch 7',       img: '/devices/models/apple-watch-7.webp'       },
  { name: 'Apple Watch 8',       img: '/devices/models/apple-watch-8.webp'       },
  { name: 'Apple Watch 9',       img: '/devices/models/apple-watch-9.webp'       },
  { name: 'Apple Watch 10',      img: '/devices/models/apple-watch-10.webp'      },
  { name: 'Apple Watch Ultra',   img: '/devices/models/apple-watch-ultra.webp'   },
  { name: 'Apple Watch Ultra 2', img: '/devices/models/apple-watch-ultra-2.webp' },
];

const MACBOOK_MODELS: ModelCard[] = [
  { name: 'MacBook Air M1',  img: '/devices/models/macbook-air-m1.webp' },
  { name: 'MacBook Air M2',  img: '/devices/models/macbook-air-m2.webp' },
  { name: 'MacBook Air M3',  img: '/devices/models/macbook-air-m3.webp' },
  { name: 'MacBook Pro 13"', img: '/devices/models/macbook-pro-13.webp' },
  { name: 'MacBook Pro 14"', img: '/devices/models/macbook-pro-14.webp' },
  { name: 'MacBook Pro 16"', img: '/devices/models/macbook-pro-16.webp' },
];

const IPAD_MODELS: ModelCard[] = [
  { name: 'iPad Mini',    img: '/devices/models/ipad-mini.webp'   },
  { name: 'iPad Air',     img: '/devices/models/ipad-air.webp'    },
  { name: 'iPad Pro 11"', img: '/devices/models/ipad-pro-11.webp' },
  { name: 'iPad Pro 13"', img: '/devices/models/ipad-pro-13.webp' },
  { name: 'iPad 9',       img: '/devices/models/ipad-9.webp'      },
  { name: 'iPad 10',      img: '/devices/models/ipad-10.webp'     },
];

const IPHONE_GROUPS = [
  { label: 'iPhone 17', prefix: 'iphone-17' },
  { label: 'iPhone 16', prefix: 'iphone-16' },
  { label: 'iPhone 15', prefix: 'iphone-15' },
  { label: 'iPhone 14', prefix: 'iphone-14' },
  { label: 'iPhone 13', prefix: 'iphone-13' },
  { label: 'iPhone 12', prefix: 'iphone-12' },
  { label: 'iPhone 11', prefix: 'iphone-11' },
  { label: 'iPhone X',  prefix: 'iphone-x'  },
];

const AppleLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const SamsungLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 220 72" fill="currentColor">
    <ellipse cx="110" cy="36" rx="107" ry="32" fill="none" stroke="currentColor" strokeWidth="4" />
    <text x="110" y="47" textAnchor="middle" fontSize="26" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="4" fill="currentColor">SAMSUNG</text>
  </svg>
);

function ModelCardUI({ name, img, fallbackImg, href, to }: { name: string; img: string; fallbackImg?: string; href?: string; to?: string }) {
  const inner = (
    <div className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
      <div className="w-full h-20 flex items-center justify-center">
        <img src={img} alt={name} className="max-h-full max-w-full object-contain drop-shadow-sm"
          onError={e => {
            const el = e.currentTarget as HTMLImageElement;
            if (fallbackImg && el.src.endsWith('.png')) { el.src = fallbackImg; return; }
            el.style.display = 'none';
            const p = el.parentElement;
            if (p) { p.style.background = '#F5F5F7'; p.style.borderRadius = '12px'; }
          }}
        />
      </div>
      <p className="text-xs font-semibold text-[#1D1D1F] text-center leading-tight">{name}</p>
    </div>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
}

// ── Main component ──────────────────────────────────────────────
export default function DeviceRepairSection() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);

  const iphoneModels  = allModels.filter(m => m.slug.startsWith('iphone'));
  const samsungModels = allModels.filter(m => m.slug.startsWith('samsung'));

  const openBrand  = (b: Brand) => { setSelectedBrand(b); setSelectedDevice(null); };
  const openDevice = (d: DeviceType) => setSelectedDevice(d);
  const goBack     = () => setSelectedDevice(null);
  const closeModal = () => { setSelectedBrand(null); setSelectedDevice(null); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedBrand ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBrand]);

  const otherBrand = OTHER_BRANDS.find(b => b.id === selectedBrand);
  const modalTitle = selectedDevice
    ? 'Выберите модель'
    : selectedBrand === 'Apple'
      ? 'Выберите устройство'
      : 'Выберите модель';

  return (
    <section id="devices" className="bg-[#F5F5F7] px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-[88rem] mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
          <p className="text-black/25 text-xs font-semibold uppercase tracking-widest mb-3">Все устройства</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">Выберите устройство</h2>
        </motion.div>

        {/* Apple + Samsung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <motion.button onClick={() => openBrand('Apple')}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col justify-between text-left min-h-[200px] transition-all duration-300 hover:-translate-y-1 border-2"
            style={{ background: '#1D1D1F', borderColor: 'transparent' }}
          >
            <AppleLogo className="w-9 h-9 text-white/20 mb-4" />
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-1">Apple</h3>
              <p className="text-white/40 text-sm">iPhone · MacBook · iPad · Apple Watch</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-white/40 text-sm">от 8 000 ₸</p>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ChevronRight size={15} className="text-white" />
              </div>
            </div>
          </motion.button>

          <motion.button onClick={() => openBrand('Samsung')}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col justify-between text-left min-h-[200px] transition-all duration-300 hover:-translate-y-1 border-2"
            style={{ background: '#1428A0', borderColor: 'transparent' }}
          >
            <SamsungLogo className="h-5 w-32 text-white/20 mb-4" />
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-1">Samsung</h3>
              <p className="text-white/40 text-sm">Galaxy S, A, Z серии</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-white/40 text-sm">от 10 000 ₸</p>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ChevronRight size={15} className="text-white" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Xiaomi / Oppo / Vivo / Huawei */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OTHER_BRANDS.map((b, i) => {
            const Mark = BRAND_MARKS[b.id];
            return (
              <motion.button key={b.id} onClick={() => openBrand(b.id)}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative overflow-hidden rounded-2xl px-5 pt-5 pb-4 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-0.5 border-2 min-h-[160px]"
                style={{ background: b.color, borderColor: 'transparent' }}
              >
                {Mark && <Mark className="h-8 w-8 text-white/25 mb-auto" />}
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{b.name}</h3>
                  <p className="text-white/40 text-xs mb-3">{b.sub}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white/40 text-xs">от 8 000 ₸</p>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <ChevronRight size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl w-full shadow-2xl flex flex-col"
              style={{ maxWidth: 720, maxHeight: '88vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                  {selectedDevice && (
                    <button onClick={goBack}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                      <ArrowLeft size={16} />
                    </button>
                  )}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold leading-none mb-1">
                      {selectedDevice ? `${selectedBrand} · ${selectedDevice}` : selectedBrand}
                    </p>
                    <h3 className="text-lg font-bold text-[#1D1D1F] leading-tight">{modalTitle}</h3>
                  </div>
                </div>
                <button onClick={closeModal}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>

              {/* Modal content — animates between steps */}
              <div className="overflow-y-auto flex-1 p-6">
                <AnimatePresence mode="wait">

                  {/* Step 1: Apple device types */}
                  {selectedBrand === 'Apple' && !selectedDevice && (
                    <motion.div key="apple-devices"
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {APPLE_DEVICES.map(d => (
                        <button key={d.id} onClick={() => openDevice(d.id)}
                          className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors text-center group border border-gray-100">
                          {d.img && (
                            <div className="w-full h-24 flex items-center justify-center">
                              <img src={d.img} alt={d.name} className="max-h-full object-contain drop-shadow-sm"
                                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-[#1D1D1F]">{d.name}</p>
                            <p className="text-xs text-gray-400">{d.sub}</p>
                            <p className="text-xs text-blue-500 font-medium mt-0.5">{d.from}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#1D1D1F] transition-colors">
                            Выбрать <ChevronRight size={12} />
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2: Apple models */}
                  {selectedBrand === 'Apple' && selectedDevice && (
                    <motion.div key={`apple-${selectedDevice}`}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.18 }}
                    >
                      {selectedDevice === 'iPhone' && (
                        <div className="flex flex-col gap-6">
                          {IPHONE_GROUPS.map(({ label, prefix }) => {
                            const models = iphoneModels.filter(m => m.slug.startsWith(prefix));
                            if (!models.length) return null;
                            return (
                              <div key={label}>
                                <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-3">{label}</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                  {models.map(m => (
                                    <ModelCardUI key={m.slug} name={m.name} img={`/devices/models/${m.slug}.png`} fallbackImg={`/devices/models/${m.slug}.jpg`} to={`/remont/${m.slug}`} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {selectedDevice === 'Apple Watch' && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {APPLE_WATCH_MODELS.map((m, i) => (
                            <ModelCardUI key={i} name={m.name} img={m.img}
                              href={`${WA}${encodeURIComponent(`Здравствуйте, нужен ремонт ${m.name}. Хочу узнать цену.`)}`} />
                          ))}
                        </div>
                      )}
                      {selectedDevice === 'MacBook' && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {MACBOOK_MODELS.map((m, i) => (
                            <ModelCardUI key={i} name={m.name} img={m.img}
                              href={`${WA}${encodeURIComponent(`Здравствуйте, нужен ремонт ${m.name}. Хочу узнать цену.`)}`} />
                          ))}
                        </div>
                      )}
                      {selectedDevice === 'iPad' && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {IPAD_MODELS.map((m, i) => (
                            <ModelCardUI key={i} name={m.name} img={m.img}
                              href={`${WA}${encodeURIComponent(`Здравствуйте, нужен ремонт ${m.name}. Хочу узнать цену.`)}`} />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Samsung models */}
                  {selectedBrand === 'Samsung' && (
                    <motion.div key="samsung"
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                      className="flex flex-col gap-6"
                    >
                      {[
                        { label: 'Galaxy S25', prefix: 'samsung-s25' },
                        { label: 'Galaxy S24', prefix: 'samsung-s24' },
                        { label: 'Galaxy S23', prefix: 'samsung-s23' },
                        { label: 'Galaxy Z (складные)', prefix: 'samsung-z' },
                        { label: 'Galaxy A', prefix: 'samsung-a' },
                      ].map(({ label, prefix }) => {
                        const models = samsungModels.filter(m => m.slug.startsWith(prefix));
                        if (!models.length) return null;
                        return (
                          <div key={label}>
                            <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-3">{label}</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {models.map(m => (
                                <ModelCardUI key={m.slug}
                                  name={m.name.replace('Samsung Galaxy ', '')}
                                  img={`/devices/models/${m.slug}.jpg`}
                                  to={`/remont/${m.slug}`}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Other brands */}
                  {otherBrand && (
                    <motion.div key={selectedBrand}
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}
                      className="grid grid-cols-2 gap-2"
                    >
                      {otherBrand.models.map((name, i) => (
                        <a key={i}
                          href={`${WA}${encodeURIComponent(`Здравствуйте, нужен ремонт ${name}. Хочу узнать цену.`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex flex-col gap-0.5 hover:bg-[#1D1D1F] group transition-colors duration-200"
                        >
                          <span className="text-sm font-semibold text-[#1D1D1F] group-hover:text-white leading-tight">{name}</span>
                          <span className="text-xs text-gray-400 group-hover:text-white/60">Узнать цену →</span>
                        </a>
                      ))}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
