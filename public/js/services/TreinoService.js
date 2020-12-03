angular.module('myHeroTraining').factory('TreinoService', function ($http) {
  var carregaTreinos = function (qnt, pg) {
    //return $http.get('http://localhost:80880/treinos', qnt, pg);
  };
  var carregaFasesTreino = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/fase', {
      params: {
        id: id,
      },
    });
  };
  var carregaExercicios = function (id, pagina, qnt) {
    return $http.get('https://mhtraining.herokuapp.com/exercicio', {
      params: {
        id: id,
        pagina: pagina,
        qnt: qnt,
      },
    });
  };
  var carregaIdTreino = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/fase/treino', {
      params: {
        id: id,
      },
    });
  };

  var atualizahistorico = function (IdUsuario) {
    return $http.delete(
      'https://mhtraining.herokuapp.com/treinousuario/' + IdUsuario
    );
  };

  var atualizaFaseConcluida = function (id) {
    return $http.put('https://mhtraining.herokuapp.com/fase/' + id);
  };
  var atualizaIdusuarioTreino = function (model) {
    //console.log('teste' + model.id);
    return $http.put('https://mhtraining.herokuapp.com/treinousuario', model);
  };

  /* var buscaIdUsuario = function (token) {
         return $http.get('/usuario',token)
     }*/
  var buscaTreinosFeitos = function (IdUsuario) {
    return $http.get(
      'https://mhtraining.herokuapp.com/treinousuario/recupera',
      {
        params: {
          id: IdUsuario,
        },
      }
    );
  };
  var atualizaIdUsuario = function (faseConcluida) {
    return $http.put('https://mhtraining.herokuapp.com/fase', {
      params: {
        faseConcluida: faseConcluida,
      },
    });
  };
  var fotoFase = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/fase/recupera', {
      params: {
        id: id,
      },
    });
  };
  var dadosCadastro = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/cadastro-usuario', {
      params: {
        id: id,
      },
    });
  };
  var salvaTimeCronometroService = function (param) {
    return $http.post('https://mhtraining.herokuapp.com/tempo', param);
  };
  var getTimeCronometroService = function (id_usuario, id_fase) {
    return $http.get('https://mhtraining.herokuapp.com/tempo', {
      params: {
        id_usuario: id_usuario,
        id_fase: id_fase,
      },
    });
  };
  var salvaData = function (id) {
    return $http.put('https://mhtraining.herokuapp.com/fasedia', id);
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
    salvaData: salvaData,
    atualizahistorico: atualizahistorico,
  };
});
