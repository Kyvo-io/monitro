const nav = document.querySelector(".sideBar");
  const dash = document.querySelector(".containerDashboard");
  const botao = document.querySelector(".logo-botao");
  const botaoNav = document.querySelector(".botao-fechar");
  
  function alternar() {
    nav.classList.toggle("barra-lateral");
    dash.classList.toggle("dash-corresponde");
  }

  botao.addEventListener("click", alternar);
  botaoNav.addEventListener("click", alternar)

  msg.innerHTML = `Olá, ${sessionStorage.NOME_USUARIO}`
  empresa.innerHTML = ` ${sessionStorage.NOME_EMPRESA}`
  cargo.innerHTML = ` ${sessionStorage.NOME_CARGO}`

  document.getElementById("botaoSair").addEventListener("click", function() {
    window.location.href = "../institucional/index.html";
    limparSessao();
  })

document.addEventListener("DOMContentLoaded", function () {
  const linksSidebar = document.querySelectorAll(".linksSideBar");

  linksSidebar.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);

      const sections = document.querySelectorAll(".containerGeolocalizacao, .dashboardGeral, .cadastroUsuario, .cadastroServidor");
      sections.forEach((section) => {
        section.style.display = "none";
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "flex";
      }
    });
  });
});

function limparSessao() {
  sessionStorage.clear();
}


