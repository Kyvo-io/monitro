async function buscarEndereco(cep) 
{
    var busca = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var endereco = await busca.json();
    return await endereco;
}

var lista = document.getElementById("lista")
var servidores = [
    {
        nome: "Servidor São Paulo",
        situacao: "ok",
        localidade:{lat: -23.55579945309124, lng: -46.64114144610836}
    },
    {
        nome: "Servidor Espírito Santo",
        situacao: "ok",
        localidade:{lat:-20.317010425083637, lng: -40.33619365853203}
    },
    {
        nome: "Servidor Minas Gerais",
        situacao: "ok",
        localidade:{lat: -19.878656803647225, lng: -43.94746383139494}
    },
]

function listarServidores() {
    lista.innerHTML = '';
    servidores.forEach(servidor => {
        lista.innerHTML+=`
        <div class="item-lista">
            <div class="icon-e-status">
                <div class="icon-servidor"></div>
                <div class="status ${servidor.situacao}"></div>
            </div>
            <div class="infos">
                <div class="nome">
                <span>${servidor.nome}</span>
                </div>
            </div>
        </div>
        `
    });    
}



var geocoder;
var map;
var marker;
async function initMap() {
      const {Map} = await google.maps.importLibrary("maps");
      map = new Map(document.getElementById("map"), {
      mapId: 123,
      zoom: 5,
      center: { lat: -23.55898766864915, lng: -46.640911083445495}, 
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
    });
}


var marcadores = []
async function mostrarMarcadores() {
  
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

  servidores.forEach(servidor => {
    var marcadorDiv = document.createElement("div")
    marcadorDiv.classList.add("status")
    marcadorDiv.classList.add(`${servidor.situacao}`);
    marker  = new AdvancedMarkerElement ( {
      position: servidor.localidade,
      map: map,
      content: marcadorDiv
    });
    marcadores.push(marker)
  });
}


function limparMarcadores() {
  marcadores.forEach(marcador => {
    marcador.setMap(null);
  });
}

window.initMap = initMap;
