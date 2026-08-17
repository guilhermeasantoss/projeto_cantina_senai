/* ==========================================================================
   HOME.JS — Página inicial (Cardápio + Carrinho básico)
   Cantina Sabor & Cia · SENAI Tatuapé
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     1. DADOS DO CARDÁPIO
  ------------------------------------------------------------------ */
  const PRODUTOS = [
    {
      id: 'hamburgao',
      nome: 'Hamburgão Artesanal',
      desc: 'Pão brioche, carne 180g, queijo cheddar e molho especial.',
      preco: 22.90,
      categoria: 'lanches',
      badge: { texto: 'Mais pedido', cor: '#D97E17' },
      img: 'img/produtos/hamburgao.jpg'
    },
    {
      id: 'lanche',
      nome: 'Lanche da Casa',
      desc: 'Pão macio, presunto, queijo, alface, tomate e maionese.',
      preco: 14.90,
      categoria: 'lanches',
      badge: null,
      img: 'img/produtos/lanche.jpg'
    },
    {
      id: 'sanduiche-natural',
      nome: 'Sanduíche Natural',
      desc: 'Frango desfiado, salada, tomate cereja e maionese caseira.',
      preco: 16.50,
      categoria: 'lanches',
      badge: { texto: 'Saudável', cor: '#3E8E5B' },
      img: 'img/produtos/receita-de-sanduiche-natural.jpg'
    },
    {
      id: 'fogazza',
      nome: 'Fogazza de Frango',
      desc: 'Massa crocante recheada com frango temperado e catupiry.',
      preco: 9.50,
      categoria: 'salgados',
      badge: null,
      img: 'img/produtos/fogazza.jpg'
    },
    {
      id: 'paodequeijo',
      nome: 'Pão de Queijo',
      desc: 'Pão de queijo mineiro fresquinho, assado na hora.',
      preco: 5.00,
      categoria: 'salgados',
      badge: { texto: 'Favorito', cor: '#D97E17' },
      img: 'img/produtos/Paodqueijo.jpg'
    },
    {
      id: 'prato-do-dia',
      nome: 'Prato do Dia',
      desc: 'Arroz, feijão, proteína grelhada, salada e farofa.',
      preco: 24.90,
      categoria: 'refeicoes',
      badge: { texto: 'Especial', cor: '#7C5CBF' },
      img: 'img/produtos/prato.jpg'
    },
    {
      id: 'prato-executivo',
      nome: 'Prato Executivo',
      desc: 'Bife bovino, arroz, feijão, batata frita e salada.',
      preco: 28.90,
      categoria: 'refeicoes',
      badge: null,
      img: 'img/produtos/bife-bovino.jpg'
    },
    {
      id: 'coca',
      nome: 'Coca-Cola Lata',
      desc: 'Refrigerante Coca-Cola 350ml gelado.',
      preco: 6.00,
      categoria: 'bebidas',
      badge: null,
      img: 'img/produtos/coca.png'
    },
    {
      id: 'chocolate',
      nome: 'Achocolatado',
      desc: 'Bebida achocolatada gelada 200ml.',
      preco: 5.00,
      categoria: 'bebidas',
      badge: null,
      img: 'img/produtos/cocalata.png'
    },
    {
      id: 'brigadeiro',
      nome: 'Brigadeiro',
      desc: 'Brigadeiro tradicional de chocolate com granulado.',
      preco: 4.50,
      categoria: 'sobremesas',
      badge: { texto: 'Delícia', cor: '#c0392b' },
      img: 'img/produtos/brigadeiro.jpg'
    }
  ];

  /* ------------------------------------------------------------------
     2. ESTADO DO CARRINHO (sincronizado com localStorage)
  ------------------------------------------------------------------ */
  const STORAGE_KEY = 'cantina_home_cart';

  function carregarCarrinho() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function salvarCarrinho() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }

  let carrinho = carregarCarrinho();
  let categoriaAtiva = 'todos';
  let buscaAtual = '';

  /* ------------------------------------------------------------------
     3. HELPERS
  ------------------------------------------------------------------ */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function fmtPreco(n) {
    return 'R$ ' + n.toFixed(2).replace('.', ',');
  }

  function totalCarrinho() {
    return Object.values(carrinho).reduce((s, q) => s + q, 0);
  }

  /* ------------------------------------------------------------------
     4. FILTROS DE CATEGORIA
  ------------------------------------------------------------------ */
  $$('#categoryFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#categoryFilters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      categoriaAtiva = btn.dataset.cat;
      renderizarGrade();
    });
  });

  /* ------------------------------------------------------------------
     5. BUSCA
  ------------------------------------------------------------------ */
  const inputBusca = $('#searchInput');
  if (inputBusca) {
    inputBusca.addEventListener('input', () => {
      buscaAtual = inputBusca.value.trim().toLowerCase();
      renderizarGrade();
    });
  }

  /* ------------------------------------------------------------------
     6. RENDER DA GRADE DE PRODUTOS
  ------------------------------------------------------------------ */
  function produtosFiltrados() {
    return PRODUTOS.filter(p => {
      const matchCat = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva;
      const matchBusca = !buscaAtual ||
        p.nome.toLowerCase().includes(buscaAtual) ||
        p.desc.toLowerCase().includes(buscaAtual);
      return matchCat && matchBusca;
    });
  }

  function renderizarGrade() {
    const grid = $('#productGrid');
    const lista = produtosFiltrados();

    if (lista.length === 0) {
      grid.innerHTML = `
        <div class="grid-vazio">
          <p>😕 Nenhum prato encontrado.</p>
          <p>Tente outra categoria ou busca.</p>
        </div>`;
      return;
    }

    grid.innerHTML = lista.map(p => {
      const qty = carrinho[p.id] || 0;
      return `
        <article class="produto-card" data-id="${p.id}">
          <div class="produto-card__img">
            <img src="${p.img}" alt="${p.nome}" loading="lazy">
            ${p.badge ? `<span class="produto-badge" style="background:${p.badge.cor}">${p.badge.texto}</span>` : ''}
          </div>
          <div class="produto-card__body">
            <h3 class="produto-nome">${p.nome}</h3>
            <p class="produto-desc">${p.desc}</p>
            <div class="produto-rodape">
              <span class="produto-preco">${fmtPreco(p.preco)}</span>
              <div class="qty-zone" data-qzone="${p.id}">
                ${qty > 0 ? htmlStepper(p.id, qty) : htmlBtnAdicionar(p.id)}
              </div>
            </div>
          </div>
        </article>`;
    }).join('');

    vincularEventosCards(grid);
  }

  function htmlBtnAdicionar(id) {
    return `<button class="btn-adicionar" data-add="${id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Adicionar
    </button>`;
  }

  function htmlStepper(id, qty) {
    return `<div class="qty-stepper">
      <button class="qty-dec" data-dec="${id}" aria-label="Diminuir">−</button>
      <span class="qty-num">${qty}</span>
      <button class="qty-inc" data-inc="${id}" aria-label="Aumentar">+</button>
    </div>`;
  }

  function vincularEventosCards(scope) {
    scope.querySelectorAll('[data-add]').forEach(b =>
      b.addEventListener('click', () => adicionarAoCarrinho(b.dataset.add)));
    scope.querySelectorAll('[data-inc]').forEach(b =>
      b.addEventListener('click', () => adicionarAoCarrinho(b.dataset.inc)));
    scope.querySelectorAll('[data-dec]').forEach(b =>
      b.addEventListener('click', () => diminuirCarrinho(b.dataset.dec)));
  }

  function atualizarZona(id) {
    const zone = $(`[data-qzone="${id}"]`);
    if (!zone) return;
    const qty = carrinho[id] || 0;
    zone.innerHTML = qty > 0 ? htmlStepper(id, qty) : htmlBtnAdicionar(id);
    vincularEventosCards(zone);
  }

  /* ------------------------------------------------------------------
     7. LÓGICA DO CARRINHO
  ------------------------------------------------------------------ */
  function adicionarAoCarrinho(id) {
    carrinho[id] = (carrinho[id] || 0) + 1;
    salvarCarrinho();
    atualizarZona(id);
    atualizarBadge();
  }

  function diminuirCarrinho(id) {
    if (!carrinho[id]) return;
    carrinho[id]--;
    if (carrinho[id] <= 0) delete carrinho[id];
    salvarCarrinho();
    atualizarZona(id);
    atualizarBadge();
  }

  function atualizarBadge() {
    const badge = $('#cartBadgeHeader');
    if (!badge) return;
    const total = totalCarrinho();
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  function preencherUsuario() {
    try {
      const user = JSON.parse(localStorage.getItem('cantina_usuario'));
      const btnEntrar = $('#btnEntrar');
      const headerUser = $('#headerUser');
      const avatarEl = $('#headerAvatar');
      const nomeEl = $('#headerNome');
      
      if (user && user.nome) {
        if (btnEntrar) btnEntrar.style.display = 'none';
        if (headerUser) headerUser.style.display = 'flex';
        if (avatarEl) avatarEl.textContent = gerarIniciais(user.nome);
        if (nomeEl) nomeEl.textContent = user.nome;
      } else {
        if (btnEntrar) btnEntrar.style.display = 'block';
        if (headerUser) headerUser.style.display = 'none';
      }
    } catch {
      if ($('#btnEntrar')) $('#btnEntrar').style.display = 'block';
      if ($('#headerUser')) $('#headerUser').style.display = 'none';
    }
  }

  /* ------------------------------------------------------------------
     8. INIT
  ------------------------------------------------------------------ */
  renderizarGrade();
  atualizarBadge();
  preencherUsuario();

})();
