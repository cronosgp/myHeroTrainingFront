angular.module('myHeroTraining').controller('HomeController',function ($scope, $http, myHeroTraining,$location) {
    $scope.fotos =[
        {url:'https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_960_720.jpg'},
        {url:'https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_960_720.jpg'},
        /* {url:'https://cdn.pixabay.com/photo/2016/03/27/07/08/man-1282232_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2016/05/27/22/30/workout-1420741_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2015/04/08/23/53/workout-713658_960_720.jpg'},
         {url:'https://cdn.pixabay.com/photo/2015/07/02/10/27/training-828764_960_720.jpg'},*/
    ];
    $scope.model = {
    }

    $scope.exibirSemLogin = function () {
        if(localStorage.getItem('Bearer') == null){
            return true;
        }
    };
    $scope.exibircomLogin = function(){
        if(localStorage.getItem('Bearer') !== null){
            return true;
        }
    }
    var carrega = function (){

        myHeroTraining.carregarTreinos().success(function (data) {
            $scope.treinos = data;
        });

    };

    $scope.logout = function(){
        localStorage.clear();
        sessionStorage.clear();
        $location.path('/login');
    }

    carrega()
    $scope.fotoPrincipal =
        {url:'https://i.pinimg.com/236x/ba/87/5d/ba875dc13ef3651e4f08237d07f8ea45.jpg'}
});
