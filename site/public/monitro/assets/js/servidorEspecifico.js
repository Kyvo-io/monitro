var servidorEspecificoCompleto
async function abrirServidorEspecifico(i) {
    var modal = document.getElementById('ModalEspecifica')
    
    chartRam.data.labels = []
    chartRam.data.datasets[0].data = []
    chartRam.update()

    trocarExibicaoModalEspecifica()


    var servidor = servidores[i]
    pNomeServ.innerHTML = `${servidor.nomeServidor}`
    pLogradouro.innerHTML =  `${servidor.logradouro}`
    pCep.innerHTML = `${servidor.cep}`
    pBairro.innerHTML =`${servidor.bairro}`
    pCidade.innerHTML = `${servidor.cidade}`
    pUf.innerHTML = `${servidor.uf}`
    pNomeServidor.innerHTML = `${servidor.nomeServidor}`
    pSistemaOperacional = `${servidor.sistemaOperacional}`


   

    await obterRegistrosDescricoes(servidor.idServidor)
    setInterval(async() => {
      await obterRegistrosDescricoes(servidor.idServidor)
    }, 500);
}




async function obterRegistrosDescricoes(idServidor) {
    var busca = await fetch(`/servidor/${idServidor}`)
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
         registros: registros.rede.registros.reverse(),
         horarios: registros.rede.horarios.reverse()
    } 
    console.log(ram);
    plotarGraficoRam(ram)
    var tamanhoDisco = Number(disco.descricoes[2].descricao.replace(" GB", ""));
    console.log(tamanhoDisco);
    var usoDisco = disco.registros[disco.registros.length-1]

    plotarGraficoDisco(tamanhoDisco, usoDisco)
}

function plotarGraficoCpu({registros, horarios}) {
    
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

