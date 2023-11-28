var geocoder;
var map;
var marker;
async function initMap() {
      const {Map} = await google.maps.importLibrary("maps");
      map = await new Map(document.getElementById("map"), {
      mapId: 123,
      zoom: 5,
      center: { lat: -23.55898766864915, lng: -46.640911083445495}, 
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
    });


    await  buscarServidoresEmpresa().then(async function () {
      listarServidoresEmpresa();
      await mostrarMarcadores()  
    })
}
async function mostrarMarcadores() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
  for(var i =0; i<servidores.length; i++){
    var marcadorDiv = document.createElement("div")
    marcadorDiv.classList.add("servidor-marker")
    
    
    var statusServidor = document.createElement("div")
    statusServidor.classList.add("status")
  
    if(servidores.nivelAlerta == "Crítico"){
      statusServidor.classList.add("perigo")
    }else if("Médio"){
      statusServidor.classList.add("medio")
    }else if("Ok"){
      statusServidor.classList.add("ok")
    }else{
      statusServidor.classList.add("inativo")
    }

    var linhaServidor = document.createElement("div")
    linhaServidor.classList.add("linha-servidor")

    var linhaServidor1 = document.createElement("div")
    linhaServidor1.classList.add("linha-servidor")

    var linhaServidor2 = document.createElement("div")
    linhaServidor2.classList.add("linha-servidor")

   
    marcadorDiv.appendChild(linhaServidor)
    marcadorDiv.appendChild(linhaServidor1)
    marcadorDiv.appendChild(linhaServidor2)
    marcadorDiv.appendChild(statusServidor)
    
    var coordenada = {lat: servidores[i].latitude, lng: servidores[i].longitude}
    marker = await new AdvancedMarkerElement({
      position: coordenada,
      map: map,
      content: marcadorDiv,
      title: servidores[i].nomeServidor,
    })
  }
}



window.initMap = initMap;
