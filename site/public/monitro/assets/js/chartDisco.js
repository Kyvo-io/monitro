const monitoramentoDisco = document.getElementById('monitoramentoDisco');

var chartDisco=new Chart(monitoramentoDisco, {
  type: 'bar',
  data: {
    labels: [''],
    datasets: [
      {
        label: 'Uso Atual',
        data: [0],
        backgroundColor: '#28c8ef'
      },
      {
        label: 'Capacidade Total',
        data: [100],
        backgroundColor: '#0e1826a4',
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
        display: true
      },
      y: {
        display: false,
        beginAtZero: true
      }
    },
    indexAxis: 'y',
    barPercentage: -5,
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