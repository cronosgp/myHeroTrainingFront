angular.module('myHeroTraining').controller('cadastroController',function ($scope, $location, $route, cadastroService ) {
$scope.model = {
    }
    $scope.salvar = function () {
      if($scope.formulario.$valid) {
      cadastroService.incluir($scope.model).success(function (data) {
            alert("Cadastro realizado com sucesso!" +
                "\nSeu link de confirmação de conta foi enviado para seu email:" +
                "\n"+$scope.model.email);
             enviarEmail();
             usuarioCadastro();
          $location.path('/');
          }).error(function (data,status) {
                alert("Email já cadastrado!");
                $route.reload();
            });
            //fazer tratamento de erro caso não retorno com sucess
        }

        else if ($scope.formulario.$invalid) {
            alert("Dados inválidos");
        }
    };
    var enviarEmail = function () {
        cadastroService.email($scope.model.email).success(function (data) {
        });
    }
    var usuarioCadastro = function () {
        cadastroService.usuario($scope.model)

    }
});
