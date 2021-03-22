angular.module('myHeroTraining').factory('treinoConjuntoService', function ($http) {

    var carregarSolicitacoes = function (id) {

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

    var liberaTreino = function (id) {
        return $http.get('http://localhost:8080/treino-conjunto/request/free', {
            params: {
                id: id
            },
        });
    };


    var liberaTreinoDia = function (id) {
        return $http.get('http://localhost:8080/treino-conjunto/request/day', {
            params: {
                id: id
            },
        });
    };

    var amigoAguardando = function (id) {
        return $http.get('http://localhost:8080/treino-conjunto/request/friend', {
            params: {
                id: id
            },
        });
    };

    var resultado = function (id) {
        return $http.get('http://localhost:8080/treino-conjunto/resultado', {
            params: {
                id: id
            },
        });
    };

    var checaFinal = function (id, idTreino){
        return $http.get('http://localhost:8080/treino-conjunto/request/last', {
            params: {
                id: id,
                idTreino: idTreino
            },
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
        resultado: resultado,
        amigoAguardando: amigoAguardando,
        checaFinal: checaFinal,
        liberaTreinoDia: liberaTreinoDia,
        liberaTreino: liberaTreino,
        carregarSolicitacoes: carregarSolicitacoes,
        carregarAmigos: carregarAmigos,
        enviarSolicitacao: enviarSolicitacao,
        aceitarSolicitacao: aceitarSolicitacao,
        recusarSolicitacao: recusarSolicitacao
    };
});