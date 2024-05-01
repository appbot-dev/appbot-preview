// Toggle mobile menu
const menuBtn = document.getElementById('menu-btn');
const nav = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('hidden');
  nav.classList.toggle('flex');
});
