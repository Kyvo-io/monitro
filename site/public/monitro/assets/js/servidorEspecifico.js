var servidorEspecificoCompleto
var idServidorEspecifico = null
var metricas = [];

async function abrirServidorEspecifico(i) {
    var modal = document.getElementById('ModalEspecifica')
    
    chartRam.data.labels = []
    chartRam.data.datasets[0].data = []
    chartRam.update()
  
  
    chartCpu.data.labels = []
    chartCpu.data.datasets[0].data = []

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
    pSistemaOperacional.innerHTML = `${servidor.sistemaOperacional}`
    pNomeSO.innerHTML = `${servidor.sistemaOperacional}`

    
    document.getElementById('inputCpuMin').value = '';
    document.getElementById('inputCpuMax').value = '';

    document.getElementById('inputArmazenamentoMin').value = '';
    document.getElementById('inputArmazenamentoMax').value = '';
  

    document.getElementById('inputRamMin').value = '';
    document.getElementById('inputRamMax').value = '';

    document.getElementById('inputUploadMin').value = '';
    document.getElementById('inputUploadMax').value = '';

    document.getElementById('inputDownloadMin').value = '';
    document.getElementById('inputDownloadMax').value = '';

    try {
        await buscarParametrosServidor(idServidorEspecifico)       
    } catch (error) {
        
    }
        
    await obterRegistrosDescricoes(servidor.idServidor)
    setInterval(async() => {
      await obterRegistrosDescricoes(servidor.idServidor)
    }, 3000);
}





async function obterRegistrosDescricoes(idServidor) {
    var busca = await fetch(`/servidor/${idServidor}`)
    
    
    var busca = await fetch(`/servidor/${servidor.idServidor}`)
    var jsonBusca = await busca.json()
    
    servidorEspecificoCompleto = jsonBusca
    
    descricoes = servidorEspecificoCompleto.descricoesComponentes
    registros = servidorEspecificoCompleto.ultimosRegistros
    

    var cpu = {
        descricoes: servidorEspecificoCompleto.descricoesComponentes.cpu,
        registros: registros.cpu.registros.reverse(),
        horarios: registros.cpu.horarios.reverse()
    }
    var ram = {
        descricoes: servidorEspecificoCompleto.descricoesComponentes.ram,
         registros: registros.ram.registros.reverse(),
        horarios: registros.ram.horarios.reverse()
    }
    var disco = {
        descricoes: servidorEspecificoCompleto.descricoesComponentes.disco,
         registros: registros.disco.registros.reverse(),
        horarios: registros.disco.horarios.reverse()
    } 
    var rede = {
        descricoes: servidorEspecificoCompleto.descricoesComponentes.rede,
        upload:{
            registros: registros.rede.upload.registros.reverse(),
            horarios: registros.rede.upload.horarios.reverse()
        },
        download:{
            registros: registros.rede.download.registros.reverse(),
            horarios: registros.rede.download.horarios
        }
    } 
    var tamanhoDisco = Number(disco.descricoes[2].descricao.replace(" GB", ""));
    
    
    var usoDisco = disco.registros[disco.registros.length-1]
    var horarioLogs = rede.download.horarios
    var logs = ""
    for(var i = 0; i<horarioLogs.length; i++){
        logs+=`
        <div class="containerUltimosRegistros">
        <h3>Data: ${horarioLogs[i]}</h3>
        <div class="ladoEsquerdoCard">
          <div class="CpuRegistros">
            <h3>CPU</h3>
            <span
              >Porcentagem de uso:
              <p>${registros.cpu.registros[i]} %</p></span
            >
          </div>
          <div class="RamRegistros">
            <h3>RAM</h3>
            <span
              >Total:
              <p>${Number(ram.descricoes[0].descricao).toFixed(2)} GB</p></span
            >
            <span
              >Utilizado:
              <p>${registros.ram.registros[i]} GB</p></span
            >
          </div>
        </div>
        <div class="ladoDireitoCard">
          <div class="DiscoRegistros">
            <h3>DISCO</h3>
            <span
              >Total:
              <p>${tamanhoDisco.toFixed(2)} GB</p></span
            >
            <span
              >Utilizado:
              <p>${usoDisco} GB</p></span
            >
          </div>
          <div class="RedeRegistros">
            <h3>REDE</h3>
            <span
              >Download:
              <p>${registros.rede.download.registros[i]} MB</p></span
            >
            <span
              >Upload:
              <p>${registros.rede.upload.registros[i]} MB</p></span
            >
          </div>
        </div>
      </div>
        ` 
    }
  
    logsScroll.innerHTML = logs
    plotarGraficoRam(ram)
    plotarGraficoCpu(cpu)

    pUpload.innerHTML = rede.upload.registros[rede.upload.registros.length-1]
    pDownload.innerHTML = rede.download.registros[rede.download.registros.length-1]

    var tamanhoDisco = Number(disco.descricoes[2].descricao.replace(" GB", ""));
    
    
    var usoDisco = disco.registros[disco.registros.length-1]

    plotarGraficoDisco(tamanhoDisco, usoDisco)
    
    pTotalArmz.innerHTML = tamanhoDisco.toFixed(2)
    pNomeCpu.innerHTML = cpu.descricoes[2].descricao
    pFreq.innerHTML = cpu.descricoes[0].descricao
    pNucFis.innerHTML = cpu.descricoes[3].descricao
    pNucLog.innerHTML = cpu.descricoes[4].descricao
    pTotalRam.innerHTML = Number(ram.descricoes[0].descricao).toFixed(2) 
}

