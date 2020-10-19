angular
  .module('myHeroTraining')
  .controller('HomeController', function (
    $scope,
    $http,
    myHeroTraining,
    $location
  ) {
    let carregaObjetos = [{}];
    let carregaTempoTreino = [{}];
    $scope.fotos = [
      {
        url:
          'https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_960_720.jpg',
      },
      {
        url:
          'https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_960_720.jpg',
      },
      /* {url:'https://cdn.pixabay.com/photo/2016/03/27/07/08/man-1282232_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2016/05/27/22/30/workout-1420741_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2015/04/08/23/53/workout-713658_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2015/07/02/10/27/training-828764_960_720.jpg'},*/
    ];
    $scope.model = {};

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
    var carrega = function () {
      myHeroTraining.carregarTreinos().success(function (data) {
        carregaObjetos = data;
        //   $scope.treinos = data;
        refresh();
        carregaTempoTreino = carregaObjetos[0].treino;
        carregaTempo(carregaTempoTreino, data);
      });
    };
    let objComposto = [];
    function carregaTempo(carregaTempoTreino, data2) {
      for (let j = 0; j <= 1; j++) {
        let index = j + 1;
        myHeroTraining
          .getTimeCronometroService(
            sessionStorage.getItem('id'),

            carregaTempoTreino[j].id
          )

          .success(function (data) {
            (objComposto[j] = {
              descricao: data2[j].descricao,
              dificuldade: data2[j].dificuldade,
              horas: data2[j].horas,
              id: data2[j].id,
              intensidade: data2[j].intensidade,
              nivel: data2[j].nivel,
              nome: data2[j].nome,
              treino: data2[j].treino,
              url: data2[j].url,
              tempo: data.tempo,
            }),
              {
                descricao: data2[j].descricao,
                dificuldade: data2[j].dificuldade,
                horas: data2[j].horas,
                id: data2[j].id,
                intensidade: data2[j].intensidade,
                nivel: data2[j].nivel,
                nome: data2[j].nome,
                treino: data2[j].treino,
                url: data2[j].url,
                tempo: data.tempo,
              };
            //console.log(data2);
          });
        $scope.treinos = objComposto;
      }
    }

    $scope.logout = function () {
      localStorage.clear();
      sessionStorage.clear();
      $location.path('/login');
    };
    function refresh() {
      setTimeout(function () {
        //location.reload();
        //console.log('aguardadno');
      }, 1000);
    }

    carrega();
    //getTimeCronometro();
    $scope.fotoPrincipal = {
      url:
        'https://i.pinimg.com/236x/ba/87/5d/ba875dc13ef3651e4f08237d07f8ea45.jpg',
    };
  });
