const menuToggle = document.querySelector('.menu-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const navbarDropdown = document.querySelector('.navbar-dropdown');

menuToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('menu-open');
  navbarDropdown.classList.toggle('menu-open');
});
