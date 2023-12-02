 function cadastrarParametros() {

    var cpuMin = inputCpuMin.value;
    var cpuMax = inputCpuMax.value;

    var ramMin = inputRamMin.value;
    var ramMax = inputRamMax.value;

    var armazenamentoMin = inputArmazenamentoMin.value;
    var armazenamentoMax = inputArmazenamentoMax.value;

    var uploadMin = inputUploadMin.value;
    var uploadMax = inputUploadMax.value;

    var downloadMin = inputDownloadMin.value;
    var downloadMax = inputDownloadMax.value; 

    var temperaturadMin = inputTemperaturadMin.value;
    var temperaturadMax = inputTemperaturadMax.value; 

    var fkEmpresa = sessionStorage.ID_EMPRESA;
    
    if (cpuMin == "" || cpuMax == "") {
             alert ("Por favor preencha totalmente os campos de parametros para a CPU")
             return false;
    } 

    if (ramMin == "" || ramMax == "") {
        alert ("Por favor preencha totalmente os campos de parametros para a RAM")
        return false;
    }

    if (armazenamentoMin == "" || armazenamentoMax == "") {
        alert ("Por favor preencha totalmente os campos de parametros para o Armazenamento")
        return false;
    }

    if (uploadMin == "" || uploadMax == "") {
        alert ("Por favor preencha totalmente os campos de parametros para o Upload")
        return false;
    }

    if (downloadMin == "" || downloadMax == "") {
        alert ("Por favor preencha totalmente os campos de parametros para o Download")
        return false;
    }

    if (temperaturaMin == "" || temperaturaMax == "") {
      alert ("Por favor preencha totalmente os campos de parametros para o Temperatura")
      return false;
  }
     else{


      fetch(`/alertas/cadastrarParametros`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          
          
        },
        
        body: JSON.stringify({
       
        cpuMinServer: cpuMin,
        cpuMaxServer: cpuMax,

        ramMinServer: ramMin,
        ramMaxServer: ramMax,

        armazenamentoMinServer: armazenamentoMin,
        armazenamentoMaxServer: armazenamentoMax,

        uploadMinServer: uploadMin,
        uploadMaxServer: uploadMax,

        downloadMinServer: downloadMin,
        downloadMaxServer: downloadMax,

        temperaturaMinServer: temperaturaMin,
        temperaturaMaxServer: temperaturaMax,
    
        fkEmpresaServer: fkEmpresa,
        idServidorEspecificoServer: idServidorEspecifico


        
        }),
      }).then(function (resposta) {
        console.log(resposta);
         alert("Parametro cadastrado!")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    
    return false;
    }

}