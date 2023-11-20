var alertaHistoricoController = require("../controllers/alertaHistoricoController")
var express = require("express");
var router = express.Router();

router.get("/qtdAlertasMeses/:fkEmpresa", function(req, res) {
    alertaHistoricoController.obterAlertasEmpresa(req,res)
})
router.get("/qtdAlertasEstados/:fkEmpresa", function(req, res) {
    alertaHistoricoController.obterQtdAlertasNoDiaPorEstado(req,res)
})
router.get("/estadosMonitorados/:fkEmpresa", function(req, res) {
    alertaHistoricoController.obterUfsComServidoresMonitorados(req,res)
})

module.exports = router