angular.module('myHeroTraining').factory('cadastroService', function ($http) {
  var incluir = function (model) {
    var jwt = localStorage.getItem('Bearer');

    $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    return $http.post('/cadastro-usuario', model);
  };
  var email = function (email) {
    return $http.post('http://localhost:8080/email', email);
  };
  var usuario = function (model) {
    return $http.post('http://localhost:8080/usuario', model);
  };
  return {
    incluir: incluir,
    email: email,
    usuario: usuario,
  };
});
