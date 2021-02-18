angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {

    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.post(
      'https://mhtrainingback.herokuapp.com/auth',
      dadosUsuario
    );
  };

  var dadosLogin = function (email) {
    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.get(
<<<<<<< HEAD
      
      'https://mhtrainingback.herokuapp.com/cadastro-usuario/id',
=======
      'https://mhtrainingback.herokuapp.com/usuario/id',
>>>>>>> desempenho_caminhada
      {
        params: {
          email: email,
        },
      }
    );
  };
  var atualizaToken = function (id, token) {
<<<<<<< HEAD
    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
=======
>>>>>>> desempenho_caminhada
    return $http.put('https://mhtrainingback.herokuapp.com/auth/' + id, token);
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});
