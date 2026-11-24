import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, ArrowLeft } from 'lucide-react';
import { allModels } from '../data/repairModels';
import { repairModelImage } from '../data/repairModelImage';

const WA = 'https://wa.me/77775181111?text=';
type Brand = 'Apple' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo' | 'Huawei';
type DeviceType = 'iPhone' | 'MacBook' | 'iPad' | 'Apple Watch';

const OTHER_BRANDS: { id: Brand; name: string; sub: string; color: string; logo: string; models: string[] }[] = [
  {
    id: 'Xiaomi', name: 'Xiaomi', sub: 'Redmi, POCO, Xiaomi', color: '#AF4100', logo: '/devices/brands/xiaomi.png',
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
    id: 'Oppo', name: 'OPPO', sub: 'Find, Reno, A серии', color: '#1F2B5F', logo: '/devices/brands/oppo.svg',
    models: [
      'OPPO Find X8 Pro', 'OPPO Find X8',
      'OPPO Find X7 Ultra', 'OPPO Find X7',
      'OPPO Reno 13 Pro', 'OPPO Reno 13',
      'OPPO Reno 12 Pro', 'OPPO Reno 12',
      'OPPO Reno 11 Pro', 'OPPO Reno 11',
      'OPPO A3 Pro', 'OPPO A3',
      'OPPO A98', 'OPPO A78', 'OPPO A58',
    ],
  },
  {
    id: 'Vivo', name: 'vivo', sub: 'X, V, Y серии', color: '#354DD8', logo: '/devices/brands/vivo.svg',
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
    id: 'Huawei', name: 'Huawei', sub: 'Pura, Mate, Nova серии', color: '#BD0928', logo: '/devices/brands/huawei.svg',
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

const APPLE_DEVICES: { id: DeviceType; name: string; sub: string; img: string; from: string }[] = [
  { id: 'iPhone',      name: 'iPhone',      sub: 'с X по 18 Pro Max',  img: repairModelImage('iphone-18-pro-max'), from: 'от 15 000 ₸' },
  { id: 'MacBook',     name: 'MacBook',     sub: 'Air, Pro, M1–M4', img: '/devices/repair/macbook-air-m3.webp', from: 'от 20 000 ₸' },
  { id: 'iPad',        name: 'iPad',        sub: 'Air, Pro, Mini', img: '/devices/repair/ipad-air.webp', from: 'от 12 000 ₸' },
  { id: 'Apple Watch', name: 'Apple Watch', sub: 'Series 4–10, Ultra', img: '/devices/repair/apple-watch-10.webp', from: 'от 8 000 ₸' },
];

type ModelCard = { name: string; img: string };

const APPLE_WATCH_MODELS: ModelCard[] = [
  { name: 'Apple Watch SE',      img: '/devices/repair/apple-watch-se.webp'      },
  { name: 'Apple Watch 4',       img: '/devices/repair/apple-watch-4.webp'       },
  { name: 'Apple Watch 5',       img: '/devices/repair/apple-watch-5.webp'       },
  { name: 'Apple Watch 6',       img: '/devices/repair/apple-watch-6.webp'       },
  { name: 'Apple Watch 7',       img: '/devices/repair/apple-watch-7.webp'       },
  { name: 'Apple Watch 8',       img: '/devices/repair/apple-watch-8.webp'       },
  { name: 'Apple Watch 9',       img: '/devices/repair/apple-watch-9.webp'       },
  { name: 'Apple Watch 10',      img: '/devices/repair/apple-watch-10.webp'      },
  { name: 'Apple Watch Ultra',   img: '/devices/repair/apple-watch-ultra.webp'   },
  { name: 'Apple Watch Ultra 2', img: '/devices/repair/apple-watch-ultra-2.webp' },
];

const MACBOOK_MODELS: ModelCard[] = [
  { name: 'MacBook Air M1',  img: '/devices/repair/macbook-air-m1.webp' },
  { name: 'MacBook Air M2',  img: '/devices/repair/macbook-air-m2.webp' },
  { name: 'MacBook Air M3',  img: '/devices/repair/macbook-air-m3.webp' },
  { name: 'MacBook Pro 13"', img: '/devices/repair/macbook-pro-13.webp' },
  { name: 'MacBook Pro 14"', img: '/devices/repair/macbook-pro-14.webp' },
  { name: 'MacBook Pro 16"', img: '/devices/repair/macbook-pro-16.webp' },
];

const IPAD_MODELS: ModelCard[] = [
  { name: 'iPad Mini',    img: '/devices/repair/ipad-mini.webp'   },
  { name: 'iPad Air',     img: '/devices/repair/ipad-air.webp'    },
  { name: 'iPad Pro 11"', img: '/devices/repair/ipad-pro-11.webp' },
  { name: 'iPad Pro 13"', img: '/devices/repair/ipad-pro-13.webp' },
  { name: 'iPad 9',       img: '/devices/repair/ipad-9.webp'      },
  { name: 'iPad 10',      img: '/devices/repair/ipad-10.webp'     },
];

const IPHONE_GROUPS = [
  { label: 'iPhone 18', prefix: 'iphone-18' },
  { label: 'iPhone 17', prefix: 'iphone-17' },
  { label: 'iPhone 16', prefix: 'iphone-16' },
  { label: 'iPhone 15', prefix: 'iphone-15' },
  { label: 'iPhone 14', prefix: 'iphone-14' },
  { label: 'iPhone 13', prefix: 'iphone-13' },
  { label: 'iPhone 12', prefix: 'iphone-12' },
  { label: 'iPhone 11', prefix: 'iphone-11' },
  { label: 'iPhone X',  prefix: 'iphone-x'  },
];

function ModelCardUI({ name, img, href, to, action }: { name: string; img: string; href?: string; to?: string; action?: string }) {
  const inner = (
    <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <img src={img} alt="" loading="lazy" decoding="async" className="h-20 w-full object-contain" />
      <p className="text-xs font-semibold text-[#1D1D1F] text-center leading-tight">{name}</p>
      {action && <span className="text-center text-xs text-gray-500">{action}</span>}
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
    <section id="devices" className="scroll-mt-24 bg-[#F5F5F7] px-4 py-16 md:scroll-mt-28 md:px-6 md:py-24">
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
            <div>
              <h3 className="mb-4 flex h-14 items-center gap-4 text-4xl font-bold tracking-tight text-white md:h-16 md:text-5xl">
                <img src="/devices/brands/apple.svg" alt="" className="h-12 w-10 object-contain md:h-14 md:w-12" />
                Apple
              </h3>
              <p className="text-sm text-white/85">iPhone · MacBook · iPad · Apple Watch</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-sm text-white/85">от 8 000 ₸</p>
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
            <div>
              <h3 className="mb-4 flex h-14 items-center md:h-16">
                <span className="sr-only">Samsung</span>
                <img src="/devices/brands/samsung.svg" alt="" className="h-12 w-48 max-w-full object-contain object-left md:w-56" />
              </h3>
              <p className="text-sm text-white/85">Galaxy S и A серии</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-sm text-white/85">от 10 000 ₸</p>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ChevronRight size={15} className="text-white" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Xiaomi / Oppo / Vivo / Huawei */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OTHER_BRANDS.map((b, i) => {
            const isXiaomi = b.id === 'Xiaomi';
            return (
              <motion.button key={b.id} onClick={() => openBrand(b.id)}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative overflow-hidden rounded-2xl px-5 pt-5 pb-4 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-0.5 border-2 min-h-[160px]"
                style={{ background: b.color, borderColor: 'transparent' }}
              >
                <div>
                  <h3 className="mb-3 flex h-12 items-center gap-2 text-lg font-bold tracking-tight text-white lg:text-2xl">
                    <img src={b.logo} alt="" className={isXiaomi
                      ? 'h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10'
                      : 'h-10 w-32 max-w-full object-contain object-left brightness-0 invert'} />
                    <span className={isXiaomi ? undefined : 'sr-only'}>{b.name}</span>
                  </h3>
                  <p className="mb-3 text-xs text-white/90">{b.sub}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/90">от 8 000 ₸</p>
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
                          <img src={d.img} alt="" decoding="async" className="h-24 w-full object-contain" />
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
                                    <ModelCardUI key={m.slug} name={m.name}
                                      img={repairModelImage(m.slug)}
                                      to={`/remont/${m.slug}`} />
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
                        { label: 'Galaxy S22', prefix: 'samsung-s22' },
                        { label: 'Galaxy S21', prefix: 'samsung-s21' },
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
                                  img={repairModelImage(m.slug)}
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
                      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                    >
                      {otherBrand.models.map(name => {
                        const slug = name.toLowerCase().replace(/\+/g, ' plus').replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
                        return <ModelCardUI key={name} name={name} img={`/devices/repair/${slug}.jpg`} action="Узнать цену →"
                          href={`${WA}${encodeURIComponent(`Здравствуйте, нужен ремонт ${name}. Хочу узнать цену.`)}`} />;
                      })}
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
