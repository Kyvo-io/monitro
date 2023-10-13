var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarFuncionario", function(req,res){
    usuarioController.cadastrarFuncionario(req,res)
})

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

module.exports = router;