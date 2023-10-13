var database = require("../database/config")

function logar(email, cnpj) {
    var instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND cnpj = '${cnpj}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nomeResponsavel,nomeEmpresa, email,cnpj) {

    var instrucao = `
        INSERT INTO Empresa (nomeEmpresa,cnpj,fkTipoOrgao) VALUES ('${nomeEmpresa}','${cnpj}',1);
    `;
    database.executar(instrucao);

    
    var instrucao = `
        INSERT INTO cargo (nomeCargo) VALUES ('Gerente de Noc');
    `;
    database.executar(instrucao);
    
    var instrucao = `
        INSERT INTO Usuario (nomeUsuario, email,fkempresa,fkCargo) 
                    VALUES ('${nomeResponsavel}', '${email}',(SELECT MAX(idEmpresa) FROM Empresa),1)
                    `;

    return database.executar(instrucao);
}

module.exports = {
    logar,
    cadastrar
};