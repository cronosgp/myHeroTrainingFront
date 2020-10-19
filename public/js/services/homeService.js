angular.module('myHeroTraining').factory('myHeroTraining', function ($http) {
  var carregaTreinos = function (id) {
    return $http.get('https://myherotraining.herokuapp.com/treinos', {
      params: {
        id: id,
      },
    });
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
    carregarTreinos: carregaTreinos,
  };
});
