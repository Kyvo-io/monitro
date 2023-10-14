var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.post("/cadastrarServidor", function(req,res){
    servidorController.cadastrarServidor(req,res)
})

module.exports = router;