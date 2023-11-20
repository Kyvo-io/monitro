var usuarios = []
var filtrados = []
var usuarioEdit;
buscarUsuarios()
async function buscarUsuarios() {
    var busca = await fetch(`/usuarios/listar/${sessionStorage.ID_EMPRESA}`)
    var json = await busca.json()

    usuarios = json
    listarUsuarios(usuarios)
}
function pesquisarUsuario() {
    filtrados = []
    if(input_usuario_pesquisa.value != ""){
        for(var i = 0; i<usuarios.length; i++){
            var usuarioAtual = usuarios[i]
            var nomeUsuario = usuarioAtual.nomeUsuario.toLowerCase()
            var cargo = usuarioAtual.nomeCargo.toLowerCase()
           if(nomeUsuario.indexOf(input_usuario_pesquisa.value.toLowerCase()) > -1 || 
           cargo.indexOf(input_usuario_pesquisa.value.toLowerCase()) > -1){
            filtrados.push(todoServidores[i])
           }
        }
        listarUsuarios(filtrados)
    }else{
        listarUsuarios(usuarios)
    }

}
function listarUsuarios(usuarios) {
    lista_crud_usuarios.innerHTML=``
    for(var i = 0; i<usuarios.length; i++){
    lista_crud_usuarios.innerHTML+=`
    <li class="item-lista-crud-usuarios">
            <div class="infos-usuario-crud">
                <p style="font-weight: bold;">Cargo: <span style="font-weight: 500">  ${usuarios[i].nomeCargo}</span></p>  
                <p style="font-weight: bold;">Nome: <span style="font-weight: 500">  ${usuarios[i].nomeUsuario}</span></p>
            </div>
            <div class="botoes-acoes">
                <img onclick='editarUsuario(${i}, ${usuarios[i].idUsuario})' src="../monitro/assets/img/edit.svg" alt="">
                <img onclick='excluir(${usuarios[i].idUsuario})' src="../monitro/assets/img/trash-solid.svg" alt="">
            </div>
        </li>
    `
    }
}
var usuario 
async function editarUsuario(i, idUsuario) {
    usuarioEdit = idUsuario
    var secaoEditar = document.getElementById("secao_formulario_crud")
    secaoEditar.style.display = 'flex'

    usuario = usuarios[i]

    input_nome_usuario.value = usuario.nomeUsuario
    select_cargo.value = usuario.fkCargo
    input_email.value = usuario.email
}

async function editarValidacao() {
    if(input_nome_usuario.value == "" 
    || input_email.value == "" || 
    input_senha.length == 0  || 
    input_senha_confirmar.length == 0 ||
    input_senha.value == ""  || 
    input_senha_confirmar.value == ""){
        alert("Insira todos os campos!")
    }else if(input_senha.value != input_senha_confirmar.value){
        alert("Senhas não coincindem!")
    }else if(usuario.fkCargo == 1){
        if(prompt("Insira a senha atual do Gerente:")==usuario.senha){
            editar()
        }else{
            alert("Senha inválida")
        }
    }else{
        editar()
    }
}

async function editar() {
    await fetch(`/usuarios/edit/`,{
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           idUsuario: usuarioEdit,
           nome: input_nome_usuario.value,
           email: input_email.value,
           fkCargo: select_cargo.value,
           senha: input_senha.value
        })
    }).then(function() {
        alert("Usuário atualizado com sucesso!")
        if(sessionStorage.ID_USUARIO == usuarioEdit){
            window.location.href = '/institucional/'
        }else{
            window.location.reload()
        }
    })
}

async function excluir(idUsuario) {
    if(sessionStorage.ID_USUARIO == idUsuario){
        alert("Não é possível se excluir")
    }else{
        if(confirm("Deseja excluir esse usuário?")){
            await fetch(`/usuarios/delete/${idUsuario}`).then(function() {
                alert("Usuário excluído com sucesso!")
                window.location.reload()
            })
        }
    }
}

function sair() {
    var pergunta = confirm("Deseja terminar as alterações?")

    if(pergunta){
        window.location = "/monitro/dashboard.html"
    }
}