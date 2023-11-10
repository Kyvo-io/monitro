var componenteModelModel = require("../models/componenteModel");


function buscarComponentes (req, res) {
    var fkEmpresa = req.params.fkEmpresa
    componenteModel.buscarComponentes(fkEmpresa).then(function(resposta){
        res.json(resposta)
    })
}

module.exports = {
  
    buscarComponentes
}