angular
    .module('myHeroTraining')
    .controller('TreinoConjuntoController', function (
        $scope,
        $routeParams,
        amigosService,
        avatarService,
        treinoConjuntoService,
        TreinoService,
        TreinoPersonalizadoService,
        homeService,
        $location
    ) {
        $scope.model = {};
        var id = $routeParams.id;
        var conlusao;
        var exibeBotao = 1;
        var faseTerminadas = [];
        var cronometro_id;
        var ultimoexercicio = $routeParams.id;
        var idFase;
        var quantidadeFases;
        var liberarTodasFases;
        var primeirafase = [];
        var tempo = [];

        var tempoAtual;
        var repeticaoExercicio = 0;
        var treinoPersonalizado =[];
        var fase;
        var dados =[]
        var arrayExercicio;

        var temPersonalizado = false;

        var IdUsuario = sessionStorage.getItem('id');


        var carregaSolTreino = function () {
            treinoConjuntoService.carregarSolicitacoes(IdUsuario).success(function (data) {
                console.log(data)

                for(var i=0; i<data.length; i++){
                    data[i].avatar = "data:image/png;base64," +data[i].avatar
                }
                $scope.solicitacoes = data;

            }).error(function (data) {
                console.log("erro");
                console.log(data);
            });
        }
        carregaSolTreino();

        
        $scope.aguardando = function () {
            treinoConjuntoService.amigoAguardando(IdUsuario).success(function (data){
                $scope.amigoAguardando = data !== true;
            }).error(function (data){
                console.log("erro");
            });
        }

        $scope.pegaResultado = function () {
            treinoConjuntoService.resultado(IdUsuario).success(function (data){
                $scope.resultado = data;
            }).error(function (data){
                console.log("erro");
            });
        }
     
        $scope.carregaNotTreino = function () {
            treinoConjuntoService.carregarSolicitacoes(IdUsuario).success(function (data) {
                $scope.notTreino = data.length
            }).error(function (data) {
                console.log("erro");
            });
        }
        $scope.carregaNotTreino();

        var jaSelecionou = function () {
            treinoConjuntoService.liberaTreino(IdUsuario).success(function (data){
                $scope.jaSel = data !== true;
                return data !== true;
            }).error(function (data){
                console.log("erro");
            });
        }

        $scope.aceitarSolicitacao = function (usuarioid) {
                treinoConjuntoService.aceitarSolicitacao(usuarioid, IdUsuario).success(function (data) {
                    swal({
                        title: "Convite aceito com sucesso!",
                        type: "success",
                        icon: "success"
                    })
                    carregaSolTreino();
                    $route.reload();

                }).error(function (data) {
                    console.log("erro");
                    console.log(data);
                });
        }

        $scope.recusarSolicitacao = function (usuarioid) {

            treinoConjuntoService.recusarSolicitacao(usuarioid, IdUsuario).success(function (data){
                swal({
                    title: "Convite recusado!",
                    type: "success",
                    icon: "success"
                })
                carregaSolTreino();
            }).error(function (data){
                console.log("erro");
                console.log(data);
            });
        }

        var buscaPersonlizado = function(){
            var data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            TreinoService.buscaPersonlizado(dataFormatada,IdUsuario,).success(function(data){

                if(data.length!=0){

                    temPersonalizado = true;
                }

            });
        }
        buscaPersonlizado();

        $scope.concluir = function () {
            if (conlusao === 1) {
                return true;
            }
        };
        //função botão iniciar

        console.log("Bruno",faseTerminadas)
        $scope.desabilita = function(dados) {

            var ProximaFase = faseTerminadas[faseTerminadas.length - 1];

            // console.log(dadosx)
            var pos = arrayExercicio.map(function(e) {

                return e.id;

            }).indexOf(ProximaFase)


            for(var i=0; i<arrayExercicio.length; i++){

                valor = arrayExercicio[i].id

                if(i==0 && faseTerminadas.indexOf(valor)==-1 && temPersonalizado==false || i== pos+1 && faseTerminadas.indexOf(valor)==-1 && i!=0 || temPersonalizado==true && i==1 && faseTerminadas.indexOf(valor)==-1 ){

                    document.querySelector("#tabela").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("button")[0].getElementsByTagName("a")[0].classList.remove('disabled')
                    document.getElementById('tabela').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName("input")[0].disabled = false


                }
                else
                {
                    faseTerminadas.indexOf(valor)==-1 || faseTerminadas.indexOf(valor)!=-1 || i==0
                    // console.log(faseTerminadas)

                    document.querySelector("#tabela").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("button")[0].getElementsByTagName("a")[0].classList.add('disabled')
                    document.getElementById('tabela').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName("input")[0].disabled = true

                }
            }



        }


        $scope.iniciar = function () {
            document.getElementById('btn_finalizar').style.display = 'block';
            document.getElementById('btn_iniciar').style.display = 'none';
            zerarCronometro();
            iniciaCronometro();
            tempoAtual = new Date();

        };

        var atualizapontosfeitos = function(id){
            TreinoService.atualizapontosUsu(id).success(function(data){
            }).error(function(data){
                if(data.status === 403){
                    $location.path('/login');
                }

            });
        };
        //exbibe botão de iniciar
        $scope.inicia = function () {
            //ajusta elemento

            if (exibeBotao === 1) return true;
        };
        $scope.prox = function () {
            if (exibeBotao === 0) return true;
        };
        $scope.final = function () {
            if (exibeBotao === -1) return true;
        };

        var pagina;
        $scope.proximo = function () {
            TreinoService.carregaExercicios(id).success(function (data) {
                if (pagina === undefined) {
                    pagina = 1;
                }
                var total = data.totalElements - 1;
                var pag = total - pagina;
                var qtd = 1;
                if (pag === 0) {
                    exibeBotao = -1;
                }
                if (pag === -1) {
                    conlusao = 1;
                }
                exericioPaginacao(id, pag, qtd);
                pagina += 1;
            });
        };
        var exericioPaginacao = function (id, pagina, qnt) {
            TreinoService.carregaExercicios(id, pagina, qnt).success(function (
                data
            ) {
                $scope.exercicios = data.content;
            });
        };
        var fasesTreinos = function () {
            TreinoService.carregaFasesTreino(id).success(function (data) {

                $scope.fases = data;
                dados = data;
                arrayExercicio = data

            });
        };
        //falta pegar Id do usuario do banco e passar no parametro, pelo token
        //falta salvar id na tabela
        //true ?Ok
        var conjunto;
        var buscaTreinosFeitoPersonalizado = function () {
            var dataAtual = new Date();
            let data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            TreinoService.buscaTreinoPersonalizadoFeitos(IdUsuario,dataFormatada).success(function (data) {
               
                for (var j = 0; j < data.length; j++) {
                    faseTerminadas.push(data[j].id_exercicio);
                }

                if(data.length !=0){
                    conjunto = true;

                }
            }).error(function(data){
                if(data.status === 403){
                    $location.path('/login');
                }
            });
        };

        





        buscaTreinosFeitoPersonalizado();
        var libera;
        var convite = function(){
            let data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            amigosService.buscaConvite(IdUsuario,dataFormatada).success(function (data)
            {
                if(data.length !==0){
                   libera = true;
                }
            });


        }
        convite();

        $scope.dados = function(){


            if(temTreino === true || conjunto === true){
                return true;

            }
        }

        var temTreino;
        var buscaTreinosFeito = function () {
            var dataAtual = new Date();
            let data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            TreinoService.buscaTreinosFeitos(IdUsuario,dataFormatada).success(function (data) {

                               
              if(data.length!=0){
                temTreino = true;

              }

             }).error(function(data){
              if(data.status === 403){
                $location.path('/login');
              }
            });
          };
          buscaTreinosFeito();

        $scope.bloqueia = function(){

            if(libera === true && temTreino!=true){

                return false;
            }
            else{
                return true;
            }
         
        }

        buscaTreinosFeito();
        var exerciciosFase = function () {
            TreinoService.carregaExercicios(id).success(function (data) {

                $scope.exercicios = data;


            });
        };
        $scope.item = function (valor) {
            for (var i = 0; i <= faseTerminadas.length; i++) {
                if (faseTerminadas.indexOf(valor) !== -1) {
                    return true;
                }
            }
        };

        var atualizaFaseBanco = function (idFase) {
            TreinoService.atualizaFaseConcluida(idFase).success(function (data) {})
            return false;
        };

        var salvaDataFinalFase = function(idDaFase){
            //chamar aqui

            // let data = new Date()
            //let dataFimFase = ((data.getFullYear())) + "-" + ((data.getMonth() + 4)) + "-" + data.getDate();
            let d = new Date();
            var data =  d.setDate(d.getDate() + 90)
            var dadosSalvaFimFase ={
                id_fase: 1,
                idUsuario: IdUsuario,
                data_fim_fase : data

            }
            TreinoService.salvaDataFimFase(dadosSalvaFimFase).success(function (data) {
            }).error(function(data){
                if(data.status === 403){
                    $location.path('/login');
                }
            });
        }

        var carregaTreinoUsuario = function(){
            TreinoPersonalizadoService.carregaTreinoUsuario(IdUsuario).success(function(data){
                if(data.length > 0){
                    treinoPersonalizado = data
                }
            });

        }
        var atualizaIdusuarioTreino = function () {
            let fase_check = $routeParams;
            // console.log('atualizaIdUsuario' + fase_check);
            var dadosTreino = {
                id_usuario: IdUsuario,
                dataRealizada: new Date(),
                id_exercicio :id,
                conjunto :'true'

            };

            var calculaDatafimFase = function(){
                let dataFimFase = new Date();
                dataFimFase.setDate(dataFimFase.getDate() + 90);


            };


            calculaDatafimFase();
            TreinoService.atualizaIdusuarioTreino(dadosTreino).success(function (
                data
            ) {

                
            }).error(function(data){
                if(data.status === 403){
                    $location.path('/login');
                }
            });
        };

        var buscaPersonlizado = function(){
            var data = new Date();
            let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
            TreinoService.buscaPersonlizado(IdUsuario,dataFormatada).success(function(data){

                if(data.length){
                    temPersonalizado = true;
                }

            });
        }

        buscaPersonlizado();

        var carregaIdTreino = function () {
            TreinoService.carregaIdTreino(id).success(function (data) {
                idFase = data;
            });
        };

        $scope.finalizar = function (valor) {
            // atualizaIdusuarioTreino;
            repeticaoExercicio++;
            //  delete_check++;
            var tempoCalculado = 0;
            var horaAtual = new Date();
            // console.log("subtracao: " + horaAtual - tempoAtual)
            tempo.push(tempoAtual -horaAtual)


            if(repeticaoExercicio ===2){


                tempo.forEach((tempo)=>{tempoCalculado = tempoCalculado + tempo})
                // console.log(tempoCalculado)
                tempoCalculado = Math.floor(tempoCalculado / 3600)+":"+Math.floor(tempoCalculado/ 60)+":"+tempoCalculado % 60;
                // console.log(tempoCalculado)
                if(tempoCalculado.substring(0,2).match(':')){
                    tempoCalculado = '0' + tempoCalculado;
                }


                if(tempoCalculado.substring(2,4).match(':'))
                {
                    tempoCalculado = tempoCalculado.substring(0,3) + '0' + tempoCalculado.substring(0,4)

                }

                if(tempoCalculado.substring(6,8).length == 1)
                {
                    tempoCalculado = tempoCalculado.substring(0,3) + '0' + tempoCalculado.substring(6,3)+ '0' +
                        tempoCalculado.substring(6,8)


                }
            }
            if(repeticaoExercicio ===3){
                carregaIdTreino();
                atualizaIdusuarioTreino();
                salvaDataFinalFase(idFase);
                // atualizaFaseBanco(id);
                atualizapontosfeitos(IdUsuario);


            }
            document.getElementById('p_cronometro').style.display = 'none';
            document.getElementById('btn_finalizar').style.display = 'none';
            document.getElementById('btn_iniciar').style.display = 'block';
            //zerarCronometro();

            var tempo_corrido = `${
                document.getElementById('timer_horas').innerText
            }:${document.getElementById('timer_minutos').innerText}:${
                document.getElementById('timer_segundos').innerText
            }`;


            document.getElementById(
                'tempo'
            ).innerHTML = `Tempo de execução: ${tempo_corrido}`;

            // liberarProxFase = true;
            // idFase = parseInt(id) + parseInt(1);
            //  if (quantidadeFases === id) {
            //    liberarTodasFases = true;
            //}
            if (repeticaoExercicio === 1) {
                var data = {
                    dataTreino: new Date(),
                    idfase: idFase,
                    idUsuario: IdUsuario,
                };

                //  TreinoService.salvaData(data).success(function (data) {});
            }
            ultimoexercicio = $routeParams.id;
            //console.log(ultimoexercicio);
            /* if (ultimoexercicio >= 6 && repeticaoExercicio == 3) {
               TreinoService.atualizahistorico(IdUsuario).success(function (
                 data
               ) {});
               $location.path('/home');
             }*/

            if (repeticaoExercicio < 3) {
                TreinoService.carregaIdTreino(id).success(function (data) {
                    idFase = data
                    let timerInterval;
                    document.getElementById('serieFeitas').innerHTML =
                        'Número de séries realizadas: ' + repeticaoExercicio;
                    document.getElementById('img').style.filter = 'grayscale(100%)';
                    Swal.fire({
                        title: 'Descanse!',
                        html:
                            'Você poderá repetir  o mesmo exercicío em <b>30</b> segundos.',
                        timer: 30000,
                        allowOutsideClick: false,
                        timerProgressBar: true,

                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                            timerInterval = setInterval(() => {
                                const content = Swal.getContent();
                                if (content) {
                                    const b = content.querySelector('b');
                                    if (b) {
                                        var texto = Swal.getTimerLeft() / 1000;
                                        var resultado = texto.toString().substring(0, 2);
                                        b.textContent = resultado;
                                    }
                                }
                            }, 1000);
                        },
                        onClose: () => {
                            clearInterval(timerInterval);
                            Swal.fire({
                                title: 'Iniciar Série',
                                icon: 'info',
                                text:
                                    ' Número de Séries realizadas: ' +
                                    repeticaoExercicio +
                                    ' de 3',
                            });

                            document.getElementById('img').style.filter = '';
                            let id_treino = $routeParams.id;
                            $location.path('treino-conjunto-executa/' + id_treino);
                        },
                    }).then((result) => {
                        //  Read more about handling dismissals below
                        if (result.dismiss === Swal.DismissReason.timer) {
                            //   console.log('fechando o timer');
                        }
                    });
                    function refresh() {
                        setTimeout(function () {
                            location.reload();
                        }, 100);
                    }
                });
            } else {
                let id_treino = $routeParams.id;
                TreinoService.carregaIdTreino(id_treino).success(function (data) {
                    console.log(data)
                    idFase = data[0].id
                    // console.log(idFase);
                    // atualizaIdusuarioTreino();
                    //   atualizaFaseBanco(id);

                    $location.path('treinoconjuntoinicio/' + idFase);

                    function refresh() {
                        setTimeout(function () {
                            location.reload();
                        }, 200);
                    }
                    refresh();
                    $location.path('treinoconjuntoinicio/' + idFase);
                    setTimeout(location.reload.bind(location), 2000);
                    // window.location.reload();
                });
            }
        };
        //
        var atualizData = function () {};

        var salvaTimeCronometro = function (parametroTempo) {
            TreinoService.salvaTimeCronometroService(
                parametroTempo
            ).success(function (data) {});
        };

        var carrega = function () {
            TreinoService.fotoFase(id).success(function (data) {

                $scope.treinos = data;
                console.log($scope.treinos)

            });
        };

        var carregaDdos = function () {
            TreinoService.dadosCadastro(IdUsuario).success(function (data) {
                $scope.infos = data;
            });
        };
        carregaDdos();
        var iniciaCronometro = function iniciarCronometro() {
            // document.getElementById("btnIniciar").style.display = 'none';
            //document.getElementById("btnZerar").style.display = 'inline';

            var timer_horas = document.getElementById('timer_horas');
            var timer_minutos = document.getElementById('timer_minutos');
            var timer_segundos = document.getElementById('timer_segundos');
            var timer_decimo = document.getElementById('timer_decimo');

            document.getElementById('p_cronometro').style.display = 'block';

            var h = 0;
            m = 0;
            s = 0;
            d = 0;

            cronometro_id = setInterval(function () {
                timer_horas.innerHTML = h < 10 ? '0' + h : h;
                timer_minutos.innerHTML = m < 10 ? '0' + m : m;
                timer_segundos.innerHTML = s < 10 ? '0' + s : s;
                timer_decimo.innerHTML = d < 10 ? '0' + d : d;

                if (d < 9) {
                    d += 1;
                } else if (s < 59) {
                    d = 0;
                    s += 1;
                } else if (m < 59) {
                    d = 0;
                    s = 0;
                    m += 1;
                } else if (h < 23) {
                    d = 0;
                    s = 0;
                    m = 0;
                    h += 1;
                } else {
                    alert('Ops! Estourou as 24h!!!');
                }
            }, 140);
        };

        function zerarCronometro() {
            clearInterval(cronometro_id);

            document.getElementById('timer_horas').innerHTML = '00';
            document.getElementById('timer_minutos').innerHTML = '00';
            document.getElementById('timer_segundos').innerHTML = '00';
            document.getElementById('timer_decimo').innerHTML = '00';
        }
        function refresh() {
            setTimeout(function () {
                location.reload();
            }, 150);
        }

        var carregaTreino = function () {
            homeService
                .carregarTreinos(IdUsuario)
                .success(function (data) {
                    //  carregaObjetos = data;

                    $scope.treinos = data;

                    /* refresh();
                carregaTempoTreino = carregaObjetos[0].treino;
                carregaTempo(carregaTempoTreino, data);*/
                })
                .error(function (data) {
                    if (data.status === 403) {
                        $location.path('/login');
                    }
                });
        };


        carrega();
        carregaTreino();
        carregaTreinoUsuario();
        exerciciosFase();
        fasesTreinos();
        jaSelecionou();

        $scope.aguardando();
        $scope.pegaResultado();
    });

