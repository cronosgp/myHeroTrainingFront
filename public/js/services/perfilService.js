angular.module('myHeroTraining').factory('perfilService', function ($http) {

    var incluir = function (perfil) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.post(
            'https://mhtrainingback.herokuapp.com/perfil/alterar',
            perfil
        );
    };

    var carregarPerfil = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('https://mhtrainingback.herokuapp.com/perfil/id', {
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