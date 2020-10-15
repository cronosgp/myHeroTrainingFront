angular.module('myHeroTraining').factory('loginService',function ($http){
    var autenticar = function (dadosUsuario) {

       return $http.post('/auth',dadosUsuario)
    }

    var dadosLogin = function (email) {

            return  $http.get('/cadastro-usuario/id', {
                params: {
                    email: email,
                }
            });
        };
    var atualizaToken = function (id,token) {
        return $http.put('/auth/'+id,token)
              }

      return{
       autenticar : autenticar, atualizaToken : atualizaToken,
          dadosLogin :dadosLogin

    }
});