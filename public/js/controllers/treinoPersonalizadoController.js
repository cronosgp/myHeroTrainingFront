angular
  .module('myHeroTraining')
  .controller(
    'treinoPersonalizadoController',
    function ($scope, 
      TreinoPersonalizadoService,
      $location
     ) {

      var valor=0;
      var faseTerminadas = [];
      var tamanhofor;
      var IdUsuario = sessionStorage.getItem('id');
        $scope.model={
          id: IdUsuario
        };
       $scope.salva = function(){            
               var tamanhoteste = document.getElementById('teste').getElementsByTagName('tr').length;
               console.log(tamanhoteste);
              for (var j = 0; j <tamanhoteste; j++) {
            
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
              $location.path('/login');            
                    
            }
                 
       var carregaTreino = function(){       
        TreinoPersonalizadoService.carregaTreino(IdUsuario).success(function(data)
        {
            $scope.personalizado = data;
            tamanhofor = data.lenght;

        });
       }
       carregaTreino();
     
    });
