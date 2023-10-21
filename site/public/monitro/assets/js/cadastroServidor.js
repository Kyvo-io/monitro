
function cadastrarServidor() {

    var nomeServidor = input_nome_servidor;
    var SistemaOperacional = select_sos.value;
    var logradouro = input_logradouro.value;
    var numero = input_numero.value;
    var cep = input_cep.value;
    var bairro = input_bairro.value;
    var cidade = input_cidade.value;
    var uf = input_uf.value;
    var fkEmpresa = sessionStorage.ID_EMPRESA;
    var fkEndereco = sessionStorage.ID_ENDERECO;
    
    if (nomeServidor == "" || SistemaOperacional == "" || numero == "" || logradouro == "" || cep == "" || bairro == "" || cidade == "" || uf == "") {
     
             alert ("Por favor preencha os campos em branco")
             return false;
    }

      fetch(`/servidores/cadastrarServidor`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          
        },
        
        body: JSON.stringify({
            
        nomeServidorServer: nomeServidor,
        SistemaOperacionalServer: SistemaOperacional,
        logradouroServer: logradouro,
        numeroServer: numero,
        cepServer: cep,
        bairroServer: bairro,
        cidadeServer: cidade,
        ufServer: uf,
        idEmpresaServer: fkEmpresa,
        idEnderecoServer: fkEndereco
          
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