angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {
    return $http.post('http://localhost:8080/auth',dadosUsuario);
  };

  var dadosLogin = function (email) {
    return $http.get(
      'http://localhost:8080/id',
      {
        params: {
          email: email,
        },
      }
    );
  };
  var atualizaToken = function (id, token) {
    return $http.put('https://mhtrainingback.herokuapp.com/auth/' + id, token);
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});
