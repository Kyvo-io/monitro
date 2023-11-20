const AlertasEstado = document.getElementById('AlertasEstado');

var ufs = []
var qtdAlertasUfs = []
async function obterUfs() {
  var busca = await fetch(`/historico/estadosMonitorados/${sessionStorage.ID_EMPRESA}`)
  var json = await busca.json()
  for(var i = 0; i<json.length; i++){
    ufs.push(json[i].uf)
  }
}
async function obterQtdAlertasUfs() {
  var busca = await fetch(`/historico/qtdAlertasEstados/${sessionStorage.ID_EMPRESA}`)
  var json = await busca.json()
  for(var i = 0; i<json.length; i++){
    ufs.push(json[i].uf)
  }
}

obterUfs()




new Chart(AlertasEstado, {
  type: 'bar',
  data: {
    labels: ufs,
    datasets: [
      {
      label: "none",
      data: 1,
      borderWidth: 1,
      backgroundColor: ['#28c8ef', '0E1826'],
      stack: 'Stack 0',
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