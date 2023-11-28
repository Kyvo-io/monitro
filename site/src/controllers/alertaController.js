var alertaModel = require("../models/alertaModel");

function cadastrarParametros(req, res) {
    
 
    var cpuMin = req.body.cpuMinServer;
    var cpuMax = req.body.cpuMaxServer;

    var ramMin = req.body.ramMinServer;
    var ramMax = req.body.ramMaxServer;

    var armazenamentoMin = req.body.armazenamentoMinServer;
    var armazenamentoMax = req.body.armazenamentoMaxServer;

    var uploadMin = req.body.uploadMinServer;
    var uploadMax = req.body.uploadMaxServer;

    var downloadMin = req.body.downloadMinServer;
    var downloadMax= req.body.downloadMaxServer;

   
    var fkEmpresa = req.body.fkEmpresaServer;
    var idServidorEspecifico = req.body.idServidorEspecificoServer;
    
      
    if (cpuMin == undefined) {
        res.status(400).send("O mínimo dad CPU está undefined!");
     } else if (cpuMax == undefined) {
      res.status(400).send("O máximo da CPU está undefined!");
     }  else  if (ramMin == undefined) {
        res.status(400).send("O mínimo da RAM está undefined!");
     } else if (ramMax == undefined) {
      res.status(400).send("O máximo da RAM está undefined!");
     }  else  if (armazenamentoMin == undefined) {
        res.status(400).send("O mínimo do Armazenamento está undefined!");
     } else if (armazenamentoMax == undefined) {
      res.status(400).send("O máximo do Armazenamento está undefined!");
     }  else   if (uploadMin == undefined) {
        res.status(400).send("O mínimo do Upload está undefined!");
     } else if (uploadMax == undefined) {
      res.status(400).send("O máximo do Upload está undefined!");
    } else if (downloadMin == undefined) {
        res.status(400).send("O mínimo do Download está undefined!");
    } else if (downloadMax == undefined) {
        res.status(400).send("O máximo do Download está undefined!");
    }else{
          alertaModel.cadastrarParametros(idServidorEspecifico,cpuMin,cpuMax,ramMin,ramMax,armazenamentoMin,armazenamentoMax,uploadMin,uploadMax,downloadMin,downloadMax,fkEmpresa)
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

function buscarParametros(req,res) {
    var idServidorEspecifico = req.body.idServidorEspecificoServer;

    alertaModel.buscarParametros(idServidorEspecifico).then(function(resposta){
    res.json(resposta);

    console.log("ola");
})}

module.exports = {
   cadastrarParametros,
   buscarParametros
}