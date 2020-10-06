angular.module('myHeroTraining').factory('myHeroTraining', function ($http) {
  var carregaTreinos = function (pagina, qnt, id) {
    return $http.get('http://localhost:8080/treinos', {
      params: {
        pagina: pagina,
        qnt: qnt,
        id: id,
      },
    });
  };
  var carregaDados = function () {
    return $http.get('http://localhost:8080/cadastro-usuario');
  };
  return {
    carregarTreinos: carregaTreinos,
    carregaDados: carregaTreinos,
  };
});
