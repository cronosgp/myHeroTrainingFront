angular
    .module('myHeroTraining')
    .controller('AmigosController', function (
        $scope,
        $routeParams,
        amigosService,
        avatarService,
        treinoConjuntoService,
        TreinoService,
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

            var bloqueia;

        var buscaConviteen = function(){
            
            var data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            amigosService.buscaConvite(IdUsuario,dataFormatada).success(function(data){

                

                if(data.length!=0){
                    bloqueia = true;
                }
              
            });

        }

         buscaConviteen();

        $scope.enviado = function(){

            if(bloqueia === true || temTreino === true){

                

                return true;

            }
        }

        var temTreino;
        var buscaTreinosFeito = function () {
            var dataAtual = new Date();
            let data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            TreinoService.buscaTreinosFeitos(IdUsuario,dataFormatada).success(function (data) {

                               
              if(data.length!=0){
                temTreino = true;

              }

             }).error(function(data){
              if(data.status === 403){
                $location.path('/login');
              }
            });
          };
          buscaTreinosFeito();

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
            amigosService.delAmigo(IdUsuario, amizadeid).success(function (data){
                console.log(data);
                carregaDadosAmigos();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

      //  $scope.InitAmigos();
        $scope.InitAmigosData();
    });
