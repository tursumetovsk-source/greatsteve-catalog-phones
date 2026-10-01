import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { GSI_DESCRIPTION, GSI_PATH, GSI_TITLE, formatTenge, gsiBatteryOffers, gsiFaq } from '../data/gsiBatteryOffers';

const WA_URL = `https://wa.me/77775181111?text=${encodeURIComponent('Здравствуйте! Хочу заменить аккумулятор на усиленный GSI по акции. Моя модель iPhone: ')}`;

export default function GsiBatteryPage() {
  return (
    <div style={{ background: '#101210', color: '#F6F7F2' }}>
      <SEOHead title={GSI_TITLE} description={GSI_DESCRIPTION} canonical={GSI_PATH} schema={[
        { '@context': 'https://schema.org', '@type': 'Service', name: 'Замена усиленного аккумулятора GSI для iPhone в Алматы', url: `https://greatsteve.kz${GSI_PATH}`, areaServed: { '@type': 'City', name: 'Алматы' }, provider: { '@type': 'LocalBusiness', name: 'Greatsteve', telephone: '+77775181111', address: { '@type': 'PostalAddress', streetAddress: 'Гоголя 75/1 уг. ул. Тулебаева', addressLocality: 'Алматы', addressCountry: 'KZ' } } },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: gsiFaq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      ]} />
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <p className="mb-4 text-sm font-semibold" style={{ color: '#C1FF72' }}>Greatsteve · Алматы · Гоголя 75/1</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Замена аккумулятора iPhone.<br /><span style={{ color: '#C1FF72' }}>Усиленный GSI по акции.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">iPhone быстро разряжается? Напишите точную модель — подтвердим наличие аккумулятора и запишем на замену. Цена включает GSI и работу. Гарантия 6 месяцев.</p>
        <a href={WA_URL} data-contact-placement="gsi_hero" target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full px-7 py-4 font-semibold" style={{ background: '#C1FF72', color: '#101210' }}>Записаться в WhatsApp</a>

        <section className="mt-14" aria-labelledby="gsi-prices">
          <h2 id="gsi-prices" className="text-3xl font-bold">Цена с заменой</h2>
          <p className="mt-3 max-w-3xl leading-relaxed">Одна цена внутри каждой линейки: обычная версия, Pro, Pro Max, Plus и mini, где они есть. Перед визитом проверим наличие для вашей модели.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gsiBatteryOffers.map(offer => (
              <article key={offer.series} className="rounded-3xl border p-6" style={{ borderColor: '#545454' }}>
                <h3 className="text-xl font-semibold">Линейка iPhone {offer.series}</h3>
                <p className="mt-4 text-lg"><span className="sr-only">До скидки: </span><s>{formatTenge(offer.previousPrice)}</s></p>
                <p className="mt-1 text-4xl font-bold" style={{ color: '#C1FF72' }}><span className="sr-only">По акции: </span>{formatTenge(offer.price)}</p>
                <p className="mt-4 text-sm">Усиленный GSI + работа по замене</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="gsi-faq">
          <h2 id="gsi-faq" className="text-3xl font-bold">Перед визитом</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {gsiFaq.map(item => <article key={item.q} className="rounded-2xl p-6" style={{ background: '#F6F7F2', color: '#101210' }}><h3 className="text-lg font-semibold">{item.q}</h3><p className="mt-3 leading-relaxed">{item.a}</p></article>)}
          </div>
        </section>
        <section className="mt-14 rounded-3xl p-7 md:p-10" style={{ background: '#C1FF72', color: '#101210' }}>
          <h2 className="text-3xl font-bold">Подберем время замены</h2>
          <p className="mt-3">Алматы, Гоголя 75/1, угол Тулебаева. Ежедневно 10:00–20:00.</p>
          <a href={WA_URL} data-contact-placement="gsi_booking" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full px-6 py-4 font-semibold" style={{ background: '#101210', color: '#F6F7F2' }}>Написать модель iPhone</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
