angular.module('myHeroTraining').factory('amigosService', function ($http) {
    var carregarSolicitacoes = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/friend', {
            params: {
                id: id,
            },
        });
    };

    var enviarSolicitacao = function (Usuarioid, Email) {
        return $http.post('http://localhost:8080/friend/request', {
            params: {
                Usuarioid: Usuarioid,
                Email: Email
            },
        });
    };

    return {
        carregarSolicitacoes: carregarSolicitacoes,
        enviarSolicitacao: enviarSolicitacao
    };
});