angular
  .module('myHeroTraining')
  .controller(
    'treinoPersonalizadoController',
    function ($scope, 
      TreinoPersonalizadoService, $location,TreinoService  ) 
      {
      var valor=0;
      var faseTerminadas = [];
      var tamanhofor;
      var oculta=0;
      var faseTerminadas2=[];
      var faseTerminadas3 =[];
      var IdUsuario = sessionStorage.getItem('id');
      var desab =0;
        $scope.model={
          id: IdUsuario
        };
        var temPersonalizado = false;

        if(desab ===1)
        {
         document.getElementById('btn').disabled=true;
         
        }
      
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
      

        $scope.check = function() {

          if(desab!=1){
          
        var tamanhoteste = document.getElementById('teste').getElementsByTagName('tr').length;
          var contador = 0;
           for (var j = 0; j <tamanhoteste-1; j++) {
                  
               if(document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].checked == false){
                  contador++;
              
               }
               else
               {
                 document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].disabled = false
                 
               }        
                     
          }
          if(contador === tamanhoteste-1){
            for (var j = 0; j <tamanhoteste-1; j++){
              document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].disabled = false

            
            }
            document.getElementById('btn').disabled=true;
          }
           else{
            for (var j = 0; j <tamanhoteste-1; j++){
              if(document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].checked == false){
              document.getElementById('teste').getElementsByTagName('tr')[j].getElementsByTagName('td')[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].disabled = true
             
              }
            
        
           } 
           document.getElementById('btn').disabled=false;  
          }
         
          
        }
        else{
          sweetAlert("Treino Perosonalizado já existe") 
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
             
                var data = new Date();
              //  let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
                var Idescolha = faseTerminadas[i]; 

                 dados = {
                  id: IdUsuario,
                  exercicio : Idescolha,
                  data : data            
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
        
          if(valor === true){
            
           return true;
         }
      
       }   
     
       var d= 0;
       var x;

      $scope.item = function(valor){ 
          
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
      let data = new Date();
      let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
        TreinoPersonalizadoService.carregaTreinoUsuario(IdUsuario,dataFormatada).success(function(data){
      

          if(data == ''){
            oculta =1;
          }
          if(data.length!=0){
            desab =1;
          }
          $scope.usu = data;
        
        });

     }
     $scope.desabilitas = function(){
    
      if(temPersonalizado == true || faseTerminadas2.length!=0 || faseTerminadas3.length!=0){  

        return true;
      }
     }

     var buscaTreinosFeito = function () {
      var dataAtual = new Date();
      let data = new Date();
      let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
      TreinoService.buscaTreinosFeitos(IdUsuario,dataFormatada).success(function (data) {
        for (var j = 0; j < data.length; j++) {   
          faseTerminadas2.push(data[j].id_exercicio);
        }
       }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    buscaTreinosFeito();

    var buscaTreinosConj = function () {
      var dataAtual = new Date();
      let data = new Date();
      let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
      TreinoService.buscaTreinoPersonalizadoFeitos(IdUsuario,dataFormatada).success(function (data) {
        for (var j = 0; j < data.length; j++) {   
          faseTerminadas3.push(data[j].id_exercicio);
        }
       }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    buscaTreinosConj();


     var buscaPersonlizado = function(){
       var data = new Date() 
      let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
      TreinoService.buscaPersonlizado(IdUsuario,dataFormatada).success(function(data){
      
    
      if(data.length!=0){
          temPersonalizado = true;
          
        }

      });
    }
    buscaPersonlizado();
     $scope.excluir = function(){
      
     }

     $scope.exibe = function () {
       if(oculta == 1){
       return true;
       }
     }

    
      carregaTreinoUsuario();
    });