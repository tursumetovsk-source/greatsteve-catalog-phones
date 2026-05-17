import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { modelsBySlug } from '../data/repairModels';

const WA_URL = 'https://wa.me/77775181111';

export default function ModelRepairPage() {
  const { model } = useParams<{ model: string }>();
  const data = model ? modelsBySlug[model] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) return <Navigate to="/remont" replace />;

  const waMsg = encodeURIComponent(`Здравствуйте, нужен ремонт ${data.name}. Хочу узнать цену.`);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'RepairBusiness',
      name: 'GreatSteve — Сервисный центр в Алматы',
      url: `https://greatsteve.kz/remont/${data.slug}`,
      telephone: '+77775181111',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
        addressLocality: 'Алматы',
        addressCountry: 'KZ',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '20:00',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
        { '@type': 'ListItem', position: 2, name: 'Ремонт', item: 'https://greatsteve.kz/remont' },
        { '@type': 'ListItem', position: 3, name: `Ремонт ${data.name}`, item: `https://greatsteve.kz/remont/${data.slug}` },
      ],
    },
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
        title={`Ремонт ${data.name} в Алматы — GreatSteve | Цены и гарантия`}
        description={`Ремонт ${data.name} в Алматы. Замена экрана от ${data.repairs[0].price}, аккумулятора от ${data.repairs[1].price}. Гарантия 12 месяцев. Ежедневно 10:00–20:00. Гоголя 75/1 уг. ул.Тулебаева.`}
        keywords={`ремонт ${data.name} Алматы, замена экрана ${data.name} Алматы, замена аккумулятора ${data.name} Алматы, сервис ${data.name} Алматы`}
        canonical={`/remont/${data.slug}`}
        schema={schema}
      />
      <Navbar />

      {/* HERO */}
      <section style={{ background: '#1d1d1f', paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Левая карточка — текст */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 28, padding: 'clamp(32px,4vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}
          >
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap', marginBottom: 28 }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>GreatSteve</Link>
                <span>/</span>
                <Link to="/remont" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Ремонт</Link>
                <span>/</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{data.name}</span>
              </div>

              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                Алматы · Гоголя 75/1 · Ежедневно 10:00–20:00
              </p>

              <h1 style={{ fontSize: 'clamp(28px, 4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.07, color: '#fff', marginBottom: 20 }}>
                Ремонт {data.name}<br />
                <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  в Алматы
                </span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                {data.intro}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`${WA_URL}?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                style={{ background: '#fff', color: '#111', borderRadius: 100, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
              >
                Узнать точную цену
              </a>
              <a
                href="tel:+77775181111"
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: 100, padding: '14px 32px', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}
              >
                8 777 518 11 11
              </a>
            </div>
          </motion.div>

          {/* Правая карточка — картинка */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}
          >
            {['iphone-17-pro-max', 'iphone-17-pro'].includes(data.slug) && (
              <img
                src={`/devices/models/${data.slug}.webp`}
                alt={data.name}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                style={{ height: 300, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.6))' }}
              />
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
            Алматы, {data.year} — запчасти в наличии
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
            Точная стоимость определяется после бесплатной диагностики. Цены указаны с учётом работы.
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
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, maxWidth: 900, margin: '0 auto' }}>
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
                ].map(([label, val], idx, arr) => (
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
                  'Оригинальные запчасти',
                  'Гарантия до 12 месяцев',
                  'Ремонт при вас',
                  'Бесплатная диагностика',
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
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: 32, textAlign: 'center' }}
          >
            Частые вопросы
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
            href={`${WA_URL}?text=${waMsg}`}
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
