angular.module('myHeroTraining').factory('caminhadaService', function ($http) {
 //  var jwt = localStorage.getItem('Bearer');

 //   $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  var salvar = function(model){

    return $http.post('http://localhost:8080/Caminhada', model)
  }
return{salvar:salvar}

  });
  