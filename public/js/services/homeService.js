angular.module('myHeroTraining').factory('homeService', function ($http) {
  var carregaTreinos = function (id) {
   // var jwt = localStorage.getItem('Bearer');

  //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    return $http.get('https://mhtrainingback.herokuapp.com/fase', {
      params: {
        id: id,
      },
    });
  };
/*  var buscaDados = function(id){
    return $http.get('https://mhtrainingback.herokuapp.com/process_payment', {
      params: {
        id: id,
      },
    });
  };*/

  
  var pagamento = function(id){

    return $http.get('https://mhtrainingback.herokuapp.com/usuario/pagamento', {

      params: {
        id: id,
      },
    });
  };

  var pegaNot = function (id){
    return $http.get('https://mhtrainingback.herokuapp.com/not', {
      params: {
        id: id,
      },
    });
  }

  var fechaNot = function (id){
    return $http.post('https://mhtrainingback.herokuapp.com/not', id)
    };

  var getTimeCronometroService = function (id_usuario, id_fase) {
    var jwt = localStorage.getItem('Bearer');

    $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    return $http.get('https://mhtrainingback.herokuapp.com/tempo', {
      params: {
        id_usuario: id_usuario,
        id_fase: id_fase,
      },
    });
  };
  return {
    fechaNot: fechaNot,
    pegaNot: pegaNot,
    getTimeCronometroService: getTimeCronometroService,
    carregarTreinos: carregaTreinos,
    pagamento:pagamento
    
  };
});
