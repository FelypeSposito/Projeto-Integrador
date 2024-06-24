document.addEventListener('DOMContentLoaded', function() {
  // Verifica se há produtos no localStorage ao carregar a página
  updateCart();

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Adiciona evento de clique para adicionar ao carrinho
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = {
        name: button.getAttribute('data-name'),
        price: parseFloat(button.getAttribute('data-price')),
        description: button.getAttribute('data-description'),
        image: button.getAttribute('data-image'),
        category: button.getAttribute('data-category')
      };

      // Adiciona o produto ao localStorage
      addToCart(product);

      // Atualiza o carrinho na página carrinho.html
      updateCart();

      // Alerta temporário para indicar que o produto foi adicionado ao carrinho
      alert(`${product.name} adicionado ao carrinho!`);
    });
  });

  // Função para adicionar produto ao localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para atualizar o carrinho na página carrinho.html
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('total');

    cartItems.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Carrinho vazio</p>';
    } else {
      cart.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="card-content">
            <h3>${item.name}</h3>
            <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
            <p><strong>Descrição:</strong> ${item.description}</p>
            <p><strong>Categoria:</strong> ${item.category}</p>
          </div>
        `;
        cartItems.appendChild(card);
        totalPrice += item.price;
      });
    }

    cartTotal.textContent = totalPrice.toFixed(2);
  }
});
