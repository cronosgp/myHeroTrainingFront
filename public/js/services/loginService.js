angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {
    return $http.post('http://localhost:8080/auth', dadosUsuario);
  };
  var dadosCadastro = function (email) {
    return $http.get('http://localhost:8080/cadastro-usuario', {
      params: {
        email: email,
      },
    });
  };
  return {
    autenticar: autenticar,
    dadosCadastro: dadosCadastro,
  };
});
