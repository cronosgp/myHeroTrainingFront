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
            avatarService.carregarAvatar(IdUsuario).success(function (data) {
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
                $scope.perfil.avatar = $scope.selecionado.id
                perfilService
                    .incluir($scope.perfil)
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
            } else if ($scope.formulario.$invalid) {
                alert('Dados inválidos');
            }
        };


        $scope.InitPerfil();
    })