angular.module('myHeroTraining').factory('TreinoService', function ($http) {
  var carregaTreinos = function (qnt, pg) {
    return $http.get('http://localhost:8080/treinos', qnt, pg);
  };
  var carregaFases = function (id) {
    return $http.get('http://localhost:8080/fase', {
      params: {
        id: id,
      },
    });
  };
  var carregaExercicios = function (id, pagina, qnt) {
    return $http.get('http://localhost:8080/exercicio', {
      params: {
        pagina: pagina,
        qnt: qnt,
        id: id,
      },
    });
  };
  var carregaIdTreino = function (id) {
    return $http.get('http://localhost:8080fase/treino', {
      params: {
        id: id,
      },
    });
  };
  var atualizaFaseConcluida = function (id, model) {
    return $http.put('http://localhost:8080fase/concluida/' + id, model);
  };
  var atualizaIdusuarioTreino = function (id, model) {
    return $http.put('http://localhost:8080/treino/' + id, model);
  };
  /* var buscaIdUsuario = function (token) {
        return $http.get('/usuario',token)
    }*/
  var buscaTreinosFeitos = function (IdUsuario) {
    return $http.get('http://localhost:8080treinos/recupera', {
      params: {
        IdUsuario: IdUsuario,
      },
    });
  };
  var atualizaIdUsuario = function () {
    return $http.put('fase');
  };
  return {
    carregarTreinos: carregaTreinos,
    carregaFases: carregaFases,
    carregaExercicios: carregaExercicios,
    carregaIdTreino: carregaIdTreino,
    atualizaFaseConcluida: atualizaFaseConcluida,
    atualizaIdusuarioTreino: atualizaIdusuarioTreino,
    //  buscaIdUsuario : buscaIdUsuario,
    buscaTreinosFeitos: buscaTreinosFeitos,
    atualizaIdUsuario: atualizaIdUsuario,
  };
});
