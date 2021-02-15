angular.module('myHeroTraining').factory('TreinoPersonalizadoService', function ($http) {
       var salvar = function (dados) {
  
   //   var jwt = localStorage.getItem('Bearer');
  
   //   $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
      return $http.post('http://localhost:8080/treinoPersonalizado', dados)
     
    };

    var carregaTreino = function(id){
        return $http.get('http://localhost:8080/treinoPersonalizado', {
            params: {
              id: id              
            },
          });
        }         
    return {
    salvar: salvar,
    carregaTreino: carregaTreino,
    
          };

          
  });
  