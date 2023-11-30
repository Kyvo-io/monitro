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
    descricoesComponentes: {},
    metricas: {}
  }

  var ultimosRegistros = {
    cpu: {
      registros:[],
      horarios:[]
    },
    ram:{
      registros:[],
      horarios:[]
    },
    disco: {
      registros:[], 
      horarios:[]
    },
    rede: {
     upload:{
      registros:[],
      horarios:[]
     },
     download:{
      registros:[],
      horarios:[]
     }
    }
  }

  var descricoesComponentes = {
    cpu: [],
    ram: [],
    disco: [],
    rede: []
  }

  var metricasAlertaServidor = {
    usoCpu: {},
    usoRam: {},
    usoDisco: {},
    upload: {},
    download: {}
  }


  for(var i = 1; i<=4; i++){
    var select = await database.executar(
      `
      SELECT top 15 fkMetrica,dado, FORMAT(dataRegistro,  'HH:mm:ss') as dataRegistro, FORMAT(dataRegistro,  'dd-MM-yyyy HH:mm:ss') as dataCompleta FROM registroComponente WHERE fkComponente IN (SELECT idComponente FROM componente WHERE fkServidor = ${idServidor})  
      AND fkTipoComponente_Componente = ${i} ORDER BY FORMAT(dataRegistro,  'dd-MM-yyyy HH:mm:ss') DESC;
      `
    )
      for(var j = 0; j < select.length; j++){

        var registro = {
          dado: select[j].dado,
          data: select[j].dataRegistro,
          dataCompleta: select[j].dataCompleta
        }

        switch (i) {
          case 1:
            ultimosRegistros.cpu.registros.push(registro.dado)
            ultimosRegistros.cpu.horarios.push(registro.data)
            break;
          case 2:
            ultimosRegistros.ram.registros.push(registro.dado)
            ultimosRegistros.ram.horarios.push(registro.data)
            break;
          case 3:

          switch (select[j].fkMetrica) {
            case 2:
              ultimosRegistros.rede.upload.registros.push(registro.dado)
              ultimosRegistros.rede.upload.horarios.push(registro.data)
              break;
          
            case 3:
              ultimosRegistros.rede.download.registros.push(registro.dado)
              ultimosRegistros.rede.download.horarios.push(registro.dataCompleta)
              break;
          }
              break;
          case 4:
            ultimosRegistros.disco.registros.push(registro.dado)
            ultimosRegistros.disco.horarios.push(registro.data)
              break;
        }
  
      }
  } 

  for (var j= 1; j <= 5; j++) {
    var parametrosServidor = await database.executar(
    `
    SELECT min, max FROM alerta WHERE fkServidor = ${idServidor} AND fkMetrica = ${j} ORDER BY fkMetrica;
    `)

   
      var minimoMaximo = parametrosServidor[0]
    switch (j) {
      case 1:
        metricasAlertaServidor.usoCpu = minimoMaximo;
        break;

        case 2:
          metricasAlertaServidor.usoRam = minimoMaximo;
        break;

        case 3:
          metricasAlertaServidor.usoDisco = minimoMaximo;
        break;

        case 4:
          metricasAlertaServidor.upload = minimoMaximo;
        break;

        case 5:
          metricasAlertaServidor.download = minimoMaximo;
        break;
    
 
    }
  }

  var descricoes = await database.executar(`
  SELECT tituloDescricao,descricao, fkTipoComponente_Componente FROM descricaoComponente WHERE fkComponente IN (SELECT idComponente FROM componente WHERE fkServidor = ${idServidor});
  `)


  for(var i = 0; i < descricoes.length; i++){

    var descricao = {
      "titulo":   descricoes[i].tituloDescricao,
      "descricao": descricoes[i].descricao


    
    }
    switch (descricoes[i].fkTipoComponente_Componente) {
      case 1:
        descricoesComponentes.cpu.push(descricao)
        break;
      case 2:
        descricoesComponentes.ram.push(descricao)
        break;
      case 3:
        descricoesComponentes.rede.push(descricao)
        break;
      case 4:
        descricoesComponentes.disco.push(descricao)
        break;
    }
  }

  servidor.descricoesComponentes = descricoesComponentes
  servidor.ultimosRegistros = ultimosRegistros
  servidor.metricas = metricasAlertaServidor
  

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