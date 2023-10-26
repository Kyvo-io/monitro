const maquinasInertes = document.getElementById('maquinasInertes');

new Chart(maquinasInertes, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue'],
    datasets: [{
      label: "none",
      data: [12, 19],
      borderWidth: 1
    }]
  },
  options: {
    
  }
});