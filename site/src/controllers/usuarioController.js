var usuarioModel = require("../models/usuarioModel");

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("O seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("A sua senha está indefinida!");
    } else {
        
        usuarioModel.logar(email, senha)
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

function cadastrarFuncionario(req, res) {
    
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaServer;
    var fkCargo = req.body.idCargoServer;        
    
  
      if (nome == undefined) {
          res.status(400).send("Seu nome está undefined!");
      } else if (email == undefined) {
          res.status(400).send("Seu email está undefined!");
      } else if (senha == undefined) {
          res.status(400).send("Sua senha está undefined!");
      } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
      } else if (fkCargo == undefined) {
        res.status(400).send("Sua fkCargo está undefined!");
      } {
       
          usuarioModel.cadastrarFuncionario(nome, email, senha,fkEmpresa,fkCargo)
              .then(
                  function (resultado) {
                      res.json(resultado);
                  }
              ).catch(
                  function (erro) {
                      console.log(erro);
                      console.log(
                          "\nHouve um erro ao realizar o cadastro! Erro: ",
                          erro.sqlMessage
                      );
                      res.status(500).json(erro.sqlMessage);
                  }
              );
      }
}


    module.exports = {
        logar,
        cadastrarFuncionario
    }