const AlertasEstado = document.getElementById('AlertasEstado');
const AlertasEstadoTodoPeriodo = document.getElementById('AlertasEstadoPeriodo')
var ufs = []
var qtdAlertasUfs = []

var qtdBons = []
var qtdMedios = []
var qtdCriticos = []


var qtdAlertasUfsTodoPeriodo = []
var qtdBonsTodoPeriodo = []
var qtdMediosTodoPeriodo = []
var qtdCriticosTodoPeriodo = []






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
async function obterQtdAlertasUfsHoje() {
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

async function obterQtdAlertasUfs() {
  var busca = await fetch(`/historico/qtdAlertasEstadosTudo/${sessionStorage.ID_EMPRESA}`)
  var json = await busca.json()
 
  qtdAlertasUfsTodoPeriodo = json

  for (var i  =0; i  < qtdAlertasUfsTodoPeriodo.length ; i ++) {
    if(qtdAlertasUfsTodoPeriodo[i].nivelAlerta == "Crítico"){
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfsTodoPeriodo[i].uf == ufs[j]){
          qtdCriticosTodoPeriodo[j] = qtdAlertasUfsTodoPeriodo[i].qtdAlerta
        }
      }
    }else if(qtdAlertasUfsTodoPeriodo[i].nivelAlerta == "Médio"){
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfsTodoPeriodo[i].uf == ufs[j]){
          qtdMediosTodoPeriodo[j] = qtdAlertasUfsTodoPeriodo[i].qtdAlerta
        }
      }
    }else{
      for(var j = 0; j<ufs.length; j++){
        if(qtdAlertasUfsTodoPeriodo[i].uf == ufs[j]){
          qtdBonsTodoPeriodo[j] = qtdAlertasUfsTodoPeriodo[i].qtdAlerta
        }
      }
    }
    
  }
}

var chartEstado;
var chartEstadoTodoPeriodo;
obterUfs()

obterQtdAlertasUfs().then(function() {
  chartEstadoTodoPeriodo = new Chart(AlertasEstadoTodoPeriodo, {
    type: 'bar',
    data: {
      labels: ufs,
      datasets: [
  
        {
          label: "Quantidade disparos de risco médio",
          data: qtdMediosTodoPeriodo,
          borderWidth: 1,
          backgroundColor: ['orange', 'orange'],
          stack: 'Stack 0',
        },
        {
        label: "Quantidade disparos de risco crítico",
        data: qtdCriticosTodoPeriodo,
        borderWidth: 1,
        backgroundColor: ['red', 'red'],
        stack: 'Stack 0',
      },
      {
        label: "Quantidade de disparos com performance ok",
        data: qtdBonsTodoPeriodo,
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
})
obterQtdAlertasUfsHoje().then(function () {
chartEstado = new Chart(AlertasEstado, {
  type: 'bar',
  data: {
    labels: ufs,
    datasets: [

      {
        label: "Quantidade disparos de risco médio",
        data: qtdMedios,
        borderWidth: 1,
        backgroundColor: ['orange', 'orange'],
        stack: 'Stack 0',
      },
      {
      label: "Quantidade disparos de risco crítico",
      data: qtdCriticos,
      borderWidth: 1,
      backgroundColor: ['red', 'red'],
      stack: 'Stack 0',
    },
    {
      label: "Quantidade de disparos com performance ok",
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
})






setInterval(async() => {
  ufs = []
  qtdAlertasUfs = []
  
  qtdBons = []
  qtdMedios = []
  qtdCriticos = []

  qtdAlertasUfsTodoPeriodo = []
  qtdBonsTodoPeriodo = []
  qtdMediosTodoPeriodo = []
  qtdCriticosTodoPeriodo = []

  await obterUfs()
  await obterQtdAlertasUfsHoje()
  await obterQtdAlertasUfs()

  chartEstado.update()
  chartEstadoTodoPeriodo.update()

}, 2000);
