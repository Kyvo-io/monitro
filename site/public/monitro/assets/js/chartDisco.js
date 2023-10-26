const monitoramentoDisco = document.getElementById('monitoramentoDisco');

new Chart(monitoramentoDisco, {
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