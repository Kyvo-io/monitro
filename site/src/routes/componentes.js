var componenteController = require("../controllers/componenteController");
var express = require("express");
var router = express.Router();

router.get(`/:fkServidor`,function (req,res){
    componenteController.buscarComponentesServidor(req,res)
})

module.exports = router;