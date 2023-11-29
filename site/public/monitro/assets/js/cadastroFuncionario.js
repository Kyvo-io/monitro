function alertVazio(){
  Swal.fire("Campos vazios, preencha corretamente!");
}

function alertSenha(){
  Swal.fire({
    icon: "error",
    text: "A senha e confirmação de senha tem que ser iguais!"
  });
}

function alertEmail(){
  Swal.fire({
    icon: "error",
    text: "Email incorreto, preencha corretamente!"
  });
}

function alertCerto(){
  Swal.fire({
  title: "Cadastrado com sucesso",
  icon: "success"
});
}


function cadastrarFuncionario() {

    var nomeUsuario = input_nome_usuario.value;
    var email = input_email.value;
    var cargo = select_cargos.value;
    var senha = input_senha.value;
    var confirmar_senha = input_confirmar_senha.value;
    var fkEmpresa = sessionStorage.ID_EMPRESA;
    var fkCargo = select_cargos.value;
    
    if (nomeUsuario == "" || email == "" || cargo == "" || senha == "" || confirmar_senha == "") {
     
             alertVazio();
             return false;
    } else if (senha != confirmar_senha) {
      alertSenha();
    } else if (email.indexOf('@') == -1 ) {
      alertEmail();
    } else if (email.indexOf('.') == -1) {
      alertEmail();
    } else {
    
      alertCerto();
      
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