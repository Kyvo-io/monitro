var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.post("/cadastrarServidor", function(req,res){
    servidorController.cadastrarServidor(req,res)
})

router.get(`/servidores/:fkEmpresa`, function(req,res){
    servidorController.buscarServidoresEmpresa(req,res)
})

router.get(`/servidores`, function(req,res){
    servidorController.listarServidoresEmpresa(req,res)
})


// ROTA DE GET
// /servidores/:fkEmpresa
// 


module.exports = router;