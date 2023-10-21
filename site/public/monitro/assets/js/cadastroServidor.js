
function cadastrarServidor() {

    
    var logradouro = input_logradouro.value;
    var numero = input_numero.value;
    var cep = input_cep.value;
    var bairro = input_bairro.value;
    var cidade = input_cidade.value;
    var uf = input_uf.value;

    sessionStorage.ID_ENDERECO = 1;

    var fkEndereco = sessionStorage.ID_ENDERECO;
    var sistemaOperacional = select_sos.value;
    var nomeServidor = input_nome_servidor.value;
    var fkEmpresa = sessionStorage.ID_EMPRESA;
    
    if (nomeServidor == "" || sistemaOperacional == "" || numero == "" || logradouro == "" || cep == "" || bairro == "" || cidade == "" || uf == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }

      fetch(`/servidores/cadastrarServidor`, {
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