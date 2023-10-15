var database = require("../database/config")
var emailService = require("../services/emailService");
var generator = require('generate-password');

function logar(email, cnpj) {
    var instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND cnpj = '${cnpj}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nomeResponsavel,nomeEmpresa, email,cnpj) {

    var senha = generator.generate({
        length: 10,
        numbers: true
    });

    var instrucao = `
        INSERT INTO Empresa (nomeEmpresa,cnpj) VALUES ('${nomeEmpresa}','${cnpj}');
    `;
    database.executar(instrucao);

    
    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email, senha, fkEmpresa, fkCargo) 
                    VALUES ('${nomeResponsavel}', '${email}', '${senha}', (SELECT MAX(idEmpresa) FROM Empresa), 1);
                    `;

                    database.executar(instrucao);
    return senha;
}

module.exports = {
    logar,
    cadastrar
};