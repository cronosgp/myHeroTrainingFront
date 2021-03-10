angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {
    return $http.post(
      'http://localhost:8080/auth',
      dadosUsuario
    );
  };

  var dadosLogin = function (email) {
    return $http.get(
      

      'http://localhost:8080/usuario/id',
      {
        params: {
          email: email,
        },
      }
    );
  };
  var atualizaToken = function (id, token) {
    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.put('http://localhost:8080/' + id, token);
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});