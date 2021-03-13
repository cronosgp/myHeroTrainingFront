angular.module('myHeroTraining').factory('TreinoPersonalizadoService', function ($http) {
  var salvar = function (dados) {

//  var jwt = localStorage.getItem('Bearer');

// $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
 return $http.post('https://mhtrainingback.herokuapp.com/treinoPersonalizado', dados)

};

var carregaTreino = function(id){
// var jwt = localStorage.getItem('Bearer');

//  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;

   return $http.get('https://mhtrainingback.herokuapp.com/treinoPersonalizado', {
       params: {
         id: id              
       },
     });
   }
   


var carregaTreinoUsuario = function(id,data){
7
//   var jwt = localStorage.getItem('Bearer');

//    $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;

 return $http.get('https://mhtrainingback.herokuapp.com/dadosUsuario', {
     params: {
       id: id,
       data: data

     },
   });
 }
 var apaga = function(id){
//    var jwt = localStorage.getItem('Bearer');

//  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;

   return $http.delete('https://mhtrainingback.herokuapp.com/apaga', {
       params: {
         id: id              
       },
     });
   }   
return {
salvar: salvar,
carregaTreino: carregaTreino,
carregaTreinoUsuario : carregaTreinoUsuario,
apaga : apaga
     };

     
});
