


let menuToggle = document.querySelector('.menu-toggle');
let navbarLinks = document.querySelector('.navbar-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbarLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
  // Captura o link de scroll
  var scrollLinks = document.querySelectorAll('.scroll-link');

  // Adiciona o evento de clique para cada link
  scrollLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault();

          // Obtém o alvo do link (neste caso, o topo da página)
          var targetId = this.getAttribute('href').substring(1); // Remove o '#'

          // Encontra o elemento alvo
          var targetElement = document.getElementById(targetId);

          // Verifica se o elemento alvo existe
          if (targetElement) {
              // Obtém a posição do topo do elemento alvo
              var targetPosition = targetElement.offsetTop;

              // Faz a transição suave até o topo da página
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'  // Comportamento suave
              });
          }
      });
  });
});