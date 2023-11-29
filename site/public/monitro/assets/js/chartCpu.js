const monitoramentoCPU = document.getElementById('monitoramentoCPU');


var chartCpu = new Chart(monitoramentoCPU, {
  type: 'line',
  data: {
    labels: ['Uso Atual', 'Restante'],
    datasets: [
      {
        label: 'Uso Atual',
        data: [100, 0],
        backgroundColor: ['#ff0909', '#0e1826a4']
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: true,
      }
    },
  }
});


