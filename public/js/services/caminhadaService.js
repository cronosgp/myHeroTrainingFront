angular.module('myHeroTraining').factory('caminhadaService', function ($http) {
 //  var jwt = localStorage.getItem('Bearer');

 //   $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  var salvar = function(model){

    return $http.post('https://mhtrainingback.herokuapp.com/Caminhada', model)
  }
return{salvar:salvar}

  });
  