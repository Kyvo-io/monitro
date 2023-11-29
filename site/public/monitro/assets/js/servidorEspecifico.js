var servidorEspecificoCompleto
var idServidorEspecifico = null
async function abrirServidorEspecifico(i) {
      var modal = document.getElementById('ModalEspecifica')
    
    chartRam.data.labels = []
    chartRam.data.datasets[0].data = []
    chartRam.update()

    trocarExibicaoModalEspecifica()

    var servidor = servidores[i]
    idServidorEspecifico = servidor.idServidor
    pNomeServ.innerHTML = `${servidor.nomeServidor}`
    pLogradouro.innerHTML =  `${servidor.logradouro}`
    pCep.innerHTML = `${servidor.cep}`
    pBairro.innerHTML =`${servidor.bairro}`
    pCidade.innerHTML = `${servidor.cidade}`
    pUf.innerHTML = `${servidor.uf}`
    pNomeServidor.innerHTML = `${servidor.nomeServidor}`
    pSistemaOperacional = `${servidor.sistemaOperacional}`


    var busca = await fetch(`/servidor/${servidor.idServidor}`)
    var jsonBusca = await busca.json()

    servidorEspecificoCompleto = jsonBusca

    descricoes = servidorEspecificoCompleto.descricoesComponentes
    registros = servidorEspecificoCompleto.ultimosRegistros
    

    chartRam.data.labels = registros.ram.horarios
    chartRam.data.datasets[0].data = registros.ram.registros
    chartRam.update()


    setInterval(async() => {
        var busca = await fetch(`/servidor/${servidor.idServidor}`)
        var jsonBusca = await busca.json()
    
        servidorEspecificoCompleto = jsonBusca
    
        descricoes = servidorEspecificoCompleto.descricoesComponentes
        registros = servidorEspecificoCompleto.ultimosRegistros

        if(registros.ram.horarios[registros.ram.horarios.length - 1] !=  chartRam.data.labels[ chartRam.data.labels.length - 1]){
            chartRam.data.labels.shift() 
            chartRam.data.datasets[0].data.shift()

            chartRam.data.labels.push( registros.ram.horarios[registros.ram.horarios.length - 1])
            chartRam.data.datasets[0].data.push(registros.ram.registros[registros.ram.registros.length -1])
            chartRam.update()

        }
    }, 10000);
}


    var modal = document.getElementById('ModalEspecifica')
    trocarExibicaoModalEspecifica()
    buscarParametrosServidor(idServidorEspecifico)
}



var metricas = [];
async function buscarParametrosServidor(idServidor) {
    var busca = await fetch(`/alertas/buscarParametrosServidor/${idServidor}`)
    var json = await busca.json();
    metricas = await json;

  
    document.getElementById('inputCpuMin').value = Number(metricas[0].min);
    document.getElementById('inputCpuMax').value = Number(metricas[0].max);

    document.getElementById('inputArmazenamentoMin').value = Number(metricas[1].min);
    document.getElementById('inputArmazenamentoMax').value = Number(metricas[1].max);

    document.getElementById('inputRamMin').value = Number(metricas[2].min);
    document.getElementById('inputRamMax').value = Number(metricas[2].max);

    document.getElementById('inputUploadMin').value = Number(metricas[3].min);
    document.getElementById('inputUploadMax').value = Number(metricas[3].max);

    document.getElementById('inputDownloadMin').value = Number(metricas[4].min);
    document.getElementById('inputDownloadMax').value = Number(metricas[4].max);
    
}