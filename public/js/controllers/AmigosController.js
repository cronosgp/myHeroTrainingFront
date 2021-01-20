angular
    .module('myHeroTraining')
    .controller('AmigosController', function (
        $scope,
        $routeParams,
        amigosService,
        $location
    ) {
        var IdUsuario = sessionStorage.getItem('id');

        $scope.solicitacoes = function () {
            amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.usuarios = data.content;
                console.log($scope.usuarios);
            }).error(function(data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.solicitacoes();
    });

