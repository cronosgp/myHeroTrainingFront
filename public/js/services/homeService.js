angular.module('myHeroTraining').factory('myHeroTraining',function ($http) {

    var carregaTreinos = function (id) {
    return  $http.get('/treinos', {
        params: {
            id: id,
        }
    });
    };
    return{
    carregarTreinos : carregaTreinos

    }
});