const AlertasEstado = document.getElementById('AlertasEstado');

var ufs = []
var qtdAlertasUfs = []

var qtdBons = []
var qtdMedios = []
var qtdCriticos = []



obterUfs()
obterQtdAlertasUfs()




async function obterUfs() {
  var busca = await fetch(`/historico/estadosMonitorados/${sessionStorage.ID_EMPRESA}`)
  var json = await busca.json()
  for(var i = 0; i<json.length; i++){
    ufs.push(json[i].uf)
  }
  
  for(var i = 0; i<ufs.length; i++){
    qtdBons.push(0)
    qtdMedios.push(0)
    qtdCriticos.push(0)
  }
}
async function obterQtdAlertasUfs() {
  var busca = await fetch(`/historico/qtdAlertasEstados/${sessionStorage.ID_EMPRESA}`)
  var json = await busca.json()
 
  qtdAlertasUfs = json

  for (var i  =0; i  < qtdAlertasUfs.length ; i ++) {
    if(qtdAlertasUfs[i].nivelAlerta == "Crítico"){
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfs[i].uf == ufs[j]){
          qtdCriticos[j] = qtdAlertasUfs[i].qtdAlerta
        }
      }
    }else if(qtdAlertasUfs[i].nivelAlerta == "Médio"){
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfs[i].uf == ufs[j]){
          qtdMedios[j] = qtdAlertasUfs[i].qtdAlerta
        }
      }
    }else{
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfs[i].uf == ufs[j]){
          qtdBons[j] = qtdAlertasUfs[i].qtdAlerta
        }
      }
    }
    
  }
}




var chartEstado = new Chart(AlertasEstado, {
  type: 'bar',
  data: {
    labels: ufs,
    datasets: [
      {
      label: "Qtd status crítico",
      data: qtdCriticos,
      borderWidth: 1,
      backgroundColor: ['red', 'red'],
      stack: 'Stack 0',
    },
    {
      label: "Qtd status alerta",
      data: qtdMedios,
      borderWidth: 1,
      backgroundColor: ['orange', 'orange'],
      stack: 'Stack 0',
    },
    {
      label: "Qtd status bom",
      data: qtdBons,
      borderWidth: 1,
      backgroundColor: ['green', 'green'],
      stack: 'Stack 1',
    }
  ]
  },
  options: {
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
});
