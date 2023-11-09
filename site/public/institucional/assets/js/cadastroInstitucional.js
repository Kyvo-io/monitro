
function CnpjValido(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;
}

function ValidarCnpj() {

    
    
    var cnpj = document.getElementById("input_cnpj").value;

    if (CnpjValido(cnpj)) {
        alert("O CNPJ [" + cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") + "] é válido!");
    } else {
        alert("O CNPJ [" + cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") + "] não é válido!");
        botao()

    }
}



function cadastrar() {
    var nomeResponsavel = input_nome_responsavel.value;
    var nomeEmpresa = input_nome_empresa.value;
    var email = input_email.value;
    cnpj = input_cnpj.value
    var botao = document.getElementById("botaoEnviarCadastro");
   
    ValidarCnpj();

    if (nomeResponsavel == "" || nomeEmpresa == "" || email == "" || cnpj == "") {
     
    alert ("Por favor preencha os campos em branco")
    return false;
    }  else if (email.indexOf('@') == -1) {
        alert('Falta @ no Email')
    } else if (email.indexOf('.') == -1) {
        alert('falta . no email')
    } else {

    

    botao.remove()
    cardCadastroElementos.innerHTML += "<img id='loader' class='loader' src='assets/img/loader.svg'>"
      
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

}