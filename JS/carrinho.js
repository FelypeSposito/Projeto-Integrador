document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('total');

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
    updateProductList();
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
    }
  }

  // Função para remover do carrinho
  function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateProductList();
  }

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

                      case 'Vela Aromática Artesanal':
                        return '../IMG/velamassageadora3.png.jpg';

                        case 'Vela Aromática - Café Torrado':
                          return '../IMG/velacafe3M.jpg';

                          case 'Refil Vela Aromática':
                            return '../IMG/refilM.jpg';

                            case 'Kit 3 Velas Aromáticas Artesanais':
                              return '../IMG/velamassageadora3.png.jpg';

                              case 'Vela Aromática Artesanal - Vanilla Black':
                                return '../IMG/velamassageadora3.png.jpg';
                        
      default:
        return '../IMG/default-image.jpg'; // Caso haja mais produtos do que imagens definidas
    }
  }

  // Função para atualizar a lista de produtos e o total
  function updateProductList() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productListElement = document.querySelector('.lista-de-produtos');
    const productNames = cart.map(item => item.name).join(', ') + '.';
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    if (productListElement) {
      productListElement.innerHTML = `Produtos: ${productNames} <br> Total: R$ ${totalPrice}`;
    }
  }

  // Atualiza o carrinho ao carregar a página
  updateCart();
  // Atualiza a lista de produtos ao carregar a página
  updateProductList();
});
