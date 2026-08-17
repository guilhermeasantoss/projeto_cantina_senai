/* ==========================================================================
   PERFIL.JS — Página de perfil do usuário
   Todos os dados são carregados dinamicamente do localStorage.
   Cantina Sabor & Cia · SENAI Tatuapé
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     CHAVES DO LOCALSTORAGE
  ------------------------------------------------------------------ */
  const KEY_USUARIO    = 'cantina_usuario';
  const KEY_RESERVAS   = 'cantina_reservas';
  const KEY_CARRINHO   = 'cantina_home_cart';

  /* ------------------------------------------------------------------
     CARREGAR DADOS
  ------------------------------------------------------------------ */
  function carregarUsuario() {
    try {
      return JSON.parse(localStorage.getItem(KEY_USUARIO)) || null;
    } catch { return null; }
  }

  function carregarReservas() {
    try {
      return JSON.parse(localStorage.getItem(KEY_RESERVAS)) || [];
    } catch { return []; }
  }

  function salvarUsuario(dados) {
    localStorage.setItem(KEY_USUARIO, JSON.stringify(dados));
  }

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------ */
  function $ (sel) { return document.querySelector(sel); }

  function gerarIniciais(nome) {
    if (!nome) return '?';
    return nome.trim().split(/\s+/).slice(0, 2).map(p => p[0].toUpperCase()).join('');
  }

  function fmtPreco(n) {
    return 'R$ ' + Number(n).toFixed(2).replace('.', ',');
  }

  function fmtData(isoDate) {
    if (!isoDate) return '—';
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
  }

  function dataCurta(isoDate) {
    if (!isoDate) return '—';
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }

  /* ------------------------------------------------------------------
     PREENCHER PÁGINA COM DADOS DO USUÁRIO
  ------------------------------------------------------------------ */
  function preencherPerfil() {
    const usuario  = carregarUsuario();
    const reservas = carregarReservas();

    // Se não há usuário logado
    if (!usuario) {
      // Redireciona para login (ou mostra estado vazio)
      preencherSemUsuario();
      return;
    }

    const iniciais = gerarIniciais(usuario.nome);

    // Avatar e header
    setTexto('#avatarInicio',    iniciais);
    setTexto('#headerAvatar',    iniciais);
    setTexto('#headerNome',      usuario.nome || '—');

    // Dados pessoais
    setTexto('#nomeUsuario',     usuario.nome     || '—');
    setTexto('#emailUsuario',    usuario.email    || '—');
    setTexto('#telefoneUsuario', usuario.telefone || '—');
    setTexto('#tipoBadge',       capitalize(usuario.tipo) || '—');

    // Membro desde
    const membro = usuario.criadoEm
      ? dataCurta(usuario.criadoEm)
      : '—';
    setTexto('#membroDesde', membro);

    // Campos do formulário de edição
    setVal('#inputNome',     usuario.nome     || '');
    setVal('#inputEmail',    usuario.email    || '');
    setVal('#inputTelefone', usuario.telefone || '');
    setVal('#selectTipo',    usuario.tipo     || 'aluno');

    // Estatísticas
    const total     = reservas.length;
    const concluidas = reservas.filter(r => r.status === 'concluida').length;
    const gasto     = reservas
      .filter(r => r.status === 'concluida')
      .reduce((s, r) => s + (r.total || 0), 0);

    setTexto('#totalReservas',      total);
    setTexto('#reservasConcluidas', concluidas);
    setTexto('#totalGasto',         fmtPreco(gasto));

    // Lista de últimas reservas
    renderizarReservas(reservas);

    // Carrinho badge
    atualizarBadgeCarrinho();
  }

  function preencherSemUsuario() {
    setTexto('#avatarInicio',    '?');
    setTexto('#headerAvatar',    '?');
    setTexto('#headerNome',      'Visitante');
    setTexto('#nomeUsuario',     'Não identificado');
    setTexto('#emailUsuario',    '—');
    setTexto('#telefoneUsuario', '—');
    setTexto('#tipoBadge',       '—');
    setVal('#selectTipo',        'aluno');
    setTexto('#membroDesde',     '—');
    setTexto('#totalReservas',   '0');
    setTexto('#reservasConcluidas', '0');
    setTexto('#totalGasto',      'R$ 0,00');
    setTexto('#listaReservas',   '<p class="p-empty-msg">Faça <a href="login.html">login</a> para ver suas reservas.</p>');
    atualizarBadgeCarrinho();
  }

  /* ------------------------------------------------------------------
     RENDERIZAR LISTA DE RESERVAS
  ------------------------------------------------------------------ */
  function renderizarReservas(reservas) {
    const container = $('#listaReservas');
    if (!container) return;

    const ultimas = [...reservas].slice(0, 5); // só as 5 últimas

    if (ultimas.length === 0) {
      container.innerHTML = '<p class="p-empty-msg">Você ainda não fez nenhuma reserva.</p>';
      return;
    }

    container.innerHTML = ultimas.map(r => {
      const statusClass = r.status === 'concluida' ? 'p-badge--green'
                        : r.status === 'cancelada' ? 'p-badge--red'
                        : 'p-badge--amber';
      const statusLabel = r.status === 'concluida' ? 'Concluída'
                        : r.status === 'cancelada' ? 'Cancelada'
                        : 'Pendente';

      const imgSrc = r.img || '../img/produtos/prato.jpg';

      return `
        <div class="p-reserva-item">
          <img src="${imgSrc}" alt="${r.nome || 'Reserva'}">
          <div class="p-reserva-info">
            <p class="p-reserva-name">${r.nome || 'Reserva'}</p>
            <p class="p-reserva-meta">${fmtData(r.data)}${r.hora ? ' às ' + r.hora : ''} · Retirada</p>
          </div>
          <span class="p-badge ${statusClass}">${statusLabel}</span>
          <span class="p-reserva-price">${r.total ? fmtPreco(r.total) : '—'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`;
    }).join('');
  }

  /* ------------------------------------------------------------------
     EDIÇÃO DE DADOS PESSOAIS
  ------------------------------------------------------------------ */
  let dadosOriginais = {};

  $('#btnEditar')?.addEventListener('click', () => {
    const inputs = document.querySelectorAll('#formDados input, #formDados select');
    inputs.forEach(i => i.disabled = false);
    $('#formActions').style.display = 'flex';
    $('#btnEditar').style.display   = 'none';

    // Salvar estado original para cancelar
    dadosOriginais = {
      nome:     $('#inputNome')?.value     || '',
      email:    $('#inputEmail')?.value    || '',
      telefone: $('#inputTelefone')?.value || '',
      tipo:     $('#selectTipo')?.value    || 'aluno'
    };
  });

  $('#btnCancelar')?.addEventListener('click', () => {
    // Restaurar valores originais
    setVal('#inputNome',     dadosOriginais.nome);
    setVal('#inputEmail',    dadosOriginais.email);
    setVal('#inputTelefone', dadosOriginais.telefone);
    setVal('#selectTipo',    dadosOriginais.tipo);
    desativarEdicao();
  });

  $('#formDados')?.addEventListener('submit', e => {
    e.preventDefault();
    const nome     = $('#inputNome')?.value.trim()     || '';
    const email    = $('#inputEmail')?.value.trim()    || '';
    const telefone = $('#inputTelefone')?.value.trim() || '';
    const tipo     = $('#selectTipo')?.value           || 'aluno';

    if (!nome || !email) {
      mostrarFeedback('Preencha nome e e-mail.', 'erro');
      return;
    }

    const usuario = carregarUsuario() || {};
    usuario.nome     = nome;
    usuario.email    = email;
    usuario.telefone = telefone;
    usuario.tipo     = tipo;
    salvarUsuario(usuario);

    // Atualizar exibição
    setTexto('#nomeUsuario',     nome);
    setTexto('#emailUsuario',    email);
    setTexto('#telefoneUsuario', telefone);
    setTexto('#tipoBadge',       capitalize(tipo));
    setTexto('#headerNome',      nome);
    setTexto('#avatarInicio',    gerarIniciais(nome));
    setTexto('#headerAvatar',    gerarIniciais(nome));

    desativarEdicao();
    mostrarFeedback('✔ Dados salvos com sucesso!', 'ok');
  });

  function desativarEdicao() {
    document.querySelectorAll('#formDados input, #formDados select').forEach(i => i.disabled = true);
    const fa = $('#formActions');
    const be = $('#btnEditar');
    if (fa) fa.style.display = 'none';
    if (be) be.style.display = '';
    setTimeout(() => { const fb = $('#formFeedback'); if (fb) fb.textContent = ''; }, 4000);
  }

  function mostrarFeedback(msg, tipo) {
    const el = $('#formFeedback');
    if (!el) return;
    el.textContent = msg;
    el.className   = 'p-form-feedback ' + (tipo === 'ok' ? 'p-form-feedback--ok' : 'p-form-feedback--err');
  }

  /* ------------------------------------------------------------------
     BADGE DO CARRINHO
  ------------------------------------------------------------------ */
  function atualizarBadgeCarrinho() {
    try {
      const cart  = JSON.parse(localStorage.getItem(KEY_CARRINHO)) || {};
      const total = Object.values(cart).reduce((s, q) => s + q, 0);
      const badge = $('#cartBadge');
      if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
      }
    } catch { /* silently fail */ }
  }

  /* ------------------------------------------------------------------
     HELPERS DOM
  ------------------------------------------------------------------ */
  function setTexto(sel, val) {
    const el = $(sel);
    if (el) el.textContent = val;
  }

  function setVal(sel, val) {
    const el = $(sel);
    if (el) el.value = val;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Lógica de logout
  document.querySelector('.p-side-link--sair')?.addEventListener('click', () => {
    localStorage.removeItem(KEY_USUARIO);
  });

  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */
  preencherPerfil();

})();
