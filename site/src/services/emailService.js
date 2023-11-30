const nodemailer = require('nodemailer');



var email_monitro = 'Suporte Monitro <monitro_suporte@kyvo.com>'

async function enviarEmailPrimeiroAcesso(email, usuario, senha) {

    let transporteEmail = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: "monitroltda@gmail.com",
            pass: "xctc qnor zntu liwm"
        }
    })
let mensagem = {
    from: email_monitro,
    to: `${usuario} <${email}>`,
    subject: 'Primeiro acesso',
    text: 'Hello to myself!',
    html: `
    <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

        *{
            background-color: #28C8EF;
        }
        .header{
            height: 80px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-left: 10px;
            margin-right: 10px;
        }
        .header p{
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            color: white;
            font-size: 25px;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        .body{
            height: 525px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 30px;
        }

        .mensagem{
            width: 62%;
            height: 60px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 35px;
            box-shadow: 7px 7px 0px #584F4F;
        }
        .mensagem p{
            font-size: 19px;
            font-family: 'Poppins', sans-serif;
            background-color: white;
        }

        .formulario{
            width: 38%;
            border: none;
            height: 400px;
            display: flex;
            background-color: white;
            border-radius: 50px;
            box-shadow: 15px 10px 0px #584F4F;
            align-items: center;
            flex-direction: column;
        }
        .formulario span{
            background-color: white;
            height: 100px;
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
        }
        .formulario p {
            background-color: white;
            font-size: 19px;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
        }
        .espacoEmail{
            width: 80%;
            height: 55px;
            background-color: transparent;
            border: 2px solid black;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .espacoSenha{
            width: 80%;
            height: 55px;
            background-color: transparent;
            border: 2px solid black;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #azul{
            color: #28C8EF;
            background-color: white;
            font-weight: bold;
        }

    </style>

    <div class="header">
        <p>Olá, Fulano!</p>
        <svg  width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56.6458" rx="28" fill="#28C8EF"/>
            <path d="M33.9786 28.1982C33.8938 29.6059 33.3635 30.8785 32.5387 31.8867L36.1439 36.0094C36.4999 36.4162 36.4623 37.0388 36.0601 37.3988C35.6579 37.7588 35.0423 37.7209 34.6863 37.3141L31.0811 33.1913C29.9913 33.8999 28.6781 34.2745 27.286 34.1886C23.8015 33.9737 21.1501 30.9441 21.3625 27.4201C21.575 23.896 24.5705 21.2147 28.0551 21.4296C31.5397 21.6445 34.191 24.6741 33.9786 28.1982ZM27.4044 32.2257C27.9779 32.2611 28.5526 32.1819 29.0958 31.9926C29.6391 31.8033 30.1401 31.5077 30.5703 31.1226C31.0006 30.7375 31.3516 30.2704 31.6034 29.7481C31.8551 29.2258 32.0027 28.6584 32.0377 28.0784C32.0726 27.4984 31.9943 26.9172 31.8071 26.3678C31.62 25.8184 31.3276 25.3117 30.9468 24.8765C30.566 24.4414 30.1042 24.0864 29.5877 23.8318C29.0713 23.5771 28.5103 23.4279 27.9368 23.3925C27.3633 23.3571 26.7885 23.4364 26.2453 23.6256C25.7021 23.8149 25.2011 24.1105 24.7708 24.4956C24.3406 24.8808 23.9895 25.3478 23.7378 25.8701C23.486 26.3924 23.3384 26.9598 23.3035 27.5398C23.2685 28.1198 23.3469 28.7011 23.534 29.2504C23.7212 29.7998 24.0135 30.3065 24.3943 30.7417C24.7751 31.1768 25.2369 31.5318 25.7534 31.7864C26.2699 32.0411 26.8309 32.1903 27.4044 32.2257Z" fill="#F2F2F2"/>
            <path d="M22.0043 10.1294C22.0043 9.46231 21.4647 8.9165 20.8052 8.9165C20.1457 8.9165 19.6061 9.46231 19.6061 10.1294V13.7681H18.407C15.7616 13.7681 13.6107 15.9438 13.6107 18.6197V19.8326H10.0135C9.35404 19.8326 8.81445 20.3784 8.81445 21.0455C8.81445 21.7126 9.35404 22.2584 10.0135 22.2584H13.6107V27.11H10.0135C9.35404 27.11 8.81445 27.6558 8.81445 28.3229C8.81445 28.99 9.35404 29.5358 10.0135 29.5358H13.6107V34.3874H10.0135C9.35404 34.3874 8.81445 34.9332 8.81445 35.6003C8.81445 36.2674 9.35404 36.8132 10.0135 36.8132H13.6107V38.0261C13.6107 40.7021 15.7616 42.8778 18.407 42.8778H19.6061V46.5165C19.6061 47.1836 20.1457 47.7294 20.8052 47.7294C21.4647 47.7294 22.0043 47.1836 22.0043 46.5165V42.8778H26.8006V46.5165C26.8006 47.1836 27.3401 47.7294 27.9996 47.7294C28.6591 47.7294 29.1987 47.1836 29.1987 46.5165V42.8778H33.995V46.5165C33.995 47.1836 34.5346 47.7294 35.1941 47.7294C35.8536 47.7294 36.3932 47.1836 36.3932 46.5165V42.8778H37.5922C40.2377 42.8778 42.3885 40.7021 42.3885 38.0261V36.8132H45.9857C46.6452 36.8132 47.1848 36.2674 47.1848 35.6003C47.1848 34.9332 46.6452 34.3874 45.9857 34.3874H42.3885V29.5358H45.9857C46.6452 29.5358 47.1848 28.99 47.1848 28.3229C47.1848 27.6558 46.6452 27.11 45.9857 27.11H42.3885V22.2584H45.9857C46.6452 22.2584 47.1848 21.7126 47.1848 21.0455C47.1848 20.3784 46.6452 19.8326 45.9857 19.8326H42.3885V18.6197C42.3885 15.9438 40.2377 13.7681 37.5922 13.7681H36.3932V10.1294C36.3932 9.46231 35.8536 8.9165 35.1941 8.9165C34.5346 8.9165 33.995 9.46231 33.995 10.1294V13.7681H29.1987V10.1294C29.1987 9.46231 28.6591 8.9165 27.9996 8.9165C27.3401 8.9165 26.8006 9.46231 26.8006 10.1294V13.7681H22.0043V10.1294ZM39.9904 18.6197V38.0261C39.9904 39.3679 38.9187 40.452 37.5922 40.452H18.407C17.0806 40.452 16.0089 39.3679 16.0089 38.0261V18.6197C16.0089 17.2779 17.0806 16.1939 18.407 16.1939H37.5922C38.9187 16.1939 39.9904 17.2779 39.9904 18.6197Z" fill="#F2F2F2"/>
        </svg>
    </div>

    <div class="body">
        <div class="mensagem">
            <p>Seu email e senha para poder acessar o <span id="azul">monitro</span> pela primeira vez!</p>
        </div>
        <div class="formulario">
            <span>Verifique aqui seu primeiro acesso!</span>
            <p>email</p>
            <div class="espacoEmail">${email}</div>
            <p>senha</p>
            <div class="espacoSenha">${senha}</div>
        </div>
    </div>
    `
}

