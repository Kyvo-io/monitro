process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const nodemailer = require('nodemailer');
var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresas");
var usuarioRouter = require("./src/routes/usuarios");
var emailService = require("./src/services/emailService");
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var jsonContaTeste;
async function criarContaTeste() {
    jsonContaTeste = await nodemailer.createTestAccount();
    process.env.EMAIL_USER = jsonContaTeste.user
    process.env.EMAIL_PASS = jsonContaTeste.pass
}


function iniciarServidor() {

    var app = express();
    console.log( process.env.EMAIL_USER)
    var indexRouter = require("./src/routes/index");

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));

    app.use(cors());

   
    app.use("/", indexRouter);
    app.use("/empresas", empresaRouter);
    app.use("/usuarios", usuarioRouter);
  
    emailService.enviarEmailPrimeiroAcesso("leandro@email.com", "teste")

    app.listen(PORTA, function () {
        console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
        Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
        \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
        \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
        \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
    });
}

criarContaTeste().then(function() {
    iniciarServidor()
})



