// ── DADOS DOS PRODUTOS ──────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: 'Hamburgão Artesanal', cat: 'lanches',    price: 22.90, img: '../img/produtos/hamburgao.jpg',
    desc: 'Pão brioche, carne 180g, queijo cheddar e molho especial.' },
  { id: 2, name: 'Lanche da Casa',      cat: 'lanches',    price: 14.90, img: '../img/produtos/lanche.jpg',
    desc: 'Pão macio, presunto, queijo, alface, tomate e maionese.' },
  { id: 3, name: 'Sanduíche Natural',   cat: 'saudaveis',  price: 16.50, img: '../img/produtos/receita-de-sanduiche-natural.jpg',
    desc: 'Frango desfiado, salada, tomate cereja e maionese caseira.' },
  { id: 4, name: 'Fogazza de Frango',   cat: 'salgados',   price:  9.50, img: '../img/produtos/fogazza.jpg',
    desc: 'Massa crocante recheada com frango temperado e catupiry.' },
  { id: 5, name: 'Pão de Queijo',       cat: 'salgados',   price:  5.00, img: '../img/produtos/Paodqueijo.jpg',
    desc: 'Pão de queijo mineiro fresquinho, assado na hora.' },
  { id: 6, name: 'Prato do Dia',        cat: 'refeicoes',  price: 24.90, img: '../img/produtos/prato.jpg',
    desc: 'Arroz, feijão, proteína grelhada, salada e farofa.' },
  { id: 7, name: 'Prato Executivo',     cat: 'refeicoes',  price: 28.90, img: '../img/produtos/bife-bovino.jpg',
    desc: 'Bife bovino, arroz, feijão, batata frita e salada.' },
  { id: 8, name: 'Prato Especial',      cat: 'refeicoes',  price: 26.90, img: '../img/produtos/prato1.jpg',
    desc: 'Frango grelhado, arroz integral, legumes e salada.' },
  { id: 9, name: 'Brigadeiro',          cat: 'sobremesas', price:  4.50, img: '../img/produtos/brigadeiro.jpg',
    desc: 'Brigadeiro tradicional de chocolate com granulado.' },
  { id: 10, name: 'Coca-Cola Lata',     cat: 'bebidas',    price:  6.00, img: '../img/produtos/coca.png',
    desc: 'Refrigerante Coca-Cola 350ml gelado.' },
  { id: 11, name: 'Achocolatado',       cat: 'bebidas',    price:  5.00, img: '../img/produtos/cocalata.png',
    desc: 'Bebida achocolatada gelada 200ml.' },
];


// ── ESTADO ──────────────────────────────────────────────────────────
const cart = {}; // { id: qty }
let activeFilter = 'todos';

// ── UTILS ────────────────────────────────────────────────────────────
const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');

function getPickupLabel() {
  const d = document.getElementById('pickupDate').value;
  const t = document.getElementById('pickupTime').value;
  if (!d || !t) return '';
  const [y, m, day] = d.split('-');
  return `Retirada em ${day}/${m}/${y} às ${t}`;
}

// ── RENDER GRID ──────────────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('itemGrid');
  const filtered = activeFilter === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeFilter);

  grid.innerHTML = filtered.map(p => {
    const qty = cart[p.id] || 0;
    return `
    <div class="r-card" data-id="${p.id}">
      <div class="r-card__img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="r-card__fav" aria-label="Favoritar">♡</button>
      </div>
      <div class="r-card__body">
        <p class="r-card__name">${p.name}</p>
        <p class="r-card__desc">${p.desc}</p>
        <p class="r-card__price">${fmt(p.price)}</p>
      </div>
      <div class="r-card__qty">
        <button class="r-qty-btn dec" data-id="${p.id}">−</button>
        <span class="r-qty-val">${qty}</span>
        <button class="r-qty-btn add" data-id="${p.id}">+</button>
      </div>
    </div>`;
  }).join('');

  // eventos dos botões de quantidade
  grid.querySelectorAll('.r-qty-btn.dec').forEach(btn =>
    btn.addEventListener('click', () => changeQty(+btn.dataset.id, -1)));
  grid.querySelectorAll('.r-qty-btn.add').forEach(btn =>
    btn.addEventListener('click', () => changeQty(+btn.dataset.id, +1)));
}

// ── CHANGE QTY ───────────────────────────────────────────────────────
function changeQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (cart[id] === 0) delete cart[id];
  renderGrid();
  renderAside();
  updateHeader();
}

