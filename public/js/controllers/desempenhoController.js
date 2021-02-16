angular
  .module('myHeroTraining')
  .controller(
    'desempenhoController',
    function ($scope, $http, desempenhoService, $location) {
      $scope.model = {};   
      var exibe = 0;
      var IdUsuario = sessionStorage.getItem('id');

     $scope.busca = function(){
       var data = $scope.model.dt.getDate().toString();
        desempenhoService.busca(IdUsuario,data, data).success(function(data)

          {
            
              $scope.dado = data;
              exibe = 1;  

          }).error(function(data){
            if(data.status === 403){
              $location.path('/login');
            }
          });
      }
    
      $scope.exibir = function(){

        if(exibe == 1)
        return true;

      }

     
    }
    
   
  

  );
