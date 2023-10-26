
function cadastrarFuncionario() {

    var nomeUsuario = input_nome_usuario.value;
    var email = input_email.value;
    var cargo = select_cargos.value;
    var senha = input_senha.value;
    var confirmar_senha = input_confirmar_senha.value;
    var fkEmpresa = sessionStorage.ID_EMPRESA;
    var fkCargo = select_cargos.value;
    
    if (nomeUsuario == "" || email == "" || cargo == "" || senha == "" || confirmar_senha == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    } else if (senha != confirmar_senha) {
      alert ('A senha e confirmação de senha tem que ser iguais')
    } else if (email.indexOf('@') == -1 ) {
      alert('Falta @ no email')
    } else if (email.indexOf('.') == -1) {
      alert ('Falta . no email')
    } else {
    
      fetch("/usuarios/cadastrarFuncionario", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeUsuario,
          cargoServer: cargo,
          emailServer: email,
          senhaServer: senha,
          idEmpresaServer: fkEmpresa,
          idCargoServer: fkCargo
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
  }