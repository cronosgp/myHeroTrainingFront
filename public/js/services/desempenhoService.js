angular.module('myHeroTraining').factory('desempenhoService', function ($http) {
    var busca = function (id, data, dataf) {
   //  var jwt = localStorage.getItem('Bearer');
  
   //   $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
      return $http.get('http://localhost:8080/desempenho', {
        params: {
          id: id,
         d_ini : data ,
          dt_fim : dataf ,
        },
      });
    };
       return {
        busca: busca,
     
    };
  });
  