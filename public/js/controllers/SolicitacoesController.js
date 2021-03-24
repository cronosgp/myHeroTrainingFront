angular
    .module('myHeroTraining')
    .controller('SolicitacoesController', function (
        $scope,
        $routeParams,
        amigosService,
        avatarService
    ) {
        var IdUsuario = sessionStorage.getItem('id');
        var exibir=0;

        $scope.solicitacoes = function () {
            amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
                console.log(data.length)
                if(data.length===0){
                    exibir = 1;
                }

                $scope.usuarios = data;
                
                console.log($scope.usuarios);
            }).error(function(data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.exibir = function(){
            if(exibir ===1){
                return true;

            }
        }

        $scope.carregaNotAmizade = function () {
            amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.notAmizade = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregaNotAmizade();

        $scope.pegaAvatar = function (id) {
            avatarService.carregarAvatar(id).success(function (data) {
                let img = avatarService.arrayBufferToBase64(data)
                $scope.avatar = "data:image/png;base64,"+img;
            }).error(function (data) {
                console.log("erro");
            });
        }

        $scope.aceitarSolicitacao = function (amizadeid) {
                amigosService.aceitarSolicitacao(amizadeid, IdUsuario).success(function (data){
                    swal({
                        title: "Amigo adicionado!",
                        type: "success",
                        icon: "success"
                    })
                    $scope.solicitacoes();
                }).error(function (data){
                    console.log("erro");
                    console.log(data);
                });
            }


        $scope.recusarSolicitacao = function (amizadeid) {

            amigosService.recusarSolicitacao(amizadeid, IdUsuario).success(function (data){
                $scope.solicitacoes();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        $scope.solicitacoes();
    });

