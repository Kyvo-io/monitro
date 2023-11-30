var database = require("../database/config")
var endereco = require("./enderecoModel")
var mapsService = require("../services/mapsService")
var usuario = require("./usuarioModel")

var email = require("../services/emailService")
async function permitirEntrada(idSessao) {
    var query = `
        UPDATE sessao SET autenticacaoDuasEtapas = 1
        WHERE idSessao = ${idSessao}
    `
    return database.executar(query)
}

async function bloquearEntrada(idSessao) {
    var query = `
        UPDATE sessao SET autenticacaoDuasEtapas = 0
        WHERE idSessao = ${idSessao}
    `
    return database.executar(query)
}


async function obterUltimaSessao(fkUsuario) {
    var query = `
        SELECT TOP 1 * FROM sessao
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY idSessao DESC
    `
    return database.executar(query)
}



async function cadastrarSessao(fkUsuario, ip, latitude, longitude) {
    console.log(latitude)
    var enderecoCompleto
    if(latitude == undefined  || latitude == ""){
        var coordenadas = await mapsService.obterCoordenadaPeloIp(ip)
        enderecoCompleto = await mapsService.buscarEnderecoPelasCoordenadas(coordenadas.latitude, coordenadas.longitude)
    }else{
        enderecoCompleto = await mapsService.buscarEnderecoPelasCoordenadas(latitude, longitude)
    }

  
    var idEndereco = await endereco.cadastrarEndereco(enderecoCompleto.logradouro, 
        enderecoCompleto.cep, enderecoCompleto.bairro, 1, enderecoCompleto.localidade, enderecoCompleto.uf)
    var query = `
        INSERT INTO sessao(fkUsuario, dataInicio, fkEndereco) 
        VALUES (${fkUsuario}, current_timestamp, ${idEndereco})
    `
    database.executar(query)

    const identityAtual = await database.executar(`SELECT IDENT_CURRENT('sessao') as ultimoId`)

    var usuarioSessao = await usuario.buscarUsuarioPeloId(fkUsuario)
    var data = new Date()
    var hora = data.getHours() < 10 ? "0"+data.getHours() : data.getHours()
    var minutos = data.getMinutes() < 10 ? "0"+data.getMinutes() : data.getMinutes()
    

    var horario = hora+":"+minutos
    var dataEmail = data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear() + "   |  "+ horario
    


    try {
        await email.enviarEmailConfirmacaoLogin(usuarioSessao[0].email+"", usuarioSessao[0].nomeUsuario+"", identityAtual[0].ultimoId, 
        enderecoCompleto.logradouro,
        enderecoCompleto.bairro,
        enderecoCompleto.localidade,
        dataEmail
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    cadastrarSessao, 
    bloquearEntrada,
    permitirEntrada, 
    obterUltimaSessao 
}