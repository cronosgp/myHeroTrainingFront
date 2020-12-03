angular
  .module('myHeroTraining')
  .controller('HomeController', function (
    $scope,
    $http,
    myHeroTraining,
    $location,
    $routeParams
  ) {
    $scope.model = {};
    var IdUsuario = sessionStorage.getItem('id');
    $scope.exibirSemLogin = function () {
      if (localStorage.getItem('Bearer') == null) {
        return true;
      } else {
        return false;
      }
    };
    $scope.exibircomLogin = function () {
      if (localStorage.getItem('Bearer') !== null) {
        return true;
      } else {
        return false;
      }
    };
    var faseExistente = [];
    var id;
    var ultimoexercicio = $routeParams.id;
    var faseData = [];

    var ultimaDataTreino;
    var idUltimaFase;
    var dataAtual = new Date();
    var dataHoje = moment(dataAtual).format('DD/MM/YYYY');

    var dataTreino;

    var carrega = function () {
      myHeroTraining.carregarTreinos().success(function (data) {
        $scope.treinos = data;
        for (var i = 0; i < data.length; i++) {
          faseExistente.push(data[i].id);
        }
      });
    };

    var carregaData = function () {
      myHeroTraining.carregaFaseData(IdUsuario).success(function (data) {
        idUltimaFase = data.idfase;
        ultimaDataTreino = data.max;
        dataTreino = moment(ultimaDataTreino).format('DD/MM/YYYY');
      });
    };
    $scope.logout = function () {
      localStorage.clear();
      sessionStorage.clear();
      $location.path('/login');
    };
    function refresh() {
      setTimeout(function () {}, 1000);
    }
    var updateBase = function (valor) {
      // if(valor !== idUltimaFase && teste1 !== teste2){

      if (valor !== idUltimaFase && dataTreino !== dataAtual) {
        var model = {
          id_fase: valor,
          id_usuario: IdUsuario,
        };
        myHeroTraining.atualizahistorico(model).success(function (data) {});
      }
    };

    carregaData();
    window.onload = carrega();
    window.onload = carregaData();

    //getTimeCronometro();
  });
