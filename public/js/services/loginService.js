angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {

    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.post(
      'http://localhost:8080/auth',
      dadosUsuario
    );
  };

  var dadosLogin = function (email) {
    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.get(
<<<<<<< HEAD
<<<<<<< HEAD
      
      'https://mhtrainingback.herokuapp.com/cadastro-usuario/id',
=======
      'https://mhtrainingback.herokuapp.com/usuario/id',
>>>>>>> desempenho_caminhada
=======
      'http://localhost:8080/cadastro-usuario/id',
>>>>>>> treino_ano_front
      {
        params: {
          email: email,
        },
      }
    );
  };
  var atualizaToken = function (id, token) {
<<<<<<< HEAD
<<<<<<< HEAD
    var jwt = localStorage.getItem('Bearer');
  
      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
=======
>>>>>>> desempenho_caminhada
    return $http.put('https://mhtrainingback.herokuapp.com/auth/' + id, token);
=======
    return $http.put('http://localhost:8080/auth/' + id, token);
>>>>>>> treino_ano_front
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});
