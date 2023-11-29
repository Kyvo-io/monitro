var servidorEspecificoCompleto
var idServidorEspecifico = null
async function abrirServidorEspecifico(i) {
    
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


    setInterval(async() => { 
        var busca = await fetch(`/servidor/${servidor.idServidor}`)
        var jsonBusca = await busca.json()
        servidorEspecificoCompleto = jsonBusca
        var dadosRam = servidorEspecificoCompleto.ultimosRegistros.ram

        if(chartRam.data.datasets[0].data.length > 10){
            chartRam.data.datasets[0].data.shift()
        }
        chartRam.data.datasets[0].data.push(dadosRam[0].dado)
        chartRam.data.labels.push(new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds())

        chartCpu.data.datasets[0].data[0] = servidorEspecificoCompleto.ultimosRegistros.cpu[0].dado
        chartCpu.data.datasets[0].data[1] = 100 - servidorEspecificoCompleto.ultimosRegistros.cpu[0].dado
        chartCpu.update();

    
        chartRam.update()
    }, 3000);



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
