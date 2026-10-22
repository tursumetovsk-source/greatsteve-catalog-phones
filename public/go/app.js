const dialog = document.querySelector('#price-dialog');
const search = document.querySelector('#price-search');
const tabs = [...document.querySelectorAll('[data-price-category]')];
const sections = [...document.querySelectorAll('[data-category]')];
let category = 'Батареи';
function normalize(value) {
  return value.toLowerCase().replaceAll('ё', 'е').replaceAll('айфон', 'iphone').replaceAll('айпад', 'ipad').replace(/\s+/g, ' ').trim();
}
function filterPrices() {
  const query = normalize(search.value);
  let visible = 0;
  for (const section of sections) {
    const groupMatches = query || section.dataset.category === category;
    let rows = 0;
    const titleMatches = query && normalize(section.querySelector('h3').textContent).includes(query);
    for (const row of section.querySelectorAll('.price-line')) {
      row.hidden = !groupMatches || !!query && !titleMatches && !normalize(row.textContent).includes(query);
      if (!row.hidden) rows++;
    }
    section.hidden = !rows;
    visible += rows;
  }
  document.querySelector('.empty-state').hidden = visible > 0;
  for (const tab of tabs) tab.setAttribute('aria-pressed', String(!query && tab.dataset.priceCategory === category));
}
document.querySelector('#open-prices').addEventListener('click', () => {
  filterPrices();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  document.querySelector('.close-dialog').focus({ preventScroll: true });
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
search.addEventListener('input', filterPrices);
for (const tab of tabs) tab.addEventListener('click', () => {
  category = tab.dataset.priceCategory;
  search.value = '';
  filterPrices();
  document.querySelector('.price-content').scrollTop = 0;
  tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
});
filterPrices();
