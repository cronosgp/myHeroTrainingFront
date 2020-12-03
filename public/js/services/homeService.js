angular.module('myHeroTraining').factory('myHeroTraining', function ($http) {
  var carregaTreinos = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/treinos', {
      params: {
        id: id,
      },
    });
  };

  var carregaFaseData = function (id) {
    return $http.get('https://mhtraining.herokuapp.com/fasedia', {
      params: {
        id: id,
      },
    });
  };

  /*var atualizahistorico = function (model) {
    return $http.put('https://mhtraining.herokuapp.com/treinousuario/delete',{
      params: {
        model : model,
      },
    });

  };*/

  var atualizahistorico = function (idUsuario) {
    return $http.delete(
      'https://mhtraining.herokuapp.com/treinousuario/' + idUsuario
    );
  };

  var getTimeCronometroService = function (id_usuario, id_fase) {
    return $http.get('https://mhtraining.herokuapp.com/treinos', {
      params: {
        id_usuario: id_usuario,
        id_fase: id_fase,
      },
    });
  };
  return {
    getTimeCronometroService: getTimeCronometroService,
    carregarTreinos: carregaTreinos,
    carregaFaseData: carregaFaseData,
    atualizahistorico: atualizahistorico,
  };
});
