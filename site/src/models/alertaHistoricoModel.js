var database = require("../database/config");


function obterAlertasEmpresa(fkEmpresa){
    var query = `
    SELECT COUNT(nivelAlerta) as qtdAlerta, 
    nivelAlerta, MONTH(dataAlerta) as mes FROM historicoAlerta
    WHERE nivelAlerta <> 'Ok' AND fkEmpresaServidor = ${fkEmpresa}  AND YEAR(dataAlerta) = YEAR(CURRENT_TIMESTAMP)
    GROUP BY MONTH(dataAlerta),nivelAlerta
    order by MONTH(dataAlerta);
    `
    return database.executar(query)
}

function obterUfsComServidoresMonitorados(fkEmpresa) {
    var query = `
        SELECT uf FROM historicoAlerta  
        INNER JOIN servidor  on fkServidor = idServidor
        INNER JOIN endereco on fkEndereco = idEndereco
        where fkEmpresaServidor = ${fkEmpresa}
        GROUP BY uf
        ORDER BY uf
    `
    return database.executar(query)
}

function obterQtdAlertasNoDiaPorEstado(fkEmpresa) {
    var query = `
        SELECT COUNT(nivelAlerta) qtdAlerta, uf, nivelAlerta FROM historicoAlerta  
        INNER JOIN servidor  on fkServidor = idServidor
        INNER JOIN endereco on fkEndereco = idEndereco
        where fkEmpresaServidor = ${fkEmpresa} AND  DATENAME(dayofyear,dataAlerta) = DATENAME(dayofyear,CURRENT_TIMESTAMP)
        GROUP BY uf, nivelAlerta
        ORDER BY uf
    `
    return database.executar(query)
}
function obterQtdAlertasPorEstado(fkEmpresa) {
    var query = `
        SELECT COUNT(nivelAlerta) qtdAlerta, uf, nivelAlerta FROM historicoAlerta  
        INNER JOIN servidor  on fkServidor = idServidor
        INNER JOIN endereco on fkEndereco = idEndereco
        where fkEmpresaServidor = ${fkEmpresa}
        GROUP BY uf, nivelAlerta
        ORDER BY uf
    `
    return database.executar(query)
}

module.exports ={
    obterAlertasEmpresa,
    obterUfsComServidoresMonitorados, 
    obterQtdAlertasNoDiaPorEstado,
    obterQtdAlertasPorEstado

}