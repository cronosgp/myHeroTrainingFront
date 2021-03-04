angular
    .module('myHeroTraining')
    .controller('TreinoConjuntoController', function (
        $scope,
        $routeParams,
        amigosService,
        treinoConjuntoService,
        avatarService
    ) {
        var IdUsuario = sessionStorage.getItem('id');

        $scope.solicitacoes = function () {
            treinoConjuntoService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.solicitacoes = data;
                console.log(data);
            }).error(function(data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.pegaAvatar = function (id) {
            avatarService.carregarAvatar(id).success(function (data) {
                let img = avatarService.arrayBufferToBase64(data)
                $scope.avatar = "data:image/png;base64,"+img;
            }).error(function (data) {
                console.log("erro");
            });
        }

        $scope.aceitarSolicitacao = function (amizadeid) {

            treinoConjuntoService.aceitarSolicitacao(amizadeid, IdUsuario).success(function (data){
                $scope.solicitacoes();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.recusarSolicitacao = function (amizadeid) {

            treinoConjuntoService.recusarSolicitacao(amizadeid, IdUsuario).success(function (data){
                $scope.solicitacoes();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.solicitacoes();
    });

