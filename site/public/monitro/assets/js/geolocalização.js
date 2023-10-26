var geocoder;
var map;
var marker;
async function initMap() {
    await buscarServidoresEmpresa()
      const {Map} = await google.maps.importLibrary("maps");
      map = await new Map(document.getElementById("map"), {
      mapId: 123,
      zoom: 5,
      center: { lat: -23.55898766864915, lng: -46.640911083445495}, 
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
    });
    await mostrarMarcadores()
   
}
async function mostrarMarcadores() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
  for(var i =0; i<servidores.length; i++){
    var marcadorDiv = document.createElement("div")
    
    marcadorDiv.classList.add("status")
    marcadorDiv.classList.add("ok")
    var coordenada = {lat: servidores[i].latitude, lng: servidores[i].longitude}
    marker = await new AdvancedMarkerElement({
      position: coordenada,
      map: map,
      content: marcadorDiv,
      title: servidores[0].nomeServidor,
    })
  }
}



window.initMap = initMap;
