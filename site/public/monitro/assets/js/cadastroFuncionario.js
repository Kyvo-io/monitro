
function cadastrarFuncionario() {

    var nomeUsuario = input_nome_usuario.value;
    var email = input_email.value;
    var cargo = input_cargo.value;
    var senha = input_senha.value;
    var confirmar_senha = input_confirmar_senha.value;
    
    if (nomeUsuario == "" || email == "" || cargo == "" || senha == "" || confirmar_senha == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }
    
      fetch("/usuarios/cadastrarFuncionario", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeUsuario,
          emailServer: email,
          senhaServer: senha
        }),
      }).then(function (resposta) {
        resposta.json().then(function (json) {
          if (resposta.ok) {
            console.log(json);
            
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else console.log(json);
        });
      });
    
    return false;
    }