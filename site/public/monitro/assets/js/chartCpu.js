const monitoramentoCPU = document.getElementById('monitoramentoCPU');


var chartCpu = new Chart(monitoramentoCPU, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Uso Atual',
        data: [],
        backgroundColor: ['#0e1826a4']
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


