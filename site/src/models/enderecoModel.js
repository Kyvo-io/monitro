var database = require("../database/config");
var maps = require('../services/mapsService')


async function cadastrarEndereco(logradouro, cep, bairro, numero, cidade, uf) {
  try {
    // Verifica se o endereço já existe
    var selectEnderecoQuery = `
      SELECT idEndereco FROM endereco
      WHERE logradouro = '${logradouro}' AND 
      cep = '${cep}' AND bairro = '${bairro}' 
      AND numero = ${numero} AND cidade = '${cidade}' 
      AND uf = '${uf};';
    `;

   
    
    var enderecoResult = await database.executar(selectEnderecoQuery);
    console.log(enderecoResult)
    if (enderecoResult.length > 0) {
      // Se endereço já existe, reutiliza o idEndereco
       fkEndereco = enderecoResult[0].idEndereco;
       return fkEndereco;
    } else {
      var latitude = (await maps.buscarCoordenadasPeloEndereco(logradouro)).latitude
      var longitude = (await maps.buscarCoordenadasPeloEndereco(logradouro)).longitude
      // Se o endereço não existe, ele faz  o insert
      var insertEnderecoQuery = `
        INSERT INTO endereco (logradouro, cep, bairro, latitude, numero, cidade, uf, longitude)
        VALUES ('${logradouro}', '${cep}', '${bairro}','${latitude}', '${numero}', '${cidade}', '${uf}','${longitude}');
      `;

      const enderecoInsertResult = await database.executar(insertEnderecoQuery);
      const identityAtual = await database.executar(`SELECT IDENT_CURRENT('endereco') as ultimoId`)

  
      return identityAtual[0].ultimoId;
    }
  } catch (error) {
    console.error("Erro ao cadastrar servidor: ", error);
    throw error;
  }
}

module.exports = {
  cadastrarEndereco
};