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

function listarServidoresEmpresa() {
  var instrucao = `
  SELECT * FROM historicoalerta
	JOIN servidor ON idServidor = fkServidor WHERE (SELECT MAX(idhistoricoAlerta) FROM historicoalerta);
`
    return database.executar(instrucao);

}

function name(params) {
 var instrucao =  `SELECT nomeTipo FROM componente
  JOIN tipoComponente ON fkTipoComponente = idTipoComponente
  WHERE fkServidor = idServidor ;`
  return database.executar(instrucao);

}


async function cadastrarServidor(logradouro,cep,bairro,numero,cidade,uf,sistemaOperacional,nomeServidor,fkEmpresa) {

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
  listarServidoresEmpresa,
  cadastrarServidor,
  
};