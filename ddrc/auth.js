const authState = { mode: 'register' };

const authTitle    = document.getElementById('authTitle');
const authHint     = document.getElementById('authHint');
const authToggle   = document.getElementById('authToggle');
const formRegister = document.getElementById('formRegister');
const formLogin    = document.getElementById('formLogin');

function setAuthMode(mode) {
  authState.mode = mode;
  const isRegister = mode === 'register';

  authTitle.textContent  = isRegister ? 'Регистрация' : 'Вход';
  authHint.textContent   = isRegister ? 'Уже в клубе?' : 'Нет аккаунта?';
  authToggle.textContent = isRegister ? 'Войти' : 'Зарегистрироваться';

  formRegister.hidden = !isRegister;
  formLogin.hidden    = isRegister;

  formRegister.querySelector('.formError').hidden = true;
  formLogin.querySelector('.formError').hidden    = true;

  const activeForm = isRegister ? formRegister : formLogin;
  activeForm.querySelector('input')?.focus();
}

authToggle.addEventListener('click', () => {
  setAuthMode(authState.mode === 'register' ? 'login' : 'register');
});

async function submitAuth(form, endpoint) {
  const errorEl = form.querySelector('.formError');
  errorEl.hidden = true;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(form));

await new Promise(r => setTimeout(r, 300));

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    errorEl.textContent = payload.message || 'Что-то пошло не так';
    errorEl.hidden = false;
    return;
  }

  location.href = '/';
}

formRegister.addEventListener('submit', e => {
  e.preventDefault();
  submitAuth(formRegister, '/api/register');
});

formLogin.addEventListener('submit', e => {
  e.preventDefault();
  submitAuth(formLogin, '/api/login');
});