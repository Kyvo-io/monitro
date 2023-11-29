function alertExcluir(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Excluído com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
}

function alertAtualizar(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Editado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
  }


var filtrados = []
var todoServidores = []


var idServidorEdit;
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
                <p style="font-weight: bold;">ID: <span style="font-weight: 500">  ${servidores[i].idServidor}</span></p>  
                <p style="font-weight: bold;">Nome: <span style="font-weight: 500">  ${servidores[i].nomeServidor}</span></p>
            </div>
            <div class="botoes-acoes">
                <img onclick='editarServidor(${i}, ${servidores[i].idServidor})' src="../monitro/assets/img/edit.svg" alt="">
                <img onclick='excluir(${servidores[i].idServidor})' src="../monitro/assets/img/trash-solid.svg" alt="">
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


async function editarServidor(i, idServidor) {
    idServidorEdit = idServidor
    var secaoEditar = document.getElementById("secao_formulario_crud")
    secaoEditar.style.display = 'flex'

    var servidor = {}
    if(input_servidor_pesquisa.value != ""){
        console.log(filtrados[Number(i)]);
        servidor = filtrados[Number(i)]
    }else{
        console.log(todoServidores[Number(i)]);
        servidor = todoServidores[Number(i)]
    }


     input_nome_servidor.value = servidor.nomeServidor
     input_cep.value = servidor.cep
     input_num.value = servidor.numero


    await buscarEndereco(servidor.cep)
    
    select_tipo_servidor.value = servidor.tipoServidor
    input_nome_servidor.focus()
}
   
function alterarCamposEndereco(infoEndereco) {
        input_bairro.value = infoEndereco.bairro
        input_logradouro.value = infoEndereco.logradouro    
        input_cidade.value = infoEndereco.localidade
        input_uf.value = infoEndereco.uf
}


async function buscarEndereco(cep) {

    if(cep.length >= 8){
        var busca = await fetch (`https://viacep.com.br/ws/${cep}/json/`).catch(()=>{
            alterarCamposEndereco({
                bairro: "Cep inválido",
                localidade: "Cep inválido",
                logradouro: "Cep inválido",
                uf: "Cep inválido" 
            })
        })
        var json = await busca.json()
     
    
        
        if(json.uf == undefined){
            alterarCamposEndereco({
                bairro: "Cep inválido",
                localidade: "Cep inválido",
                logradouro: "Cep inválido",
                uf: "Cep inválido" 
            })
        }else{
           
        alterarCamposEndereco({
            bairro: json.bairro,
            localidade: json.localidade,
            logradouro: json.logradouro,
            uf: json.uf 
        })
        }
    }

}

async function editar() {
    alertAtualizar();
    var fetchEdit = fetch(`/servidor/edit`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServidor: idServidorEdit,
            nome:  input_nome_servidor.value,
            tipoServidor:   select_tipo_servidor.value,
            cep: input_cep.value ,
            logradouro: input_logradouro.value ,
            numero: input_num.value,
            bairro: input_bairro.value ,
            cidade:   input_cidade.value,
            uf:  input_uf.value
        })
    }).then(()=>{
        
        window.location.reload()
    })

//

}


async function excluir(id) {
    var pergunta = confirm("Deseja excluir esse servidor?")

    if(pergunta){
        alertExcluir();
       var fetchDelete = await fetch(`/servidor/delete/${id}`).then(function 
        (resposta) {
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            
       })
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