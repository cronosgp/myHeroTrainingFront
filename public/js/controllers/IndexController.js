angular.module('myHeroTraining')
	.controller('PageCtrl',function
		($scope,
		 $translate,
		 $http,
		 homeService,
		 avatarService,
		 amigosService,
		 perfilService,
		 treinoConjuntoService,
		 TreinoService,
		 $location ) {
		$scope.model = {};
		var IdUsuario = sessionStorage.getItem('id');

		/*$scope.msg = function(){
			return sweetAlert("Você não possui amigos adicionados ou solicitações aceitas para essa opção. Convide novos amigos")
		}*/

		var pagante = 0;

        $scope.ispagante = function(){
			console.log(pagante)
            if(pagante == 1){

                return false;
            }
            else {
                return true;
            }

        }
		
        $scope.exibePersonalizado = function(){
            if(pagante == 1){

                return true;
            }
            else {
                return false;
            }

        }
         var isUsuariopagante = function(){
            homeService.pagamento(IdUsuario).success(function (data){
                if(data.length!=0){
                    pagante = 1;
                }
               
        
            }).error(function(data){
                if(data.status === 403){
                  $location.path('/login');
                }
              });
            };
            isUsuariopagante();
		
		
		$scope.alterarIdioma = function(chave) {

			$translate.use(chave);
		}


		var libera = function (callback) {
			treinoConjuntoService.liberaTreino(IdUsuario).success(function (data){
				$scope.jaSel = data !== true;
				return callback(data !== true);
			}).error(function (data){
				console.log("erro");
			});
		}

	/*	var liberadia = function (callback) {
			homeService.carregarTreinos(IdUsuario).success(function (data) {
				var treino = data[0].idt;
				TreinoService.carregaFasesTreino(treino).success(function (data) {
					$scope.fases = data;
					var ultimo = $scope.fases.length - 1;
					var idTreino = $scope.fases[ultimo].id
					treinoConjuntoService.checaFinal(IdUsuario, idTreino).success(function (data) {
						$scope.jaFez = data === true;
						return callback(data !== true);
					}).error(function (){
						console.log("erro");
					})
				}).error(function (data) {
					console.log("erro");
				});
			}).error(function (){
				console.log("erro");
			});
		}*/


	/*	$scope.aviso = async () => {
			liberadia((resultado) => {
				libera((resultado) => {
					
					if($scope.jaFez === false && $scope.jaSel === true){
						return true;
					}
				})
			})
		}*/

		var bloqueia=0;


	
        var buscaTreinosFeito = function () {
          var dataAtual = new Date();
          let data = new Date();
          let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
          TreinoService.buscaTreinoPersonalizadoFeitos(IdUsuario,dataFormatada).success(function (data) {
			
			
              if(data.length !==0)
              {
				 
                bloqueia = 1;
				
              }
          }).error(function(data){
              if(data.status === 403){
                  $location.path('/login');
              }
          });
        };
        buscaTreinosFeito();

		var oculta= false;
			var exibe=false;
			$scope.exibirSemLogin = function () {
				if (localStorage.getItem('Bearer') == null) {
					return true;
				} else {
					return false;
				}
			};
			$scope.exibircomLogin = function () {
				if (localStorage.getItem('Bearer') !== null) {
					return true;
				} else {
					return false;
				}
			};

		$scope.carregaAvatar = function () {
			avatarService.carregarAvatarIndex(IdUsuario).success(function (data) {
				let img = avatarService.arrayBufferToBase64(data)
				$scope.avatar = "data:image/png;base64,"+img;
			}).error(function (data) {
				console.log("erro");
			});
		}

		$scope.bloqueia = function(){
			console.log(bloqueia)

			if(bloqueia === 1){

				return true;
			}
			else {
				return false

			}
		}

		
		$scope.carregarNome = function(){
			perfilService.carregarPerfil(IdUsuario).success(function (data){
				$scope.nome = data.nome;
			}).error(function (data) {
				console.log("erro");
			});
		}
		$scope.carregarNome();

		$scope.carregaNotAmizade = function () {
			amigosService.carregarSolicitacoes(IdUsuario).success(function (data) {
				$scope.notAmizade = data.length
			}).error(function (data) {
				console.log("erro");
			});
		}
		$scope.carregaNotAmizade();

		$scope.carregaNotTreino = function () {
			treinoConjuntoService.carregarSolicitacoes(IdUsuario).success(function (data) {
				$scope.notTreino = data.length
			}).error(function (data) {
				console.log("erro");
			});
		}
		$scope.carregaNotTreino();


		$scope.pagante = function(){
				if(oculta == true){

					return true;
				}

				else{
					return false;

				}
			}

			/*$scope.pagante = function(){
              myHeroTraining.buscaDados(IdUsuario).success(function(data){
                if(data === true){
                  return true;
                }
              });
            }*/

			var pagamento = function () {
				homeService
					.pagamento(IdUsuario)
					.success(function (data) {

						if(data.length!=0){
							oculta = true;
							exibe =true;
						}
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

			pagamento();

			var carrega = function () {
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
			/*   let objComposto = [];
          function carregaTempo(carregaTempoTreino, data2) {
            for (let j = 0; j <= 1; j++) {
              let index = j + 1;
              myHeroTraining
                .getTimeCronometroService(
                  sessionStorage.getItem('id'),
                  carregaTempoTreino[j].id
                )
                .success(function (data) {
                  (objComposto[j] = {
                    descricao: data2[j].descricao,
                    dificuldade: data2[j].dificuldade,
                    horas: data2[j].horas,
                    id: data2[j].id,
                    intensidade: data2[j].intensidade,
                    nivel: data2[j].nivel,
                    nome: data2[j].nome,
                    treino: data2[j].treino,
                    url: data2[j].url,
                    tempo: data.tempo,
                  }),
                    {
                      descricao: data2[j].descricao,
                      dificuldade: data2[j].dificuldade,
                      horas: data2[j].horas,
                      id: data2[j].id,
                      intensidade: data2[j].intensidade,
                      nivel: data2[j].nivel,
                      nome: data2[j].nome,
                      treino: data2[j].treino,
                      url: data2[j].url,
                      tempo: data.tempo,
                    };
                  //console.log(data2);
                });
              $scope.treinos = objComposto;
            }
          }*/
			$scope.logout = function () {
				localStorage.clear();
				sessionStorage.clear();
				$location.path('/login');
			};
			function refresh() {
				setTimeout(function () {
					//location.reload();
					//console.log('aguardadno');
				}, 1000);
			}
			$scope.premium = function(){
				if(exibe == true){

					return false;

				}
				else{
					return true;
				}
			}

			carrega();
			//getTimeCronometro();
			$scope.fotoPrincipal = {
				url:
					'https://i.pinimg.com/236x/ba/87/5d/ba875dc13ef3651e4f08237d07f8ea45.jpg',
			};
		}
	)