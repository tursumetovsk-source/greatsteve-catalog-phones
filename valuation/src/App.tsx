import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowLeft, Battery, CalendarDays, Check, ChevronDown, Copy, Database, FileText, Info, MapPin, Menu, Smartphone, Wallet, X } from 'lucide-react';
import catalog from './catalog.json';
import { buildMessage, evaluate, memoryLabel, money, UNKNOWN } from './valuation.mjs';
import { sourceName, track } from './tracking';

const pawnshops = ['Белый ломбард', 'DEM Ломбард', 'Деньги Маркет', 'Сейф-Ломбард', 'iKomek', 'МФО Белый (СПН)', 'Актив Ломбард', 'TehnoAltyn', 'АСТ Ломбард', 'Другой ломбард'];

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.38-.22-3.03.79.8-2.96-.25-.4A8 8 0 1 1 12 20Zm4.6-5.9c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.12-.57.13-.16.25-.64.82-.78.99-.15.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.57-.43h-.49c-.16 0-.42.06-.65.31-.23.25-.87.85-.87 2.08s.89 2.42 1.02 2.58c.12.17 1.76 2.69 4.26 3.77.6.25 1.06.4 1.42.51.59.19 1.13.16 1.56.1.47-.07 1.49-.61 1.7-1.2.2-.59.2-1.09.14-1.2-.06-.11-.23-.17-.48-.29Z"/></svg>;
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const [modelId, setModelId] = useState('');
  const [memory, setMemory] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>(() => Object.fromEntries(catalog.questions.map(q => [q.key, UNKNOWN])));
  const [pawnshop, setPawnshop] = useState('');
  const [debt, setDebt] = useState('');
  const [debtUnknown, setDebtUnknown] = useState(false);
  const [date, setDate] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [requestId] = useState(() => 'GS-' + crypto.randomUUID().slice(0, 8).toUpperCase());
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const started = useRef(false);
  const readyMessage = useRef('');
  const model = catalog.models.find(item => String(item.id) === modelId);
  const battery = catalog.questions.find(q => q.key === 'batteryHealthManual');
  const redemption = !debtUnknown && debt !== '' && Number.isSafeInteger(Number(debt)) && Number(debt) >= 0 ? Number(debt) : null;
  const result = evaluate(catalog, modelId, memory, answers, redemption);
  const message = buildMessage({ catalog, modelId, memory, answers, pawnshop, redemption, date, requestId, source: sourceName });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (screen) document.getElementById('screen-heading')?.focus();
  }, [screen]);

  function start() {
    if (!started.current) { track('assessment_start'); started.current = true; }
    setScreen(1);
  }

  function setAnswer(key: string, value: string) {
    setAnswers(previous => ({ ...previous, [key]: value }));
    setCopyStatus('');
  }

  function ready() {
    if (!formRef.current?.reportValidity()) return false;
    if (readyMessage.current !== message) { track('assessment_ready'); readyMessage.current = message; }
    return true;
  }

  function sendWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready()) return;
    track('whatsapp_click');
    window.open('https://wa.me/77775181111?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  }

  async function copyForDirect() {
    if (!ready()) return;
    try {
      await navigator.clipboard.writeText(message);
      track('direct_copy');
      setCopyStatus('Заявка скопирована. Откройте Direct и вставьте её в сообщение.');
    } catch {
      setShowMessage(true);
      setCopyStatus('Выделите и скопируйте текст заявки ниже.');
    }
  }

  function questionSelect(question: typeof catalog.questions[number]) {
    return <select id={question.key} value={answers[question.key]} onChange={e => setAnswer(question.key, e.target.value)}>
      <option value={UNKNOWN}>Не знаю</option>
      {question.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>;
  }

  return <div className="page">
    <p className="desktop-caption">GREATSTEVE · ВЫКУП ИЗ ЛОМБАРДА</p>
    <main className={'screen ' + (screen === 0 ? 'hero' : 'form-screen')}>
      <header className="header">
        <button type="button" className="brand" onClick={() => setScreen(0)} aria-label="Greatsteve — начало">
          <span>GREAT<span className="brand-accent">STEVE</span></span>
        </button>
        <span className="city"><MapPin size={15}/><span>Алматы</span><ChevronDown size={12}/></span>
        <button type="button" className="menu-button" aria-label="Информация о выкупе" onClick={() => dialogRef.current?.showModal()}><Menu size={25}/></button>
      </header>

      {screen === 0 ? <section className="hero-content">
        <h1>iPhone<br/><span>в ломбарде?</span></h1>
        <p>Заполните анкету для<br className="wide-break"/> предварительной оценки</p>
        <div className="hero-bottom">
          <button className="primary" type="button" onClick={start}><span>Оценить телефон</span><ArrowRight/></button>
          <span className="hero-note">iPhone 13 и новее · Алматы</span>
        </div>
      </section> : <div className="form-content">
        <div className="progress-row"><div className="progress"><span style={{ width: screen === 1 ? '50%' : '100%' }}/></div><span>Шаг {screen} из 2</span></div>
        <h1 id="screen-heading" tabIndex={-1}>{screen === 1 ? <>Расскажите<br/>о телефоне</> : <>Где телефон<br/>в залоге?</>}</h1>

        {screen === 1 ? <form className="fields" onSubmit={e => { e.preventDefault(); setScreen(2); }}>
          <label htmlFor="model">Модель</label>
          <div className="control"><Smartphone/><select id="model" required value={modelId} onChange={e => { setModelId(e.target.value); setMemory(''); setCopyStatus(''); }}>
            <option value="">Выберите модель</option>
            {catalog.models.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
          </select><ChevronDown className="select-chevron"/></div>

          <label htmlFor="memory">Память</label>
          <div className="control"><Database/><select id="memory" required disabled={!model} value={memory} onChange={e => { setMemory(e.target.value); setCopyStatus(''); }}>
            <option value="">Выберите память</option>
            {model?.specs.map(spec => <option value={spec.memory} key={spec.memory}>{memoryLabel(spec.memory)}</option>)}
          </select><ChevronDown className="select-chevron"/></div>

          {battery && <><label htmlFor={battery.key}>Аккумулятор</label><div className="control"><Battery/>{questionSelect(battery)}<ChevronDown className="select-chevron"/></div></>}
          <p className="field-help">Онлайн показываем верхний ориентир цены. Состояние проверим перед выкупом.</p>
          <button className="primary" type="submit"><span>Далее</span><ArrowRight/></button>
          <button type="button" className="back" onClick={() => setScreen(0)}><ArrowLeft size={15}/> Назад</button>
        </form> : <form className="fields final-fields" ref={formRef} onSubmit={sendWhatsApp}>
          <label htmlFor="pawnshop">Ломбард</label>
          <div className="control"><MapPin/><select id="pawnshop" required value={pawnshop} onChange={e => { setPawnshop(e.target.value); setCopyStatus(''); }}>
            <option value="">Выберите ломбард</option>
            {pawnshops.map(name => <option value={name} key={name}>{name}</option>)}
          </select><ChevronDown className="select-chevron"/></div>

          <label htmlFor="debt">Сумма полного погашения, ₸</label>
          <div className="control"><Wallet/><input id="debt" type="number" inputMode="numeric" min="0" max={Number.MAX_SAFE_INTEGER} step="1" required={!debtUnknown} disabled={debtUnknown} placeholder="Укажите сумму" value={debt} onChange={e => { setDebt(e.target.value); setCopyStatus(''); }}/></div>
          <label className="checkbox-label"><input type="checkbox" checked={debtUnknown} onChange={e => { setDebtUnknown(e.target.checked); setCopyStatus(''); }}/>Не знаю точную сумму</label>
          <p className="field-help">Укажите полное погашение с начислениями на дату выкупа.</p>

          <label htmlFor="date">Дата выкупа</label>
          <div className="control"><CalendarDays/><input id="date" type="date" aria-describedby="date-help" value={date} onChange={e => { setDate(e.target.value); setCopyStatus(''); }}/></div>
          <p className="field-help" id="date-help">Если дата пока неизвестна, оставьте поле пустым.</p>

          <section className="result" aria-label="Предварительная оценка" aria-live="polite">
            <div className="result-title"><FileText/><div><strong>Предварительная оценка</strong><span>{model?.name} · {memoryLabel(Number(memory))}</span></div></div>
            {result.amount === null ? <p className="manual-result">Нужна индивидуальная проверка. Отправьте анкету — обсудим условия.</p> : <>
              <div className="result-line"><span>{result.status === 'ceiling' ? 'Верхний ориентир' : 'По вашей анкете'}</span><strong>{result.status === 'ceiling' && 'до '}{money(result.amount)}</strong></div>
              <div className="result-line"><span>Полное погашение</span><strong>{redemption === null ? 'Уточнить' : money(redemption)}</strong></div>
              <div className="result-payout"><span>Разница после погашения</span><strong>{result.payout === null ? 'Уточним' : result.payout < 0 ? 'Обсудим условия' : (result.status === 'ceiling' ? 'до ' : '') + money(result.payout)}</strong></div>
              {result.payout !== null && result.payout < 0 && <p className="result-note">Ориентир ниже суммы погашения на {money(-result.payout)}. Выплата пока не рассчитана.</p>}
              {result.status === 'ceiling' && <p className="result-note">Цена зависит от состояния телефона и может быть ниже. Итог согласуем после проверки.</p>}
            </>}
          </section>

          <button className="primary whatsapp" type="submit"><WhatsAppIcon/><span>Отправить в WhatsApp</span><ArrowRight/></button>
          <button className="secondary" type="button" onClick={copyForDirect}><Copy/><span>Скопировать для Direct</span></button>
          <a className="direct-link" href="https://ig.me/m/greatstevekz" target="_blank" rel="noopener noreferrer" onClick={e => { if (!ready()) e.preventDefault(); else track('direct_open'); }}>Открыть Direct ↗</a>
          {copyStatus && <p role="status" className="copy-status"><Check size={16}/>{copyStatus}</p>}
          <button className="message-toggle" type="button" onClick={() => setShowMessage(!showMessage)}>{showMessage ? 'Скрыть' : 'Посмотреть'} готовую заявку</button>
          {showMessage && <textarea className="message-preview" aria-label="Готовая заявка" readOnly value={message} onFocus={e => e.target.select()}/>}
          <p className="disclaimer"><Info size={18}/><span>Точную цену согласуем после проверки. При выкупе вы продаёте телефон Greatsteve.</span></p>
          <button className="back" type="button" onClick={() => setScreen(1)}><ArrowLeft size={15}/> Назад</button>
        </form>}
      </div>}
    </main>

    <dialog ref={dialogRef} className="info-dialog">
      <button className="dialog-close" type="button" aria-label="Закрыть информацию" onClick={() => dialogRef.current?.close()}><X/></button>
      <h2>Как проходит выкуп</h2>
      <ol><li>Вы заполняете анкету и отправляете её Greatsteve.</li><li>Мы проверяем телефон, сумму погашения и согласуем цену и порядок сделки.</li><li>При согласованном выкупе погашается залог, телефон переходит Greatsteve, а положительная разница выплачивается вам.</li></ol>
      <p>Это продажа телефона. Телефон не возвращается вам после сделки. Онлайн-оценка предварительная.</p>
      <p><strong>Алматы, Гоголя 75/1</strong><br/>WhatsApp: +7 777 518 1111</p>
      <a href="https://greatsteve.kz" target="_blank" rel="noopener noreferrer">Основной сайт Greatsteve ↗</a>
      <img className="original-logo" src="/logo-gs.webp" alt="Логотип GS — Greatsteve"/>
    </dialog>
  </div>;
}
