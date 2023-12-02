var database = require("../database/config")



 async function cadastrarParametros( idServidorEspecifico,cpuMin,cpuMax,ramMin,ramMax,armazenamentoMin,armazenamentoMax,uploadMin,uploadMax,downloadMin,downloadMax,fkEmpresa) {

      var queryClean = `
        DELETE FROM alerta WHERE fkServidor = ${idServidorEspecifico}
      ;`
      database.executar(queryClean)


        var instrucao = `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${cpuMin},${cpuMax},1,1,${idServidorEspecifico},${fkEmpresa});`
        database.executar(instrucao);
       instrucao = `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${ramMin},${ramMax},4,2,${idServidorEspecifico},${fkEmpresa});`
        database.executar(instrucao);  
       instrucao = `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${armazenamentoMin},${armazenamentoMax},5,4,${idServidorEspecifico},${fkEmpresa});`
        database.executar(instrucao);        
      instrucao =  `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${uploadMin},${uploadMax},2,3,${idServidorEspecifico},${fkEmpresa});`
        database.executar(instrucao);
      instrucao =  `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${downloadMin},${downloadMax},3,3,${idServidorEspecifico},${fkEmpresa});` 
      database.executar(instrucao);
      instrucao =  `INSERT INTO alerta (min,max,fkMetrica,fkTipoComponente,fkServidor,fkEmpresa) VALUES (${temperaturaMin},${temperaturaMax},3,3,${idServidorEspecifico},${fkEmpresa});` 

      return database.executar(instrucao);

    } 

    async function buscarParametrosServidor(idServidor) {
      var buscarMetricas = `
        SELECT min,max FROM alerta WHERE fkServidor = ${idServidor}
      ;`

      return database.executar(buscarMetricas);

    } 

module.exports = {
    cadastrarParametros,
    buscarParametrosServidor
};