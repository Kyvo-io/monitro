function alertVazio(){
    Swal.fire("Campos vazios, preencha corretamente!");
  }
  
  function alertSenha(){
    Swal.fire({
      icon: "error",
      text: "Senhas não coincindem!"
    });
  }
  
  function alertSenhaGerente(){
    Swal.fire({
        icon: "error",
        text: "Senha inválida!"
      });
  }
  
  function alertCerto(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuário atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
  }


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
        alertVazio();
    }else if(input_senha.value != input_senha_confirmar.value){
        alertSenha();
    }else if(usuario.fkCargo == 1){
        if(prompt("Insira a senha atual do Gerente:")==usuario.senha){
            alertCerto();
            editar()
        }else{
            alertSenhaGerente();
        }
    }else{
        editar()
    }
}

async function editar() {
    alertCerto();
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
        if(sessionStorage.ID_USUARIO == usuarioEdit){
            window.location.href = '/institucional/'
        }else{
            window.location.reload()
        }
    })
}


function alertExcluir(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuário excluído com sucesso!",
        showConfirmButton: false,
        timer: 3000
      });
}


async function excluir(idUsuario) {
    if(sessionStorage.ID_USUARIO == idUsuario){
        alert("Não é possível se excluir")
    }else{
        if(confirm("Deseja excluir esse usuário?")){
            alertExcluir();
            await fetch(`/usuarios/delete/${idUsuario}`).then(function() {
                window.location.reload()
            })
        }
    }
}

function sairPagina(){
    Swal.fire({
        title: "Tem certeza que deseja finalizar?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sair"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location = "/monitro/dashboard.html"
        }
      });
}

function sair() {
   sairPagina();
}