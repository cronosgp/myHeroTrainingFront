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
        
        var carregaDadosAmigos = function () {
            amigosService.carregarAmigosData(IdUsuario).success(function (data) {
                console.log(data)
                          
                for(var i=0; i<data.length; i++){

               data[i].avatar = "data:image/png;base64," +data[i].avatar

                   
                }
             
                $scope.amigos = data;

               
                
            }).error(function (data) {
                console.log("erro");
                console.log(data);
            });
        }

        carregaDadosAmigos();

        $scope.InitAmigosData = function () {
            amigosService.carregarAmigosData(IdUsuario).success(function (data) {
                $scope.amgData = data;
            }).error(function (data) {
                console.log("erro");
                console.log(data);
            });
        }

        $scope.carregaNotAmizade = function () {
            amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.notAmizade = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregaNotAmizade();

        var avatar;

        var pegaAvatar = function (id) {
                    avatarService.carregarAvatar(id).success(function (data) {
                  
                    let img = avatarService.arrayBufferToBase64(data)
                    
                     avatar = "data:image/png;base64,"+img;
              
        });
    }

        $scope.bloquea = function(){
            treinoConjuntoService.liberaTreino().success(function(data){
                if(data === 'false'){
                return true;
                }
                else{
                    return false;
                }

            }).error(function(data)
            {
            
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
                swal(
                    'Convite já enviado a este amigo!','', 'error'
                );
            });
        }

        $scope.removerAmigo = function (amizadeid) {
            amigosService.recusarSolicitacao(amizadeid, IdUsuario).success(function (data){
                console.log(data);
                $scope.InitAmigos();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

      //  $scope.InitAmigos();
        $scope.InitAmigosData();
    });
