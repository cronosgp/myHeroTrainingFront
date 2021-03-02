angular
  .module('myHeroTraining')
  .controller(
    'treinoPersonalizadoController',


    function ($scope, 
      TreinoPersonalizadoService, $location  ) 
      {

      var valor=0;
      var faseTerminadas = [];
      var tamanhofor;
      var oculta=0;
      var IdUsuario = sessionStorage.getItem('id');
        $scope.model={
          id: IdUsuario
        };

        $scope.desabilita = function() {
          var tamanhoteste = document.getElementById('teste').getElementsByTagName('tr').length;
          var contador = 0;


          for (var j = 0; j <tamanhoteste-1; j++) {
             
            //console.log(document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].checked == true)
                 
               if(document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].checked == false){
                  contador++;
              
               }        
                     
          }
          if(contador === tamanhoteste-1){
            document.getElementById('btn').disabled=true;
           }
           else{
            document.getElementById('btn').disabled=false;
        
           }   
         
        }
     
       $scope.salva = function(){            
               var tamanhoteste = document.getElementById('teste').getElementsByTagName('tr').length;
            
              for (var j = 0; j <tamanhoteste-1; j++) {
             
                 
               if(document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].checked == true){
               var id = document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].id;
                faseTerminadas.push(id);
              
               }        
              }

              for(var i = 0; i <faseTerminadas.length; i++) {              
                var Idescolha = faseTerminadas[i]; 
                 dados = {
                  id: IdUsuario,
                  exercicio : Idescolha            
                }
                TreinoPersonalizadoService.salvar(dados).success(function(data){   
               
                }).error(function(data){
                  if(data.status === 403){
                    $location.path('/login');
                  }
                });
              };         
              swal('Treino salvo com sucesso!');
              $location.path('/home');            
                    
            }
                 
       var carregaTreino = function(){       
        TreinoPersonalizadoService.carregaTreino(IdUsuario).success(function(data)
        {
            $scope.personalizado = data;
            tamanhofor = data.lenght;

        });
       }
        $scope.apagaTreino = function(){
        //pegar Id aqui 
        TreinoPersonalizadoService.apaga(IdUsuario).success(function(data)
        {
          swal('Treino Excluido com sucesso!');
          $location.path('/home');
          
          
        });      

       }
       $scope.item = function (valor) {
         console.log(valor)
          if(valor === true){
           return true;
         }
       }
       
       var d= 0;
       var x;

       $scope.item = function(valor){ 
        console.log("a") 
        console.log(valor)
       
          
         if(valor === true){
            d =1;
            x= valor
           
         }
         if(d === 1){
           return true;
         }
         if(x === valor){
                
          
           return false;
         }
       
       }
       carregaTreino();

     var carregaTreinoUsuario = function(){
        TreinoPersonalizadoService.carregaTreinoUsuario(IdUsuario).success(function(data){
          if(data == ''){
            oculta =1;
          }
          $scope.usu = data;
        });

     }

     $scope.excluir = function(){

      alert("Oi");
     }

     $scope.exibe = function () {
       if(oculta == 1){
       return true;
       }
     }

      carregaTreinoUsuario();
    });
