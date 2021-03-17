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

        $scope.carregaSolicitacoes = function () {
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

        $scope.aceitarSolicitacao = function (usuarioid) {

            treinoConjuntoService.aceitarSolicitacao(usuarioid, IdUsuario).success(function (data){
                $scope.carregaSolicitacoes();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.recusarSolicitacao = function (usuarioid) {

            treinoConjuntoService.recusarSolicitacao(usuarioid, IdUsuario).success(function (data){
                $scope.carregaSolicitacoes();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.carregaSolicitacoes();
    });

