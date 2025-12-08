function makeDiv(className, text) {
  const elem = document.createElement('div');
  elem.classList.add(className);
  elem.appendChild(document.createTextNode(text));
  return elem;
}

const container = document.getElementById('items');
const loader = document.getElementById('loader');

function parseCurrencies(body) {
  for (const code in body.response.Valute) {
    const currency = body.response.Valute[code];
    const elem = document.createElement('div');
    elem.classList.add('item');
    elem.appendChild(makeDiv('item__code', currency.CharCode));
    elem.appendChild(makeDiv('item__value', currency.Value));
    elem.appendChild(makeDiv('item__currency', 'руб.'));

    container.appendChild(elem);
  }
}

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then((response) => response.json())
  .then((body) => {
    parseCurrencies(body);
    loader.classList.remove('loader_active');
  });
