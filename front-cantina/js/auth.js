/* ══════════════════════════════════════════════
   AUTH.JS
   ══════════════════════════════════════════════ */

const ac = document.getElementById('ac');

const PANEL_TEXTS = {
  login:    { tagline: 'Sua refeição favorita,<br>reservada com facilidade.', btn: 'Criar conta' },
  register: { tagline: 'Faça sua reserva,<br>sem complicação.',               btn: 'Já tenho conta' },
};

// ── TROCA DE MODO ─────────────────────────────────────────────────────
function setMode(mode) {
  if (mode === 'register') {
    ac.classList.add('is-register');
  } else {
    ac.classList.remove('is-register');
  }
  // Atualiza texto do painel visual
  const t = PANEL_TEXTS[mode];
  document.getElementById('panelTagline').innerHTML = t.tagline;
  document.getElementById('panelSwitch').textContent = t.btn;
}

// Botões dos formulários
document.getElementById('goRegister')?.addEventListener('click', () => setMode('register'));
document.getElementById('goLogin')?.addEventListener('click',    () => setMode('login'));

// Botão do painel visual (alterna)
document.getElementById('panelSwitch')?.addEventListener('click', () => {
  setMode(ac.classList.contains('is-register') ? 'login' : 'register');
});

// URL ?modo=cadastro abre direto no cadastro
if (new URLSearchParams(location.search).get('modo') === 'cadastro') setMode('register');

// ── TOGGLE OLHO ───────────────────────────────────────────────────────
document.querySelectorAll('.ac__eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? '🙈' : '👁';
  });
});

// ── FORÇA DA SENHA ────────────────────────────────────────────────────
document.getElementById('r-pass')?.addEventListener('input', function () {
  const v     = this.value;
  const fill  = document.getElementById('sFill');
  const label = document.getElementById('sLabel');
  if (!fill) return;

  let score = 0;
  if (v.length >= 8)          score++;
  if (/[A-Z]/.test(v))        score++;
  if (/[0-9]/.test(v))        score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const levels = [
    { w: '0%',   bg: 'var(--line)', txt: 'Força da senha' },
    { w: '25%',  bg: '#ef4444',     txt: 'Fraca'          },
    { w: '50%',  bg: '#f97316',     txt: 'Razoável'       },
    { w: '75%',  bg: '#eab308',     txt: 'Boa'            },
    { w: '100%', bg: '#22c55e',     txt: 'Forte'          },
  ];
  const lv = v.length === 0 ? levels[0] : levels[score];
  fill.style.width      = lv.w;
  fill.style.background = lv.bg;
  label.textContent     = lv.txt;
});

// ── LOGIN ─────────────────────────────────────────────────────────────
document.getElementById('formLogin')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;
  const err   = document.getElementById('loginError');

  if (!email || !pass) { err.textContent = 'Preencha todos os campos.'; return; }
  err.textContent = '';

  // Verificar se o usuário existe em localStorage. Se não, cria um default.
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('cantina_usuario'));
  } catch {}

  if (!user || user.email !== email) {
    const nomePadrao = email.split('@')[0];
    user = {
      nome: nomePadrao.charAt(0).toUpperCase() + nomePadrao.slice(1),
      email: email,
      telefone: '(11) 99999-9999',
      tipo: 'aluno', // por padrão, e ao editar o perfil ele pode alterar
      criadoEm: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('cantina_usuario', JSON.stringify(user));
  }

  window.location.href = 'perfil.html';
});

// ── CADASTRO ──────────────────────────────────────────────────────────
document.getElementById('formRegister')?.addEventListener('submit', e => {
  e.preventDefault();
  const tipo   = document.querySelector('input[name="tipo"]:checked')?.value || 'aluno';
  const name   = document.getElementById('r-name').value.trim();
  const email  = document.getElementById('r-email').value.trim();
  const phone  = document.getElementById('r-phone')?.value.trim() || '';
  const pass   = document.getElementById('r-pass').value;
  const pass2  = document.getElementById('r-pass2').value;
  const terms  = document.getElementById('termsCheck').checked;
  const err    = document.getElementById('registerError');

  if (!name || !email)  { err.textContent = 'Preencha nome e e-mail.'; return; }
  if (pass !== pass2)   { err.textContent = 'As senhas não coincidem.'; return; }
  if (pass.length < 8)  { err.textContent = 'Senha precisa ter ao menos 8 caracteres.'; return; }
  if (!terms)           { err.textContent = 'Aceite os termos para continuar.'; return; }

  err.textContent = '';

  // Salvar dados do usuário no localStorage para uso em outras páginas
  const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const usuario = {
    nome:      name,
    email:     email,
    telefone:  phone,
    tipo:      tipo,
    criadoEm: hoje
  };
  localStorage.setItem('cantina_usuario', JSON.stringify(usuario));

  // Volta para login com mensagem de sucesso
  setMode('login');
  setTimeout(() => {
    const el = document.getElementById('loginError');
    el.style.color = '#15803d';
    el.textContent = '✔ Conta criada! Faça login para continuar.';
  }, 400);
});

