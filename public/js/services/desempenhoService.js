angular.module('myHeroTraining').factory('desempenhoService', function ($http) {
    var busca = function (id, data, dataf, filtro) {
 //    var jwt = localStorage.getItem('Bearer');
  
   //  $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
      return $http.get('https://mhtrainingback.herokuapp.com/desempenho', {
        params: {
          id: id,
         d_ini : data ,
          dt_fim : dataf ,
          filtro: filtro
        },
      });
      
    };
    var carregaDados = function(id){
      //var jwt = localStorage.getItem('Bearer');
  
     // $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
      return $http.get('https://mhtrainingback.herokuapp.com/desempenho/dado', {
        params: {
          id: id,
        
    }
  });
}
       return {
        busca: busca,
        carregaDados : carregaDados
       
      };
  });
  