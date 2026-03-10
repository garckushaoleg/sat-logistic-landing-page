const burgerToggle = document.getElementById('burger-toggle');
const menuLinks = document.querySelectorAll('.header__nav a');
const menuOverlay = document.querySelector('.menu-overlay');

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    burgerToggle.checked = false;
  });
});

menuOverlay.addEventListener('click', () => {
  burgerToggle.checked = false;
});
