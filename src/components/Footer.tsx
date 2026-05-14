import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';

function ContractModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Шапка */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Договор присоединения</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {/* Контент */}
        <div className="overflow-y-auto px-8 py-6 text-sm text-gray-700 leading-relaxed space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">г. Алматы · БИН 901128401389</p>

          <p>Настоящий Договор присоединения (далее — «Договор») заключается между Сервисным центром <strong>Greatsteve</strong> (ИП, БИН 901128401389, г. Алматы, Гоголя 75/1 уг. ул.Тулебаева) и Клиентом, принявшим условия настоящего Договора путём обращения за услугами.</p>

          <h3 className="font-bold text-gray-900 pt-2">1. Предмет договора</h3>
          <p>1.1. Исполнитель обязуется оказать Клиенту услуги по диагностике, ремонту и техническому обслуживанию электронной техники (смартфоны, планшеты, ноутбуки, умные часы и иные устройства), а Клиент обязуется принять и оплатить данные услуги.</p>
          <p>1.2. Перечень конкретных работ, их стоимость и сроки выполнения согласовываются при приёме устройства и фиксируются в квитанции.</p>

          <h3 className="font-bold text-gray-900 pt-2">2. Права и обязанности сторон</h3>
          <p>2.1. Исполнитель обязуется выполнить работы качественно, в согласованные сроки, с использованием оригинальных или сертифицированных запчастей.</p>
          <p>2.2. Исполнитель вправе отказать в ремонте, если устройство имеет повреждения, делающие ремонт нецелесообразным, уведомив об этом Клиента.</p>
          <p>2.3. Клиент обязуется предоставить устройство в Сервисный центр, сообщить о всех известных неисправностях и своевременно оплатить услуги.</p>
          <p>2.4. Клиент подтверждает, что является владельцем устройства либо уполномочен владельцем на сдачу устройства в ремонт.</p>

          <h3 className="font-bold text-gray-900 pt-2">3. Стоимость и порядок оплаты</h3>
          <p>3.1. Стоимость услуг определяется согласно действующему прайс-листу Исполнителя и/или индивидуальному согласованию.</p>
          <p>3.2. Оплата производится после выполнения ремонта и до выдачи устройства Клиенту, если иное не согласовано сторонами.</p>
          <p>3.3. Диагностика является платной услугой. В случае согласия Клиента на ремонт стоимость диагностики включается в общую стоимость работ.</p>

          <h3 className="font-bold text-gray-900 pt-2">4. Гарантия</h3>
          <p>4.1. На выполненные работы предоставляется гарантия сроком до <strong>12 месяцев</strong> в зависимости от вида ремонта.</p>
          <p>4.2. Гарантия не распространяется на механические повреждения, попадание влаги, а также неисправности, возникшие вследствие действий третьих лиц после ремонта.</p>

          <h3 className="font-bold text-gray-900 pt-2">5. Хранение устройства</h3>
          <p>5.1. Устройство, не востребованное Клиентом в течение 30 дней с момента уведомления о готовности, хранится бесплатно. После истечения указанного срока Исполнитель вправе взимать плату за хранение.</p>

          <h3 className="font-bold text-gray-900 pt-2">6. Ответственность сторон</h3>
          <p>6.1. Исполнитель несёт ответственность за сохранность устройства в период его нахождения в Сервисном центре.</p>
          <p>6.2. Исполнитель не несёт ответственности за потерю данных на устройстве. Клиенту рекомендуется выполнить резервное копирование данных до сдачи устройства в ремонт.</p>

          <h3 className="font-bold text-gray-900 pt-2">7. Обработка персональных данных</h3>
          <p>7.1. Принимая условия настоящего Договора, Клиент даёт согласие на обработку своих персональных данных (имя, номер телефона) в целях исполнения договора, связи по вопросам ремонта и информирования об акциях.</p>

          <h3 className="font-bold text-gray-900 pt-2">8. Заключительные положения</h3>
          <p>8.1. Настоящий Договор вступает в силу с момента сдачи устройства в Сервисный центр.</p>
          <p>8.2. По всем вопросам обращайтесь: <strong>+7 777 518 11 11</strong> или <strong>greatstevekz1@icloud.com</strong>.</p>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">Greatsteve · г. Алматы, Гоголя 75/1 уг. ул.Тулебаева · БИН 901128401389</p>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { label: 'Ремонт', to: '/remont' },
  { label: 'Купить / Продать', to: '/tradein' },
  { label: 'Аренда', to: '/arenda' },
  { label: 'О компании', to: '/company' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

export default function Footer() {
  const [showContract, setShowContract] = useState(false);

  return (
    <footer className="bg-[#0A0A0A] text-white overflow-hidden">
      {showContract && <ContractModal onClose={() => setShowContract(false)} />}

      {/* Верхняя часть — большой CTA */}
      <div className="relative px-4 md:px-6 pt-14 md:pt-20 pb-12 md:pb-16 border-b border-white/8">
        {/* Фоновое фото */}
        <img
          src="/podval.jpeg"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain object-center opacity-10 pointer-events-none"
          style={{ transform: 'scale(1.1)' }}
        />

        <div className="max-w-[88rem] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-row gap-2 sm:gap-3">
            <a
              href="https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white text-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href="https://t.me/+77775181111"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/10 text-white border border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-white/15 transition-colors"
            >
              <TelegramIcon />
              Telegram
            </a>
            <a
              href="https://www.instagram.com/greatstevekz?igsh=emFueHdkODYwNnA1"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/10 text-white border border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm hover:bg-white/15 transition-colors"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Средняя часть — контакты и навигация */}
      <div className="px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-[88rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Логотип + договор */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <img src="/logo-gs.webp" alt="Greatsteve" className="h-7 w-auto object-contain object-left" />
            <button onClick={() => setShowContract(true)} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-4 py-2 rounded-full self-start mt-3">
              Договор присоединения
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Контакты</p>
            <a href="tel:+77775181111" className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
              8 777 518 11 11
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="mailto:greatstevekz1@icloud.com" className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
              greatstevekz1@icloud.com
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Навигация */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Страницы</p>
            {NAV.map(link => (
              <Link key={link.to} to={link.to} className="group flex items-center justify-between text-base font-medium text-white/70 hover:text-white transition-colors">
                {link.label}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Адрес и часы */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Где нас найти</p>
            <p className="text-base font-medium text-white/70">Алматы, Гоголя 75/1 уг. ул.Тулебаева</p>
            <p className="text-base text-white/40">Ежедневно 09:00 — 20:00</p>
            <p className="text-base text-white/40 mt-1">БИН: 901128401389</p>
          </div>

        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="px-4 md:px-6 py-5 border-t border-white/8">
        <div className="max-w-[88rem] mx-auto flex items-center justify-end">
          <p className="text-xs text-white/30">© 2026 Greatsteve. Все права защищены.</p>
        </div>
      </div>

    </footer>
  );
}
