const nodemailer = require('nodemailer');



var email_monitro = 'Suporte Monitro <monitro_suporte@kyvo.com>'

async function enviarEmailPrimeiroAcesso(email, usuario) {
let transporteEmail = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

let mensagem = {
    from: email_monitro,
    to: `${usuario} <${email}>`,
    subject: 'Primeiro acesso',
    text: 'Hello to myself!',
    html: `
    Login:
    Senha:
    `
}

var infoEmail;
var infoEmail = await transporteEmail.sendMail(mensagem)

console.log(nodemailer.getTestMessageUrl(infoEmail))
return nodemailer.getTestMessageUrl(infoEmail);
}


async function enviarEmailDefinicaoSenha(email, usuario) {
    let transporteEmail = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    
    let mensagem = {
        from: email_monitro,
        to: `${usuario} <${email}>`,
        subject: 'Primeiro acesso',
        text: 'Hello to myself!',
        html: `
        Login:
        Senha:
        `
    }
    
    var infoEmail;
    var infoEmail = await transporteEmail.sendMail(mensagem)
    
    console.log(nodemailer.getTestMessageUrl(infoEmail))
    return nodemailer.getTestMessageUrl(infoEmail);
}

async function enviarEmailConfirmarMonitoramento(email, usuario) {
    let transporteEmail = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    
    let mensagem = {
        from: email_monitro,
        to: `${usuario} <${email}>`,
        subject: 'Primeiro acesso',
        text: 'Hello to myself!',
        html: `
        Login:
        Senha:
        `
    }
    
    var infoEmail;
    var infoEmail = await transporteEmail.sendMail(mensagem)
    
    console.log(nodemailer.getTestMessageUrl(infoEmail))
    return nodemailer.getTestMessageUrl(infoEmail);
}


module.exports = {
    enviarEmailPrimeiroAcesso
}