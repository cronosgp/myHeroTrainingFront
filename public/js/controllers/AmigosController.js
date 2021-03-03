angular
    .module('myHeroTraining')
    .controller('AmigosController', function (
        $scope,
        $routeParams,
        amigosService,
        avatarService,
        treinoConjuntoService,
        $location
    ) {
        var IdUsuario = sessionStorage.getItem('id');

        $scope.InitAmigos = function () {
            amigosService.carregarAmigos(IdUsuario).success(function (data) {
                $scope.amigos = data;
                console.log($scope.amigos);
            }).error(function (data) {
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

        $scope.enviarConviteTreino = function (conviteid){
            treinoConjuntoService.enviarSolicitacao(IdUsuario, conviteid).success(function(data){
                console.log("funciono");
                swal(
                    'Convite enviado!'
                );
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.removerAmigo = function (amizadeid) {

            amigosService.recusarSolicitacao(amizadeid, IdUsuario).success(function (data){
                $scope.InitAmigos();
            })
            }


        $scope.InitAmigos();
    });