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

        $scope.carregaAvatar = function () {
            avatarService.carregarAvatar(IdUsuario).success(function (data) {
                let img = avatarService.arrayBufferToBase64(data)
                $scope.avatar = "data:image/png;base64,"+img;
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregaAvatar();

        $scope.salvarPerfil = function () {
            $scope.perfil.id = IdUsuario;
            if ($scope.formulario.$valid) {
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
                        alert('Erro!');
                        $route.reload();
                    });
                //fazer tratamento de erro caso não retorno com sucess
            } else if ($scope.formulario.$invalid) {
                alert('Dados inválidos');
            }
        };


        $scope.InitPerfil();
    })