import { ArrowDown, ArrowUpRight, MapPin, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { GSI_DESCRIPTION, GSI_PATH, GSI_TITLE, formatTenge, gsiBatteryOffers, gsiFaq } from '../data/gsiBatteryOffers';
import { REPAIR_TIMES } from '../data/repairTimes';

const WA_URL = `https://wa.me/77775181111?text=${encodeURIComponent('Здравствуйте! Хочу заменить аккумулятор на усиленный JCID по акции. Моя модель iPhone: ')}`;
const offerDetails = [
  { label: 'Цена с установкой', value: `от ${formatTenge(gsiBatteryOffers[0].price)}` },
  { label: 'Время замены', value: REPAIR_TIMES.battery },
  { label: 'Гарантия', value: '6 месяцев' },
];

export default function GsiBatteryPage() {
  return (
    <div className="bg-[#f1f4f8] text-[#171e29]">
      <SEOHead title={GSI_TITLE} description={GSI_DESCRIPTION} canonical={GSI_PATH} schema={[
        { '@context': 'https://schema.org', '@type': 'Service', name: 'Замена усиленного аккумулятора JCID для iPhone в Алматы', url: `https://greatsteve.kz${GSI_PATH}`, areaServed: { '@type': 'City', name: 'Алматы' }, provider: { '@type': 'LocalBusiness', name: 'Greatsteve', telephone: '+77775181111', address: { '@type': 'PostalAddress', streetAddress: 'Гоголя 75/1 уг. ул. Тулебаева', addressLocality: 'Алматы', addressCountry: 'KZ' } } },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: gsiFaq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      ]} />
      <Navbar />
      <main>
        <section className="bg-[#111923] text-[#f6f7f2]">
          <div className="mx-auto grid max-w-[82rem] gap-x-12 gap-y-7 px-5 pt-28 pb-9 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-y-10 lg:pt-36 lg:pb-12">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-[#b9c6d8]">
                <MapPin size={16} aria-hidden="true" /> Алматы · Гоголя 75/1
              </p>
              <h1 className="mt-4 max-w-[17ch] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.03] font-semibold tracking-[-0.045em]">
                Замена аккумулятора iPhone
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#d4deeb] sm:text-lg">
                Усиленный <strong className="font-semibold text-[#9dc7ff]">JCID</strong> для iPhone 11–16. Аккумулятор и работа входят в цену.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={WA_URL} data-contact-placement="gsi_hero" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#9dc7ff] px-5 text-sm font-semibold text-[#111923] transition-colors hover:bg-[#c2ddff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9dc7ff]">
                  Записаться в WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href="#gsi-prices" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-[#f6f7f2] transition-colors hover:text-[#9dc7ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9dc7ff]">
                  Посмотреть цены <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-x-3 border-t border-white/15 pt-5 lg:col-span-2 lg:gap-x-6">
              {offerDetails.map(({ label, value }) => (
                <div key={label} className="grid content-start gap-1">
                  <dt className="text-xs leading-snug text-[#b9c6d8] sm:text-sm">{label}</dt>
                  <dd className="order-first text-[clamp(1rem,4.4vw,1.125rem)] leading-tight font-semibold tracking-tight sm:text-2xl">{value}</dd>
                </div>
              ))}
            </dl>

            <img src="/remont/jcid/iphone-repair.png" alt="" width="935" height="760" decoding="async" fetchPriority="high"
              className="h-auto max-h-[17rem] w-full max-w-[34rem] justify-self-center object-contain sm:max-h-80 lg:col-start-2 lg:row-start-1 lg:max-h-[23rem]" />
          </div>
        </section>

        <div className="mx-auto max-w-[82rem] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 lg:pb-20">
          <section aria-labelledby="gsi-prices">
            <h2 id="gsi-prices" className="scroll-mt-28 text-3xl font-semibold tracking-tight sm:text-4xl">Цена с заменой</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#485569]">
              Внутри каждой линейки действует одна цена, включая версии Pro, Pro Max, Plus и mini, где они выпускались. Наличие подтвердим перед визитом.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gsiBatteryOffers.map(offer => (
                <li key={offer.series} className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-[#273951]/10 bg-white p-4 sm:p-5">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">Линейка iPhone {offer.series}</h3>
                    <p className="mt-2 text-sm text-[#546379]"><span className="sr-only">Цена до скидки </span><s>{formatTenge(offer.previousPrice)}</s></p>
                    <p className="text-2xl font-semibold whitespace-nowrap tracking-tight tabular-nums sm:text-3xl"><span className="sr-only">Цена по акции </span>{formatTenge(offer.price)}</p>
                  </div>
                  <img src={`/remont/jcid/iphone-${offer.series}.png`} alt="" loading="lazy" decoding="async" width="128" height="92" className="h-[4.6rem] w-[6.25rem] shrink-0 object-contain xl:h-[5.75rem] xl:w-32" />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="gsi-faq" className="mt-12 grid items-stretch gap-x-6 gap-y-5 lg:mt-16 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <h2 id="gsi-faq" className="col-span-full text-3xl font-semibold tracking-tight sm:text-4xl">Перед визитом</h2>
            <div className="space-y-2">
              {gsiFaq.map(item => (
                <details key={item.q} className="group rounded-2xl border border-[#273951]/10 bg-white">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-semibold marker:content-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2164a2] sm:px-5 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus size={18} aria-hidden="true" className="shrink-0 text-[#326da7] transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="px-4 pb-4 leading-relaxed text-[#485569] sm:px-5">{item.a}</p>
                </details>
              ))}
            </div>
            <aside className="flex flex-col rounded-3xl bg-[#111923] p-6 text-[#f6f7f2] sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Подберём время замены</h3>
              <p className="mt-3 leading-relaxed text-[#d4deeb]">
                Алматы, Гоголя 75/1, угол Тулебаева.<br />Ежедневно 10:00–20:00.
              </p>
              <div className="mt-auto pt-5">
                <a href={WA_URL} data-contact-placement="gsi_booking" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#9dc7ff] px-5 text-sm font-semibold text-[#111923] transition-colors hover:bg-[#c2ddff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9dc7ff]">
                  Написать модель iPhone <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