// ── RENDER ASIDE ─────────────────────────────────────────────────────
function renderAside() {
  const container = document.getElementById('asideItems');
  const countEl   = document.getElementById('asideCount');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl   = document.getElementById('totalVal');
  const pickupEl  = document.getElementById('asidePickup');

  const entries = Object.entries(cart).map(([id, qty]) => ({
    product: PRODUCTS.find(p => p.id === +id), qty
  }));

  const totalQty = entries.reduce((s, e) => s + e.qty, 0);
  const subtotal = entries.reduce((s, e) => s + e.product.price * e.qty, 0);
  const SERVICE  = 2.00;
  const total    = subtotal > 0 ? subtotal + SERVICE : 0;

  countEl.textContent   = totalQty + (totalQty === 1 ? ' item' : ' itens');
  subtotalEl.textContent = fmt(subtotal);
  totalEl.textContent   = fmt(total);
  pickupEl.textContent  = getPickupLabel();

  if (entries.length === 0) {
    container.innerHTML = '<p class="r-aside__empty">Nenhum item adicionado ainda.</p>';
    return;
  }

  container.innerHTML = entries.map(({ product: p, qty }) => `
    <div class="r-aside__item">
      <img class="r-aside__item-img" src="${p.img}" alt="${p.name}">
      <div class="r-aside__item-info">
        <p class="r-aside__item-name">${p.name}</p>
        <div class="r-aside__item-qty">
          <button data-id="${p.id}" data-delta="-1">−</button>
          <span>${qty}</span>
          <button data-id="${p.id}" data-delta="1">+</button>
        </div>
      </div>
      <span class="r-aside__item-price">${fmt(p.price * qty)}</span>
      <button class="r-aside__item-del" data-del="${p.id}" aria-label="Remover">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
        </svg>
      </button>
    </div>`).join('');

  container.querySelectorAll('[data-delta]').forEach(btn =>
    btn.addEventListener('click', () => changeQty(+btn.dataset.id, +btn.dataset.delta)));
  container.querySelectorAll('[data-del]').forEach(btn =>
    btn.addEventListener('click', () => { delete cart[+btn.dataset.del]; renderGrid(); renderAside(); updateHeader(); }));
}

// ── UPDATE HEADER CART ────────────────────────────────────────────────
function updateHeader() {
  const entries  = Object.entries(cart);
  const totalQty = entries.reduce((s, [, q]) => s + q, 0);
  const subtotal = entries.reduce((s, [id, q]) => s + (PRODUCTS.find(p => p.id === +id)?.price || 0) * q, 0);
  const SERVICE  = subtotal > 0 ? 2.00 : 0;
  document.getElementById('cartBadge').textContent = totalQty;
  document.getElementById('cartTotal').textContent  = fmt(subtotal + SERVICE);
}

// ── CATEGORY FILTER ────────────────────────────────────────────────────
document.querySelectorAll('.r-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.r-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    renderGrid();
  });
});

// ── DATE / TIME CHANGE ─────────────────────────────────────────────────
document.getElementById('pickupDate').addEventListener('change', renderAside);
document.getElementById('pickupTime').addEventListener('change', renderAside);

// ── FINALIZAR ─────────────────────────────────────────────────────────
document.getElementById('finalizarBtn').addEventListener('click', () => {
  const entries = Object.entries(cart);
  if (entries.length === 0) {
    alert('Adicione pelo menos um item antes de finalizar!');
    return;
  }
  alert('Reserva finalizada com sucesso! 🎉');
});

// ── INIT ──────────────────────────────────────────────────────────────
function preencherUsuario() {
  try {
    const user = JSON.parse(localStorage.getItem('cantina_usuario'));
    const avatarEl = document.getElementById('headerAvatar');
    const nomeEl = document.getElementById('headerNome');
    
    if (user && user.nome) {
      if (avatarEl) avatarEl.textContent = user.nome.trim().split(/\s+/).slice(0, 2).map(p => p[0].toUpperCase()).join('');
      if (nomeEl) nomeEl.textContent = user.nome;
    } else {
      if (avatarEl) avatarEl.textContent = '?';
      if (nomeEl) nomeEl.textContent = 'Entrar';
    }
  } catch {
    if (document.getElementById('headerAvatar')) document.getElementById('headerAvatar').textContent = '?';
    if (document.getElementById('headerNome')) document.getElementById('headerNome').textContent = 'Entrar';
  }
}

preencherUsuario();
renderGrid();
renderAside();
updateHeader();
