/* ==========================================================================
   CARRINHO.JS — Página de visualização e finalização do carrinho
   Cantina Sabor & Cia · SENAI Tatuapé
   ========================================================================== */

(() => {
  'use strict';

  const PRODUCTS = [
    { id: 'hamburgao', name: 'Hamburgão Artesanal', price: 22.90, img: '../img/produtos/hamburgao.jpg' },
    { id: 'lanche', name: 'Lanche da Casa', price: 14.90, img: '../img/produtos/lanche.jpg' },
    { id: 'sanduiche-natural', name: 'Sanduíche Natural', price: 16.50, img: '../img/produtos/receita-de-sanduiche-natural.jpg' },
    { id: 'fogazza', name: 'Fogazza de Frango', price: 9.50, img: '../img/produtos/fogazza.jpg' },
    { id: 'paodequeijo', name: 'Pão de Queijo', price: 5.00, img: '../img/produtos/Paodqueijo.jpg' },
    { id: 'prato-do-dia', name: 'Prato do Dia', price: 24.90, img: '../img/produtos/prato.jpg' },
    { id: 'prato-executivo', name: 'Prato Executivo', price: 28.90, img: '../img/produtos/bife-bovino.jpg' },
    { id: 'coca', name: 'Coca-Cola Lata', price: 6.00, img: '../img/produtos/coca.png' },
    { id: 'chocolate', name: 'Achocolatado', price: 5.00, img: '../img/produtos/cocalata.png' },
    { id: 'brigadeiro', name: 'Brigadeiro', price: 4.50, img: '../img/produtos/brigadeiro.jpg' }
  ];

  const KEY_USUARIO  = 'cantina_usuario';
  const KEY_CARRINHO = 'cantina_home_cart';
  const KEY_RESERVAS = 'cantina_reservas';

  let cart = carregarCarrinho();
  let cupomAplicado = null;

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------ */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function carregarCarrinho() {
    try {
      return JSON.parse(localStorage.getItem(KEY_CARRINHO)) || {};
    } catch { return {}; }
  }

  function salvarCarrinho() {
    localStorage.setItem(KEY_CARRINHO, JSON.stringify(cart));
  }

  function fmtPreco(n) {
    return 'R$ ' + n.toFixed(2).replace('.', ',');
  }

  function gerarIniciais(nome) {
    if (!nome) return '?';
    return nome.trim().split(/\s+/).slice(0, 2).map(p => p[0].toUpperCase()).join('');
  }

  /* ------------------------------------------------------------------
     USER INFO DYNAMIC LOADING
  ------------------------------------------------------------------ */
  function preencherUsuario() {
    try {
      const user = JSON.parse(localStorage.getItem(KEY_USUARIO));
      const avatarEl = $('#headerAvatar');
      const nomeEl = $('#headerNome');
      
      if (user && user.nome) {
        if (avatarEl) avatarEl.textContent = gerarIniciais(user.nome);
        if (nomeEl) nomeEl.textContent = user.nome;
      } else {
        if (avatarEl) avatarEl.textContent = '?';
        if (nomeEl) nomeEl.textContent = 'Entrar';
      }
    } catch {
      if ($('#headerAvatar')) $('#headerAvatar').textContent = '?';
      if ($('#headerNome')) $('#headerNome').textContent = 'Entrar';
    }
  }

  /* ------------------------------------------------------------------
     CART RENDERING
  ------------------------------------------------------------------ */
  function renderizarCarrinho() {
    const itemListEl = $('#itemList');
    const itemCountEl = $('#itemCount');
    const emptyStateEl = $('#emptyState');
    const headerBadgeEl = $('#headerBadge');

    const entries = Object.entries(cart);
    const totalQty = entries.reduce((s, [, q]) => s + q, 0);

    if (headerBadgeEl) {
      headerBadgeEl.textContent = totalQty;
      headerBadgeEl.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    if (totalQty === 0) {
      if (emptyStateEl) emptyStateEl.style.display = 'flex';
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    if (itemCountEl) {
      itemCountEl.textContent = totalQty + (totalQty === 1 ? ' item' : ' itens');
    }

    if (itemListEl) {
      itemListEl.innerHTML = entries.map(([id, qty]) => {
        const p = PRODUCTS.find(prod => prod.id === id);
        if (!p) return '';
        return `
          <div class="c-item" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" class="c-item__img">
            <div class="c-item__info">
              <h3 class="c-item__name">${p.name}</h3>
              <p class="c-item__price">${fmtPreco(p.price)} cada</p>
            </div>
            <div class="c-item__qty">
              <button class="c-qty-btn dec" data-id="${p.id}">−</button>
              <span class="c-qty-val">${qty}</span>
              <button class="c-qty-btn inc" data-id="${p.id}">+</button>
            </div>
            <span class="c-item__total">${fmtPreco(p.price * qty)}</span>
            <button class="c-item__del" data-del="${p.id}" aria-label="Remover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </button>
          </div>`;
      }).join('');

      // Bind button events
      itemListEl.querySelectorAll('.c-qty-btn.dec').forEach(btn => 
        btn.addEventListener('click', () => alterarQtd(btn.dataset.id, -1)));
      itemListEl.querySelectorAll('.c-qty-btn.inc').forEach(btn => 
        btn.addEventListener('click', () => alterarQtd(btn.dataset.id, 1)));
      itemListEl.querySelectorAll('.c-item__del').forEach(btn => 
        btn.addEventListener('click', () => removerItem(btn.dataset.del)));
    }

    atualizarResumo();
  }

  function alterarQtd(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (cart[id] === 0) delete cart[id];
    salvarCarrinho();
    renderizarCarrinho();
  }

  function removerItem(id) {
    delete cart[id];
    salvarCarrinho();
    renderizarCarrinho();
  }

  /* ------------------------------------------------------------------
     TOTALS & CHECKOUT
  ------------------------------------------------------------------ */
  function atualizarResumo() {
    const subtotalEl = $('#subtotal');
    const totalEl = $('#total');
    const discountRow = $('#discountRow');
    const discountValEl = $('#discountVal');

    const subtotal = Object.entries(cart).reduce((s, [id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === id);
      return s + (p ? p.price * qty : 0);
    }, 0);

    let desconto = 0;
    if (cupomAplicado === 'SENAI10') {
      desconto = subtotal * 0.10;
    }

    const total = Math.max(0, subtotal - desconto);

    if (subtotalEl) subtotalEl.textContent = fmtPreco(subtotal);
    if (totalEl) totalEl.textContent = fmtPreco(total);

    if (desconto > 0) {
      if (discountRow) discountRow.style.display = 'flex';
      if (discountValEl) discountValEl.textContent = '− ' + fmtPreco(desconto);
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }
  }

  /* ------------------------------------------------------------------
     COUPON
  ------------------------------------------------------------------ */
  $('#couponBtn')?.addEventListener('click', () => {
    const input = $('#couponInput');
    const msg = $('#couponMsg');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'SENAI10') {
      cupomAplicado = 'SENAI10';
      msg.textContent = '✔ Cupom SENAI10 aplicado com sucesso (10% de desconto)!';
      msg.style.color = 'var(--ok)';
      atualizarResumo();
    } else if (code) {
      msg.textContent = '❌ Cupom inválido.';
      msg.style.color = '#b91c1c';
    }
  });

  /* ------------------------------------------------------------------
     CLEAR CART
  ------------------------------------------------------------------ */
  $('#clearBtn')?.addEventListener('click', () => {
    cart = {};
    salvarCarrinho();
    renderizarCarrinho();
  });

  /* ------------------------------------------------------------------
     CHECKOUT / SUBMIT RESERVATION
  ------------------------------------------------------------------ */
  $('#finalizarBtn')?.addEventListener('click', () => {
    const dataRetirada = $('#pickupDate')?.value;
    const horaRetirada = $('#pickupTime')?.value;

    if (!dataRetirada || !horaRetirada) {
      alert('Por favor, selecione a data e o horário para retirada.');
      return;
    }

    const entries = Object.entries(cart);
    if (entries.length === 0) return;

    // Calcular totais
    const subtotal = entries.reduce((s, [id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === id);
      return s + (p ? p.price * qty : 0);
    }, 0);
    let desconto = cupomAplicado === 'SENAI10' ? subtotal * 0.10 : 0;
    const total = subtotal - desconto;

    // Criar nova reserva
    const primeiraId = entries[0][0];
    const primeiroProduto = PRODUCTS.find(prod => prod.id === primeiraId);
    
    let nomeReserva = primeiroProduto ? primeiroProduto.name : 'Reserva';
    if (entries.length > 1) {
      nomeReserva += ` + ${entries.length - 1} item(ns)`;
    }

    const novaReserva = {
      id: Date.now(),
      nome: nomeReserva,
      data: dataRetirada,
      hora: horaRetirada,
      status: 'pendente',
      total: total,
      img: primeiroProduto ? primeiroProduto.img : '../img/produtos/prato.jpg'
    };

    // Salvar reserva
    try {
      const reservas = JSON.parse(localStorage.getItem(KEY_RESERVAS)) || [];
      reservas.unshift(novaReserva);
      localStorage.setItem(KEY_RESERVAS, JSON.stringify(reservas));
    } catch (e) {
      console.error(e);
    }

    // Limpar carrinho
    cart = {};
    salvarCarrinho();

    alert('Reserva finalizada com sucesso! 🎉 Você será redirecionado para o perfil.');
    window.location.href = 'perfil.html';
  });

  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */
  // Definir data mínima como hoje
  const dataInput = $('#pickupDate');
  if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;
    dataInput.value = hoje;
  }

  preencherUsuario();
  renderizarCarrinho();

})();
