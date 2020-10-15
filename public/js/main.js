angular.module('myHeroTraining', ['ngRoute']).config(function($routeProvider) {

    //  $locationProvider.html5Mode(true);

    $routeProvider.when('/home', {
        templateUrl: 'angular/public/view/home.html',
        controller: 'HomeController',

    });
    $routeProvider.when('/principal', {
        templateUrl: 'angular/public/view/principal.html',
        controller: 'TreinoController',

    });
    $routeProvider.when('/Cadastro', {
        templateUrl: 'angular/public/view/Cadastro.html',
        controller: 'cadastroController'

    });

    $routeProvider.when('/confirm-reset', {
        templateUrl: 'angular/public/view/trocar-senha/confirmReset.html',
        controller: 'recoverPassword'
    });

    $routeProvider.when('/confirm-reset-success', {
        templateUrl: 'angular/public/view/trocar-senha/confirmResetSucess.html'
    });


    $routeProvider.when('/forgot-password', {
        templateUrl: 'angular/public/view/trocar-senha/forgotPassword.html',
        controller: 'recoverPassword'
    });

    $routeProvider.when('/success-send-reset', {
        templateUrl: 'angular/public/view/trocar-senha/successForgotPassword.html'
    });

    $routeProvider.when('/login', {
        templateUrl: 'angular/public/view/login.html',
        controller: 'login-controller'

    });
        $routeProvider.when('/account-verified', {
        templateUrl: 'angular/public/view/confirmar-email/accountVerified.html',

         });

        $routeProvider.when('/account-verified-error', {
            templateUrl: 'angular/public/view/confirmar-email/accountVerifiedError.html',

        });

        $routeProvider.when('/confirm-account', {
            templateUrl: 'angular/public/view/confirmar-email/accountVerified.html',
            controller: 'confirmEmail'
        });

    $routeProvider.when('/dados_login', {
        templateUrl: 'angular/public/view/dadosLogin.html',
        controller: 'TreinoController'

    });
    $routeProvider.when('/treinos/:id', {
        templateUrl: 'angular/public/view/treino.html',
        controller: 'TreinoController'

    });
    $routeProvider.when('/treino/inicio/:id', {
        templateUrl: 'angular/public/view/inicioTreino.html',
        controller: 'TreinoController'

    });
    $routeProvider.when('/treino/inicio/execucao', {
        templateUrl: 'angular/public/view/TreinoExecucao.html',
        controller: 'TreinoController'

    });
    $routeProvider.when('/descricaoTreino/', {
        templateUrl: 'angular/public/view/descricaoTreino.html'
    });

    $routeProvider.otherwise({redirectTo:'/principal'});

});