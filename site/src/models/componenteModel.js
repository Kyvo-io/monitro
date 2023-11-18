var database = require("../database/config");
var endereco = require('./enderecoModel')




async function buscarComponentesServidor(fkServidor) {
    var instrucao = `SELECT idComponente FROM componente WHERE fkServidor = ${fkServidor}`

    var execucao = await database.executar(instrucao)
      
    var idComponentes = []

    for(var i = 0; i < execucao.length; i++){
        idComponentes.push(execucao[i].idComponente)
    }

    return idComponentes
}

module.exports = {
    buscarComponentesServidor
}