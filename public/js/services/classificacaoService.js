nodemonangular.module('myHeroTraining').factory('classificacaoservice', function ($http) {
    var carregaClassificacao = function (id) {
     // var jwt = localStorage.getItem('Bearer');
    //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
      return $http.get('https://mhtrainingback.herokuapp.com/classificacao');
    };
    return {
        carregaClassificacao: carregaClassificacao
    };
  });
  