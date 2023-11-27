var sessaoModel = require("../models/sessaoModel")


function cadastrarSessao(req,res) {
    var idUsuario = req.body.idUsuario
    var ip = req.body.ipUsuario
    var lat = req.body.lat
    var lng = req.body.lng
    sessaoModel.cadastrarSessao(idUsuario, ip, lat, lng)


    res.json("oi")
}

function bloquearEntrada(req,res) {
    var idSessao = req.params.idSessao
    sessaoModel.bloquearEntrada(idSessao).then(function() {
        res.redirect("/institucional/login-cancelado.html")
    })
}

function permitirEntrada(req,res) {
    var idSessao = req.params.idSessao
    sessaoModel.permitirEntrada(idSessao).then(function() {
        res.redirect("/institucional/login-confirmado.html")
    })
}

function obterUltimaSessao(req,res) {
    var idUsuario = req.params.idUsuario
    sessaoModel.obterUltimaSessao(idUsuario).then(function (resposta) {
        res.json(resposta)
    })

}

module.exports={
    cadastrarSessao, 
    bloquearEntrada, 
    permitirEntrada, 
    obterUltimaSessao
}