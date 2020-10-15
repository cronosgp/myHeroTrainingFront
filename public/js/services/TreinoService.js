angular.module('myHeroTraining').factory('TreinoService', function ($http) {
    var carregaTreinos = function (qnt, pg) {
        return $http.get('/treinos', qnt, pg);
    };
    var carregaFasesTreino = function (id) {
        return $http.get('/fase', {
            params: {
                id: id
            }
        });
    };
    var carregaExercicios = function (id, pagina, qnt) {
        return $http.get('/exercicio', {
            params: {
                id: id,
                pagina :pagina,
                qnt :qnt
            }
        });
    };
    var carregaIdTreino = function (id) {
        return $http.get('/fase/treino', {
            params: {
                id: id
            }
        });
    };
    var atualizaFaseConcluida = function (id) {
        return $http.put('/fase/' +id)
    }
    var atualizaIdusuarioTreino = function (idUsuario,id) {
        return $http.post('/usuario/'+idUsuario, id)

    }
    /* var buscaIdUsuario = function (token) {
         return $http.get('/usuario',token)
     }*/
    var buscaTreinosFeitos = function (IdUsuario) {
        return $http.get('/treinos/recupera', {
            params:{
                IdUsuario :IdUsuario
            }
        });
    }
    var atualizaIdUsuario = function (faseConcluida) {
        return $http.put('fase',
            {
                params:{
                    faseConcluida :faseConcluida
                }
            })
    }
    var fotoFase = function (id) {
        return $http.get('fase/recupera',
            {
                params: {
                    id: id
                }
            });
    }
    var dadosCadastro = function (id) {
        return $http.get('/cadastro-usuario',{
            params: {
                id: id,
            }
        });
    };

    return {
        carregarTreinos: carregaTreinos,
        carregaFasesTreino: carregaFasesTreino,
        carregaExercicios :carregaExercicios,
        carregaIdTreino : carregaIdTreino,
        atualizaFaseConcluida : atualizaFaseConcluida,
        atualizaIdusuarioTreino : atualizaIdusuarioTreino,
        buscaTreinosFeitos : buscaTreinosFeitos,
        atualizaIdUsuario : atualizaIdUsuario,
        fotoFase :fotoFase,
        dadosCadastro: dadosCadastro
    }
});