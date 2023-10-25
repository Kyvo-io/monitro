const {Client} = require("@googlemaps/google-maps-services-js");

const cliente = new Client({})
const chave =  process.env.GOOGLE_MAPS_API_KEY

async function buscarCoordenadasPeloEndereco(rua) {
    const args = {
        params: {
          key: chave,
          address: rua,
        }
      };   
      
    
      var geolocalizacao = await cliente.geocode(args)
        var latitude = geolocalizacao.data.results[0].geometry.location.lat
        var longitude = geolocalizacao.data.results[0].geometry.location.lng
       
      var coordenadas = {
        latitude:  latitude,
        longitude: longitude

      }
      console.log(coordenadas)
      return coordenadas;
}


async function buscarEnderecoPelasCoordenadas() {
    const args = {
        params:{
            key: chave,
            latlng: [latitude,longitude]
        }
    }
    var geolocalizacao = await cliente.reverseGeocode(args);   
        var componentesDoEndereco = geolocalizacao.data.results[0].address_components
        var componenteRua;
        var componenteCep;
        componentesDoEndereco.forEach(componentes=> {
            if(componentes.types[0] == "route"){
                componenteRua = componentes 
            }
            if(componentes.types[0] =="postal_code"){
                componenteCep = componentes
            }
        });
        var cep = componenteCep.short_name;
        var rua = componenteRua.long_name;
        
        var endereco ={
            cep: cep,
            rua: rua
        }
        return endereco;
}


module.exports={
    buscarCoordenadasPeloEndereco,
    buscarEnderecoPelasCoordenadas
}