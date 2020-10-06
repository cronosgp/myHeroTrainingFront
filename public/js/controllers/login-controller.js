angular
  .module('myHeroTraining')
  .controller('login-controller', function ($scope, loginService, $location) {
    $scope.model = {};
    $scope.logar = function () {
      loginService
        .autenticar($scope.model)
        .success(function (data) {
          console.log();
          var email = $scope.model.email;
          sessionStorage.setItem('email', email);
          localStorage.setItem(data.tipo, data.token);
          alert('Bem vindo!!!');
          $location.path('/home');
        })
        .error(function (status) {
          alert('Dados de Login inválidos');
          $location.path('/login');
        });
    };
    var email = sessionStorage.getItem('email');
    var carregaDadosLogin = function (email) {
      loginService.dadosCadastro(email).success(function (data) {
        $scope.dados = data;
      });
    };
    carregaDadosLogin(email);
  });
