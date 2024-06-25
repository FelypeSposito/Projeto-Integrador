
document.addEventListener('DOMContentLoaded', function() {
    function formatCep(cep) {
        return cep.replace(/\D/g, '');
    }

    document.getElementById('cepForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const cepInput = document.getElementById('cep');
        const cep = formatCep(cepInput.value.trim());

        if (cep.length !== 8 || isNaN(cep)) {
            alert('Por favor, digite um CEP válido com 8 números.');
            return;
        }

        document.getElementById('result').innerText = 'Carregando...';

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    document.getElementById('result').innerText = 'CEP não encontrado.';
                } else {
                    const frete = calcularFrete(data.uf); // Calcular frete com base no estado

                    document.getElementById('result').innerHTML = `
                        <p><strong>CEP:</strong> ${data.cep}</p>
                        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>Estado:</strong> ${data.uf}</p>
                        <p><strong>Frete:</strong> R$ ${frete.toFixed(2)}</p>
                        <p><strong>Total:</strong> R$ ${calcularTotal(frete).toFixed(2)}</p>
                        <button id="confirmPurchase">Confirmar Compra</button>
                    `;

                    document.getElementById('confirmPurchase').addEventListener('click', function() {
                        const userConfirmed = confirm('Você deseja confirmar essa compra?');
                        if (userConfirmed) {
                            alert('Compra feita com sucesso!');
                        } else {
                            window.location.href = '../index.html';
                        }
                    });
                }
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Erro ao buscar o CEP. Tente novamente mais tarde.';
                console.error('Erro:', error);
            });
    });

    document.getElementById('cep').addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        event.target.value = value;
    });

    // Função para calcular o frete com base no estado
    function calcularFrete(estado) {
        const taxaFretePorEstado = {
            'SP': 10.00,
            'RJ': 12.50,
            'MG': 11.00,
            // Adicione mais estados conforme necessário
        };

        if (estado in taxaFretePorEstado) {
            return taxaFretePorEstado[estado];
        } else {
            return 15.00; // Frete padrão para estados não listados
        }
    }

    // Função para calcular o preço total (produtos + frete)
    function calcularTotal(frete) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = cart.reduce((total, item) => total + item.price, 0);
        return totalPrice + frete;
    }
});
// Mock de itens para simular um carrinho (pode ser substituído por dados reais)
let cart = [
    { id: 1, nome: 'Vela Perfumada', preco: 29.90 },
    { id: 2, nome: 'Incenso de Lavanda', preco: 12.50 }
];

document.addEventListener('DOMContentLoaded', function() {
    // Função para exibir os produtos do carrinho na interface
    function exibirProdutosNoCarrinho() {
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = ''; // Limpa a lista antes de atualizar

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
            listaProdutos.appendChild(li);
        });
    }

    // Chamada inicial para exibir os produtos do carrinho ao carregar a página
    exibirProdutosNoCarrinho();

    // Função para adicionar um novo item ao carrinho
    function adicionarAoCarrinho(item) {
        cart.push(item);
        exibirProdutosNoCarrinho();
    }

    // Exemplo de adicionar um item ao carrinho (pode ser chamado em outras partes do código)
    // adicionarAoCarrinho({ id: 3, nome: 'Aromatizador de Ambiente', preco: 19.99 });
});
