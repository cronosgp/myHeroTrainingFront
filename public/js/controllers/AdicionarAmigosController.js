angular
    .module('myHeroTraining')
    .controller('AdicionarAmigosController', function (
        $scope,
        $routeParams,
        amigosService,
        $location
    ) {
        var UsuarioId = sessionStorage.getItem('id');

        $scope.enviar = function () {
            console.log($scope.email);
            console.log(UsuarioId);
            amigosService.enviarSolicitacao(UsuarioId, $scope.email).success(function (data) {
                console.log($scope.email);
                console.log(UsuarioId);
            }).error(function(data){
                console.log("erro");
                console.log(data);
            });
        }

    });
