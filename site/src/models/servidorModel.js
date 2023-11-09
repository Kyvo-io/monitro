var database = require("../database/config");
var endereco = require('./enderecoModel')


function buscarServidoresEmpresa(fkEmpresa) {
  
  var instrucao = `
  SELECT  servidor.*,endereco.* FROM endereco
  JOIN servidor ON idEndereco = fkEndereco
    INNER JOIN componente ON idServidor = fkServidor WHERE fkEmpresa = ${fkEmpresa}
    GROUP by idServidor; `;
    return database.executar(instrucao);
}

function listarServidores(fkEmpresa) {
  var instrucao = `SELECT * FROM servidor WHERE fkEmpresa = ${fkEmpresa}`
  return database.executar(instrucao);

}

async function cadastrarServidor(logradouro,cep,bairro,numero,cidade,uf,fkEndereco ,sistemaOperacional,nomeServidor,fkEmpresa) {

  var idEndereco = await endereco.cadastrarEndereco(logradouro, cep, bairro, numero, cidade, uf)  

  try {

    var insertServidorQuery = `
      INSERT INTO servidor (fkEndereco, sistemaOperacional, nomeServidor, fkEmpresa)
      VALUES (${idEndereco}, '${sistemaOperacional}', '${nomeServidor}', ${fkEmpresa});
    `;

    const servidorInsertResult = await database.executar(insertServidorQuery);

    return servidorInsertResult;
  } catch (error) {
    console.error("Erro ao cadastrar servidor: ", error);
    throw error;
  }
}

module.exports = {
  buscarServidoresEmpresa,
  listarServidores,
  cadastrarServidor
};