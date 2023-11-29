function alertVazio(){
  Swal.fire("Campos vazios, preencha corretamente!");
}


function alertCerto(){
  Swal.fire({
  title: "Cadastrado com sucesso!",
  icon: "success"
});
}

function cadastrarServidor() {
    var logradouro = input_logradouro.value;
    var numero = input_numero.value;
    var cep = input_cep.value;
    var bairro = input_bairro.value;
    var cidade = input_cidade.value;
    var uf = input_uf.value;


    var fkEndereco = sessionStorage.ID_ENDERECO;
    var sistemaOperacional = select_tipos.value;
    var nomeServidor = input_nome_servidor.value;
    var fkEmpresa = sessionStorage.ID_EMPRESA;
    
    if (nomeServidor == "" || sistemaOperacional == "" || numero == "" || logradouro == "" || cep == "" || bairro == "" || cidade == "" || uf == "") {
     
            alertVazio();
             return false;
    }



      fetch(`/servidor/cadastrarServidor`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          
        },
        
        body: JSON.stringify({
       
        logradouroServer: logradouro,
        numeroServer: numero,
        cepServer: cep,
        bairroServer: bairro,
        cidadeServer: cidade,
        ufServer: uf,

        idEnderecoServer: fkEndereco,
        sistemaOperacionalServer: sistemaOperacional,
        nomeServidorServer: nomeServidor,
        idEmpresaServer: fkEmpresa
          
        }),
      }).then(function (resposta) {
        alertCerto();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    
    return false;
    }
      
function buscarEndereco(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.erro) {
              alert('CEP não encontrado');
          } else {
              // Preencha os campos de input com os dados do CEP
              document.getElementById('input_bairro').value = data.bairro;
              document.getElementById('input_cidade').value = data.localidade;
              document.getElementById('input_uf').value = data.uf;
              document.getElementById('input_logradouro').value = data.logradouro;
          }
      })
      .catch(error => {
          console.error('Ocorreu um erro:', error);
      });
}
document.getElementById('input_cep').addEventListener('input', function() {
  const cep = document.getElementById('input_cep').value;

  if (cep.length === 8 && /^\d+$/.test(cep)) {
      buscarEndereco(cep);
  }
});

