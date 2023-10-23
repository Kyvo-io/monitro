var cnpj = 0;

function validarCNPJ() {
    
    cnpj = input_cnpj.value

    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
        
    // Valida DVs
   var tamanho = cnpj.length - 2
   var numeros = cnpj.substring(0,tamanho);
   var digitos = cnpj.substring(tamanho);
   var soma = 0;
   var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}


function cadastrar() {
    var nomeResponsavel = input_nome_responsavel.value;
    var nomeEmpresa = input_nome_empresa.value;
    var email = input_email.value;
    cnpj = input_cnpj.value
    var botao = document.getElementById("botaoEnviarCadastro");
   
    validarCNPJ();

    if (nomeResponsavel == "" || nomeEmpresa == "" || email == "" || cnpj == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }

    

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