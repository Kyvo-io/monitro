var database = require("../database/config");
var endereco = require('./enderecoModel')


function buscarTodosServidores(fkEmpresa) {
  
  var instrucao = `
    SELECT  servidor.*,
    logradouro,
    cep,
    bairro,
    latitude,
    numero,
    cidade,
    uf,
    longitude
    FROM endereco
    JOIN servidor ON idEndereco = fkEndereco
    WHERE fkEmpresa = ${fkEmpresa}
    GROUP by idServidor, fkEndereco, sistemaOperacional,
    nomeServidor, tempoAtividade, tipoServidor, fkEmpresa, logradouro, cep,
    bairro, latitude, numero, cidade, uf, longitude
    
    `;
    return database.executar(instrucao);
}

function buscarServidoresEmpresa(fkEmpresa) {
  
  var instrucao = `
    SELECT  servidor.*,
    logradouro,
    cep,
    bairro,
    latitude,
    numero,
    cidade,
    uf,
    longitude
    FROM endereco
    JOIN servidor ON idEndereco = fkEndereco
    WHERE fkEmpresa = ${fkEmpresa}
    GROUP by idServidor, fkEndereco, sistemaOperacional,
    nomeServidor, tempoAtividade, tipoServidor, fkEmpresa, logradouro, cep,
    bairro, latitude, numero, cidade, uf, longitude
    
    `;
    return database.executar(instrucao);
}

function listarServidoresEmpresa() {
  var instrucao = `
  SELECT * FROM historicoalerta
	JOIN servidor ON idServidor = fkServidor WHERE  (SELECT MAX(idhistoricoAlerta) FROM historicoalerta);
`
    return database.executar(instrucao);

}

// function name(params) {
//  var instrucao =  `SELECT nomeTipo FROM componente
//   JOIN tipoComponente ON fkTipoComponente = idTipoComponente
//   WHERE fkServidor = idServidor ;`
//   return database.executar(instrucao);

// }


async function cadastrarServidor(logradouro,cep,bairro,numero,cidade,uf,idEndereco,sistemaOperacional,nomeServidor,fkEmpresa) {

  var idEndereco = await endereco.cadastrarEndereco(logradouro, cep, bairro, numero, cidade, uf)  

  try {

    var insertServidorQuery = `
      INSERT INTO servidor (fkEndereco, tipoServidor, nomeServidor, fkEmpresa)
      VALUES (${idEndereco},'${sistemaOperacional}','${nomeServidor}', ${fkEmpresa});
    `;

    const servidorInsertResult = await database.executar(insertServidorQuery);

    return servidorInsertResult;
  } catch (error) {
    console.error("Erro ao cadastrar servidor: ", error);
    throw error;
  }
}

async function editarServidor(
        idServidor, 
        nome,
        tipoServidor, 
        cep, 
        logradouro, numero, 
        bairro, cidade, uf
) {
  

  var idEndereco = await endereco.cadastrarEndereco(logradouro, cep, bairro, numero, cidade, uf)  

  var update = `
    UPDATE servidor 
    SET nomeServidor = '${nome}', tipoServidor = '${tipoServidor}', fkEndereco = ${idEndereco}
    WHERE idServidor = ${idServidor};
  `

  return database.executar(update)

}

function excluirServidor(idServidor) {
  var query = `DELETE FROM servidor WHERE idServidor = ${idServidor}`

  return database.executar(query)
}

module.exports = {
  buscarServidoresEmpresa,
  listarServidoresEmpresa,
  cadastrarServidor,
  buscarTodosServidores,
  editarServidor,
  excluirServidor
};