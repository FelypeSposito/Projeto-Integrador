const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Seleciona todos os links internos da página
const linksInternos = document.querySelectorAll('a[href^="#"]');

// Função para lidar com o clique nos links internos
function scrollToSection(event) {
  event.preventDefault(); // Previne o comportamento padrão do clique no link

  const href = this.getAttribute('href'); // Obtém o valor do atributo href do link
  const target = document.querySelector(href); // Seleciona o elemento alvo usando o seletor obtido do href

  if (target) {
    // Fecha o menu se estiver aberto
    if (navToggle.classList.contains('active')) {
      navToggle.classList.remove('active');
      navSpanMiddle.classList.remove('hide');
      navNavigationBar.classList.remove('show');
    }

    // Usa o método scrollIntoView para rolar suavemente até o elemento alvo
    target.scrollIntoView({
      behavior: 'smooth', // Comportamento suavizado
      block: 'start' // Alinha o topo do elemento ao topo da janela
    });
  }
}

// Adiciona o evento de clique a todos os links internos
linksInternos.forEach(link => {
  link.addEventListener('click', scrollToSection);
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
    const fadeEffect = setInterval(function() {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.4;
        } else {
            body.classList.remove('stop-scroll');
            loader.classList.add('remove');
            clearInterval(fadeEffect);
        }
    }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach(link =>
    link.addEventListener("click", function(e) {
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
        behavior: "smooth"
    });
});

/*
    SEÇÃO DE LOGIN
*/

//Definindo nome, email e senha 
let string_do_nome = "";
let string_do_email = "";
let string_da_senha = "";
let perfil = false;

//Entrar na conta
function signInFunction() {

    //Acessa o valor do input
    let regExNome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    let nome = document.getElementById('nome-criar').value;

    let regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = document.getElementById('email-criar').value;

    let regExSenha = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[$&@#])[0-9a-zA-Z$&@#]{8,}$/;
    let senha = document.getElementById('senha-criar').value;

    if ((regExEmail.test(email))) {
        console.log("Sucesso!")

        string_do_nome = nome;
        string_do_email = email;
        string_da_senha = senha;
        console.log(string_do_nome);
		console.log(string_do_email);
		console.log(string_da_senha);

        localStorage.setItem('nome', string_do_nome); 
		localStorage.setItem('email', string_do_email); 
		localStorage.setItem('senha', string_da_senha);

        perfil = true;
        localStorage.setItem('temPerfil', perfil);

        location.href = "../index.html"
    } else {
        alert("Sua conta não pode ser criada por um desses 3 motivos: \n- Seu nome não é válido. \n- Seu e-mail não existe. \n- Sua senha é muito fraca.");
    }
}

//Fazer Login
function logInFunction() {
    
    if (string_do_email != "") {
        console.log("Aeeee")
    } else {
        alert("Você ainda não possui uma conta registrada.");
    }
}
