angular.module('myHeroTraining').factory('treinoConjuntoService', function ($http) {

    var carregarSolicitacoes = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/treino-conjunto/request', {
            params: {
                id: id
            },
        });
    };

    var enviarSolicitacao = function (usuarioid, conviteid) {
        return $http.post('http://localhost:8080/treino-conjunto/request', {
            usuarioid: usuarioid,
            conviteid: conviteid

        });
    };

    var aceitarSolicitacao = function (usuarioid, conviteid) {
        return $http.post('http://localhost:8080/treino-conjunto/accept', {
            usuarioid: usuarioid,
            conviteid: conviteid
        });
    };

    var recusarSolicitacao = function (conviteid, usuarioid) {
        return $http.post('http://localhost:8080/treino-conjunto/reject', {
            usuarioid: usuarioid,
            conviteid: conviteid
        });
    };

    var carregarAmigos = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/treino-conjunto', {
            params: {
                id: id
            },
        });
    };

    return {
        carregarSolicitacoes: carregarSolicitacoes,
        carregarAmigos: carregarAmigos,
        enviarSolicitacao: enviarSolicitacao,
        aceitarSolicitacao: aceitarSolicitacao,
        recusarSolicitacao: recusarSolicitacao
    };
});