function plotarGraficoCpu({registros, horarios}) {
    if(chartCpu.data.labels.length == 0){
        chartCpu.data.labels = horarios
        chartCpu.data.datasets[0].data = registros 
        chartCpu.update()
    }else if(horarios[horarios.length - 1]  !=  chartCpu.data.labels[ chartCpu.data.labels.length - 1]){
            chartCpu.data.labels.shift() 
            chartCpu.data.datasets[0].data.shift()
            chartCpu.data.labels.push( horarios[horarios.length - 1])
            chartCpu.data.datasets[0].data.push(registros[registros.length-1])
            chartCpu.update()
        }
}

function plotarGraficoRam({registros, horarios}) {
    if(chartRam.data.labels.length == 0){
        chartRam.data.labels = horarios
        chartRam.data.datasets[0].data = registros 
        chartRam.update()
    }else if(horarios[horarios.length - 1]  !=  chartRam.data.labels[ chartRam.data.labels.length - 1]){
            chartRam.data.labels.shift() 
            chartRam.data.datasets[0].data.shift()
            chartRam.data.labels.push( horarios[horarios.length - 1])
            chartRam.data.datasets[0].data.push(registros[registros.length-1])
            chartRam.update()
        }
    
}


    function plotarGraficoDisco(tamanhoDisco, usoDisco) {
        chartDisco.data.datasets[0].data[0] = usoDisco / tamanhoDisco * 100;
        chartDisco.update()
    }
    
       

    
    


async function buscarParametrosServidor(idServidor) {

    var busca = await fetch(`/alertas/buscarParametrosServidor/${idServidor}`)
    var json = await busca.json();
    metricas = await json;

    if (metricas != '') { 
        
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
    
} else{


    document.getElementById('inputCpuMin').value = '';
    document.getElementById('inputCpuMax').value = '';

    document.getElementById('inputArmazenamentoMin').value = '';
    document.getElementById('inputArmazenamentoMax').value = '';

    document.getElementById('inputRamMin').value = '';
    document.getElementById('inputRamMax').value = '';

    document.getElementById('inputUploadMin').value = '';
    document.getElementById('inputUploadMax').value = '';

    document.getElementById('inputDownloadMin').value = '';
    document.getElementById('inputDownloadMax').value = '';
    
}

}


