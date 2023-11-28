var alertaHistoricoModel = require('../models/alertaHistoricoModel')
function obterAlertasEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa

    alertaHistoricoModel.obterAlertasEmpresa(fkEmpresa).then((consulta) => {
        res.json(consulta)
    })
}
function obterQtdAlertasNoDiaPorEstado(req,res) {
    var fkEmpresa = req.params.fkEmpresa
    alertaHistoricoModel.obterQtdAlertasNoDiaPorEstado(fkEmpresa).then((consulta) => {
        res.json(consulta)
    })
}

function obterUfsComServidoresMonitorados(req,res) {
    var fkEmpresa = req.params.fkEmpresa
    alertaHistoricoModel.obterUfsComServidoresMonitorados(fkEmpresa).then((consulta) => {
        res.json(consulta)
    })
}

module.exports = {
obterAlertasEmpresa,
obterUfsComServidoresMonitorados, 
obterQtdAlertasNoDiaPorEstado
}