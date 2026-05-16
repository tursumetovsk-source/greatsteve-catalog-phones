import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MainHero from '../components/MainHero';
import ServicesCards from '../components/ServicesCards';
import AboutBentoSection from '../components/AboutBentoSection';
import ReviewsSection from '../components/ReviewsSection';
import RequestForm from '../components/RequestForm';
import SEOHead from '../components/SEOHead';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://greatsteve.kz/#organization',
      name: 'GreatSteve',
      alternateName: 'Greatsteve сервисный центр',
      description:
        'Профессиональный ремонт iPhone, MacBook, Samsung и Android в Алматы. Trade-in, скупка и продажа техники Apple и Android.',
      url: 'https://greatsteve.kz',
      telephone: '+77775181111',
      image: 'https://greatsteve.kz/logo-gs.webp',
      logo: 'https://greatsteve.kz/logo-gs.webp',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
        addressLocality: 'Алматы',
        addressCountry: 'KZ',
        postalCode: '050000',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        reviewCount: '5000',
      },
      priceRange: '₸₸',
      sameAs: [
        'https://maps.app.goo.gl/Utn9cuXYm2JBEHfg7',
        'https://go.2gis.com/BrzTD',
        'https://yandex.kz/maps/-/CPgzmULh',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги сервисного центра',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ремонт iPhone в Алматы',
              description: 'Замена экрана, батареи, корпуса. Оригинальные запчасти, гарантия 3–12 месяцев.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ремонт MacBook в Алматы',
              description: 'Замена клавиатуры, матрицы, SSD, ремонт платы MacBook Air и MacBook Pro.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ремонт Samsung и Android в Алматы',
              description: 'Ремонт смартфонов Samsung, Xiaomi, Huawei и других Android-устройств.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Trade-in Apple в Алматы',
              description: 'Скупка и выкуп iPhone, MacBook, Apple Watch. Честная оценка, быстрая сделка.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://greatsteve.kz/#website',
      url: 'https://greatsteve.kz',
      name: 'GreatSteve — Сервисный центр в Алматы',
      inLanguage: 'ru',
      publisher: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: 'https://greatsteve.kz/' },
      ],
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Александр В.' },
      datePublished: '2025-05-12',
      reviewBody: 'Разбил экран на iPhone 14 Pro. В официальных сервисах просили ждать неделю. Ребята сделали всё за пару часов прямо при мне. Оригинальный дисплей, True Tone работает.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: 'Google Maps' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Мадина К.' },
      datePublished: '2025-05-08',
      reviewBody: 'Покупала здесь MacBook Air на M2. Цены ниже официалов, дали гарантию, быстро перенесли все данные со старого ноута. Сервис на высшем уровне.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: '2GIS' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Ильяс М.' },
      datePublished: '2025-04-25',
      reviewBody: 'Восстановили утопленный Samsung S23, хотя в другой мастерской сказали выбросить. Данные сохранили, телефон работает как новый.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: 'Yandex Maps' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Диана С.' },
      datePublished: '2025-04-14',
      reviewBody: 'Отличный Trade-in! Сдала свой старый 12 Pro и взяла 15 Pro с минимальной доплатой. Оценили адекватно, не занижали цену как в других местах.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: '2GIS' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Тимур А.' },
      datePublished: '2025-04-03',
      reviewBody: 'Заменили батарею на iPhone 13 за 40 минут. Цена приятная, мастер объяснил всё подробно. Теперь телефон держит заряд как новый.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: 'Google Maps' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Айгерим Н.' },
      datePublished: '2025-03-20',
      reviewBody: 'Пришла с треснутым стеклом на iPad Pro. Сделали быстро и аккуратно, цена честная. Администратор очень вежливый, предложил кофе пока ждала.',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      publisher: { '@type': 'Organization', name: 'Google Maps' },
      itemReviewed: { '@id': 'https://greatsteve.kz/#organization' },
    },
  ],
};

export default function MainPage() {
  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen text-black">
      <SEOHead
        title="Ремонт iPhone и Android в Алматы — Сервисный центр GreatSteve"
        description="Профессиональный ремонт iPhone, MacBook, Samsung и Android в Алматы. Оригинальные запчасти, гарантия до 12 месяцев. Trade-in, скупка и продажа техники. Ежедневно 10:00–20:00."
        keywords="ремонт iPhone Алматы, ремонт телефонов Алматы, сервисный центр Apple Алматы, ремонт MacBook Алматы, ремонт Samsung Алматы, скупка iPhone Алматы, Trade-in Apple Алматы, продажа iPhone Алматы, купить б/у iPhone Алматы, GreatSteve"
        canonical="/"
        ogImage="/main/gs-main1.jpeg"
        schema={SCHEMA}
      />
      <Navbar />
      <MainHero />
      <ServicesCards />
      <AboutBentoSection />
      <div className="pb-12 md:pb-20"><RequestForm /></div>
      <ReviewsSection />
      <Footer />
    </div>
  );
}
