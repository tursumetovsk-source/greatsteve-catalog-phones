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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.260296,
        longitude: 76.947493,
      },
      areaServed: {
        '@type': 'City',
        name: 'Алматы',
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
  ],
};

export default function MainPage() {
  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen text-black">
      <SEOHead
        title="Ремонт телефонов в Алматы — iPhone и Android | GreatSteve"
        description="Ремонт телефонов в Алматы: iPhone, Samsung, Xiaomi и других Android-смартфонов. Цены на сайте, бесплатная диагностика при ремонте, гарантия до 12 месяцев. Гоголя 75/1, ежедневно 10:00–20:00."
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
