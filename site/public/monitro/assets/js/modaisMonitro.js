const secaoGraficos = document.getElementById("secaoGraficos");
const secaoInformacoes = document.getElementById("secaoInformacoes");
const secaoHistoricos = document.getElementById("secaoHistoricos");
const secaoMapa = document.getElementById("secaoMapa");
const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");
const botao3 = document.getElementById("botao3");
secaoGraficos.classList.add("exibir");
const fundo = document.getElementById("fundo_modal")
const modalDash = document.getElementById("ModalEspecifica")
var botoesRadio = document.querySelectorAll('.radio-botao');


function trocarExibicaoFundo() {
    fundo.classList.toggle("exibir")
}
function trocarExibicaoModalEspecifica() {
    trocarExibicaoFundo()
    modalDash.classList.toggle("exibir")
}
function trocarExibicaoParaMapa() {
    trocarExibicaoFundo()
    secaoMapa.classList.toggle("exibir")

}

botao1.addEventListener("change", function() {
    secaoGraficos.classList.toggle("exibir");
    secaoInformacoes.classList.remove("exibir");
    secaoHistoricos.classList.remove("exibir");
    console.log("1")

});

botao2.addEventListener("change", function() {
    secaoInformacoes.classList.toggle("exibir");
    secaoGraficos.classList.remove("exibir");
    secaoHistoricos.classList.remove("exibir");
    console.log("2")
});

botao3.addEventListener("change", function() {
    secaoHistoricos.classList.toggle("exibir");
    secaoInformacoes.classList.remove("exibir");
    secaoGraficos.classList.remove("exibir");
    console.log("3")
});




document.querySelector('.containerDashboard').classList.add('transitioning');
document.querySelector('.containerDashboard').addEventListener('transitionend', function() {
document.querySelector('.containerDashboard').classList.remove('transitioning');
});


