angular.module('myHeroTraining').factory('homeService', function ($http) {
  var carregaTreinos = function (id) {
   // var jwt = localStorage.getItem('Bearer');

  //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    return $http.get('http://localhost:8080/fase', {
      params: {
        id: id,
      },
    });
  };
/*  var buscaDados = function(id){
    return $http.get('http://localhost:8080/process_payment', {
      params: {
        id: id,
      },
    });
  };*/

  var pagamento = function(id){
    return $http.get('http://localhost:8080/usuario/pagamento', {
      params: {
        id: id,
      },
    });
  };
  var getTimeCronometroService = function (id_usuario, id_fase) {
    var jwt = localStorage.getItem('Bearer');

    $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    return $http.get('http://localhost:8080/tempo', {
      params: {
        id_usuario: id_usuario,
        id_fase: id_fase,
      },
    });
  };
  return {
    getTimeCronometroService: getTimeCronometroService,
    carregarTreinos: carregaTreinos,
    pagamento:pagamento
    
  };
});
