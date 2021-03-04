angular
  .module("myHeroTraining", ["ngRoute", "ngSanitize", "pascalprecht.translate"])
  .config(function ($routeProvider, $translateProvider) {
    //  $locationProvider.html5Mode(true);
    $translateProvider.translations("pt-BR", {
      HEADER: {
        MENU: {
          REGISTER: "Cadastre-se",
          DROPDOWN: "Selecione o Idioma",
          PORTUGUES: "Português",
          INGLES: "Inglês",
          PESQUISA: "Pesquisar",
          SAIR: "Sair",
          SEUSTREINOS: "Treinos Para Você",
          MEUSDADOS: "Meus Dados",
          EXERCICIOS: "Exercicíos",
        },
        LOGIN: {
          PLACEHOLDER: {
            SENHA: "Digite Sua Senha",
            LEMBRAR: "Lembrar-me",
            ESQUECIS: "Esqueci minha senha",
            BOTAOL: "Entrar",
            PRINCIPALLABEL: "Treinos Funcionais",
            SUBLABEL:
              "Faça os treinos de acordo com sua rotina e melhore sua saúde!",
            ROTINELABEL: "Crie uma rotina para praticar exercícios:",
            ABOUT: "SOBRE",
            SAUDE: `Praticar exercícios físiscos regularmente pode ajudar em diversos aspectos da sua
            saúde,
            reduz risco de hipertensão, doenças cardíacas, AVC, diabetes, câncer, depressão, reduz ansiedade e
            estresse, melhora disposição.`,
            EXPERIENCIA: "Experiência",
            ESTRATEGIA: "Nossa Estratégia",
            ESTRATEGIATEXT:
              "Com a MyHeroTraining qualquer pessoa pode começar a praticar exercícios" +
              "físicos e evoluir nos treinos melhorarando sua saúde.",
            MISSAO: "Missão",
            MISSAOTEXT:
              "Nossa missão é contribuir para manutenção e melhora da saúde da" +
              " população, facilitando o acesso a atividade física e incentivo da" +
              " mesma.",
            COMOUSAR: "Como usar:",
            FRASE1:
              "Cadastrando-se na aplicação você terá disponível treinos que começam no nível 0 iniciante.",
            FRASE2:
              "Inicie os treinos, conforme você os realiza, ganha pontuação e libera mais treinos.",
            FRASE3:
              "Suba cada vez mais de nível e tenha acesso a treinos mais avançados.",
            CADASTRESEAQUI: "Cadastre-se agora e já comece a treinar!",
          },
        },

        CADASTRO: {
          LCADASTRO: "Cadastro",
          NOME: "Nome",
          PNOME: "Digite seu nome",
          ENOME: "Nome é um campo obrigatório",
          EMAIL: "Endereço de E-mail",
          PEMAIL: "Digite seu E-mail",
          EEMAIL: "E-mail é um campo obrigatório",
          SENHA: "Senha",
          ESENHA1: "Senha é obrigatória",
          ESENHA2: "Digite uma senha com no mínimo 8 caracteres",
          PSENHA: "Digite sua senha",
          DICASENHA:
            "*Mínimo de 8 e máximo de 18 de caracteres com letra maíscula e" +
            "\n" +
            "minuscula, 1 numeral e 1 caractere especial entre" +
            "?=.*[!|@|#|$|%|^|&|*|(|)|-|_])",
          CSENHA: "Confirme sua Senha",
          CESENHA: "Digite uma senha com no mínimo 8 caracteres",
          CESENHA2: "Senhas Divergentes",
          PESO: "Peso",
          EPESO: "O peso informado não é válido",
          PPESO: "Seu Peso",
          EALTURA: "A altura informada não é válida",
          ALTURA: "Altura",
          PALTURA: "Sua Altura",
          ETELEFONE: "Telefone é um capo obrigatório",
          ETELEFONE2: "O telefone fornecido é inválido",
          TELEFONE: "Telefone 1",
          TELEFONE2: "Telefone 2",
          PTELEFONE: "Contato telefônico",
          BOTAOC: "Cadastrar",
          NASCIMENTO: "Data de nascimento",
          ENASCIMENTO: "A data fornecida é inválida",
        },
        PRINCIPAL: {
          FUNCTIONALT: "Treinos Funcionais",
          SUBFUNCTIONALT:
            "Faça os treinos de acordo com sua rotina e melhore sua saúde!",
          ABOUT: "Sobre",
          EXPERIENCE: "Experiência",
          EXPERIENCET:
            "Queremos que os nossos usuários tenham a melhor experiência na\n" +
            " prática " +
            "de exercícios físicos, de forma autônoma, prática e motivadora.",

          OurStrategy: "Nossa Estratégia",
          OurStrategyT:
            "Com a MyHeroTraining qualquer pessoa pode começar a praticar exercícios físicos e evoluir nos treinos melhorando sua saúde.",
          ROUTINE: "Crie uma rotina para praticar exercícios:",

          ROUTINET:
            "Praticar exercícios físicos regularmente pode ajudar em diversos aspectos da sua " +
            "saúde, " +
            "reduz risco de hipertensão, doenças cardíacas, AVC, diabetes, câncer, depressão, reduz ansiedade, " +
            "estresse e melhora disposição.",
        },
        HOME: {
          INTENSIDADE: "Intensidade:",
          NIVEL: "Nível:",
          INICIAR: "Iniciar",
          VER: "Ver",
          TEMPOESTIMADO: "Tempo estimado:",
        },
        DESCRICAOTREINO: {
          TITULO: "MyHeroTraining - Treinos Funcionais",
          DESCRICAO: "Conheça os exercícios que compõem os treinos:",
          ABDOMINAL: "Abdominal",
          ABDOMINALTEXT:
            "O exerício ajuda no desenvolvimento e fortalecimento da musculatura do abdome podendo ser realizado por inciantes. Os músculos trabalhados são reto abdominal e oblícuos. Pode ser executado deitado, flexionando as pernas e deixando-as alinhadas ao quadril, após se posicionar, basta erguer o tronco com a força dos músculos do abdômen, nunca chegando tão próximo de encostar os peitos aos joelhos.",
          ABDOMINALREMADOR: "Abdominal Remador",
          ABDOMINALREMADORTEXT:
            "Os músculos trabalhados são reto abdominal e oblícuos. Para realizar o exercício, basta se esticar no solo, com braços e pernas erguidos. Após se posicionar, basta flexionar as pernas ao mesmo tempo que contrai o abdômen em direção aos joelhos.",
          AGACHAMENTOCOMELEVACAO: "Agachamento com elevação",
          AGACHAMENTOCOMELEVACAOTEXTO:
            "O exerício ajuda no desenvolvimento e fortalecimento das pernas e glúteos podendo ser realizado por inciantes. Os músculos trabalhados são quadríceps femural, glúteo médio, glúteo máximo, bíceps femural (posterior da coxa), abdominal e lombar. Com as pernas abertas, afastar os pés à largura dos ombros e apoiá-los totalmente no chão, dobrar os joelhos jogando o quadril para baixo, até ultrapassar ligeiramente a linha do joelho e, empurrar o bumbum para trás mantendo as costas eretas. Quando subir do agachamento, levantar uma das pernas com joelho dobrado até um pouco acima do quadril, alternando entre as pernas a cada vez que fizer o exercício.",
          AGACHAMENTOCOMRT: "Agachamento com Rotação de tronco",
          AGACHAMENTOCOMRTTEXTO:
            "O exerício ajuda no desenvolvimento e fortalecimento das pernas e glúteos podendo ser realizado por inciantes. quadríceps femural, glúteo médio, glúteo máximo, bíceps femural (posterior da coxa), abdominal e lombar. Com as pernas abertas, afastar os pés à largura dos ombros e apoiá-los totalmente no chão, dobrar os joelhos jogando o quadril para baixo, até ultrapassar ligeiramente a linha do joelho e, empurrar o bumbum para trás mantendo as costas eretas. Quando subir do agachamento, mudar a posição de uma das pernas colocando-a para frente e rotacionar o tronco em direção a perna, alternando entre as pernas a cada vez que fizer o exercício.",
          INFRACOMELEVACAO: "Infra com elevação",
          INFRACOMELEVACAOTEXTO:
            "O exerício ajuda no desenvolvimento e fortalecimento da musculatura do abdome podendo ser realizado por inciantes. Os músculos trabalhados são reto abdominal, piramidais, oblíquos, transversoss. Com a coluna apoiada no solo, as mãos precisam estar retas e bem posicionadas. Após se ajustar, basta erguer as pernas lentamente, mantendo elas o mais retas possível.",
          PRANCHA: "Prancha",
          PRANCHATEXT:
            "O exerício ajuda no desenvolvimento e fortalecimento da musculatura do abdome podendo ser realizado por inciantes. Os músculos trabalhados são reto abdominal, transversos. De bruços, apoie-se nos cotovelos e apoe-se nos antebraços ou mantenha os braços esticados, sempre mantendo-os alinhados com os ombros. Com somente as pontas dos pés apoiadas ao chão na parte inferior do corpo, alinhe-os com os cotovelos. Deixe o corpo ereto e contraia o abdômen.",
        },
      },
    });

    $translateProvider.translations("en-US", {
      HEADER: {
        MENU: {
          REGISTER: "Register",
          DROPDOWN: "Select your Language",
          PORTUGUES: "Portuguese",
          INGLES: "English",
          PESQUISA: "Search",
          SAIR: "Logout",
          SEUSTREINOS: "Workouts for you",
          MEUSDADOS: "My datas",
          EXERCICIOS: "Exercises",
        },
        LOGIN: {
          PLACEHOLDER: {
            SENHA: "Type your password here",
            ESQUECIS: "I forgot my password",
            LEMBRAR: "Remember me",
            BOTAOL: "Login",
            PRINCIPALLABEL: "Functional Training",
            SUBLABEL:
              "Do the workouts according to your routine and improve your health!",
            ROTINELABEL: "Create a routine to practice exercises:",
            ABOUT: "ABOUT",
            SAUDE:
              "Practicing phosphide exercises regularly can help in various aspects of your" +
              "Health" +
              "reduces risk of hypertension, heart disease, stroke, diabetes, cancer, depression, reduces anxiety and" +
              "stress, improves mood.",

            EXPERIENCIA: "Experience",
            ESTRATEGIA: "Our Strategy",
            ESTRATEGIATEXT:
              "With MyHeroTraining anyone can start exercising" +
              "and evolve in training by improving your health.",
            MISSAO: "Mission",
            MISSAOTEXT:
              "Our mission is to build for maintenance and improvement of the health of" +
              "population, facilitating access to physical activity and encouraging" +
              "same.",
            COMOUSAR: "How to use:",
            FRASE1:
              "When you register in the application you will have available workouts that start at level 0 beginner.",
            FRASE2:
              "Start the workouts as you perform them, earn scores and release more workouts.",
            FRASE3: "Level up and take access to more advanced workouts",
            CADASTRESEAQUI: "Sign up now and start training!",
          },
        },

        CADASTRO: {
          LCADASTRO: "Registration",
          NOME: "Name",
          PNOME: "Type your name",
          ENOME: "Name is required",
          EMAIL: "E-mail Adress",
          PEMAIL: "Type your Email",
          EEMAIL: "E-mail is required",
          SENHA: "Password",
          ESENHA1: "Password IS required",
          ESENHA2: "Password of at least 8 characters",
          PSENHA: "Incorrect password pattern",
          CSENHA: "Confirm your Password",
          CESENHA: "Password of at least 8 characters",
          CESENHA2: "Different passwords",
          DICASENHA:
            "* Minimum of 8 and maximum of 18 characters with a capital letter e" +
            " n" +
            "lowercase, 1 numeral and 1 special character between" +
            "? =. * [! | @ | # | $ |% | ^ | & | * | (|) | - | _]) ",
          PESO: "Weight",
          EPESO: "The Weight is not valid",
          PPESO: "Your weight",
          EALTURA: "The Height is not valid",
          ALTURA: "Your Height",
          PALTURA: "Your height",
          ETELEFONE: "Telephone is required",
          ETELEFONE2: "Telephone is not valid",
          TELEFONE: "Contact Phone 1",
          TELEFONE2: "Contact Phone 2",
          PTELEFONE: "Contact Phone",
          BOTAOC: "Confirm",
          NASCIMENTO: "Date of birth",
          ENASCIMENTO: "Date is not valid",
        },

        PRINCIPAL: {
          FUNCTIONALT: "Functional Training",
          SUBFUNCTIONALT:
            "Do your workouts according to your routine and improve your health!",
          ABOUT: "ABOUT",
          EXPERIENCE: "Experience",
          EXPERIENCET:
            "We want our users to have the best experience in\n" +
            "practice" +
            "of physical exercises, in an autonomous, practical and motivating way.",
          OurStrategy: "Our Strategy",
          OurStrategyT:
            "With MyHeroTraining anyone can start practicing physical exercises and evolve in training improving their health.",
          ROUTINE: "Create an exercise routine:",
          ROUTINET:
            "Regular physical exercise can help with many aspects of your life.\n" +
            "Cheers," +
            "reduces risk of hypertension, heart disease, stroke, diabetes, cancer, depression, reduces anxiety and" +
            "stress, improves mood.",
        },
        HOME: {
          INTENSIDADE: "Intensity:",
          NIVEL: "Level:",
          INICIAR: "Start",
          VER: "Read",
          TEMPOESTIMADO: "Estimated time:",
        },
        DESCRICAOTREINO: {
          TITULO: "MyHeroTraining - Functional Training",
          DESCRICAO: "Know the exercises that make up the training:",
          ABDOMINAL: "Abdominal",
          ABDOMINALTEXT:
            "The exercise helps in the development and strengthening of the abdominal muscles and can be performed by beginners. The muscles worked are rectus abdominis and oblique. It can be performed lying down, flexing your legs and leaving them in line with your hips, after positioning yourself, just lift your torso with the strength of your abdominal muscles, never getting so close to touching your breasts to your knees.",
          ABDOMINALREMADOR: "Rower Abdominal",
          ABDOMINALREMADORTEXT:
            "The exercise helps in the development and strengthening of the abdominal muscles and can be performed by beginners. The muscles worked are rectus abdominis and oblique. To perform the exercise, simply stretch on the ground, with arms and legs raised. After positioning yourself, just flex your legs while contracting your abdomen towards your knees.",
          AGACHAMENTOCOMELEVACAO: "Elevated squat",
          AGACHAMENTOCOMELEVACAOTEXTO:
            "The exercise helps in the development and strengthening of the legs and glutes and can be performed by beginners. The muscles worked are quadriceps femoris, gluteus medius, gluteus maximus, biceps femoris (posterior thigh), abdominal and lumbar. With your legs open, spread your feet shoulder-width apart and fully support them on the floor, bend your knees by throwing your hips downwards, until slightly beyond the knee line, and push your butt back keeping your back upright. When climbing from the squat, raise one leg with a bent knee to just above the hip, alternating between the legs each time you do the exercise.",
          AGACHAMENTOCOMRT: "Trunk Rotation Squat",
          AGACHAMENTOCOMRTTEXTO:
            "The exercise helps in the development and strengthening of the legs and glutes and can be performed by beginners. femoral quadriceps, gluteus medius, gluteus maximus, femoral biceps (posterior thigh), abdominal and lumbar. With your legs open, spread your feet shoulder-width apart and fully support them on the floor, bend your knees by throwing your hips downwards, until slightly beyond the knee line, and push your butt back keeping your back upright. When climbing up from the squat, change the position of one leg by placing it forward and rotating the torso towards the leg, alternating between the legs each time you do the exercise.",
          INFRACOMELEVACAO: "Infra with elevation",
          INFRACOMELEVACAOTEXTO:
            "The exercise helps in the development and strengthening of the abdominal muscles and can be performed by beginners. The muscles worked are rectus abdominis, pyramidal, oblique, transverse. With the spine resting on the ground, the hands need to be straight and well positioned. After adjusting, just lift your legs slowly, keeping them as straight as possible.",
          PRANCHA: "Board",
          PRANCHATEXT:
            "The exercise helps in the development and strengthening of the abdominal muscles and can be performed by beginners. The muscles worked are rectus abdominis, transverse. On your stomach, lean on your elbows and lean on your forearms or keep your arms straight, always keeping them in line with your shoulders. With only your toes resting on the floor on your lower body, align them with your elbows. Keep your body upright and contract your abdomen.",
        },
      },
    });

    $routeProvider.when("/home", {
      templateUrl: "./view/home.html",
      controller: "PageCtrl",
    });
    $routeProvider.when("/principal", {
      templateUrl: "./view/Principal.html",
      controller: "TreinoController",
    });
    $routeProvider.when("/Cadastro", {
      templateUrl: "./view/Cadastro.html",
      controller: "cadastroController",
    });

    $routeProvider.when("/confirm-reset", {
      templateUrl: "./view/trocar-senha/confirmReset.html",
      controller: "recoverPassword",
    });

    $routeProvider.when("/confirm-reset-success", {
      templateUrl: "./view/trocar-senha/confirmResetSucess.html",
    });

    $routeProvider.when("/forgot-password", {
      templateUrl: "./view/trocar-senha/forgotPassword.html",
      controller: "recoverPassword",
    });

    $routeProvider.when("/success-send-reset", {
      templateUrl: "./view/trocar-senha/successForgotPassword.html",
    });

    $routeProvider.when("/login", {
      templateUrl: "./view/login.html",
      controller: "login-controller",
    });

    $routeProvider.when("/account-verified", {
      templateUrl: "./view/confirmar-email/accountVerified.html",
    });

    $routeProvider.when("/account-verified-error", {
      templateUrl: "./view/confirmar-email/accountVerifiedError.html",
    });

    $routeProvider.when("/confirm-account", {
      templateUrl: "./view/confirmar-email/accountVerified.html",
      controller: "confirmEmail",
    });

    $routeProvider.when("/dados_login", {
      templateUrl: "./view/dadosLogin.html",
      controller: "TreinoController",
    });
    $routeProvider.when("/treinos/:id", {
      templateUrl: "./view/treino.html",
      controller: "TreinoController",
    });
    $routeProvider.when("/treino/inicio/:id", {
      templateUrl: "./view/inicioTreino.html",
      controller: "TreinoController",
    });
    $routeProvider.when("/treino/inicio/execucao", {
      templateUrl: "./view/TreinoExecucao.html",
      controller: "TreinoController",
    });
    $routeProvider.when("/descricaoTreino/", {
      templateUrl: "./view/descricaoTreino.html",
    });
    $routeProvider.when("/classificacao/", {
      templateUrl: "./view/Classificacao.html",
      controller: "classificacaoController"
    });
    $routeProvider.when("/solicitacoes/", {
      templateUrl: "./view/Solicitacoes.html",
      controller: "SolicitacoesController",
    });
    $routeProvider.when("/amigos/", {
      templateUrl: "./view/MeusAmigos.html",
      controller: "AmigosController",
    });
    $routeProvider.when("/adicionar-amigos/", {
      templateUrl: "./view/AdicionarAmigos.html",
      controller: "AdicionarAmigosController",
    });
    $routeProvider.when("/avatar/", {
      templateUrl: "./view/Avatar.html",
      controller: "PerfilController",
    });
    $routeProvider.when("/treino-personalizado/", {
      templateUrl: "./view/TreinoPersonalizado.html",
      controller: "treinoPersonalizadoController",
    });
    $routeProvider.when("/desempenho/", {
      templateUrl: "./view/Desempenho.html",
      controller: "desempenhoController",
    });
    $routeProvider.when("/caminhada/", {
      templateUrl: "./view/caminhada.html",
    });
    $routeProvider.when("/treino-conjunto/", {
      templateUrl: "./view/TreinoConjunto.html",
      controller: "TreinoConjuntoController",
    });
    $routeProvider.when("/treino-conjunto/solicitacoes", {
      templateUrl: "./view/TreinoConjuntoSol.html",
      controller: "TreinoConjuntoController",
    });
    var lenguage = "pt-BR";
    var lenguage_n = navigator.language || navigator.userLanguage;

    if (lenguage_n.match(/en.*/)) {
      lenguage = "en-US";
    }
    console.log(lenguage);
    $routeProvider.otherwise({ redirectTo: "/principal" });
    $translateProvider.preferredLanguage(lenguage);
    $translateProvider.useSanitizeValueStrategy("escape");
  });
