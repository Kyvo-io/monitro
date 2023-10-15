  const nav = document.querySelector(".elementos");
  const botao = document.querySelector(".botao");
  const botaoNav = document.querySelector(".botao-nav");
  const navbar = document.querySelector(".navbar");

  function alternar() {
    nav.classList.toggle("barra-lateral");
  }
  botao.addEventListener("click", alternar);
  botaoNav.addEventListener("click", alternar);
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-el a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impedir o comportamento padrão do link

            const targetId = link.getAttribute("href").substring(1);

            // Ocultar todas as seções de conteúdo
            const sections = document.querySelectorAll(".containerHome, .containerSobreNos, .containerIntegrantes, .containerSolucao, .containerContato");
            sections.forEach((section) => {
                section.style.display = "none";
            });

            // Exibir a seção correspondente
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "flex";

                
            }
        });
    });
});

