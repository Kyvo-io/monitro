
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

function buscarTodosServidores(req, res) {
    var fkEmpresa = req.params.fkEmpresa
    servidorModel.buscarServidoresEmpresa(fkEmpresa).then(function(resposta){
        res.json(resposta);
    })

}

function editarServidor(req,res) {
    var idServidor = req.body.idServidor
    var nome = req.body.nome
    var tipoServidor  = req.body.tipoServidor
    var cep  = req.body.cep
    var logradouro = req.body.logradouro
    var numero = req.body.numero
    var bairro = req.body.bairro
    var cidade = req.body.cidade
    var uf = req.body.uf

 

    servidorModel.editarServidor(
        idServidor, 
        nome,
        tipoServidor, 
        cep, 
        logradouro, numero, 
        bairro, cidade, uf
    ).then(function() {
        res.json("Ok")
    })

}


    module.exports = {
        buscarServidoresEmpresa,
        cadastrarServidor,
        buscarTodosServidores,
        editarServidor
    }
