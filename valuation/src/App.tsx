import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowLeft, Battery, CalendarDays, Check, ChevronDown, Copy, Database, FileText, Info, MapPin, Smartphone, Wallet, X } from 'lucide-react';
import catalog from './catalog.json';
import { buildMessage, evaluate, memoryLabel, money, UNKNOWN } from './valuation.mjs';
import { sourceName, track } from './tracking';

type Mode = 'pawn' | 'tradein';
const pawnshops = ['Белый ломбард', 'DEM Ломбард', 'Деньги Маркет', 'Сейф-Ломбард', 'iKomek', 'МФО Белый (СПН)', 'Актив Ломбард', 'TehnoAltyn', 'АСТ Ломбард', 'Другой ломбард'];

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.38-.22-3.03.79.8-2.96-.25-.4A8 8 0 1 1 12 20Zm4.6-5.9c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.12-.57.13-.16.25-.64.82-.78.99-.15.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.57-.43h-.49c-.16 0-.42.06-.65.31-.23.25-.87.85-.87 2.08s.89 2.42 1.02 2.58c.12.17 1.76 2.69 4.26 3.77.6.25 1.06.4 1.42.51.59.19 1.13.16 1.56.1.47-.07 1.49-.61 1.7-1.2.2-.59.2-1.09.14-1.2-.06-.11-.23-.17-.48-.29Z"/></svg>;
}

