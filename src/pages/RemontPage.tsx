import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import RepairTypesSection from '../components/RepairTypesSection';
import UseCasesSection from '../components/UseCasesSection';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RepairBusiness',
  '@id': 'https://greatsteve.kz/remont#repair',
  name: 'GreatSteve — Ремонт телефонов и ноутбуков в Алматы',
  url: 'https://greatsteve.kz/remont',
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
    opens: '09:00',
    closes: '20:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Виды ремонта',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'RepairAction', name: 'Замена экрана iPhone', description: 'Оригинальный дисплей с сохранением True Tone и влагозащиты. От 30 минут.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'RepairAction', name: 'Замена аккумулятора iPhone', description: 'АКБ с оригинальным чипом, 100% ёмкость. От 20 минут.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'RepairAction', name: 'Ремонт MacBook в Алматы', description: 'Замена клавиатуры, дисплея, SSD. Ремонт платы MacBook Air и Pro.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'RepairAction', name: 'Ремонт Samsung в Алматы', description: 'Замена AMOLED дисплея, батареи, корпуса Samsung Galaxy.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'RepairAction', name: 'Бесплатная диагностика', description: 'Полная проверка всех систем устройства бесплатно при ремонте.' } },
    ],
  },
};

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
    { '@type': 'ListItem', position: 2, name: 'Ремонт iPhone и MacBook', item: 'https://greatsteve.kz/remont' },
  ],
};

const FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Сколько стоит замена экрана iPhone в Алматы?',
      acceptedAnswer: { '@type': 'Answer', text: 'Замена экрана iPhone в GreatSteve от 15 000 ₸. iPhone X–11 от 15 000 ₸, iPhone 12–13 от 22 000 ₸, iPhone 14–15 от 28 000 ₸. Оригинальные дисплеи с True Tone и влагозащитой. Ремонт за 30–60 минут при вас.' },
    },
    {
      '@type': 'Question',
      name: 'Сколько времени занимает ремонт iPhone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Замена экрана или аккумулятора — 20–60 минут прямо при вас. Ремонт платы или сложные случаи — от 1 дня. Работаем ежедневно 09:00–20:00, Алматы, Гоголя 75/1 уг. ул.Тулебаева.' },
    },
    {
      '@type': 'Question',
      name: 'Есть ли гарантия на ремонт iPhone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Да, даём гарантию от 3 до 12 месяцев на все виды ремонта — на запчасти и на работу мастера.' },
    },
    {
      '@type': 'Question',
      name: 'Используете ли вы оригинальные запчасти для ремонта?',
      acceptedAnswer: { '@type': 'Answer', text: 'Да, только оригинальные запчасти. Для iPhone — дисплеи с сохранением True Tone и влагозащиты, АКБ с оригинальным чипом. Для Samsung — оригинальные AMOLED матрицы.' },
    },
    {
      '@type': 'Question',
      name: 'Можно ли сделать бесплатную диагностику телефона?',
      acceptedAnswer: { '@type': 'Answer', text: 'Да, диагностика бесплатна при ремонте. Приходите на Гоголя 75/1 уг. ул.Тулебаева или звоните на 8 777 518 11 11. Работаем ежедневно с 09:00 до 20:00.' },
    },
  ],
};

const GUARANTEES = [
  'Оригинальные запчасти от производителей',
  'Гарантия до 12 месяцев на все работы',
  'Ремонт при вас — видите весь процесс',
  'Бесплатная диагностика',
  'Работаем ежедневно 09:00 — 20:00',
  'Оплата после — только за результат',
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function RemontPage() {
  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen text-black">
      <SEOHead
        title="Ремонт iPhone, MacBook и Android в Алматы — GreatSteve"
        description="Замена экрана iPhone от 15 000 ₸, батареи от 8 000 ₸. Ремонт MacBook, Samsung, iPad. Оригинальные запчасти, гарантия 12 месяцев. Бесплатная диагностика. Алматы, Гоголя 75/1 уг. ул.Тулебаева."
        keywords="ремонт iPhone Алматы, замена экрана iPhone, замена батареи iPhone, ремонт MacBook Алматы, ремонт Samsung Алматы, ремонт iPad Алматы, бесплатная диагностика телефона"
        canonical="/remont"
        ogImage="/main/serivice1.jpg"
        schema={[SCHEMA, FAQ, BREADCRUMB]}
      />
      <Navbar />
      <HeroSection />
      <InfoSection />
      <RepairTypesSection />
      <UseCasesSection />

      {/* Почему выбирают нас */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-white">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div {...fade()}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight text-black">
                Почему выбирают<br />
                <span className="text-gray-300">Greatsteve</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                Мы не просто чиним — мы возвращаем устройству жизнь и даём уверенность в результате.
              </p>
            </motion.div>
            <motion.div {...fade(0.1)} className="flex flex-col gap-4">
              {GUARANTEES.map((g, i) => (
                <div key={i} className="flex items-center gap-5 bg-[#F5F5F7] rounded-[1.5rem] px-6 py-5">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0" strokeWidth={1.5} />
                  <span className="text-gray-800 text-lg md:text-xl font-medium">{g}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Внутренняя ссылка */}
      <section className="px-4 md:px-6 py-8 bg-white border-t border-gray-100">
        <div className="max-w-[88rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-base md:text-lg font-medium">Хотите продать или обменять устройство?</p>
          <Link
            to="/tradein"
            className="text-base md:text-lg font-bold text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-1.5"
          >
            Выкуп и Trade-in iPhone →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
