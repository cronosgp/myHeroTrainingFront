angular
    .module('myHeroTraining')
    .controller('NotController', function (
        $scope,
        $interval,
        homeService
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

    });
