import { Link } from 'react-router-dom';
import { GSI_PATH } from '../data/gsiBatteryOffers';

export default function GsiBatteryBanner() {
  return (
    <section className="px-4 py-10 md:px-6" style={{ background: '#101210', color: '#F6F7F2' }}>
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold" style={{ color: '#C1FF72' }}>Акция на iPhone 11–16</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Усиленный GSI от 12 000 ₸</h2>
          <p className="mt-3 text-base">Аккумулятор и замена включены. Гарантия 6 месяцев.</p>
        </div>
        <Link to={GSI_PATH} className="self-start rounded-full px-7 py-4 font-semibold md:self-auto" style={{ background: '#C1FF72', color: '#101210' }}>
          Цена для моего iPhone
        </Link>
      </div>
    </section>
  );
}
