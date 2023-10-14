var database = require("../database/config")


function cadastrarServidor(logradouro,codigo,bairro,fkEmpresa) {

    var instrucao = `
    INSERT INTO servidor (fkEmpresa,fkEndereco) VALUES ('${fkEmpresa}',1);
    `;

    database.executar(instrucao);
    var instrucao = `
        INSERT INTO endereco (logradouro,codigoPostal,bairro) VALUES ('${logradouro}','${codigo}','${bairro}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrarServidor
};