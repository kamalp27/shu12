// Small, section-based navigation keeps the experience on one page.
const screens = [...document.querySelectorAll('.screen')];
const gifts = [...document.querySelectorAll('.gift-card')];
const toast = document.getElementById('toast');
let toastTimer;

function showScreen(id) {
  screens.forEach((screen) => {
    const active = screen.id === id;
    screen.hidden = !active;
    screen.classList.toggle('is-active', active);
    if (active) screen.focus({ preventScroll: true });
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showNote(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1500);
}

document.getElementById('open-gift').addEventListener('click', () => showScreen('gift-selection'));

gifts.forEach((card) => {
  card.addEventListener('click', () => {
    const giftIndex = Number(card.dataset.gift);
    card.classList.add('opening');
    showNote('A little memory, just for you ✨');
    window.setTimeout(() => {
      card.classList.remove('opening');
      showScreen(`gift-${giftIndex + 1}`);
    }, 320);
  });
});

document.querySelectorAll('.back-gifts').forEach((button) => {
  button.addEventListener('click', () => showScreen('gift-selection'));
});

document.querySelectorAll('.next-gift').forEach((button) => {
  button.addEventListener('click', () => showScreen(`gift-${Number(button.dataset.next) + 1}`));
});

document.querySelectorAll('.previous-gift').forEach((button) => {
  button.addEventListener('click', () => showScreen(`gift-${Number(button.dataset.previous) + 1}`));
});

document.querySelector('.back-home').addEventListener('click', () => showScreen('welcome'));
document.getElementById('start-again').addEventListener('click', () => showScreen('welcome'));
