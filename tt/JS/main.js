const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

let menuToggle = document.querySelector('.menu-toggle');
let navbarLinks = document.querySelector('.navbar-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbarLinks.classList.toggle('active');
});

// Seleciona todos os links internos da página
const linksInternos = document.querySelectorAll('a[href^="#"]');

// Função para lidar com o clique nos links internos
function scrollToSection(event) {
  event.preventDefault(); // Previne o comportamento padrão do clique no link

  const href = this.getAttribute('href'); // Obtém o valor do atributo href do link
  const target = document.querySelector(href); // Seleciona o elemento alvo usando o seletor obtido do href

  if (target) {
    // Usa o método scrollIntoView para rolar suavemente até o elemento alvo
    target.scrollIntoView({
      behavior: 'smooth', // Comportamento suavizado
      block: 'start' // Alinha o topo do elemento ao topo da janela
    });
  }
}

// Adiciona um event listener para cada link interno
linksInternos.forEach(link => {
  link.addEventListener('click', scrollToSection);
});