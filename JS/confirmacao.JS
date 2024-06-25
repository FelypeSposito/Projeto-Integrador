$(function() {
    $('#cardnumber').payment('formatCardNumber');
    $('#cardexpiration').payment('formatCardExpiry');
    $('#cardcvc').payment('formatCardCVC');
    
    $('#cardnumber').keyup(function(event) {
      $('#label-cardnumber').empty().append($(this).val());
    });
    
    $('#cardexpiration').keyup(function(event) {
      var data = $(this).val() + '<span>' + $('#cardcvc').val() + '</span>';
      $('#label-cardexpiration').empty().append(data);
    });
    
    $('#cardcvc').keyup(function(event) {
      var data = $('#cardexpiration').val() + '<span>' + $(this).val() + '</span>';
      $('#label-cardexpiration').empty().append(data);
    });
    
    $('.button-cta').on('click', function () { 
      var proceed = true;
      $(".field input").each(function(){
        $(this).parent().find('path').each(function(){
          $(this).attr('fill', '#dddfe6');
        });
        
        if(!$.trim($(this).val())){
          $(this).parent().find('path').each(function(){
            $(this).attr('fill', '#f1404b');
            proceed = false;
          });
          
          if(!proceed){
            $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '1'}, "slow");
          }
        }
      });
         
      if(proceed) //everything looks good! proceed purchase...
      {
        $('.field').find('path').each(function(){
          $(this).attr('fill', '#3ac569');
        });
        $('.payment').fadeToggle('slow', function() {
          $('.paid').fadeToggle('slow', 'linear');
        });
      }
    });
  });


  // Definir produtos do carrinho
const cartItems = [
    { name: "Jordan Eclipse", image: "http://images.nike.com/is/image/DotCom/PDP_THUMB/JORDAN-ECLIPSE-724010_401_A_PREM.jpg", price: 110 },
    { name: "Nike Futura True 2 Snapback", image: "http://images.nike.com/is/image/DotCom/PDP_THUMB/Nike-Futura-True-2-Adjustable-Hat-584169_451_A.jpg", price: 28 },
    { name: "Nike FB Training 3.0", image: "http://images.nike.com/is/image/DotCom/PDP_THUMB/NIKE-FB-SHOE-BAG-30-BA5101_001_A.jpg", price: 20 }
];

// Função para adicionar itens dinamicamente na área de finalização de compras
function addItemsToFinalize() {
    const finalizeItemsContainer = document.querySelector('.finalize-items');

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}">
            <h4>${item.name}</h4>
            <h5>$${item.price}</h5>
        `;
        finalizeItemsContainer.appendChild(li);
    });
}

// Chamar a função para adicionar os itens ao carregar a página
window.onload = addItemsToFinalize;
