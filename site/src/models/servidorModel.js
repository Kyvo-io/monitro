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
      INNER JOIN componente ON idServidor = fkServidor WHERE fkEmpresa = ${fkEmpresa}
    GROUP by idServidor, fkEndereco, sistemaOperacional,
    nomeServidor, tempoAtividade, tipoServidor, fkEmpresa, logradouro, cep,
    bairro, latitude, numero, cidade, uf, longitude
    
    `;
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
  listarServidores,
  cadastrarServidor,
  buscarTodosServidores,
  editarServidor,
  excluirServidor
};