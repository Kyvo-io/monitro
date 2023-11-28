
const alertaMeses = document.getElementById('alertaMeses');

var alertas = []
var alertasMedio = [0,0,0,0,0,0,0,0,0,0,0,0]
var alertasCritico = [0,0,0,0,0,0,0,0,0,0,0,0]

async function buscarAlertas() {
  var busca = await fetch(`/historico/qtdAlertasMeses/${sessionStorage.ID_EMPRESA}`) 
  var json = await busca.json()
  alertas = json

  for(var i = 0; i<alertas.length; i++){
    var alertaAtual = alertas[i]
    if(alertaAtual.nivelAlerta=="Crítico"){
      alertasCritico[alertaAtual.mes-1] = alertaAtual.qtdAlerta
    }else{
      alertasMedio[alertaAtual.mes-1] = alertaAtual.qtdAlerta
    }
  }
}
buscarAlertas()





var chartMeses = new Chart(alertaMeses, {
  type: 'line',
  data: {
    labels: 
    [
    'Janeiro', 
    'Fevereiro', 
    'Março', 
    'Abril', 
    'Maio', 
    'Junho',
    'Julho', 
    'Agosto', 
    'Setembro', 
    'Outubro', 
    'Novembro', 
    'Dezembro'
    ],
    datasets: [
      {
        label: "Crítico",
        data: [],
        borderWidth: 2,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: "Médio",
        data: [],
        borderWidth: 3,
        borderColor: 'orange',
        backgroundColor: 'orange'
      }
  ]
    
  },
  options: {
    scales: {
      y: {
        min: 0,
        max: 10,
      }
    }
  }
});


 chartMeses.data.datasets[0].data = alertasCritico
 chartMeses.data.datasets[1].data = alertasMedio
 chartMeses.update()