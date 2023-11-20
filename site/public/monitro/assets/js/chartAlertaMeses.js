
const alertaMeses = document.getElementById('alertaMeses');

var alertas = []
var alertasMedio = [0,0,0,0,0,0,0,0,0,0,0,0]
var alertasCritico = [0,0,0,0,0,0,0,0,0,0,0,0]
buscarAlertas()

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





new Chart(alertaMeses, {
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
        data: alertasCritico,
        borderWidth: 2,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: "Médio",
        data: alertasMedio,
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
        max: 50,
      }
    }
  }
});