var database = require("../database/config");

async function cadastrarServidor(logradouro, cep, bairro, numero, cidade, uf,fkEndereco, sistemaOperacional, nomeServidor, fkEmpresa) {
  try {
    // Verificar se o endereço já existe
    var selectEnderecoQuery = `
      SELECT idEndereco FROM endereco
      WHERE logradouro = '${logradouro}' AND cep = '${cep}' AND bairro = '${bairro}' AND numero = '${numero}' AND cidade = '${cidade}' AND uf = '${uf}';
    `;

    const enderecoResult = await database.executar(selectEnderecoQuery);

    if (enderecoResult.length > 0) {
      // O endereço já existe, reutilize o ID
       fkEndereco = enderecoResult[0].idEndereco;
    } else {
      // O endereço não existe, insira-o
      var insertEnderecoQuery = `
        INSERT INTO endereco (logradouro, cep, bairro, numero, cidade, uf)
        VALUES ('${logradouro}', '${cep}', '${bairro}', '${numero}', '${cidade}', '${uf}');
      `;

      const enderecoInsertResult = await database.executar(insertEnderecoQuery);
       fkEndereco = enderecoInsertResult.insertId; // Recupera o ID inserido
    }

    // Insira os dados do servidor usando a fkEndereco obtida acima
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
