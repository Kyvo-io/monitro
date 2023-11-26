function alert(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login realizado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
}

function alertErro(){
    Swal.fire({
        icon: "error",
        text: "Erro ao realizar o login"
      });
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
                sessionStorage.ID_EMPRESA = json.fkEmpresa;
                sessionStorage.ID_CARGO = json.fkCargo;
                sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
                sessionStorage.NOME_CARGO = json.nomeCargo;

                alert();
    
                setTimeout(function () {
                    window.location = "/monitro/dashboard.html";
                }, 2000); 
    
            });
    
        } else {
    
            console.log("Houve um erro ao tentar realizar o login!");

            alertErro();
    
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
    }


    