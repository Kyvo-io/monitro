
var servidorModel = require("../models/servidorModel");

function cadastrarServidor(req, res) {
    
 
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;

    var fkEndereco = req.body.idEnderecoServer;
    var nomeServidor = req.body.nomeServidorServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var fkEmpresa = req.body.idEmpresaServer;
    
      
      if (logradouro == undefined) {
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
          servidorModel.cadastrarServidor(logradouro,cep,bairro,numero,cidade,uf,fkEndereco ,sistemaOperacional,nomeServidor,fkEmpresa)
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

function buscarServidoresEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    servidorModel.buscarServidoresEmpresa(fkEmpresa).then(function(resposta){
        res.json(resposta);
    })

}


function listarServidoresEmpresa(req, res) {
    servidorModel.listarServidoresEmpresa().then(function(resposta){
        res.json(resposta);

        console.log("oi")
    })

}

    module.exports = {
        buscarServidoresEmpresa,
        cadastrarServidor,
        listarServidoresEmpresa
    }
