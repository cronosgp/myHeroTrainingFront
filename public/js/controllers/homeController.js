angular.module('myHeroTraining')
.controller(
  'HomeController',
  function ($scope,  myHeroTraining, $location) {
    $scope.model = {};
    var oculta= false;
    var exibe=false;
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

    $scope.pagante = function(){ 
      if(oculta == true){

           return true;
        }
        
     else{
       return false; 

     }
    }

    /*$scope.pagante = function(){
      myHeroTraining.buscaDados(IdUsuario).success(function(data){
        if(data === true){
          return true;
        }
      
      });
    }*/

    var pagamento = function () {
      myHeroTraining
        .pagamento(IdUsuario)
        .success(function (data) {
          
          if(data.length!=0){
            oculta = true;
            exibe =true;
          }
          /* refresh();
      carregaTempoTreino = carregaObjetos[0].treino;
      carregaTempo(carregaTempoTreino, data);*/
        })
        .error(function (data) {
          if (data.status === 403) {
            $location.path('/login');
          }
        });
    };
    
    pagamento();

    var carrega = function () {
      myHeroTraining
        .carregarTreinos(IdUsuario)
        .success(function (data) {
          //  carregaObjetos = data;

          $scope.treinos = data;
          /* refresh();
      carregaTempoTreino = carregaObjetos[0].treino;
      carregaTempo(carregaTempoTreino, data);*/
        })
        .error(function (data) {
          if (data.status === 403) {
            $location.path('/login');
          }
        });
    };
    /*   let objComposto = [];
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
  }*/
  var IdUsuario = sessionStorage.getItem('id');
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
    $scope.premium = function(){
      if(exibe == true){

        return false;

      }
      else{
        return true;
      }
    }

    carrega();
    //getTimeCronometro();
    $scope.fotoPrincipal = {
      url:
        'https://i.pinimg.com/236x/ba/87/5d/ba875dc13ef3651e4f08237d07f8ea45.jpg',
    };
  }
);