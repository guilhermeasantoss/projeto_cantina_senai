const wrapper   = document.getElementById('authWrapper');
const cLogin    = document.getElementById('cardLogin');
const cRegister = document.getElementById('cardRegister');
const cdot0     = document.getElementById('cdot0');
const cdot1     = document.getElementById('cdot1');

let current = 'login';
let locked  = false;

function isMobile() {
  return window.innerWidth <= 767;
}

function switchTo(mode) {
  if (mode === current || locked) return;
  locked  = true;
  current = mode;

  if (mode === 'register') {
    if (!isMobile()) wrapper.classList.add('to-register');
    cdot0.classList.remove('on');
    cdot1.classList.add('on');
    setTimeout(() => {
      cLogin.classList.add('hidden');
      cRegister.classList.remove('hidden');
      locked = false;
    }, isMobile() ? 0 : 300);
  } else {
    if (!isMobile()) wrapper.classList.remove('to-register');
    cdot1.classList.remove('on');
    cdot0.classList.add('on');
    setTimeout(() => {
      cRegister.classList.add('hidden');
      cLogin.classList.remove('hidden');
      locked = false;
    }, isMobile() ? 0 : 300);
  }
}

/* Reaplica estado correto ao redimensionar */
window.addEventListener('resize', () => {
  if (!isMobile()) {
    if (current === 'register') {
      wrapper.classList.add('to-register');
    } else {
      wrapper.classList.remove('to-register');
    }
  } else {
    wrapper.classList.remove('to-register');
  }
});
