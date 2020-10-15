angular.module('myHeroTraining').controller('TreinoController', function ($scope, $routeParams, TreinoService, $location) {
    $scope.model = {}
    $scope.fotos = [
        {url: 'https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_960_720.jpg'}];

    $scope.fotoP = [
        {
            url: 'https://gooutside-static-cdn.akamaized.net/wp-content/uploads/sites/3/2020/03/treino-e-dicas-para-se-manter-em-forma-em-casa.jpg'
        },
    ];
    $scope.fotoX = [
        {url: 'https://www.runtastic.com/blog/wp-content/uploads/2019/03/thumbnail_1200x800.jpg'},
        {url: 'https://www.bodynutry.ind.br/images/noticias/grd/71ba53d6fccbc4aeeb2aee3c4dc21281.jpg'},
        {url: 'https://conteudo.imguol.com.br/c/entretenimento/a7/2016/05/30/homem-fazendo-flexao-1464620034199_v2_1920x1279.jpg'}
    ];
    $scope.foto = {
        urlx: 'angular/public/imagem/Chega%20de%20desculpas_%20malhe%20fora%20da%20academia.gif'
    }
    var id = $routeParams.id;
    var conlusao;
    var exibeBotao = 1;
    var idFase;
    var faseTerminadas = [];
    var treinosRealizados = [];
    var liberarProxFase;
    var idFase;
    var quantidadeFases;
    var liberarTodasFases;
    var primeirafase = [];
    var liberar;

    var IdUsuario = sessionStorage.getItem('id');

    $scope.desabilita = function () {
        return false;
    }
    $scope.concluir = function () {
        if (conlusao === 1) {
            return true;
        }
    }
    //função botão iniciar
    $scope.iniciar = function () {
        TreinoService.carregaExercicios(id).success(function (data) {
            var total = data.totalElements;
            var pag = total - 1;
            var qtd = 1
            //não exibe mais a opçao de inicio
            exibeBotao = 0;
            exericioPaginacao(id, pag, qtd)
            liberar = true;
        });
    }
    //exbibe botão de iniciar
    $scope.inicia = function () {
        if (exibeBotao === 1)
            return true;
    }
    $scope.prox = function () {
        if (exibeBotao === 0)
            return true;
    }
    $scope.final = function () {
        if (exibeBotao === -1)
            return true;
    }
    /*var recuperaIdUsuario = function () {
        var token = sessionStorage.getItem("Bearer");
        TreinoService.buscaIdusuario(1).success(function (data) {
            //passar aqui na  data
            idUsuario = data;
        });
    }*/
    //recuperaIdUsuario();
    var pagina;
    $scope.proximo = function () {
        TreinoService.carregaExercicios(id).success(function (data) {
            if (pagina === undefined) {
                pagina = 1;
            }
            var total = data.totalElements - 1;
            var pag = total - pagina;
            var qtd = 1
            if (pag === 0) {
                exibeBotao = -1;
            }
            if (pag === -1) {
                conlusao = 1;
            }
            exericioPaginacao(id, pag, qtd)
            pagina += 1;
        });

    }
    var exericioPaginacao = function (id, pagina, qnt) {
        TreinoService.carregaExercicios(id, pagina, qnt).success(function (data) {
            $scope.exercicios = data.content;
        });
    }
    var fasesTreinos = function () {
        TreinoService.carregaFasesTreino(id).success(function (data) {
            $scope.fases = data;
            quantidadeFases = data.length;
            primeirafase = data[0];
        });
    }
    //falta pegar Id do usuario do banco e passar no parametro, pelo token
    //falta salvar id na tabela
    //true ?Ok
    var buscaTreinosFeito = function () {
        TreinoService.buscaTreinosFeitos(IdUsuario).success(function (data) {
            for (var j = 0; j < data.length; j++) {
                faseTerminadas.push(data[j].id)
            }

        });
    }
    buscaTreinosFeito();
    var exerciciosFase = function () {
        TreinoService.carregaExercicios(id).success(function (data) {
            $scope.exercicios = data.content;
        });
    }
    $scope.item = function (valor) {
        for (var i = 0; i <= faseTerminadas.length; i++) {
            if (faseTerminadas.indexOf(valor) != -1) {
                return true;
            }
        }

    };

    //logica de habilitar e desabilitar fases
    $scope.desabilita = function (valor) {
        var ProximaFase = faseTerminadas[faseTerminadas.length - 1]
        if (valor === 1 && faseTerminadas.indexOf(valor) === -1 || valor === primeirafase && faseTerminadas.indexOf(valor) === -1 || faseTerminadas.indexOf(valor) === -1 && valor === parseInt(ProximaFase) + parseInt(1) && faseTerminadas.indexOf(valor) === -1
            || quantidadeFases === valor && liberarTodasFases === true) {
            return false;
        } else {
            faseTerminadas.indexOf(valor) != -1 || faseTerminadas.indexOf(valor) === -1
            return true;
        }
    }
    var atualizaFaseBanco = function (idFase) {
        TreinoService.atualizaFaseConcluida(idFase).success(function (data) {
        });
    }
    var atualizaIdusuarioTreino = function () {

        var idFaseAtual = {
            id: id
        }
        TreinoService.atualizaIdusuarioTreino(IdUsuario, idFaseAtual).success(function (data) {
        });
    }
    $scope.finalizar = function (valor) {
        atualizaFaseBanco(id);
        atualizaIdusuarioTreino(valor);
        liberarProxFase = true;
        idFase = parseInt(id) + parseInt(1);
        if (quantidadeFases === id) {
            liberarTodasFases = true;
        }
        TreinoService.carregaIdTreino(id).success(function (data) {
            idFase = data[0].id;
            $location.path('treinos/' + idFase).reload();
        });
    }
    var carrega = function () {
        TreinoService.fotoFase(id).success(function (data) {
            $scope.treinos = data;
        });
    };

    var carregaDdos = function () {
        TreinoService.dadosCadastro(IdUsuario).success(function (data) {
            $scope.infos = data;

        });
    };

    carrega();
    exerciciosFase();
    fasesTreinos();
    carregaDdos();
});