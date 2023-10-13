const fundo = document.getElementById("fundo_modal")
const modalDashEspecifica = document.getElementById("ModalEspecifica")
const modalDashDetalhes = document.getElementById("ModalDetalhes")
const botao1_isChecked = botao1.checked
const botao2_isChecked = botao2.checked
var botoesRadio = document.querySelectorAll('.radio-botao');


function trocarExibicaoFundo() {
    fundo.classList.toggle("exibir")
}
function trocarExibicaoModalEspecifica() {
    trocarExibicaoFundo()
    modalDashEspecifica.classList.toggle("exibir")
}
function trocarExibicaoModalDetalhes() {
    fundo.classList.toggle("exibir")
    modalDashDetalhes.classList.toggle("exibir")
}

botoesRadio.forEach(function(botao) {
    botao.addEventListener('change', function() {
      if(botao1_isChecked){
          modalDashEspecifica.classList.toggle("exibir")
      } else {
          modalDashEspecifica.classList.toggle("exibir")
      }
      if(botao2_isChecked){
          modalDashDetalhes.classList.toggle("exibir")
      } else{
          modalDashDetalhes.classList.toggle("exibir")
      }
    });
  });

  // No início da transição
document.querySelector('.containerDashboard').classList.add('transitioning');

// Seu código para iniciar a transição aqui

// Quando a transição estiver concluída (por exemplo, usando um evento)
document.querySelector('.containerDashboard').addEventListener('transitionend', function() {
    // Remova a classe após a transição
    document.querySelector('.containerDashboard').classList.remove('transitioning');
});


