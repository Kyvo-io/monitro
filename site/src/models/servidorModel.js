var database = require("../database/config")


function cadastrarServidor(nomeServidor,SistemaOperacional,logradouro,cep,bairro,numero,cidade,uf,fkEmpresa,fkEndereco) {



    var instrucao = `
    INSERT INTO endereco (logradouro, cep, bairro, numero, cidade, uf) VALUES ('${logradouro}','${cep}','${bairro}','${numero}','${cidade}','${uf}');
`;
    database.executar(instrucao)
    var instrucao = `
    INSERT INTO servidor (fkEndereco,sistemaOperacional,nomeServidor,fkEmpresa) VALUES (1,'linux','mar','2');
    `;

   
    
    return database.executar(instrucao);
}

module.exports = {
    cadastrarServidor
};