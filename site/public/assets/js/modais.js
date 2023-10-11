
const fundo = document.getElementById("fundo_modal")
const modalCadastro = document.getElementById("cadastro")
const modalLogin = document.getElementById("login")
const modalSolucao1 = document.getElementById("solucao1")
const modalSolucao2 = document.getElementById("solucao2")
const botao1_isChecked = botao1.checked
const botao2_isChecked = botao2.checked
var botoesRadio = document.querySelectorAll('.radio-botao');

function trocarExibicaoFundo() {
    fundo.classList.toggle("exibir")
}
function trocarExibicaoModalCadastro() {
    trocarExibicaoFundo()
    modalCadastro.classList.toggle("exibir")
}
function trocarExibicaoModalLogin() {
    trocarExibicaoFundo()
    modalLogin.classList.toggle("exibir")
}
function trocarExibicaoModalSaibaMais() {
    trocarExibicaoFundo()
    modalSolucao1.classList.toggle("exibir")
}
function trocarExibirCadastroNaSolucao(){
    modalSolucao1.classList.toggle("exibir")
    modalCadastro.classList.toggle("exibir")
}
function fecharModalSolucao1() {
    trocarExibicaoFundo()

    modalSolucao1.classList.toggle("exibir")
}
function fecharModalSolucao2() {
    trocarExibicaoFundo()

    modalSolucao2.classList.toggle("exibir")
}


botoesRadio.forEach(function(botao) {
  botao.addEventListener('change', function() {
    if(botao1_isChecked){
        modalSolucao1.classList.toggle("exibir")
    } else {
        modalSolucao1.classList.toggle("exibir")
    }
    if(botao2_isChecked){
        modalSolucao2.classList.toggle("exibir")
    } else{
        modalSolucao2.classList.toggle("exibir")
    }
  });
});
