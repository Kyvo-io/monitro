var database = require("../database/config")


function logar(email, senha) {
    
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeUsuario,email,senha,fkEmpresa,fkCargo) {

    var instrucao = `
        INSERT INTO usuario (nomeusuario,email,senha,fkEmpresa,fkCargo) VALUES ('${nomeUsuario}','${email}','${senha}','${fkEmpresa}','${fkCargo}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    logar,
    cadastrarFuncionario
};