var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.post("/cadastrarServidor", function(req,res){
    servidorController.cadastrarServidor(req,res)
})


// router.get(`/servidores`, function(req,res){
//     servidorController.listarServidoresEmpresa(req,res)
// })  

router.get(`/servidores/:fkEmpresa`,function(req,res) {
    servidorController.buscarServidoresEmpresa(req,res)
})
router.get(`/:idServidor`, function(req,res){
    servidorController.buscarServidorEspecifico(req,res)
})

router.get(`/delete/:idServidor`, function(req,res){
    servidorController.deletarServidor(req,res)
})

router.post(`/edit/`, function(req,res){
    servidorController.editarServidor(req,res)
})


// ROTA DE GET
// /servidores/:fkEmpresa
// 


module.exports = router;