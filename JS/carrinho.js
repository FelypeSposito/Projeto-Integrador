document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');

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

  // Adicionar evento de clique para remover do carrinho
  removeFromCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = button.getAttribute('data-name');
      
      // Remove o produto do carrinho
      removeFromCart(name);
      
      // Atualiza o carrinho na página carrinho.html
      updateCart();
    });
  });

  // Função para adicionar ao carrinho
  function addToCart(name, price, description) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = false;

    // Verifica se o produto já existe no carrinho
    cart.forEach(item => {
      if (item.name === name) {
        item.quantity++;
        found = true;
      }
    });

    // Se o produto não existir no carrinho, adiciona-o
    if (!found) {
      cart.push({ name, price, description, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para remover do carrinho
  function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para atualizar o carrinho na página carrinho.html
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-list');
    const cartTotal = document.getElementById('total');

    cartItems.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Carrinho vazio</p>';
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <p><strong>${item.name}</strong> - R$ ${item.price.toFixed(2)} (${item.quantity} ${item.quantity > 1 ? 'itens' : 'item'})</p>
          <p>${item.description}</p>
          <button class="remove-from-cart" data-name="${item.name}">Remover do Carrinho</button>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += parseFloat(item.price) * item.quantity;
      });
    }

    cartTotal.textContent = totalPrice.toFixed(2);
  }
});
