var empresaModel = require("../models/empresaModel");
var emailService = require("../services/emailService");

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("O seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("A sua senha está indefinida!");
    } else {
        
        empresaModel.logar(email, senha)
            .then(
                function (resultado) {

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Multiplos usuários com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

    function cadastrar(req, res) {

        var nomeResponsavel = req.body.nomeResponsavelServer;
        var nomeEmpresa = req.body.nomeEmpresaServer;
        var email = req.body.emailServer;
        var cnpj = req.body.cnpjServer;
    
        if (nomeResponsavel == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (nomeEmpresa == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if ( email == undefined) {
            res.status(400).send("Sua senha está undefined!");
        } else if (cnpj == undefined) {
            res.status(400).send("O seu CNPJ está undefined!");
        } else{
           
            var senha = empresaModel.cadastrar(nomeResponsavel,nomeEmpresa, email,cnpj);
            emailService.enviarEmailPrimeiroAcesso(email, nomeResponsavel,senha).then(function(linkEmail){
                res.status(200).send(linkEmail);
            });
        }
    }


    module.exports = {
        logar,
        cadastrar
    }