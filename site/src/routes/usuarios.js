var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarFuncionario", function(req,res){
    usuarioController.cadastrarFuncionario(req,res)
})

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.get("/listar/:idEmpresa", function(req,res) {
    usuarioController.listarUsuariosEmpresa(req,res)
})

router.post("/edit/", function(req,res) {
    usuarioController.editarUsuario(req,res)
})


router.get("/delete/:idUsuario", function(req,res) {
    usuarioController.excluirUsuario(req,res)
})



module.exports = router;