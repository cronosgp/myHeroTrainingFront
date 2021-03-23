angular
  .module('myHeroTraining')
  .controller(
    'desempenhoController',
    function ($scope, $http, desempenhoService, $location) {
      $scope.model = {};   
      var exibe = 0;
      var IdUsuario = sessionStorage.getItem('id');
 
 
     $scope.busca = function (){


     
       var data = $scope.model.dt;
       var dataf = $scope.model.df;
      
       var dados_paginar;
      
        let dataFormatada =  ((data.getFullYear())) + "/" + (("0" + (data.getMonth() + 1)).slice(-2)) + "/" + data.getDate();
        let dataFormatadaf =  ((dataf.getFullYear())) + "/" + (("0" + (dataf.getMonth() + 1)).slice(-2)) + "/" + dataf.getDate();
        
        var filtro = document.getElementById('tipo_treino').value;
 
      if(filtro !=0){
       
        document.getElementById('th_tempo').style.display="block";
       
  
      }else{
      
        document.getElementById('th_tempo').style.display="none";
    
      }
       document.getElementById('btn_pagnicao').style.display="block";
       
      var filtro = document.getElementById('tipo_treino').value;
      
 
        desempenhoService.busca(IdUsuario,dataFormatada, dataFormatadaf,filtro).success(function(data)

          {   
          
            var removeChart = document.getElementById('chart');
            removeChart.remove(); 
            var divNova = document.createElement("div");
            divNova.setAttribute('id', 'chart');
            divNova.setAttribute('Style', 'chart');
            document.getElementById('position_chart').appendChild(divNova);
  
  
            var removeDonut = document.getElementById('chartDonut');
            removeDonut.remove(); 
           var divNova2 = document.createElement("div");
            divNova2.setAttribute('id', 'chartDonut');
            divNova2.setAttribute('Style', 'chart');
            document.getElementById('position_chart').appendChild(divNova2);
            donutChart(data);
            lineChart(data);
   dados_paginar =data;
     var table = document.getElementById('table_dados');
     var tbody = table.getElementsByTagName("tbody")[0]
     tbody.innerHTML="";
          for(var i=0; i<data.length; i++){
            if(filtro != 1){
            tbody.innerHTML  += "<tr scope='row'><td>"+i+"</td><td>"+data[i].data_realizada+"</td> <td>"+data[i].qtd_pontos+"</td><td>"+data[i].nome+"</td><td>"+data[i].parte_trabalhada+"</td></tr>";
            }else{
          

              tbody.innerHTML  += "<tr scope='row'><td>"+i+"</td><td>"+data[i].data_realizada+"</td> <td>"+data[i].qtd_pontos+"</td><td>"+'Caminhada'+"</td><td>"+data[i].distancia_caminhada+"</td></tr>";
            }
          
          }
    
              $scope.dados = data;
              exibe = 1;  
        
        var tamanhoPagina = 3;
        var pagina = 0;
        
        function paginar() {
          var filtro = document.getElementById('tipo_treino').value;
          //criando cabeçalhos de caminhada, caso o valor do filtro seja 1
       
            $('table > tbody > tr').remove();
            $('table > tbody > thead').remove();
            var tbody = $('table > tbody');
            for (var i = pagina * tamanhoPagina; i < dados_paginar.length && i < (pagina + 1) *  tamanhoPagina; i++) {
                
         if(filtro!=1){
        
          //document.getElementById('th_distancia').style.display="none";
          //document.getElementById('th_tempo').style.display="none";
              tbody.append(
                    $('<tr style="background-color: rgb(255, 252, 252)">')
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(i))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].data_realizada))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].qtd_pontos))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].nome))
                        .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].parte_trabalhada))
                      )
           
                      document.getElementById('th_distancia').innerText="Parte Trabalhada";
              }else{

            
           
                tbody.append(
                  $('<tr style="background-color: rgb(255, 252, 252)">')
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(i))
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].data_realizada))
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].qtd_pontos))
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].nome))
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].distancia_caminhada))
                  
                     
                      .append($('<td scope="col" style="border: 1px solid rgb(190, 190, 190);">').append(dados_paginar[i].tempo_caminhada))
                      )
                      document.getElementById('th_distancia').innerText="Distancia";
                   
              }
            }
            $('#numeracao').text( (pagina + 1) + ' de ' + Math.ceil(dados_paginar.length / tamanhoPagina));
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

      var lineChart = async function(data){
        var pts_grafico=[];
        var dias_grafico=[];
        var result = [];
        document.querySelector("#chart").innerText=""
     //analise de dados para montagem do graficod e linha
     if(typeof data !== "undefined"){
      data.reduce(function(res, value) {

        if (!res[value.data_realizada]) {
          res[value.data_realizada] = { data_realizada: value.data_realizada, qtd_pontos: 0 };
          result.push(res[value.data_realizada])
        }
        res[value.data_realizada].qtd_pontos += value.qtd_pontos;
        return res;
      }, {});

      for(j = result.length-1; j>=0; j--){
        document.querySelector("#chart").innerText=""
        document.querySelector("#chart").innerHTML=""
        dias_grafico.push(result[j].data_realizada)
      
        pts_grafico.push(result[j].qtd_pontos)
      }
  
     }
     
       
      
        var options = {
          chart: {
            type: 'line'
           
          },
          title: {
            text: 'Pontuação Diária',
    
        },
          series: [{
            name: 'Pontos por dia',
            data: pts_grafico
          }],
          xaxis: {
            categories: dias_grafico
          }
        }
           document.querySelector("#chart").innerText="";
        document.querySelector("#chart").innerHTML="";
        var chart = new ApexCharts(document.querySelector("#chart"), options);
    
        chart.render();

      }
      
  
      var donutChart = function(data){
  
        var pts_grafico=[];
        var nome_exc=[];
        var result = [];
        var total=0;
        var chartDonut="";
      
        if(typeof data !== "undefined"){
       
    
        data.reduce(function(res, value) {
          if (!res[value.parte_trabalhada]) {
            res[value.parte_trabalhada] = { parte_trabalhada: value.parte_trabalhada, qtd_pontos: 0 };
            result.push(res[value.parte_trabalhada])
          }
          res[value.parte_trabalhada].qtd_pontos += value.qtd_pontos;
          total +=value.qtd_pontos;
          return res;
        
        }, {});
       
        for(j = result.length-1; j>=0; j--){
         
          nome_exc.push(result[j].parte_trabalhada)
        
          pts_grafico.push(result[j].qtd_pontos)
        }
      }
        var  options = {
          series: pts_grafico,
          labels: nome_exc,
          title: {
            text: 'Pontuação Total por área corpérea'},
          chart: {
            type: 'donut',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Pontuação:',
                    formatter: () => total
                  }
                }
              }
            }
          }
        }
       
     
        var chartDonut = new ApexCharts(document.querySelector("#chartDonut"), options);
      
        //chartDonut.refresh();
       chartDonut.render();
      
      
      }

      function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
     var  carregaDados = function() {
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