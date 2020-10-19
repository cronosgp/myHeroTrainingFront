angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {
    return $http.post(
      'https://myherotraining.herokuapp.com/auth',
      dadosUsuario
    );
  };

  var dadosLogin = function (email) {
    return $http.get(
      'https://myherotraining.herokuapp.com/cadastro-usuario/id',
      {
        params: {
          email: email,
        },
      }
    );
  };
  var atualizaToken = function (id, token) {
    return $http.put('https://myherotraining.herokuapp.com/auth/' + id, token);
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});
