angular
  .module('myHeroTraining')
  .controller('CaminhadaController', function () {

    let flightPlanCoordinates =[];
    let flightPath;
   //criação do mapa

   var mapafunc = function(){ 
   let intervalo = window.setInterval(function initMap() {
  
      navigator.geolocation.getCurrentPosition((pos)=>{
     console.log(document.getElementById("map"))
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 13,
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
    }, 5000);
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
  }
   mapafunc();   
  });