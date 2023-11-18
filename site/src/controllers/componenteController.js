var componenteModel= require("../models/componenteModel");


function buscarComponentesServidor (req, res) {
    var fkServidor = req.params.fkServidor
    componenteModel.buscarComponentesServidor(fkServidor).then(function(resposta){
        res.json(resposta)
    })
}

module.exports = {
  
    buscarComponentesServidor
}