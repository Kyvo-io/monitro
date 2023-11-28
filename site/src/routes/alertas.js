var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.post("/cadastrarParametros", function(req,res){
    alertaController.cadastrarParametros(req,res)
})

router.get("/buscarParametros", function(req,res){
    alertaController.buscarParametros(req,res)
})

module.exports = router;