angular.module('myHeroTraining').factory('loginService', function ($http) {
  var autenticar = function (dadosUsuario) {

   // var jwt = localStorage.getItem('Bearer');
  
  //    $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.post(
      'https://mhtrainingback.herokuapp.com/auth',
      dadosUsuario
    );
  };

  var dadosLogin = function (email) {
  //  var jwt = localStorage.getItem('Bearer');
  
    //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
  
    return $http.get(
      
      'https://mhtrainingback.herokuapp.com/id',
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
  
    return $http.put('https://mhtrainingback.herokuapp.com/' + id, token);
  };

  return {
    autenticar: autenticar,
    atualizaToken: atualizaToken,
    dadosLogin: dadosLogin,
  };
});