export default function App() {
  const [mode, setMode] = useState<Mode>(() => new URLSearchParams(location.search).get('mode') === 'tradein' ? 'tradein' : 'pawn');
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
  const isTradein = mode === 'tradein';
  const model = catalog.models.find(item => String(item.id) === modelId);
  const battery = catalog.questions.find(q => q.key === 'batteryHealthManual');
  const redemption = !isTradein && !debtUnknown && debt !== '' && Number.isSafeInteger(Number(debt)) && Number(debt) >= 0 ? Number(debt) : null;
  const result = evaluate(catalog, modelId, memory, answers, redemption);
  const message = buildMessage({ catalog, modelId, memory, answers, pawnshop, redemption, date, requestId, source: sourceName, mode });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (screen) document.getElementById('screen-heading')?.focus();
  }, [screen]);

  function changeMode(next: Mode) {
    setMode(next);
    setScreen(0);
    setCopyStatus('');
    setShowMessage(false);
    const url = new URL(location.href);
    url.searchParams.set('mode', next);
    history.replaceState(null, '', url);
  }

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
      setCopyStatus('Заявка скопирована — вставьте её в Direct');
    } catch {
      setShowMessage(true);
      setCopyStatus('Выделите и скопируйте текст заявки ниже');
    }
  }

  function questionSelect(question: typeof catalog.questions[number]) {
    return <select id={question.key} value={answers[question.key]} onChange={e => setAnswer(question.key, e.target.value)}>
      <option value={UNKNOWN}>Не знаю</option>
      {question.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>;
  }

  return <div className="page">
    <main className={'screen ' + (screen === 0 ? 'hero' : 'form-screen')}>
      <header className="header">
        <button type="button" className="brand" onClick={() => setScreen(0)} aria-label="Greatsteve — начало"><img src="/logo-gs.webp" alt="Greatsteve" width="310" height="44"/></button>
        <span className="city"><MapPin size={14}/><span>Алматы</span></span>
        <button type="button" className="menu-button" aria-label="Как проходит оценка" onClick={() => dialogRef.current?.showModal()}><Info size={21}/></button>
      </header>
      <div className="intent-switch" role="group" aria-label="Выберите способ сделки">
        <button type="button" aria-pressed={!isTradein} onClick={() => changeMode('pawn')}>Выкуп из ломбарда</button>
        <button type="button" aria-pressed={isTradein} onClick={() => changeMode('tradein')}>Trade-in</button>
      </div>

      {screen === 0 ? <section className="hero-content">
        <div className="hero-copy"><span className="hero-eyebrow">Онлайн-оценка iPhone</span>
          <h1>{isTradein ? <>Ваш iPhone<br/><span>в счёт нового</span></> : <>iPhone<br/><span>в ломбарде?</span></>}</h1>
          <p>{isTradein ? 'Узнайте, сколько можно зачесть за ваш телефон при обмене' : 'Узнайте ориентир цены и разницу после погашения залога'}</p>
        </div>
        <div className={`hero-products ${isTradein ? 'tradein-products' : 'pawn-products'}`} aria-hidden="true"><img className="hero-art" src={isTradein ? '/tradein-hero-v2.webp' : '/pawn-hero-v2.webp'} alt="" width={isTradein ? 1254 : 1024} height={isTradein ? 1254 : 1536} fetchPriority="high"/></div>
        <div className="hero-bottom"><button className="primary" type="button" onClick={start}><span>{isTradein ? 'Оценить для Trade-in' : 'Оценить iPhone'}</span><ArrowRight/></button><span className="hero-note">iPhone 13 и новее · Единый прайс оценки</span><p className="hero-qualification">Итоговую цену согласуем после проверки</p></div>
      </section> : <div className="form-content">
        <div className="progress-row"><div className="progress"><span style={{ width: screen === 1 ? '50%' : '100%' }}/></div><span>Шаг {screen} из 2</span></div>
        <h1 id="screen-heading" tabIndex={-1}>{screen === 1 ? <>Расскажите<br/><span>о телефоне</span></> : isTradein ? <>Ваша оценка<br/><span>для Trade-in</span></> : <>Где телефон<br/><span>в залоге?</span></>}</h1>
        {screen === 1 ? <form className="fields" onSubmit={e => { e.preventDefault(); setScreen(2); }}>
          <label htmlFor="model">Модель</label>
          <div className="control"><Smartphone/><select id="model" required value={modelId} onChange={e => { setModelId(e.target.value); setMemory(''); setCopyStatus(''); }}><option value="">Выберите модель</option>{catalog.models.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select><ChevronDown className="select-chevron"/></div>
          <label htmlFor="memory">Память</label>
          <div className="control"><Database/><select id="memory" required disabled={!model} value={memory} onChange={e => { setMemory(e.target.value); setCopyStatus(''); }}><option value="">Выберите память</option>{model?.specs.map(spec => <option value={spec.memory} key={spec.memory}>{memoryLabel(spec.memory)}</option>)}</select><ChevronDown className="select-chevron"/></div>
          {battery && <><label htmlFor={battery.key}>Аккумулятор</label><div className="control"><Battery/>{questionSelect(battery)}<ChevronDown className="select-chevron"/></div></>}
          <p className="field-help">Онлайн показываем верхний ориентир цены<br/>Состояние проверим перед сделкой</p>
          <button className="primary" type="submit"><span>{isTradein ? 'Посмотреть оценку' : 'Далее'}</span><ArrowRight/></button>
          <button type="button" className="back" onClick={() => setScreen(0)}><ArrowLeft size={15}/> Назад</button>
        </form> : <form className="fields final-fields" ref={formRef} onSubmit={sendWhatsApp}>
          {!isTradein && <>
            <label htmlFor="pawnshop">Ломбард</label>
            <div className="control"><MapPin/><select id="pawnshop" required value={pawnshop} onChange={e => { setPawnshop(e.target.value); setCopyStatus(''); }}><option value="">Выберите ломбард</option>{pawnshops.map(name => <option value={name} key={name}>{name}</option>)}</select><ChevronDown className="select-chevron"/></div>
            <label htmlFor="debt">Сумма полного погашения, ₸</label>
            <div className="control"><Wallet/><input id="debt" type="number" inputMode="numeric" min="0" max={Number.MAX_SAFE_INTEGER} step="1" required={!debtUnknown} disabled={debtUnknown} placeholder="Укажите сумму" value={debt} onChange={e => { setDebt(e.target.value); setCopyStatus(''); }}/></div>
            <label className="checkbox-label"><input type="checkbox" checked={debtUnknown} onChange={e => { setDebtUnknown(e.target.checked); setCopyStatus(''); }}/>Не знаю точную сумму</label>
            <p className="field-help">Полное погашение с начислениями на дату выкупа</p>
          </>}
          <label htmlFor="date">{isTradein ? 'Дата обмена' : 'Дата выкупа'}</label>
          <div className="control"><CalendarDays/><input id="date" type="date" aria-describedby="date-help" value={date} onChange={e => { setDate(e.target.value); setCopyStatus(''); }}/></div>
          <p className="field-help" id="date-help">Если пока не знаете, оставьте поле пустым</p>
          <section className={'result' + (isTradein ? ' tradein-result' : '')} aria-label="Предварительная оценка" aria-live="polite">
            <div className="result-title"><FileText/><div><strong>Предварительная оценка</strong><span>{model?.name} · {memoryLabel(Number(memory))}</span></div></div>
            {result.amount === null ? <p className="manual-result">Нужна индивидуальная проверка — отправьте анкету, чтобы обсудить условия</p> : <>
              <div className="result-line"><span>{isTradein ? 'Стоимость вашего iPhone' : result.status === 'ceiling' ? 'Верхний ориентир' : 'По вашей анкете'}</span><strong data-testid="device-amount">{result.status === 'ceiling' && 'до '}{money(result.amount)}</strong></div>
              {!isTradein && <><div className="result-line"><span>Полное погашение</span><strong>{redemption === null ? 'Уточнить' : money(redemption)}</strong></div><div className="result-payout"><span>Разница после погашения</span><strong data-testid="payout">{result.payout === null ? 'Уточним' : result.payout < 0 ? 'Обсудим условия' : (result.status === 'ceiling' ? 'до ' : '') + money(result.payout)}</strong></div>{result.payout !== null && result.payout < 0 && <p className="result-note">Ориентир ниже суммы погашения на {money(-result.payout)} — условия нужно обсудить</p>}</>}
              {isTradein && <p className="tradein-note">Эту стоимость можно зачесть при обмене после проверки телефона</p>}
              {result.status === 'ceiling' && <p className="result-note">Цена зависит от состояния и может быть ниже — итог согласуем после проверки</p>}
            </>}
          </section>
          <button className="primary whatsapp" type="submit"><WhatsAppIcon/><span>Отправить в WhatsApp</span><ArrowRight/></button>
          <button className="secondary" type="button" onClick={copyForDirect}><Copy size={18}/><span>Скопировать для Direct</span></button>
          <a className="direct-link" href="https://ig.me/m/greatstevekz" target="_blank" rel="noopener noreferrer" onClick={e => { if (!ready()) e.preventDefault(); else track('direct_open'); }}>Открыть Direct <ArrowRight size={14}/></a>
          {copyStatus && <p role="status" className="copy-status"><Check size={16}/>{copyStatus}</p>}
          <button className="message-toggle" type="button" onClick={() => setShowMessage(!showMessage)}>{showMessage ? 'Скрыть заявку' : 'Посмотреть готовую заявку'}</button>
          {showMessage && <textarea className="message-preview" aria-label="Готовая заявка" readOnly value={message} onFocus={e => e.target.select()}/>}
          <p className="disclaimer"><Info size={17}/><span>{isTradein ? 'Предварительная оценка не фиксирует стоимость обмена — точные условия согласуем после проверки' : 'При выкупе вы продаёте телефон Greatsteve — точную цену согласуем после проверки'}</span></p>
          <button className="back" type="button" onClick={() => setScreen(1)}><ArrowLeft size={15}/> Назад</button>
        </form>}
      </div>}
    </main>
    <p className="page-foot">Greatsteve · Алматы · Гоголя 75/1</p>
    <dialog ref={dialogRef} className="info-dialog">
      <button className="dialog-close" type="button" aria-label="Закрыть информацию" onClick={() => dialogRef.current?.close()}><X/></button>
      <h2>{isTradein ? 'Как проходит Trade-in' : 'Как проходит выкуп'}</h2>
      {isTradein ? <><ol><li>Укажите модель, память и состояние аккумулятора</li><li>Получите предварительную оценку по единому прайсу</li><li>После проверки согласуем стоимость вашего телефона и условия обмена</li></ol><p>Цена предварительная и может измениться после осмотра</p></> : <><ol><li>Заполните анкету и отправьте её Greatsteve</li><li>Мы проверяем телефон, сумму погашения и согласуем цену и порядок сделки</li><li>При согласованном выкупе погашается залог, телефон переходит Greatsteve, а положительная разница выплачивается вам</li></ol><p>Это продажа телефона — после сделки он не возвращается вам<br/>Онлайн-оценка предварительная</p></>}
      <p><strong>Алматы, Гоголя 75/1</strong><br/>WhatsApp: +7 777 518 1111</p>
      <a href="https://greatsteve.kz" target="_blank" rel="noopener noreferrer">Основной сайт Greatsteve ↗</a>
    </dialog>
  </div>;
}
