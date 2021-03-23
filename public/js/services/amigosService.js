angular.module('myHeroTraining').factory('amigosService', function ($http) {
    var carregarSolicitacoes = function (id) {
    //    var jwt = localStorage.getItem('Bearer');

      //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/friend/request', {
            params: {
                id: id
            },
        });
    };

    var enviarSolicitacao = function (usuarioid, email) {
        return $http.post('http://localhost:8080/friend/request', {
                usuarioid: usuarioid,
                email: email
        });
    };

    var aceitarSolicitacao = function (usuarioid, amizadeid) {
        return $http.post('http://localhost:8080/friend/accept', {
                usuarioid: usuarioid,
                amizadeid: amizadeid
        });
    };

    var recusarSolicitacao = function (usuarioid, amizadeid) {
        return $http.post('http://localhost:8080/friend/reject', {
            usuarioid: usuarioid,
            amizadeid: amizadeid
        });
    };

    var carregarAmigos = function (id) {
   //     var jwt = localStorage.getItem('Bearer');

  //      $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/friend', {
            params: {
                id: id
            },
        });
    };

    var carregarAmigosData = function (id) {
    //    var jwt = localStorage.getItem('Bearer');

      //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('https://mhtrainingback.herokuapp.com/friend/data', {
            params: {
                id: id
            },
        });
    };

    return {
        carregarAmigosData: carregarAmigosData,
        carregarAmigos: carregarAmigos,
        carregarSolicitacoes: carregarSolicitacoes,
        enviarSolicitacao: enviarSolicitacao,
        aceitarSolicitacao: aceitarSolicitacao,
        recusarSolicitacao: recusarSolicitacao
    };
});