angular.module('myHeroTraining').factory('cadastroService', function ($http) {
    var incluir = function (model) {

        var jwt = localStorage.getItem("Bearer");

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.post('/cadastro-usuario', model);

    }
    var email = function (email) {
        return $http.post('/email', email);
    }
    var usuario = function (model) {
        return $http.post('/usuario', model);
    }
    var confirmar = function(params){
        console.log()
        return $http.post('/confirm-account', params);
    }
    var recuperar = function(email){
        console.log()
        return $http.post('/forgot-password', email);
    }
    var trocar = function(model){
        console.log(model)
        return $http.post('/confirm-reset', model);
    }

    return {
        incluir: incluir,
        email: email,
        usuario :usuario,
        confirmar: confirmar,
        recuperar: recuperar,
        trocar: trocar
    }
});
