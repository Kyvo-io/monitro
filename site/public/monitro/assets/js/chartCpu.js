const monitoramentoCPU = document.getElementById('monitoramentoCPU');
new Chart(monitoramentoCPU, {
  type: 'pie',
  data: {
    labels: ['Uso Atual', 'Restante'],
    datasets: [
      {
        data: [80, 20],
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
