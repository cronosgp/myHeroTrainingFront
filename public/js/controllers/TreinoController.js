angular
  .module('myHeroTraining')
  .controller('TreinoController', function (
    $scope,
    $routeParams,
    TreinoService,
    $location
  ) {
    $scope.model = {};
    $scope.fotos = [
      {
        url:
          'https://i0.statig.com.br/bancodeimagens/54/ab/3d/54ab3dww9e6ktcnafkfdp4294.jpg',
      },
    ];

    $scope.fotoP = [
      {
        url:
          'https://gooutside-static-cdn.akamaized.net/wp-content/uploads/sites/3/2020/03/treino-e-dicas-para-se-manter-em-forma-em-casa.jpg',
      },
    ];
    $scope.fotoX = [
      {
        url:
          'https://www.runtastic.com/blog/wp-content/uploads/2019/03/thumbnail_1200x800.jpg',
      },
      {
        url:
          'https://www.bodynutry.ind.br/images/noticias/grd/71ba53d6fccbc4aeeb2aee3c4dc21281.jpg',
      },
      {
        url:
          'https://conteudo.imguol.com.br/c/entretenimento/a7/2016/05/30/homem-fazendo-flexao-1464620034199_v2_1920x1279.jpg',
      },
    ];
    $scope.foto = {
      urlx: './imagem/Chega de desculpas_ malhe_fora_da_academia.gif',
    };
    var id = $routeParams.id;
    var conlusao;
    var exibeBotao = 1;
    var idTreino;
    //tirar do set
    var idUsuario = 1;
    var faseTerminadas = [];
    var treinosRealizados = [];
    var liberarProxFase;
    var idFase;

    $scope.desabilita = function () {
      return false;
    };
    $scope.concluir = function () {
      if (conlusao === 1) {
        return true;
      }
    };
    //função botão iniciar
    $scope.iniciar = function () {
      TreinoService.carregaExercicios(id).success(function (data) {
        var total = data.totalElements;
        var pag = total - 1;
        var qtd = 1;
        //não exibe mais a opçao de inicio
        exibeBotao = 0;
        exericioPaginacao(id, pag, qtd);
      });
    };
    //exbibe botão de iniciar
    $scope.inicia = function () {
      if (exibeBotao === 1) return true;
    };
    $scope.prox = function () {
      if (exibeBotao === 0) return true;
    };
    $scope.final = function () {
      if (exibeBotao === -1) return true;
    };
    /*var recuperaIdUsuario = function () {
      var token = sessionStorage.getItem("Bearer");
      TreinoService.buscaIdusuario(1).success(function (data) {
          //passar aqui na data
          idUsuario = data;
      });
  }*/
    //recuperaIdUsuario();
    var pagina;
    $scope.proximo = function () {
      TreinoService.carregaExercicios(id).success(function (data) {
        if (pagina === undefined) {
          pagina = 1;
        }
        var total = data.totalElements - 1;
        var pag = total - pagina;
        var qtd = 1;
        if (pag === 0) {
          exibeBotao = -1;
        }
        if (pag === -1) {
          conlusao = 1;
        }
        exericioPaginacao(id, pag, qtd);
        pagina += 1;
      });
    };
    var exericioPaginacao = function (id, pagina, qnt) {
      TreinoService.carregaExercicios(id, pagina, qnt).success(function (data) {
        $scope.exercicios = data.content;
      });
    };
    var fasesTreinos = function () {
      TreinoService.carregaFases(id).success(function (data) {
        $scope.fases = data;
        //fase === arraydetrue
      });
    };

    var carrega = function () {
      var pagina = 0;
      var qnt = 1;
      myHeroTraining
        .carregarTreinos(pagina, qnt, idTreino)
        .success(function (data) {
          $scope.treinos = data.content;
          console.log(data.content);
        });
    };
    carrega();
    //falta pegar Id do usuario do banco e passar no parametro, pelo token
    //falta salvar id na tabela
    //true ?Ok
    var buscaTreinosFeito = function () {
      TreinoService.buscaTreinosFeitos(1).success(function (data) {
        for (var j = 0; j < data.length; j++) {
          treinosRealizados.push(data[j].id);
          TreinoService.carregaFases(treinosRealizados).success(function (
            data
          ) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].faseConcluida === true)
                faseTerminadas.push(data[i].id);
            }
          });
        }
      });
    };
    buscaTreinosFeito();
    var exerciciosFase = function () {
      TreinoService.carregaExercicios(id).success(function (data) {
        $scope.exercicios = data.content;
      });
    };
    $scope.item = function (valor) {
      for (var i = 0; i <= faseTerminadas.length; i++) {
        if (faseTerminadas.indexOf(valor) != -1) {
          return true;
        }
      }
      //valor igual a
      //BUDCAR NO BANCO TODOS OS VALORES IGUAL A TRUE
      //busca o primeiro ID daquele liest de fases prga array --liberar sempre a fase 1
      //faseTerminadas.indexOf(primeiro_fase === -1)//não tenho a primeira fase feita
      //return false
    };
    $scope.desabilita = function (valor) {
      for (var i = 0; i <= faseTerminadas.length; i++) {
        if (faseTerminadas.indexOf(valor) != -1 /*fase[0]===1*/) {
          return true;
        }
        //liberar proxima fase pode ser um ou com a proxima condição
        if (faseTerminadas === true && valor === idFase) {
          return false;
        }
      }
    };
    var atualizaFaseBanco = function (idFase) {
      var faseConcluida = 'true';
      TreinoService.atualizaFaseConcluida(
        idFase,
        faseConcluida
      ).success(function (data) {});
    };
    var atualizaIdusuarioTreino = function () {
      TreinoService.atualizaIdusuarioTreino(idUsuario).success(function (
        data
      ) {});
    };
    $scope.finalizar = function () {
      //buscar id treino para passar no laction path-ok
      //UPDATE no banco o campo true;
      //UPDATE COM ID DO USUARIO
      //select campo x where id seja igual ao id do usuario
      atualizaFaseBanco(id);
      atualizaIdusuarioTreino();
      liberarProxFase = true;
      idFase = id + 1;
      //atualiza id funcionario
      TreinoService.carregaIdTreino(id).success(function (data) {
        idTreino = data[0].treino.id;
        $location.path('treinos/' + idTreino);
      });
    };
    exerciciosFase();
    fasesTreinos();
  });
