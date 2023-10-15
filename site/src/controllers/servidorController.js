var usuarioModel = require("../models/servidorModel");

function cadastrarServidor(req, res) {
    
    var logradouro = req.body.logradouroServer;
    var codigo = req.body.codigoServer;
    var bairro = req.body.bairroServer;
    var fkEmpresa = req.body.idEmpresaServer;
    
  
      if (logradouro == undefined) {
          res.status(400).send("O logradouro está undefined!");
      } else if (codigo == undefined) {
        res.status(400).send("O código está undefined!");
      } else if (bairro == undefined) {
          res.status(400).send("O bairro está undefined!")
      } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
      } else {
       
          usuarioModel.cadastrarServidor(logradouro, codigo,bairro,fkEmpresa)
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
        cadastrarServidor
    }