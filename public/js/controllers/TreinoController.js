angular
  .module('myHeroTraining')
  .controller('TreinoController', function (
    $scope,
    $routeParams,
    TreinoService,
    $location
  ) {
    $scope.model = {};

    var id = $routeParams.id;
    var conlusao;
    var exibeBotao = 1;

    var faseTerminadas = [];
    var treinosRealizados = [];
    var liberarProxFase;
    var idFase;
    var quantidadeFases;
    var liberarTodasFases;
    var primeirafase = [];
    var liberar;

    var IdUsuario = sessionStorage.getItem('id');

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
        liberar = true;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
      iniciaCronometro();
    };
    //exbibe botão de iniciar
    $scope.inicia = function () {
      //ajusta elemento

      if (exibeBotao === 1) return true;
    };
    $scope.prox = function () {
      if (exibeBotao === 0) return true;
    };
    $scope.final = function () {
      if (exibeBotao === -1) return true;
    };

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
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    var exericioPaginacao = function (id, pagina, qnt) {
      TreinoService.carregaExercicios(id, pagina, qnt).success(function (data) {
        $scope.exercicios = data.content;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };

    
    var fasesTreinos = function () {
      TreinoService.carregaFasesTreino(id).success(function (data) {
        $scope.fases = data;
        quantidadeFases = data.length;
        primeirafase = data[0];
        }).error(function(data){
        if(data.status === 403){
          $location.path('/login');

        
        }
      });
    };
    //falta pegar Id do usuario do banco e passar no parametro, pelo token
    //falta salvar id na tabela
    //true ?Ok
    var buscaTreinosFeito = function () {
      TreinoService.buscaTreinosFeitos(IdUsuario).success(function (data) {
        for (var j = 0; j < data.length; j++) {
          faseTerminadas.push(data[j].id_fase);
        
        }
       }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    buscaTreinosFeito();
    var exerciciosFase = function () {
      TreinoService.carregaExercicios(id).success(function (data) {
        $scope.exercicios = data.content;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    $scope.item = function (valor) {
      for (var i = 0; i <= faseTerminadas.length; i++) {
        if (faseTerminadas.indexOf(valor) != -1) {
          return true;
        }
      }
    };

    //logica de habilitar e desabilitar fases
    $scope.desabilita = function (valor) {
      var ProximaFase = faseTerminadas[faseTerminadas.length - 1];
      if (
        (valor === 1 && faseTerminadas.indexOf(valor) === -1) ||
        (valor === primeirafase && faseTerminadas.indexOf(valor) === -1) ||
        (faseTerminadas.indexOf(valor) === -1 &&
          valor === parseInt(ProximaFase) + parseInt(1) &&
          faseTerminadas.indexOf(valor) === -1) ||
        (quantidadeFases === valor && liberarTodasFases === true)
      ) {
        return false;
      } else {
        faseTerminadas.indexOf(valor) != -1 ||
          faseTerminadas.indexOf(valor) === -1;
        return true;
      }
    };
    var atualizaFaseBanco = function (idFase) {
      TreinoService.atualizaFaseConcluida(idFase).success(function (data) {

      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    var atualizaIdusuarioTreino = function () {
      let fase_check = $routeParams;
      console.log('atualizaIdUsuario' + fase_check);
      var idFaseAtual = {
        id_usuario: IdUsuario,
        id_fase: fase_check.id,
      };
      TreinoService.atualizaIdusuarioTreino(idFaseAtual).success(function (
        data
      ) {
    }).error(function(data){
      if(data.status === 403){
        $location.path('/login');
      }
    });
    };
    $scope.finalizar = function (valor) {
      var fase_troca;
      //import swal from 'sweetalert';
      atualizaFaseBanco(id);

      liberarProxFase = true;
      idFase = parseInt(id) + parseInt(1);
      if (quantidadeFases === id) {
        liberarTodasFases = true;
      }
      TreinoService.carregaIdTreino(id).success(function (data) {
        idFase = data[0].id;
       atualizaIdusuarioTreino();
        var tempo_corrido = `${
          document.getElementById('timer_horas').innerText
        }:${document.getElementById('timer_minutos').innerText}:${
          document.getElementById('timer_segundos').innerText
        }`;
        var id_usuario = IdUsuario,
          id_fase = idFase,
          tempo = tempo_corrido;
        var param = { id_usuario: id_usuario, id_fase: id_fase, tempo: tempo };

        swal(
          'Parabéns, você concluiu seu treino!',
          `Tempo de treino:${tempo}`,
          'success',
          {
            buttons: 'Continuar',
          }
        ).then(
          function (isConfirm) {
            if (isConfirm) {
              refresh();
              salvaTimeCronometro(param);
              $location.path('/treinos/' + idFase);
              refresh();
              refresh();
            }
          },
          function () {
            console.log('BACK');
          }
        );
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });

      //escondendo cronometro
    };

    var salvaTimeCronometro = function (parametroTempo) {
      TreinoService.salvaTimeCronometroService(parametroTempo).success(
        function (data) {
          console.log(data);
        }).error(function(data){
          if(data.status === 403){
             $location.path('/login');
          }
        });
    };

    var carrega = function () {
      TreinoService.fotoFase(id).success(function (data) {
        $scope.treinos = data;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
         
        }
      });
    };

    var carregaDdos = function () {
      TreinoService.dadosCadastro(IdUsuario).success(function (data) {
        $scope.infos = data;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      });
    };
    var iniciaCronometro = function iniciarCronometro() {
      var cronometro_id = 0;

      // document.getElementById("btnIniciar").style.display = 'none';
      //document.getElementById("btnZerar").style.display = 'inline';

      var timer_horas = document.getElementById('timer_horas');
      var timer_minutos = document.getElementById('timer_minutos');
      var timer_segundos = document.getElementById('timer_segundos');
      var timer_decimo = document.getElementById('timer_decimo');

      document.getElementById('p_cronometro').style.display = 'block';

      var h = 0;
      m = 0;
      s = 0;
      d = 0;

      cronometro_id = setInterval(function () {
        timer_horas.innerHTML = h < 10 ? '0' + h : h;
        timer_minutos.innerHTML = m < 10 ? '0' + m : m;
        timer_segundos.innerHTML = s < 10 ? '0' + s : s;
        timer_decimo.innerHTML = d < 10 ? '0' + d : d;

        if (d < 9) {
          d += 1;
        } else if (s < 59) {
          d = 0;
          s += 1;
        } else if (m < 59) {
          d = 0;
          s = 0;
          m += 1;
        } else if (h < 23) {
          d = 0;
          s = 0;
          m = 0;
          h += 1;
        } else {
          alert('Ops! Estourou as 24h!!!');
        }
      }, 100);
    };

   /* function zerarCronometro() {
      // document.getElementById("btnIniciar").style.display = 'inline';
      // document.getElementById("btnZerar").style.display = 'none';

      clearInterval(cronometro_id);

      document.getElementById('timer_horas').innerHTML = '00';
      document.getElementById('timer_minutos').innerHTML = '00';
      document.getElementById('timer_segundos').innerHTML = '00';
      document.getElementById('timer_decimo').innerHTML = '00';
    }*/
    function refresh() {
      setTimeout(function () {
        location.reload();
      }, 100);
    }

    carrega();
    exerciciosFase();
    fasesTreinos();
    carregaDdos();
  });
