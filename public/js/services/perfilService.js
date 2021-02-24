angular.module('myHeroTraining').factory('perfilService', function ($http) {

    var incluir = function (perfil) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.post(
            'http://localhost:8080/perfil/alterar',
            perfil
        );
    };

    var carregarPerfil = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('http://localhost:8080/cadastro-usuario/id', {
            params: {
                id: id
            },
        });
    };

    return {
        carregarPerfil: carregarPerfil,
        incluir: incluir
    };
})