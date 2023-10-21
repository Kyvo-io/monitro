
var servidorModel = require("../models/servidorModel");

function cadastrarServidor(req, res) {
    
    var nomeServidor = req.body.nomeServidorServer;
    var SistemaOperacional = req.body.sistemaOperacionalServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;
    var fkEmpresa = req.body.idEmpresaServer;
    var fkEndereco = req.body.idEnderecoServer;
    
        if(nomeServidor == undefined){
          res.status(400).send("O Nome do Servidor está undefined!");
      } else if (logradouro == undefined) {
          res.status(400).send("O logradouro está undefined!");
       } else if (numero == undefined) {
        res.status(400).send("O número está undefined!");
       } else if (cep == undefined) {
        res.status(400).send("O cep está undefined!");
      } else if (bairro == undefined) {
          res.status(400).send("O bairro está undefined!")
      } else if (uf == undefined){
        res.status(400).send("O UF está undefined!")
      } else{
          servidorModel.cadastrarServidor(nomeServidor,SistemaOperacional,logradouro,cep,bairro,numero,cidade,uf,fkEmpresa,fkEndereco)
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