// Seleciona todos os links internos da página
const linksInternos = document.querySelectorAll('a[href^="#"]');

// Função para lidar com o clique nos links internos
function scrollToSection(event) {
  event.preventDefault(); // Previne o comportamento padrão do clique no link

  const href = this.getAttribute("href"); // Obtém o valor do atributo href do link
  const target = document.querySelector(href); // Seleciona o elemento alvo usando o seletor obtido do href

  if (target) {
    // Fecha o menu se estiver aberto
    if (navToggle.classList.contains("active")) {
      navToggle.classList.remove("active");
      navSpanMiddle.classList.remove("hide");
      navNavigationBar.classList.remove("show");
    }

    // Usa o método scrollIntoView para rolar suavemente até o elemento alvo
    target.scrollIntoView({
      behavior: "smooth", // Comportamento suavizado
      block: "start", // Alinha o topo do elemento ao topo da janela
    });
  }
}

// Adiciona o evento de clique a todos os links internos
linksInternos.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// constants
const body = document.querySelector("body"),
  loader = document.querySelector(".loader-wrap"),
  links = document.querySelectorAll('a[href="#"]'),
  nav = document.querySelector("#header nav"),
  navToggle = document.querySelector("#header nav .toggle"),
  navSpanMiddle = document.querySelector("#header nav .toggle .middle"),
  navNavigationBar = document.querySelector("#header nav .navigation-bar"),
  navNavigationBarLi = document.querySelectorAll(
    "#header nav .navigation-bar li"
  ),
  headerText = document.querySelector("#header .text"),
  headerSection = document.querySelector("#header"),
  aboutSection = document.querySelector(".about-us"),
  recipeSection = document.querySelector(".recipes"),
  menuSection = document.querySelector(".menu"),
  fixedImageSection = document.querySelector(".fixed-image"),
  footerSection = document.querySelector("footer"),
  dotOne = document.querySelector(".dots .one"),
  dotTwo = document.querySelector(".dots .two"),
  dotThree = document.querySelector(".dots .three"),
  dots = document.querySelectorAll(".dots > div"),
  logoImage = document.querySelector("#header nav .logo img"),
  svgDown = document.querySelector("#header .arrow-down"),
  svgUp = document.querySelector(".copyright .arrow-up"),
  menuImgs = document.querySelectorAll(".menu .menu-image-container img"),
  boxModel = document.querySelector(".menu .box-model"),
  menuImageContainer = document.querySelector(".menu-image-container"),
  boxModelArrow = document.querySelector(".menu .box-model .arrow"),
  boxModelImage = document.querySelector(".menu .box-model img"),
  pageTitle = document.querySelector("title");

// remove loader
function fadeOutEffect() {
  const fadeEffect = setInterval(function () {
    if (!loader.style.opacity) {
      loader.style.opacity = 1;
    }
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.4;
    } else {
      body.classList.remove("stop-scroll");
      loader.classList.add("remove");
      clearInterval(fadeEffect);
    }
  }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

// toggle hamburger menu button
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navSpanMiddle.classList.toggle("hide");
  navNavigationBar.classList.toggle("show");
});

// svg-up smooth scroll
svgUp.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);
