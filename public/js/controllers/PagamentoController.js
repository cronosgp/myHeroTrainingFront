angular
  .module('myHeroTraining')
  .controller(
    'PagamentoController',
    
    function ($location, homeService,$scope) {

        var IdUsuario = sessionStorage.getItem('id');

        var pagante = 0;

        $scope.ispagante = function(){
            if(pagante == 1){
                return false;
            }
            else {
                return true;
            }

        }


         var isUsuariopagante = function(){
            homeService.pagamento(IdUsuario).success(function (data){
                console.log(data.length)
                if(data.length!==0){
                    pagante = 1;
                }
               
        
            }).error(function(data){
                if(data.status === 403){
                  $location.path('/login');
                }
              });
            };
            isUsuariopagante();
        
        document.getElementById('docNumber').addEventListener('change', ()=>{
            document.getElementById('docNumber').style.border='';
            document.getElementById('docNumber_span').style.color='';
            document.getElementById('docNumber_span').innerText="";
        })

        document.getElementById('cardNumber').addEventListener('change', ()=>{
            document.getElementById('cardNumber').style.border='';
            document.getElementById('cardNumber_span').style.color='';
            document.getElementById('cardNumber_span').innerText="";
        })
        
        document.getElementById('securityCode').addEventListener('change', ()=>{
            document.getElementById('securityCode').style.border='';
            document.getElementById('securityCode_span').style.color='';
            document.getElementById('securityCode_span').innerText="";
        })
        document.getElementById('cardExpirationYear').addEventListener('change', ()=>{
            document.getElementById('cardExpirationYear').style.border='';
            document.getElementById('cardExpirationYear_span').style.color='';
            document.getElementById('cardExpirationYear_span').innerText="";
        })
        document.getElementById('cardExpirationMonth').addEventListener('change', ()=>{
            document.getElementById('cardExpirationMonth').style.border='';
            document.getElementById('cardExpirationMonth_span').style.color='';
            document.getElementById('cardExpirationMonth_span').innerText="";
        })
        
        
 //REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
 window.Mercadopago.setPublishableKey("TEST-95e84925-5fd8-44b9-9e1d-d4e92d7d2f8b");

 window.Mercadopago.getIdentificationTypes();
   
 document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);
 document.getElementById('paymentMethod').addEventListener('change', AtribuirPagamento);
 function AtribuirPagamento(){
    document.getElementById('paymentMethodId').value = document.getElementById('paymentMethod').value
 if(document.getElementById('paymentMethod').value.includes('card')){
   document.querySelector('#pagamento_cartao').style.display = 'block';
 }else{
    document.querySelector('#pagamento_cartao').style.display = 'none';
  }
}
 function guessPaymentMethod(event) {
     cleanCardInfo();
 
     let cardnumber = document.getElementById("cardNumber").value;
     if (cardnumber.length >= 6) {
         let bin = cardnumber.substring(0,6);
         window.Mercadopago.getPaymentMethod({
             "bin": bin
         }, setPaymentMethod);
     }
 };
 
 function setPaymentMethod(status, response) {
     if (status == 200) {
         let paymentMethod = response[0];
    
         document.getElementById('paymentMethodId').value = paymentMethod.id;
         document.getElementById('cardNumber').style.backgroundImage = 'url(' + paymentMethod.thumbnail + ')';
         
         if(paymentMethod.additional_info_needed.includes("issuer_id")){
             getIssuers(paymentMethod.id);
 
         } else {
             document.getElementById('issuerInput').classList.add("hidden");
 
             getInstallments(
                 paymentMethod.id,
                 document.getElementById('amount').value
             );
         }
 
     } else {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Problemas com seu método de pagamento, verifique os dados inseridos',
         
          })
     }
 }
 
 function getIssuers(paymentMethodId) {
     window.Mercadopago.getIssuers(
         paymentMethodId, 
         setIssuers
     );
 }
 
 function setIssuers(status, response) {
     if (status == 200) {
         let issuerSelect = document.getElementById('issuer');
 
         response.forEach( issuer => {
             let opt = document.createElement('option');
             opt.text = issuer.name;
             opt.value = issuer.id;
             issuerSelect.appendChild(opt);
         });
         
         if(issuerSelect.options.length <= 1){
             document.getElementById('issuerInput').classList.add("hidden");
         } else {
             document.getElementById('issuerInput').classList.remove("hidden");
         }
         
         getInstallments(
             document.getElementById('paymentMethodId').value,
             document.getElementById('amount').value,
             issuerSelect.value
         );
 
     } else {
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Método de pagamento inválido',
         
          })
     }
 }


 
 function getInstallments(paymentMethodId, amount, issuerId){
     window.Mercadopago.getInstallments({
         "payment_method_id": paymentMethodId,
         "amount": parseFloat(amount),
         "issuer_id": issuerId ? parseInt(issuerId) : undefined
     }, setInstallments);
 }
 
 function setInstallments(status, response){
     if (status == 200) {
         document.getElementById('installments').options.length = 0;
         response[0].payer_costs.forEach( payerCost => {
             let opt = document.createElement('option');
             opt.text = payerCost.recommended_message;
             opt.value = payerCost.installments;
             document.getElementById('installments').appendChild(opt);
         });
     } else {
        if(responseText.includes("docNumber")){
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Número de documento inválido',
            
             })
        }}
        if(response.includes('cardNumber')){
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Número de cartão inválido',
            
             })
     }
 }  
 
 //Update offered installments when issuer changes
 document.getElementById('issuer').addEventListener('change', updateInstallmentsForIssuer);
 function updateInstallmentsForIssuer(event) {
     window.Mercadopago.getInstallments({
         "payment_method_id": document.getElementById('paymentMethodId').value,
         "amount": parseFloat(document.getElementById('amount').value),
         "issuer_id": parseInt(document.getElementById('issuer').value)
     }, setInstallments);
 }
 
 //processo de pagamento
 doSubmit = false;
 document.getElementById('paymentForm').addEventListener('submit', getCardToken);
 
 function getCardToken(event){
   
    
     event.preventDefault();
     if(!doSubmit){
         let $form = document.getElementById('paymentForm');
         if(document.getElementById('paymentMethod').value.includes('card')){
         window.Mercadopago.createToken($form, setCardTokenAndPay);
         }
    else{PaytoBoleto()}
        

         return false;
     }
  
 };
 
 function setCardTokenAndPay(status, response) {
     if (status == 200 || status == 201) {
         let form = document.getElementById('paymentForm');
         let card = document.createElement('input');
         card.setAttribute('name', 'token');
         card.setAttribute('type', 'hidden');
         card.setAttribute('value', response.id);
         form.appendChild(card);
         doSubmit=true;
        console.log(form);
         
         var http = new XMLHttpRequest();
         var url = 'https://mhtrainingback.herokuapp.com/process_payment';
        
         var params = 'docType='+ document.querySelector('#docType').value+'&docNumber='+document.querySelector('#docNumber').value+'&installments=1&transactionAmount=30&paymentMethodId='+document.querySelector('#paymentMethodId').value+'&description=Licença+Premium&email='+document.querySelector('#email').value+'&token='+document.getElementsByName('token')[0].value+'&idUsuario='+sessionStorage.getItem('id');
         console.log(params)
         http.open('POST', url, true);
         
         //Send the proper header information along with the request
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
         
         http.onreadystatechange = function() {//Call a function when the state changes.
             if(http.readyState == 4 && http.status == 200) {
                 if(!http.response.includes('refused')){
                Swal.fire({
                    title: 'Seu pagamento foi aprovado com sucesso',
                    icon: 'success',
                   
                    text:`Clique para acessar suas novas funções`,
                    
                    showConfirmButton:true,
                    confirmButtonText: `Abrir`,
                    
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        location.replace('#/home')
                    } else if (result.isDenied) {
                      Swal.fire('Changes are not saved', '', 'info')
                    }
                  })
                }
                else{

                    Swal.fire({
                        title: 'Seu pagamento foi recusado',
                        icon: 'error',
                       
                        text:`Valide suas informações de pagamento`,
                        
                        showConfirmButton:true,
                        confirmButtonText: `Ok`,
                        
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            //location.replace('#/home')
                        } else if (result.isDenied) {
                          Swal.fire('Changes are not saved', '', 'info')
                        }
                      })
                    }   
                }
                 
             }
         
         
         http.send(params);


     } else {
   Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifique os dados inseridos no formulário',
         
          })   
        
        
