var database = require("../database/config");
var endereco = require('./enderecoModel')
var componente = require("./componenteModel")


function buscarServidoresEmpresa(fkEmpresa) {
  
  var instrucao = `
  SELECT servidor.*,
  logradouro,
  cep,
  bairro,
  latitude,
  numero,
  cidade,
  uf,
  longitude, 
  (SELECT TOP 1 nivelAlerta FROM historicoAlerta WHERE fkServidor = idServidor ORDER BY dataAlerta DESC) as nivelAlerta
  FROM endereco
  JOIN servidor ON idEndereco = fkEndereco WHERE fkEmpresa = ${fkEmpresa}
  GROUP by idServidor, fkEndereco, sistemaOperacional,
  nomeServidor, tempoAtividade, tipoServidor, fkEmpresa, logradouro, cep,
  bairro, latitude, numero, cidade, uf, longitude 
    `;
    return database.executar(instrucao);
}




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



async function buscarServidorEspecifico(idServidor){
  var servidor = {
    ultimosRegistros: {}, 
    descricoesComponentes: {}
  }

  var ultimosRegistros = {
    cpu: [],
    ram: [],
    disco: [],
    rede: []
  }


  for(var i = 1; i<=4; i++){
    var select = await database.executar(
      `
      SELECT top 25 tituloDado,dado FROM registroComponente WHERE fkComponente IN (SELECT idComponente FROM componente WHERE fkServidor = ${idServidor})  
      AND fkTipoComponente_Componente = ${i} ORDER BY dataRegistro DESC;
      `

    )

      switch (i) {
        case 1:
          ultimosRegistros.cpu = select
          break;
      
        case 2:
          ultimosRegistros.ram = select
          break;
        case 3:
            ultimosRegistros.rede = select
            break;
        case 4:
              ultimosRegistros.disco = select
              break;
      }

  } 



  var descricoes = await database.executar(`
  SELECT tituloDescricao,descricao FROM descricaoComponente WHERE fkComponente IN (SELECT idComponente FROM componente WHERE fkServidor = 1);
  `)

  servidor.descricoesComponentes = descricoes
  servidor.ultimosRegistros = ultimosRegistros


  return servidor
}

function excluirServidor(idServidor) {
  var query = `DELETE FROM servidor WHERE idServidor = ${idServidor}`

  return database.executar(query)
}

module.exports = {
  buscarServidoresEmpresa,
  cadastrarServidor,
  editarServidor,
  excluirServidor,
  buscarServidorEspecifico
};