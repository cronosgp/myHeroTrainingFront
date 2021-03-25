angular
    .module('myHeroTraining')
    .controller('NotController', function (
        $scope,
        $interval,
        homeService,
        amigosService,
        treinoConjuntoService
    ) {
        var IdUsuario = sessionStorage.getItem('id');

        $scope.closeAlert = function(index) {
            $scope.nots.splice(index, 1);
        };

        var notificacoes = function (){
            homeService.pegaNot(IdUsuario).success(function (data){
                if (data !== null){
                    $scope.nots = data
                    $scope.notShow = true
                    console.log($scope.nots)
                }
            }).error(function (data){
                console.log("erro not")
            });
        }

        $scope.fechar = function (id){
            homeService.fechaNot(id).success(function (data){
                if (data !== null){
                    $scope.nots = data
                    $scope.notShow = true
                    console.log($scope.nots)
                }
            }).error(function (data){
                console.log("erro not")
            });
        }
        $interval(notificacoes, 5000);

        var carregaNotAmizade = function () {
            amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.notAmizade = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }
        $interval(carregaNotAmizade(), 5000);

       var carregaNotTreino = function () {
            treinoConjuntoService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.notTreino = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }
        $interval(carregaNotTreino(), 5000);
    });
