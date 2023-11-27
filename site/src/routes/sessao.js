var express = require("express");

var router = express.Router();

var sessaoController = require("../controllers/sessaoController");

router.post("/cadastrar", function(req,res){
    sessaoController.cadastrarSessao(req,res)
})

router.get("/permitir/:idSessao", function (req,res){
    sessaoController.permitirEntrada(req, res)
});

router.get("/obter/:idUsuario", function (req,res){
    sessaoController.obterUltimaSessao(req, res)
});

router.get("/negar/:idSessao", function (req,res){
    sessaoController.bloquearEntrada(req, res)
});


module.exports = router;