var express = require("express");

var router = express.Router();

var sessaoController = require("../controllers/sessaoController");

router.post("/cadastrarSessao/", function(req,res){
    sessaoController.cadastrarSessao(req,res)
})

router.get("/confirmarEntrada/:idUsuario/:idSessao", function (req,res){
    sessaoController.logar(req, res)
});


router.get("/negarEntrada/:idUsuario/:idSessao", function (req,res){
    sessaoController.negarAcesso(req, res)
});
module.exports = router;