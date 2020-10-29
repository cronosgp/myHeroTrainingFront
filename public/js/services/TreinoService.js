angular.module('myHeroTraining').factory('TreinoService', function ($http) {
  var carregaTreinos = function (qnt, pg) {
    //return $http.get('http://localhost:80880/treinos', qnt, pg);
  };
  var carregaFasesTreino = function (id) {
    return $http.get('https://myherotraining.herokuapp.com/fase', {
      params: {
        id: id,
      },
    });
  };
  var carregaExercicios = function (id, pagina, qnt) {
    return $http.get('https://myherotraining.herokuapp.com/exercicio', {
      params: {
        id: id,
        pagina: pagina,
        qnt: qnt,
      },
    });
  };
  var carregaIdTreino = function (id) {
    return $http.get('https://myherotraining.herokuapp.com/fase/treino', {
      params: {
        id: id,
      },
    });
  };

  var atualizaFaseConcluida = function (id) {
    return $http.put('https://myherotraining.herokuapp.com/fase/' + id);
  };
  var atualizaIdusuarioTreino = function (model) {
    //console.log('teste' + model.id);
    return $http.post(
      'https://myherotraining.herokuapp.com/treinousuario',
      model
    );
  };

  /* var buscaIdUsuario = function (token) {
         return $http.get('/usuario',token)
     }*/
  var buscaTreinosFeitos = function (IdUsuario) {
    return $http.get(
      'https://myherotraining.herokuapp.com/treinousuario/recupera',
      {
        params: {
          id: IdUsuario,
        },
      }
    );
  };
  var atualizaIdUsuario = function (faseConcluida) {
    return $http.put('https://myherotraining.herokuapp.com/fase', {
      params: {
        faseConcluida: faseConcluida,
      },
    });
  };
  var fotoFase = function (id) {
    return $http.get('https://myherotraining.herokuapp.com/fase/recupera', {
      params: {
        id: id,
      },
    });
  };
  var dadosCadastro = function (id) {
    return $http.get('https://myherotraining.herokuapp.com/cadastro-usuario', {
      params: {
        id: id,
      },
    });
  };
  var salvaTimeCronometroService = function (param) {
    return $http.post('https://myherotraining.herokuapp.com/tempo', param);
  };
  var getTimeCronometroService = function (id_usuario, id_fase) {
    return $http.get('https://myherotraining.herokuapp.com/tempo', {
      params: {
        id_usuario: id_usuario,
        id_fase: id_fase,
      },
    });
  };
  return {
    getTimeCronometroService: getTimeCronometroService,
    salvaTimeCronometroService: salvaTimeCronometroService,
    carregarTreinos: carregaTreinos,
    carregaFasesTreino: carregaFasesTreino,
    carregaExercicios: carregaExercicios,
    carregaIdTreino: carregaIdTreino,
    atualizaFaseConcluida: atualizaFaseConcluida,
    atualizaIdusuarioTreino: atualizaIdusuarioTreino,
    buscaTreinosFeitos: buscaTreinosFeitos,
    atualizaIdUsuario: atualizaIdUsuario,
    fotoFase: fotoFase,
    dadosCadastro: dadosCadastro,
  };
});
