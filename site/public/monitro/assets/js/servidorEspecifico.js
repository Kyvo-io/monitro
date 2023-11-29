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

setInterval

