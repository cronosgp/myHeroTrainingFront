angular
  .module('myHeroTraining')
  .controller(
    'desempenhoController',
    function ($scope, $http, desempenhoService, $location) {
      $scope.model = {};   
      var exibe = 0;
      var IdUsuario = sessionStorage.getItem('id');

     $scope.busca = function(){
       document.getElementById('btn_pagnicao').style.display="block";
  
       var data = $scope.model.dt;
       var dataf = $scope.model.df;
       var dados_paginar;
        let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
        let dataFormatadaf =  ((dataf.getFullYear())) + "/" + (("0" + (dataf.getMonth() + 1)).slice(-2)) + "/" + dataf.getDate();
        desempenhoService.busca(IdUsuario,dataFormatada, dataFormatadaf).success(function(data)

          {   
            console.log(data)
          
   dados_paginar =data;
     var table = document.getElementById('table_dados');
     var tbody = table.getElementsByTagName("tbody")[0]
          for(var i=0; i<data.length; i++){
            tbody.innerHTML  += "<tr scope='row'><td>"+i+"</td><td>"+data[i].data_realizada+"</td> <td>"+data[i].qtd_pontos+"</td><td>"+data[i].nome+"</td><td>"+data[i].distancia_caminhada+"</td><td>"+data[i].tempo_caminhada+"</td></tr>";
          
          
          }
    
              $scope.dados = data;
              exibe = 1;  
        
        var tamanhoPagina = 3;
        var pagina = 0;
        
        function paginar() {
            $('table > tbody > tr').remove();
            var tbody = $('table > tbody');
            for (var i = pagina * tamanhoPagina; i < dados_paginar.length && i < (pagina + 1) *  tamanhoPagina; i++) {
                
              console.log(dados_paginar[0])
              tbody.append(
                    $('<tr style="background-color: rgb(255, 252, 252)">')
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(i))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].data_realizada))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].qtd_pontos))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].nome))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].distancia_caminhada))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].tempo_caminhada))

                        

                )
            }
            $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados_paginar.length / tamanhoPagina));
        }
        
        function ajustarBotoes() {
            $('#proximo').prop('disabled', dados_paginar.length <= tamanhoPagina || pagina >= Math.ceil(dados_paginar.length / tamanhoPagina) - 1);
            $('#anterior').prop('disabled', dados_paginar.length <= tamanhoPagina || pagina == 0);
        }
        
        $(function() {
            $('#proximo').click(function() {
                if (pagina < dados_paginar.length / tamanhoPagina - 1) {
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anterior').click(function() {
                if (pagina > 0) {
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        });
        
        
           
          }).error(function(data){
            if(data.status === 403){
              $location.path('/login');
            }
          });

         
         
      }



    
      $scope.exibir = function(){

        if(exibe === 1)
        return true;

      }

     var carregaDados = function() {
      desempenhoService.carregaDados(IdUsuario).success(function(data)
      {
        $scope.usu = data;
      }).error(function(data){
        if(data.status === 403){
          $location.path('/login');
        }
      }); 

     };
     carregaDados();

    }  
    

  );
