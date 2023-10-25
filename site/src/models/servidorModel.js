var database = require("../database/config");
var endereco = require('./enderecoModel')
var maps = require('../services/mapsService')
async function cadastrarServidor(logradouro, cep, bairro, numero, cidade, uf,fkEndereco, sistemaOperacional, nomeServidor, fkEmpresa) {
  try {
    // Verifica se o endereço já existe
    var selectEnderecoQuery = `
      SELECT idEndereco FROM endereco
      WHERE logradouro = '${logradouro}' AND cep = '${cep}' AND bairro = '${bairro}' AND numero = '${numero}' AND cidade = '${cidade}' AND uf = '${uf}';
    `;

    const enderecoResult = await database.executar(selectEnderecoQuery);

    if (enderecoResult.length > 0) {
      // Se endereço já existe, reutiliza o idEndereco
       fkEndereco = enderecoResult[0].idEndereco;
    } else {
      var latitude = (await maps.buscarCoordenadasPeloEndereco(logradouro)).latitude
      var longitude = (await maps.buscarCoordenadasPeloEndereco(logradouro)).longitude
      // Se o endereço não existe, ele faz  o insert
      var insertEnderecoQuery = `
        INSERT INTO endereco (logradouro, cep, bairro, latitude, numero, cidade, uf, longitude)
        VALUES ('${logradouro}', '${cep}', '${bairro}','${latitude}', '${numero}', '${cidade}', '${uf}','${longitude}');
      `;

      const enderecoInsertResult = await database.executar(insertEnderecoQuery);
       fkEndereco = enderecoInsertResult.insertId; // Recupera o ID inserido
    }

    // Faz o insert com os dados do servidor usando a fkEndereco obtida acima
    var insertServidorQuery = `
      INSERT INTO servidor (fkEndereco, sistemaOperacional, nomeServidor, fkEmpresa)
      VALUES (${fkEndereco}, '${sistemaOperacional}', '${nomeServidor}', ${fkEmpresa});
    `;

    const servidorInsertResult = await database.executar(insertServidorQuery);

    return servidorInsertResult;
  } catch (error) {
    console.error("Erro ao cadastrar servidor: ", error);
    throw error;
  }
}

module.exports = {
  cadastrarServidor
};