document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('total');
  const deliveryForm = document.getElementById('delivery-form');
  const shippingDetails = document.getElementById('shipping-details');
  const deliveryInfo = document.getElementById('delivery-info');
  const confirmarCompraButton = document.getElementById('confirmar-compra');
  const orderSummary = document.querySelector('.order h5'); // Elemento para exibir o resumo da ordem
  let shippingCost = 0; // Variável para armazenar o custo de frete

  // Adicionar evento de clique para adicionar ao carrinho
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      const description = button.getAttribute('data-description');

      // Adiciona o produto ao carrinho
      addToCart(name, price, description);

      // Alerta temporário para indicar que o produto foi adicionado ao carrinho
      alert(`${name} adicionado ao carrinho!`);
    });
  });

  // Função para adicionar ao carrinho
  function addToCart(name, price, description) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, description });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  // Atualiza o carrinho na página carrinho.html
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartList) {
      cartList.innerHTML = '';
      let totalPrice = 0;

      if (cart.length === 0) {
        cartList.innerHTML = '<p>Carrinho vazio</p>';
      } else {
        cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
            <div class="product-info">
              <img src="${getProductImage(item.name)}" alt="Imagem do Produto" class="product-image">
              <div class="product-details">
                <p><strong>${item.name}</strong> - R$ ${item.price.toFixed(2)}</p>
                <p>${item.description}</p>
                <button class="remove-from-cart" data-name="${item.name}">Remover do Carrinho</button>
              </div>
            </div>
            <hr class="divider">
          `;
          cartList.appendChild(cartItem);
          totalPrice += parseFloat(item.price);
        });
      }

      cartTotal.textContent = totalPrice.toFixed(2);

      // Adicionar evento de clique para remover do carrinho
      const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
      removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
          const name = button.getAttribute('data-name');
          
          // Remove o produto do carrinho
          removeFromCart(name);
          
          // Atualiza a visualização do carrinho
          updateCart();
        });
      });
    } else {
      // Atualiza o resumo da ordem na página do cartão
      updateOrderSummary();
    }
  }

  // Função para remover do carrinho
  function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  // Função para calcular o frete com base no CEP
  if (deliveryForm) {
    deliveryForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const cepInput = document.getElementById('cep');
      const cep = cepInput.value.trim();

      // Validação do formato do CEP brasileiro
      if (!isValidBrazilianCEP(cep)) {
        alert('Por favor, insira um CEP válido.');
        return;
      }

      // Consulta à API ViaCEP para obter informações do CEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            alert('CEP não encontrado. Por favor, verifique o CEP digitado.');
            return;
          }

          // Monta o endereço formatado
          const addressInfo = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

          // Simulação de cálculo de frete (exemplo)
          shippingCost = calculateShippingCost(cep);

          // Exibe os detalhes do frete e atualiza o botão de confirmar compra
          shippingDetails.innerHTML = `
            <p><strong>Endereço:</strong> ${addressInfo}</p>
            <p>Custo de Frete: R$ ${shippingCost.toFixed(2)}</p>
            <p>Total com Frete: R$ ${(parseFloat(cartTotal.textContent) + shippingCost).toFixed(2)}</p>
          `;
          localStorage.setItem('precoDoFrete', (parseFloat(shippingCost.toFixed(2))));
          deliveryInfo.style.display = 'block';
          confirmarCompraButton.disabled = false;
          confirmarCompraButton.style.opacity = 1; // Torna o botão completamente visível

          // Atualiza o resumo da ordem
          updateOrderSummary();
        })
        .catch(error => {
          console.error('Erro ao obter informações do CEP:', error);
          alert('Erro ao obter informações do CEP. Por favor, tente novamente.');
        });
    });
  }

  // Função para validar o formato do CEP brasileiro (8 dígitos numéricos)
  function isValidBrazilianCEP(cep) {
    const cepPattern = /^\d{8}$/;
    return cepPattern.test(cep);
  }

  // Simulação de cálculo de frete (exemplo)
  function calculateShippingCost(cep) {
    // Implemente aqui a lógica para calcular o frete com base no CEP
    // Exemplo simples
    return 10.00; // Valor fixo para o exemplo
  }

  // Função para obter a imagem do produto
  function getProductImage(productName) {
    switch (productName) {
      case 'Produto 1':
        return '../IMG/rechaud.jpeg';
      case 'Produto 2':
        return '../IMG/velaextraM.png';
      case 'Produto 3':
        return '../IMG/velas2.JPG';
      case 'Vela Aromática de Massagem':
        return '../IMG/velaextra2.png';
      case 'Vela Aromática | Mensagem Secreta':
        return '../IMG/velas5.JPG';
      case 'Vela Aromática Artesanal':
        return '../IMG/velaextra.png';
      case 'Rechaud':
        return '../IMG/rechaud.jpeg';
      case 'Kit Wax Melts + Rechaud':
        return '../IMG/wax-melts.png';
      case 'Wax Melts - Limão Siciliano':
        return '../IMG/velas2.JPG';
      case 'Kit 4 Velas + Brinde':
        return '../IMG/kit4velasM.jpg';
      case 'Vela Aromática Artesanal - Vanilla Black':
        return '../IMG/velamassageadora3.png.jpg';
      case 'Vela Aromática - Café Torrado':
        return '../IMG/velacafe3M.jpg';
      case 'Refil Vela Aromática':
        return '../IMG/refilM.jpg';
      case 'Kit 3 Velas Aromáticas Artesanais':
        return '../IMG/velamassageadora3.png.jpg';
      default:
        return '../IMG/default-image.jpg'; // Caso haja mais produtos do que imagens definidas
    }
  }

  // Função para atualizar o resumo da ordem
  function updateOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    let orderDetails = cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('<br>');
    orderDetails += `<br><br>Frete: R$ ${10.00}<br>Total: R$ ${(totalPrice + 10)}`;
    if (orderSummary) {
      orderSummary.innerHTML = orderDetails;
    }
  }

  // Atualiza o carrinho ao carregar a página
  updateCart();
});
