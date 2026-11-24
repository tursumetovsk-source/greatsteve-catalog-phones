export const SITE = 'https://greatsteve.kz';

export const BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#organization`,
  name: 'GreatSteve',
  description: 'Ремонт iPhone, Samsung, Xiaomi, MacBook и другой техники в Алматы.',
  url: SITE,
  telephone: '+77775181111',
  image: `${SITE}/logo-gs.webp`,
  priceRange: '₸₸',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
    addressLocality: 'Алматы',
    addressCountry: 'KZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.260296,
    longitude: 76.947493,
  },
  areaServed: { '@type': 'City', name: 'Алматы' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '20:00',
  },
  sameAs: [
    'https://maps.app.goo.gl/Utn9cuXYm2JBEHfg7',
    'https://2gis.kz/almaty/firm/70000001040518505',
    'https://yandex.kz/maps/ru/org/greatsteve/5393916179/',
    'https://www.instagram.com/greatstevekz/',
    'https://www.tiktok.com/@greatstevekz02',
    'https://www.threads.com/@greatstevekz',
  ],
};

export const breadcrumb = (...items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

export const repairServiceSchema = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  url: `${SITE}${path}`,
  description,
  areaServed: BUSINESS.areaServed,
  provider: { '@id': BUSINESS['@id'] },
});
