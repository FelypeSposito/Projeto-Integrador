*espaço total*



.espaco-navbar{
  height: 12vh;
}


.navbar {
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #403924eb;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0; /* Fixa a navbar no topo */
  z-index: 1000; /* Garante que esteja acima de outros elementos */
  font-family: 'Inter';
  font-size: 18px;
  transition: background-color 0.2s ease;
}


.navbar span{
  background-color: #E8E8E8;
}



.navbar:hover{
background-color: #262214;
}

.logo img {
  height: 80%; /* altura da logo ajustável */
}

.navbar-links {
  display: flex;
}

.navbar-links a {
  color: #E8E8E8; /* cor dos links */
  text-decoration: none;
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 100%;
  transition: color 0.3s ease; /* transição de cor */
}

.navbar-links a:hover {
  color: #47412d; /* cor ao passar o mouse */
}

.menu-toggle {
  display: none; /* ocultar inicialmente em telas maiores */
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333; /* cor das barras do toggle */
  margin: 5px;
  transition: transform 0.3s ease, opacity 0.2s ease-out; /* animações */
}



.menu-toggle.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.navbar-dropdown {
  display: none;
  position: absolute;
  top: 12vh; /* alinhado com a parte inferior da navbar */
  right: 20px; /* margem direita */
  background-color: #e70000; /* fundo branco para o dropdown */
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  border-radius: 5px;
  z-index: 1; /* garantir que esteja acima do conteúdo */
  width: 200px; /* largura fixa do dropdown */
}

.navbar-dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navbar-dropdown li {
  padding: 10px 20px;
}

.navbar-dropdown a {
  color: #ff0000; /* cor dos links do dropdown */
  text-decoration: none;
  transition: color 0.3s ease; /* transição de cor */
  display: block; /* garantir que os links ocupem toda a largura */
}

.navbar-dropdown a:hover {
  color: #ff0000; /* cor ao passar o mouse */
}

@media screen and (max-width: 768px) {
  .navbar {
    padding: 0 10px;
  }

  .navbar-links {
    display: none; /* ocultar links em telas menores */
    position: absolute;
    top: 12vh;
    left: 0;
    background-color: #403924ee; /* fundo branco para o menu toggle */
    width: 100%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 2; /* garantir que esteja acima do conteúdo */
    transition: background-color 2s ease;
    transition: all .7s ease;
  }
  .navbar-links:hover{
    background-color: #262214;
  }
  


  .navbar-links.active {
    display: flex; /* mostrar links quando o menu toggle estiver ativo */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(40vh - 12vh); /* altura igual ao restante da tela */
    
  }

  .menu-toggle {
    display: block; /* mostrar menu toggle */
  }

  .menu-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .menu-toggle.active ~ .navbar-dropdown {
    display: block; /* mostrar dropdown quando menu toggle estiver ativo */
  }

  .navbar-dropdown {
    position: static; /* resetar posição para o fluxo do documento */
    display: none; /* ocultar dropdown em telas menores */
    width: auto; /* largura automática */
    box-shadow: none; /* remover sombra */
    border-radius: 0; /* remover borda arredondada */
    margin-top: 10px; /* margem superior */
  }

  .navbar-dropdown ul {
    padding: 10px 0;
  }

  .navbar-dropdown li {
    padding: 10px 20px;
    text-align: center; /* centralizar texto */
  }

  .quem-somos {
    background-color: #262214;
    color: white;
    padding: 20px;
    height: 340px;
  }

  .quem-somos p{
    line-height: 140%;
  }

  figure img{
    width: 300px;
  }

  figcaption{
    display: none;
  }
}
/* fim navbar */