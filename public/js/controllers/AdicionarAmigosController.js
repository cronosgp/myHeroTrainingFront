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
            amigosService.enviarSolicitacao(usuarioid, $scope.email).then(success,error)

            function success(data) {
                    swal(
                        'Convite enviado com sucesso!','', 'success'
                    )
                location.reload();
            }

            function error (data){
                if(data.status === 400){
                    swal(
                        'Convite já enviado a este amigo!','', 'error'
                    );
                    location.reload();
                }else if(data.status === 404){
                    swal(
                        'Este usuario não existe!','', 'error'
                    );
                    location.reload();
                }else{
                    swal(
                        'Algum erro ocorreu!','', 'error'
                    );
                    location.reload();
                }
            }
        }

    });
