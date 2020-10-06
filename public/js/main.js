angular
  .module('myHeroTraining', ['ngRoute', 'ngSanitize', 'pascalprecht.translate'])
  .config(function ($routeProvider, $translateProvider) {
    $translateProvider.translations('pt-BR', {
      HEADER: {
        MENU: {
          REGISTER: 'Cadastre-se',
          DROPDOWN: 'Selecione o Idioma',
          PORTUGUES: 'Português',
          INGLES: 'Inglês',
          PESQUISA: 'Pesquisar',
          SAIR: 'Sair',
          SEUSTREINOS: 'Treinos Para Você',
          MEUSDADOS: 'Meus Dados',
        },
        LOGIN: {
          PLACEHOLDER: {
            SENHA: 'Digite Sua Senha',
            LEMBRAR: 'Lembrar-me',
            BOTAOL: 'Entrar',
          },
        },

        CADASTRO: {
          NOME: 'Nome',
          PNOME: 'Digite seu nome',
          ENOME: 'Nome é um campo obrigatório',
          EMAIL: 'Endereço de E-mail',
          PEMAIL: 'Digite seu E-mail',
          EEMAIL: 'E-mail é um campo obrigatório',
          SENHA: 'Senha',
          ESENHA1: 'Senha é obrigatória',
          ESENHA2:
            'Senha inválida, por favor digite uma senha com no mínimo 6 caracteres',
          PSENHA: 'Mínimo 6 caracteres',
          CSENHA: 'Confirme sua Senha',
          CESENHA:
            'Senha inválida, por favor digite uma senha com no mínimo 6 caracteres',
          CESENHA2: 'Senhas Divergentes',
          PESO: 'Peso',
          EPESO: 'O peso informado não é válido',
          PPESO: 'Seu Peso',
          EALTURA: 'A altura informada não é válida',
          ALTURA: 'Altura',
          PALTURA: 'Sua Altura',
          ETELEFONE: 'Telefone é um capo obrigatório',
          ETELEFONE2: 'O telefone fornecido é inválido',
          TELEFONE: 'Telefone 1',
          TELEFONE2: 'Telefone 2',
          PTELEFONE: 'Contato telefônico',
          BOTAOC: 'Cadastrar',
          NASCIMENTO: 'Data de nascimento',
          ENASCIMENTO: 'A data fornecida é inválida',
        },
      },
    });

    $translateProvider.translations('en-US', {
      HEADER: {
        MENU: {
          REGISTER: 'Register',
          DROPDOWN: 'Select your Language',
          PORTUGUES: 'Portuguese',
          INGLES: 'English',
          PESQUISA: 'Search',
          SAIR: 'Logout',
          SEUSTREINOS: 'Workouts for you',
          MEUSDADOS: 'My datas',
        },
        LOGIN: {
          PLACEHOLDER: {
            SENHA: 'Type your password here',
            LEMBRAR: 'Remember me',
            BOTAOL: 'Login',
          },
        },

        CADASTRO: {
          NOME: 'Name',
          PNOME: 'Type your name',
          ENOME: 'Name is required',
          EMAIL: 'E-mail Adress',
          PEMAIL: 'Type your Email',
          EEMAIL: 'E-mail is required',
          SENHA: 'Password',
          ESENHA1: 'Password IS required',
          ESENHA2:
            'Password is not valid, please enter a password of at least 6 characters',
          PSENHA: 'Minimum 6 characters',
          CSENHA: 'Confirm your Password',
          CESENHA:
            'Password is not valid, please enter a password of at least 6 characters',
          CESENHA2: 'Different passwords',
          PESO: 'Weight',
          EPESO: 'The Weight is not valid',
          PPESO: 'Your weight',
          EALTURA: 'The Height is not valid',
          ALTURA: 'Your Height',
          PALTURA: 'Your height',
          ETELEFONE: 'Telephone is required',
          ETELEFONE2: 'Telephone is not valid',
          TELEFONE: 'Contact Phone 1',
          TELEFONE2: 'Contact Phone 2',
          PTELEFONE: 'Contact Phone',
          BOTAOC: 'Confirm',
          NASCIMENTO: 'Date of birth',
          ENASCIMENTO: 'Date is not valid',
        },
      },
    });

    $routeProvider.when('/home', {
      templateUrl: './view/home.html',
      controller: 'HomeController',
    });
    $routeProvider.when('/principal', {
      templateUrl: './view/principal.html',
      controller: 'TreinoController',
    });
    $routeProvider.when('/Cadastro', {
      templateUrl: './view/Cadastro.html',
      controller: 'cadastroController',
    });
    $routeProvider.when('/login', {
      templateUrl: './view/login.html',
      controller: 'login-controller',
    });
    $routeProvider.when('/teste', {
      templateUrl: './view/teste.html',
    });
    $routeProvider.when('/dados_login', {
      templateUrl: './view/dadosLogin.html',
      controller: 'login-controller',
    });
    $routeProvider.when('/treinos/:id', {
      templateUrl: './view/treino.html',
      controller: 'TreinoController',
    });
    $routeProvider.when('/treino/inicio/:id', {
      templateUrl: './view/inicioTreino.html',
      controller: 'TreinoController',
    });
    $routeProvider.when('/treino/inicio/execucao', {
      templateUrl: './view/TreinoExecucao.html',
      controller: 'TreinoController',
    });

    $routeProvider.otherwise({ redirectTo: '/home' });
    $translateProvider.preferredLanguage('pt-BR');
    //$translateProvider.preferredLanguage();
    $translateProvider.useSanitizeValueStrategy('escape');
  });
