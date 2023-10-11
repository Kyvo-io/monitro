var database = require("../database/config")

function logar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nomeResponsavel,nomeEmpresa, email,cnpj) {

    var instrucao = `
        INSERT INTO usuario (nomeResponsavel,nomeEmpresa,email,cnpj) VALUES ('${nomeResponsavel}','${nomeEmpresa}', '${email}','${cnpj}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    logar,
    cadastrar
};