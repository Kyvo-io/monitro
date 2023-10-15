const fundo = document.getElementById("fundo_modal")
const modalDashEspecifica = document.getElementById("ModalEspecifica")
const modalDashDetalhes = document.getElementById("ModalDetalhes")
const botao1_isChecked = botao1.checked
const botao2_isChecked = botao2.checked
var botoesRadio = document.querySelectorAll('.radio-botao');


function trocarExibicaoModalEspecifica() {
    modalDashEspecifica.classList.toggle("exibir")
}
function trocarExibicaoModalDetalhes() {
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
  
