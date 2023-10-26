const monitoramentoRAM = document.getElementById('monitoramentoRAM');

  new Chart(monitoramentoRAM, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });