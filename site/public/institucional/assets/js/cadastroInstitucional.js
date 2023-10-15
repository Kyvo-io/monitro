function cadastrar() {
    var nomeResponsavel = input_nome_responsavel.value;
    var nomeEmpresa = input_nome_empresa.value;
    var email = input_email.value;
    var cnpj = input_cnpj.value;
    var botao = document.getElementById("botaoEnviarCadastro");
   
    if (nomeResponsavel == "" || nomeEmpresa == "" || email == "" || cnpj == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }
    botao.remove()
    cardCadastroElementos.innerHTML += "<img id='loader' class='loader' src='assets/img/loader.svg'>"
        // if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
        // cardErro.style.display = "block"
        // alert ("falta @ ou . no seu Email")
        // return false;   
        // }   

    fetch("/empresas/cadastrar", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
         
            nomeResponsavelServer: nomeResponsavel,
            nomeEmpresaServer: nomeEmpresa,
            emailServer: email,
            cnpjServer: cnpj
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            loader.remove()
            cardCadastroElementos.append(botao)
            console.log("resposta: ", resposta);
            resposta.text().then(function(link) {
                window.open(link)
            })
            alert('Cadastro realizado com sucesso')
            trocarExibicaoModalCadastro()
            trocarExibicaoModalLogin()
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}



