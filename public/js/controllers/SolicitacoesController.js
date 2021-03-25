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

        var carregaSolAmigos = function () {
            amigosService.carregarSolData(IdUsuario).success(function (data) {

                for(var i=0; i<data.length; i++){
                    data[i].avatar = "data:image/png;base64," +data[i].avatar
                }
                $scope.usuarios = data;

            }).error(function (data) {
                console.log("erro");
                console.log(data);
            });
        }
        carregaSolAmigos();

      
         $scope.dados = function(){

            if(bloqueia === true){

               

           
                return true;
            }
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
                    carregaSolAmigos();
                }).error(function (data){
                    console.log("erro");
                    console.log(data);
                });
            }


        $scope.recusarSolicitacao = function (amizadeid) {

            amigosService.recusarSolicitacao(IdUsuario, amizadeid).success(function (data){
                swal({
                    title: "Solicitação Recusada!",
                    type: "success",
                    icon: "success"
                })
                carregaSolAmigos();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

    });

