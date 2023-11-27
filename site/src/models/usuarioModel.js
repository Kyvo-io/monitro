var database = require("../database/config")


function buscarUsuarioPeloId(idUsuario) {
    var instrucao = `SELECT * FROM usuario WHERE idUsuario = ${idUsuario}; ` 
    
    return database.executar(instrucao);
}

function logar(email, senha) {
    
    var instrucao = `SELECT empresa.nomeEmpresa, cargo.nomeCargo, usuario.* FROM usuario
	JOIN cargo ON idCargo = fkCargo
	JOIN empresa ON idEmpresa = fkEmpresa WHERE email = '${email}' AND senha = '${senha}'; ` 
    
    return database.executar(instrucao);
} 

function cadastrarFuncionario(nomeUsuario,email,senha,fkEmpresa,fkCargo) {

    var instrucao = `
        INSERT INTO usuario (nomeusuario,email,senha,fkEmpresa,fkCargo) VALUES ('${nomeUsuario}','${email}','${senha}','${fkEmpresa}','${fkCargo}');
    `;
    return database.executar(instrucao);
}

function listarUsuariosEmpresa(idEmpresa) {
    var query = `
        SELECT usuario.*, nomeCargo from usuario INNER JOIN cargo on fkCargo = idCargo WHERE fkEmpresa = ${idEmpresa}
    `
    return database.executar(query);
}

function editarUsuario(nome, email, fkCargo, senha, idUsuario) {
    var query = `
    UPDATE usuario
    SET nomeUsuario = '${nome}', email = '${email}', fkCargo = ${fkCargo}, senha='${senha}'
    WHERE idUsuario =${idUsuario}
    `
    return database.executar(query)
}

function excluirUsuario(idUsuario) {
    var query = `DELETE FROM sessao WHERE fkUsuario = ${idUsuario}`
    database.executar(query)

    query = `DELETE FROM usuario WHERE idUsuario = ${idUsuario}`
    return database.executar(query)
}


module.exports = {
    editarUsuario,
    logar,
    cadastrarFuncionario,
    listarUsuariosEmpresa,
    excluirUsuario,
    buscarUsuarioPeloId
};