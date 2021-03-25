angular
    .module('myHeroTraining')
    .controller('PerfilController', function (
        $scope,
        $routeParams,
        $route,
        perfilService,
        avatarService
    ) {
        var IdUsuario = sessionStorage.getItem('id');
       
       
//ajustando mascaras
setTimeout( function(){document.getElementById('perfil_contato').value = document.getElementById('perfil_contato').value.replace(/^(\d{2})(\d{5})(\d{4}).*/,"($1) $2-$3")},2000);
     
setTimeout( function(){document.getElementById('perfil_contato2').value = document.getElementById('perfil_contato2').value.replace(/^(\d{2})(\d{5})(\d{4}).*/,"($1) $2-$3")},2000);
        window.onload = function(){
            document.getElementById('perfil_contato').addEventListener('keyup',(v)=>{
             
           
                  mascara( document.getElementById('perfil_contato'), mtel );
            })
            document.getElementById('perfil_contato2').addEventListener('keyup',(v)=>{
             
          
                  mascara( document.getElementById('perfil_contato2'), mtel );
            })
            
          }
         

        $scope.InitPerfil = function () {
            perfilService.carregarPerfil(IdUsuario).success(function (data) {
                $scope.perfil = data;
                console.log($scope.perfil);
            }).error(function (data) {
                console.log("erro");
                console.log(data);
            });
        }

        $scope.trocarAvatar = function(){
            $scope.avatar = "data:image/png;base64,"+$scope.selecionado.file;
        }

        $scope.carregaAvatar = function () {
            avatarService.carregarAvatarIndex(IdUsuario).success(function (data) {
                let img = avatarService.arrayBufferToBase64(data)
                $scope.avatar = "data:image/png;base64,"+img;
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregaAvatar();

        $scope.carregarTodos = function (){
            avatarService.carregarTodosAvatares().success(function (data){
                console.log(data);
                for(var i = 0; i < data.length; i++) {
                    var img = avatarService.arrayBufferToBase64(data[i].file);
                    data[i].file = img;
                    if(data[i].id === $scope.perfil.avatar) {
                        $scope.avInit = data[i].id
                    }
                }
                $scope.todosAvatares = data;
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregarTodos();


        $scope.salvarPerfil = function () {
            $scope.perfil.id = IdUsuario;
           if ($scope.formulario.$valid) {
               if($scope.selecionado != undefined){
                $scope.perfil.avatar = $scope.selecionado.id
               }
                perfilService.incluir($scope.perfil)
                    .success(function (data) {
                        //alert('Cadastro realizado com sucesso!');
                        swal(
                            'Alterações feitas com sucesso',
                        );
                        $route.reload();
                    })
                    .error(function (data, status) {
                        alert('Erro ao salvar o perfil!');
                        $route.reload();
                    });
                //fazer tratamento de erro caso não retorno com sucess
      //      } else if ($scope.formulario.$invalid) {
             //   alert('Dados inválidos');
           }
        };


        $scope.InitPerfil();

        
    })