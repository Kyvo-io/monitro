const monitoramentoRAM = document.getElementById('monitoramentoRAM');

var chartRam =  new Chart(monitoramentoRAM, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Uso Atual',
          data: [80],
          backgroundColor: '#28c8ef'
        },
      ]
    },
    options: {
      plugins: {
        legend: {
          display: true,
        }
        
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false,
          beginAtZero: true
        }
      },
      scales: {
        x: {
          display: 'none',
          beginAtZero: true,
          max: 100
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });