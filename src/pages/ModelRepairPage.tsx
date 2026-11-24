import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { modelsBySlug } from '../data/repairModels';
import { modelRepairContent } from '../data/modelRepairContent';
import { repairModelImage } from '../data/repairModelImage';
import { BUSINESS, breadcrumb, repairServiceSchema } from '../data/repairSchema';
import { formatTenge, gsiOfferForModel, GSI_PATH } from '../data/gsiBatteryOffers';

const WHITE_BACKGROUND_IPHONES = new Set(['iphone-12-pro-max', 'iphone-11-pro-max', 'iphone-11', 'iphone-xr']);

export default function ModelRepairPage() {
  const { model } = useParams<{ model: string }>();
  const data = model ? modelsBySlug[model] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) return <Navigate to="/remont" replace />;
  const gsiOffer = gsiOfferForModel(data.slug);
  const { title, description, summary, bookingUrl } = modelRepairContent(data);
  const image = repairModelImage(data.slug);
  const imageHasBackground = data.photoOnWhite || image.endsWith('.jpg') || WHITE_BACKGROUND_IPHONES.has(data.slug);

  const path = `/remont/${data.slug}`;
  const schema = [
    BUSINESS,
    breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'Ремонт', path: '/remont' }, { name: `Ремонт ${data.name}`, path }),
    repairServiceSchema(`Ремонт ${data.name} в Алматы`, path, summary),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEOHead
        title={title}
        description={description}
        keywords={`ремонт ${data.name} Алматы, замена экрана ${data.name} Алматы, замена аккумулятора ${data.name} Алматы, сервис ${data.name} Алматы`}
        canonical={path}
        ogImage={image}
        schema={schema}
      />
      <Navbar />

      {/* HERO */}
      <section className={imageHasBackground ? 'bg-white text-[#1d1d1f]' : 'bg-[#1d1d1f] text-white'}>
        <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-8 px-6 pt-28 pb-12 md:grid-cols-2 md:gap-12 md:px-10 md:pt-36 md:pb-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="mb-4 text-[11px] leading-relaxed font-medium tracking-[0.2em] uppercase opacity-70">
                Алматы · Гоголя 75/1 · Ежедневно 10:00–20:00
              </p>

              <h1 style={{ fontSize: 'clamp(28px, 4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 20 }}>
                Ремонт {data.name}<br />
                <span className={imageHasBackground ? 'text-blue-700' : 'bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-transparent'}>
                  в Алматы
                </span>
              </h1>

              <p className="text-base leading-relaxed opacity-80">
                {summary}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={bookingUrl}
                target="_blank" rel="noopener noreferrer"
                className={`rounded-full px-6 py-3.5 text-center text-sm font-semibold ${imageHasBackground ? 'bg-[#1d1d1f] text-white' : 'bg-white text-[#1d1d1f]'}`}
              >
                Записаться в WhatsApp
              </a>
              <a
                href="tel:+77775181111"
                className="rounded-full border border-current/30 px-6 py-3.5 text-center text-sm font-medium"
              >
                8 777 518 11 11
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex min-w-0 flex-col items-center justify-center gap-5"
          >
            <img src={image} alt={data.name} decoding="async" fetchPriority="high" width="560" height="350"
              className="h-48 w-full max-w-[35rem] object-scale-down sm:h-72 lg:h-[350px]" />
            {gsiOffer && (
              <div className="w-full max-w-[31rem] text-center">
                <p className="font-semibold">Усиленный аккумулятор JCID · {formatTenge(gsiOffer.price)}</p>
                <p className="mt-1 text-sm opacity-75">Замена включена. Гарантия 6 месяцев.</p>
                <Link to={GSI_PATH} className="mt-2 inline-block text-sm font-medium underline underline-offset-4">Все цены и условия акции</Link>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* REPAIRS TABLE */}
      <section style={{ background: '#f5f5f7', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: 8, textAlign: 'center' }}
          >
            Цены на ремонт {data.name}
          </motion.h2>
          <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.45)', marginBottom: 40, fontSize: 16 }}>
            {data.customerPartOnly ? 'Стоимость установки вашей детали уточним перед визитом' : 'Перед визитом подтвердим наличие деталей для вашей модели'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.repairs.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: '#fff', borderRadius: 16, padding: '20px 24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 500, color: '#111' }}>{r.name}</span>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>{r.time}</span>
                  <span style={{ fontSize: 17, fontWeight: 700, color: r.price === 'Бесплатно' ? '#16a34a' : '#111', whiteSpace: 'nowrap' }}>{r.price}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'rgba(0,0,0,0.35)' }}>
            {gsiOffer ? 'Цена аккумулятора JCID по акции включает замену. Стоимость других работ согласуем перед ремонтом.' : 'Цены указаны с учётом работы. Точную стоимость согласуем после диагностики. При ремонте диагностика бесплатна.'}
          </p>
        </div>
      </section>

      {/* ТИПИЧНЫЕ ПОЛОМКИ */}
      {data.problems && data.problems.length > 0 && (
        <section style={{ background: '#fff', padding: 'clamp(32px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: 28, textAlign: 'center' }}
            >
              Типичные поломки {data.name}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, maxWidth: 1400, margin: '0 auto' }}>
              {data.problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{ background: '#f5f5f7', borderRadius: 16, padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 15, color: '#111', fontWeight: 500, lineHeight: 1.5 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECS + GUARANTEES */}
      <section style={{ background: '#fff', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 24 }}>
            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: '#f5f5f7', borderRadius: 24, padding: '40px 36px' }}
            >
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 24 }}>Характеристики {data.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['Год выпуска', data.year],
                  ['Дисплей', data.screen],
                  ['Чип', data.chip],
                ].filter(([, value]) => value).map(([label, val], idx, arr) => (
                  <div key={String(label)} style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: idx > 0 ? 16 : 0, paddingBottom: idx < arr.length - 1 ? 16 : 0, borderBottom: idx < arr.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                    <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                    <span style={{ fontSize: 17, fontWeight: 600, color: '#111' }}>{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ background: '#1d1d1f', borderRadius: 24, padding: '40px 36px' }}
            >
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Почему GreatSteve</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  data.customerPartOnly ? 'Проверим совместимость вашей детали' : 'Тип детали согласуем до ремонта',
                  data.customerPartOnly ? 'Условия гарантии на работу согласуем до ремонта' : gsiOffer ? 'Гарантия на JCID — 6 месяцев' : 'Гарантия до 12 месяцев в зависимости от работы',
                  'Диагностика бесплатна при ремонте',
                  'Ежедневно 10:00–20:00',
                  'Оплата после ремонта',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', flexShrink: 0 }} />
                    <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f5f5f7', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: 32, textAlign: 'center' }}
          >
            Частые вопросы
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 8 }}>
            {data.faq.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{
                    width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{f.q}</span>
                  <ChevronDown
                    size={20}
                    style={{ flexShrink: 0, color: '#666', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: 15, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
                    {f.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1d1d1f', padding: 'clamp(48px, 8vw, 80px) 24px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}
        >
          Ремонт {data.name} в Алматы
        </motion.h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32 }}>
          Гоголя 75/1 уг. ул.Тулебаева · Ежедневно 10:00–20:00
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={bookingUrl}
            target="_blank" rel="noopener noreferrer"
            style={{ background: '#fff', color: '#111', borderRadius: 100, padding: '14px 36px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
          >
            Написать в WhatsApp
          </a>
          <Link
            to="/remont"
            style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 100, padding: '14px 36px', fontSize: 15, textDecoration: 'none' }}
          >
            Все услуги ремонта
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
