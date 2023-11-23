const monitoramentoCPU = document.getElementById('monitoramentoCPU');


var chartCpu = new Chart(monitoramentoCPU, {
  type: 'pie',
  data: {
    labels: ['Uso Atual', 'Restante'],
    datasets: [
      {
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


