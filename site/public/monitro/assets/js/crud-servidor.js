
var filtrados = []
var todoServidores = []
buscarServidores()
async function buscarServidores() {
    var busca = await fetch(`/servidor/servidores/${sessionStorage.ID_EMPRESA}`)
    var json = await busca.json()
    todoServidores = json
    listarServidores(json)
}

function listarServidores(servidores){
    lista_crud_servidores.innerHTML=''
    for(var i = 0; i<servidores.length; i++){
        lista_crud_servidores.innerHTML+=`
        <li class="item-lista-crud-servidores">
        <div class="infos-servidor-crud">
            <p>ID: <span>  ${servidores[i].idServidor}</span></p>  
            <p>Nome: <span>  ${servidores[i].nomeServidor}</span></p>
        </div>
        <div class="botoes-acoes">
            <img src="../monitro/assets/img/edit.svg" alt="">
            <img src="../monitro/assets/img/trash-solid.svg" alt="">
        </div>
        </li>
        
        `  
    }
}


function pesquisarServidor() {
    filtrados = []
    if(input_servidor_pesquisa.value != ""){
    for(var i = 0; i<todoServidores.length; i++){
        var servidorAtual = todoServidores[i]
        var nomeServidor = servidorAtual.nomeServidor.toLowerCase()

       if(nomeServidor.indexOf(input_servidor_pesquisa.value.toLowerCase()) > -1 || 
        todoServidores[i].idServidor == input_servidor_pesquisa.value){
        filtrados.push(todoServidores[i])
       }
    }
    listarServidores(filtrados)
}else{
    listarServidores(todoServidores)
}
}
