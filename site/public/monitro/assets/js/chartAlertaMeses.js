const alertaMeses = document.getElementById('alertaMeses');

new Chart(alertaMeses, {
  type: 'line',
  data: {
    labels: ['Ativos', 'Inertes'],
    datasets: [{
      label: "none",
      data: [12, 3],
      borderWidth: 1,
      backgroundColor: ['#28c8ef', '0E1826']
    }]
  },
  options: {
    
  }
});