var infoEmail;
var infoEmail = await transporteEmail.sendMail(mensagem)

console.log(nodemailer.getTestMessageUrl(infoEmail))
return nodemailer.getTestMessageUrl(infoEmail);
}

async function enviarEmailConfirmacaoLogin(email, usuario, idSessao, logradouro, bairro, cidade, dataEmail) {
    let transporteEmail = nodemailer.createTransport({
        service: 'gmail',
        secure: true,    
        auth: {
            user: "monitroltda@gmail.com",
            pass: "xctc qnor zntu liwm"
        }
    })
    
    let mensagem = {
        from: email_monitro,
        to: `${usuario} <${email}>`,
        subject: 'Confirmar entrada',
        text: '',
        html: 
        `
<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&family=Poppins:wght@300&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: "poppins";
    font-weight: 800;
}

body {
    background-color: #28C8EF;
    height: 500px;
}

.container {
    border: white 2px solid;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.tituloNotificacao {
    margin-top: 2%;
    width: 65%;
    height: 10%;
    background-color: white;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tituloNotificacao img {
    width: 50px;
}

.container-informacoes {
    width: 55%;
    height: 75%;
    background-color: white;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1%;
}

.container-informacoes ul {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.container-informacoes li {
    width: 70%;
    height: 10%;

    list-style-type: none;
    border-radius: 50px;
}

.container-informacoes p {
    margin-left: 5%;
}

.campo {
    width: 100%;
    height: 70%;
    border: 2px solid black;
    border-radius: 50px;
}




.botoes {
    margin-bottom: 5%;
    display: flex;
    justify-content: space-evenly;
    width: 70%;
    height: 10%;
    gap: 15px;
}

.botoes a {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: default;
    text-decoration: none;
    border-radius: 50px ;
    
}

.botao {
    width: 100%;
    
    height: 100%;
    border-radius: 50px;
    color: var(--color);
    transition: 0.25s;

        &:hover,
        &:focus { 

    border-color: var(--hover);
    color: #fff;
}
}

.botao:hover,
.botao:focus {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
    cursor: pointer;
}



.negar {
    color: white;
    background-color: red;
    border: 2px solid red;
}

.confirmar {
    color: white;
    background-color: rgb(25, 206, 25);
    border: 2px solid rgb(25, 206, 25);
}
</style>

<body>
<div class="container">
    <div class="tituloNotificacao"><img
            src="https://static.vecteezy.com/system/resources/previews/009/663/747/original/warning-icon-transparent-free-png.png"
            alt="">
        <p>Atenção! Há um usuário tentando
            se conectar em sua conta, confirmar acesso?</p><img
            src="https://static.vecteezy.com/system/resources/previews/009/663/747/original/warning-icon-transparent-free-png.png"
            alt="">
    </div>
    <div class="container-informacoes">
        <ul>

            <li>
                <p>Logradouro</p>
                <div class="campo">
                    <p>${logradouro}</p>
                </div>
            </li>
            <li>
                <p>Bairro</p>
                <div class="campo">
                    <p>${bairro}</p> 
                </div>
            </li>
            <li>
                <p>Cidade</p>
                <div class="campo">
                    <p>${cidade}</p>
                </div>
            </li>
            <li>
                <p>Data e horário</p>
                <div class="campo">
                    <p>${dataEmail}</p>
                </div>
            </li>
        </ul>
        <div class="botoes">
            <a href="http://ec2-3-217-73-28.compute-1.amazonaws.com/sessao/negar/${idSessao}"><button class="botao negar">Negar Acesso</button></a>
            <a href="http://ec2-3-217-73-28.compute-1.amazonaws.com/sessao/permitir/${idSessao}"><button class="botao confirmar">Confirmar Acesso</button></a>
        </div>
    </div>
</div>
</body>
        `
    }
    
    var infoEmail;
    var infoEmail = await transporteEmail.sendMail(mensagem)
    
    console.log(nodemailer.getTestMessageUrl(infoEmail))
    return nodemailer.getTestMessageUrl(infoEmail);
}


module.exports = {
    enviarEmailPrimeiroAcesso, 
    enviarEmailConfirmacaoLogin
}