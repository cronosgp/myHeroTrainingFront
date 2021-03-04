angular
  .module('myHeroTraining')
  .controller('CaminhadaController', function ($scope, caminhadaService) {
   

    let flightPlanCoordinates =[];
    let flightPath;
    let intervalo;
    let start =""; // Data de hoje
    let finish=""; // Outra data no passado
    let duration;
    let distancia=0;
    let startcaminhada;


    //criação do mapa
    document.querySelector('#BtnCaminhada').addEventListener('click' ,()=>{
      start = moment(new Date());
      
      document.querySelector('#BtnParaCaminhada').style.display='block'
      document.querySelector('#BtnCaminhada').style.display='none'


  function initMap() {
    startcaminhada =setInterval(function(){ navigator.geolocation.getCurrentPosition((pos)=>{
      //setando contador
      setaTempo();
      setaDistancia();
      const map = new google.maps.Map(document.getElementById("source_map"), {
        zoom: 18, 
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        mapTypeControl: false,
        autoRefresh:true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        mapTypeId: "roadmap",
      });  
      flightPlanCoordinates.push({lat: pos.coords.latitude, lng: pos.coords.longitude})
       flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        enableHighAccuracy: true,
      });
   
    
      flightPath.setMap(map);
    
    }, error);
},2000)}initMap();});
            
      
       function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
       };
      
       document.querySelector('#BtnParaCaminhada').addEventListener('click',()=>{
        document.querySelector('#BtnParaCaminhada').style.display='none'
      document.querySelector('#BtnCaminhada').style.display='block'
      clearTimeout(startcaminhada);
      let distancia = document.querySelector('#distanciaCaminhada').innerText; 
      let pontos = distancia*3;
     
      let dados ={usuario:sessionStorage.getItem('id'), Distancia:document.querySelector('#distanciaCaminhada').innerText, Tempo:document.querySelector('#tempoCaminhada').innerText, Pontos:pontos}

caminhadaService.salvar(dados).success(function(data){
  Swal.fire({
    icon: 'success',
    title: 'Caminhada',
    text: 'Caminhada Feita com Sucesso!',
  
  }).error(function(data){
    if(data.status === 403){
      $location.path('/login');
    }
  });
})


       });


function setaTempo(){
      
        
      setTimeout(function() {
          finish = moment(new Date());
          duration = moment.utc(moment(finish,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss") 
          document.querySelector('#tempoCaminhada').innerText = duration
        }, 1000);
        

 
}
       function setaDistancia(){
         if(flightPlanCoordinates.length-1 > 0){
        for(var i=0;i< flightPlanCoordinates.length-1; i++){
          distancia = Number(distancia + getDistanceFromLatLonInKm(flightPlanCoordinates[i], flightPlanCoordinates[i+1]) )
  
          }
          document.querySelector('#distanciaCaminhada').innerText = distancia;
        }
       }


       function getDistanceFromLatLonInKm(position1, position2) {
        "use strict";
        var deg2rad = function (deg) { return deg * (Math.PI / 180); },
            R = 6371,
            dLat = deg2rad(position2.lat - position1.lat),
            dLng = deg2rad(position2.lng - position1.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(position1.lat))
                * Math.cos(deg2rad(position1.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return ((R * c *1000).toFixed());
    }
    
   
    });
    
     
     
     
     
 
      



    
    