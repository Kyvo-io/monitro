const { listarServidores } = require("../../../../src/models/servidorModel");

const monitoramentoCPU = document.getElementById('monitoramentoCPU');


fetch(`/servidor/servidores/${sessionStorage.ID_EMPRESA}`, {
     method: "GET",
     headers: {
         "Content-type": "application/json"
     },
     
    }).then(async function (resposta) {
   console.log(resposta)

   const vetor = await resposta.json()

         
   for (i = 0; i < vetor.length; i++) {
     var registro = vetor[i];
     
 }

  })

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
