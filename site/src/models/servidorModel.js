var database = require("../database/config")


function cadastrarServidor(logradouro,cep,bairro,numero,cidade,uf,fkEndereco,sistemaOperacional,nomeServidor,fkEmpresa) {



    var instrucao = `
    INSERT INTO endereco (logradouro, cep, bairro, numero, cidade, uf) VALUES ('${logradouro}','${cep}','${bairro}','${numero}','${cidade}','${uf}');
`;
    database.executar(instrucao)

        var instrucao = `
        INSERT INTO servidor (fkEndereco,sistemaOperacional,nomeServidor,fkEmpresa) VALUES (${fkEndereco},'${sistemaOperacional}','${nomeServidor}',${fkEmpresa});
        `;
        return database.executar(instrucao);    
    

}

module.exports = {
    cadastrarServidor
};