var response_error;
console.log(response.cause)
for(var i=0; i<response.cause.length; i++){
response_error +=" "+ response.cause[i].description

if(response.cause[i].description.includes('docNumber') ){

document.getElementById('docNumber').style.border='1px solid red'
document.getElementById('docNumber_span').style.color='red'
document.getElementById('docNumber_span').innerText= 'Campo número documento inválido'
}
if(response.cause[i].description.includes('cardNumber')){

document.getElementById('cardNumber').style.border='1px solid red'
document.getElementById('cardNumber_span').style.color='red'
document.getElementById('cardNumber_span').innerText= 'Número de cartão inválido'

}
if(response.cause[i].description.includes('securityCode')){

document.getElementById('securityCode').style.border='1px solid red'
document.getElementById('securityCode_span').style.color='red'
document.getElementById('securityCode_span').innerText= 'Código de segurança inválido'

}
if(response.cause[i].description.includes('cardExpirationMonth')){

document.getElementById('cardExpirationMonth').style.border='1px solid red'
document.getElementById('cardExpirationMonth_span').style.color='red'
document.getElementById('cardExpirationMonth_span').innerText= 'Mês de validade inválido'
}
if(response.cause[i].description.includes('cardExpirationYear')){
document.getElementById('cardExpirationYear').style.border='1px solid red'

document.getElementById('cardExpirationYear_span').style.color='red'
document.getElementById('cardExpirationYear_span').innerText= 'Ano de validade inválido'
}
}
        
        
        }
 };
 
 /***
  * UX functions 
  */
 function PaytoBoleto(){
    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/process_payment';
   
    var params = 'docType='+ document.querySelector('#docType').value+'&docNumber='+document.querySelector('#docNumber').value+'&installments=1&transactionAmount=30&paymentMethodId='+document.querySelector('#paymentMethodId').value+'&description=Licença+Premium&email='+document.querySelector('#email').value+'&idUsuario='+sessionStorage.getItem('id');
    console.log(params)
    http.open('POST', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        
        if(http.readyState == 4 && http.status == 200) {
          
Swal.fire({
    title: 'Boleto gerado com sucesso',
    icon: 'success',
   
    text:`Clique para abrir o boleto`,
    showConfirmButton:true,
    confirmButtonText: `Abrir`,
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        window.open(http.response);
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
     

        }
    }
    
    http.send(params);
 }
 
 function cleanCardInfo() {
     document.getElementById('cardNumber').style.backgroundImage = '';
     document.getElementById('issuerInput').classList.add("hidden");
     document.getElementById('issuer').options.length = 0;
     document.getElementById('installments').options.length = 0;
 }
 
 //Handle transitions
 document.getElementById('checkout-btn').addEventListener('click', function(){ 
     $('.shopping-cart').hide("fast",function() {
        // Use arguments.callee so we don't need a named function
        $( this ).prev().hide( "fast", arguments.callee );
      });
     setTimeout(() => { $('.container_payment').show(1000); }, 500);
 });
 document.getElementById('go-back').addEventListener('click', function(){ 
     $('.container_payment').hide(500);
     setTimeout(() => { $('.shopping-cart').show(500).fadeIn(); }, 500);
 });
 
 //Handle price update
 function updatePrice(){
     let quantity = document.getElementById('quantity').value;
     let unitPrice = document.getElementById('unit-price').innerHTML;
     let amount = parseInt(unitPrice) * parseInt(quantity);
 
     document.getElementById('cart-total').innerHTML = '$ ' + amount;
     document.getElementById('summary-price').innerHTML = '$ ' + unitPrice;
     document.getElementById('summary-quantity').innerHTML = quantity;
     document.getElementById('summary-total').innerHTML = '$ ' + amount;
     document.getElementById('amount').value = amount;
 };
 document.getElementById('quantity').addEventListener('change', updatePrice);
 updatePrice();
 
 //Retrieve product description
 document.getElementById('description').value = document.getElementById('product-description').innerHTML;

 
 
});
 

 