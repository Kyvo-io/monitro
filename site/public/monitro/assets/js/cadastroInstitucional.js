function cadastrar() {


    var nomeResponsavel = input_nome_responsavel.value;
    var nomeEmpresa = input_nome_empresa.value;
    var email = input_email.value;
    var cnpj = input_cnpj.value;

    if (nomeResponsavel == "" || nomeEmpresa == "" || email == "" || cnpj == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }
 
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

            alert('Cadastro realizado com sucesso')

            setTimeout(() => {
                window.location = "dahboard.html";
            }, "2000")

            limparFormulario();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}



function logar() {     

  var email = input_login_email.value;
  var senha = input_login_senha.value;

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    fetch("/usuarios/logar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.ID_EMPRESA = json.fkEmpresa
                sessionStorage.ID_CARGO = json.fkCargo


                setTimeout(function () {
                    window.location = "./dahboard.html";
                }, 2000); 

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}