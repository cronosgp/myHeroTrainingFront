angular
    .module('myHeroTraining')
    .controller('AdicionarAmigosController', function (
        $scope,
        $routeParams,
        amigosService,
        $location
    ) {
        var usuarioid = sessionStorage.getItem('id');

        $scope.carregaNotAmizade = function () {
            amigosService.carregarSolicitacoes(usuarioid).success(function (data) {
                $scope.notAmizade = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }

        $scope.enviar = function () {
            amigosService.enviarSolicitacao(usuarioid, $scope.email).success(function (data) {
                console.log(data)
                
                    swal(
                        'email já existe!','', 'success'
                    )
                location.reload();
            }).error(function (data){
                console.log("erro");
                swal(
                    'Convite já enviado a este amigo!','', 'error'
                );
            });
        }

    });
