const {Client} = require("@googlemaps/google-maps-services-js");

const cliente = new Client({})
const chave =  process.env.KEY

async function buscarCoordenadasPeloEndereco(rua, cep, cidade) {
    const args = {
        params: {
          key: chave,
          address: `${rua}, ${cidade}, ${cep}`,
        }
      };   
      
    
      var geolocalizacao = await cliente.geocode(args)

      var latitude;
      var longitude; 
     
     


      if(geolocalizacao.data.results.length == 0){


        try {
            var busca = await fetch(`http://brasilapi.com.br/api/cep/v2/${cep}`,
            {
                method:"get",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                credentials: "same-origin"
            }
            ).catch(function (erro) {
                console.log(erro);
            })
          

            console.log(await busca.text());
           
            
        } catch (error) {
            console.log(error);
        }

     
        
      } else{
        latitude = geolocalizacao.data.results[0].geometry.location.lat
        longitude = geolocalizacao.data.results[0].geometry.location.lng
      } 
 
       
      var coordenadas = {
        latitude:  latitude,
        longitude: longitude

      }

      return coordenadas;
}


async function buscarEnderecoPelasCoordenadas(latitude, longitude) {
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
 
        console.log(endereco)
        var enderecoCompleto =  await buscarEnderecoPeloCep(endereco.cep);
        return enderecoCompleto
}

async function obterCoordenadaPeloIp(ip) {
    var busca = await fetch(`
    https://api.ipbase.com/v2/info?apikey=ipb_live_EP1QnTtW2B9mQh8ULFquKKbqaJ3sfsw8s1p3o0Of&ip=${ip}
    `)
    var json = await busca.json()
    console.log(json)
    var coord = {
        latitude: json.data.location.latitude,
        longitude: json.data.location.longitude,
    }
    return coord
} 


async function buscarEnderecoPeloCep(cep) {
    var busca = await fetch(`
    https://viacep.com.br/ws/${cep}/json/
    `)
    var json = await busca.json()

    return json
} 
module.exports={
    buscarCoordenadasPeloEndereco,
    buscarEnderecoPelasCoordenadas,
    obterCoordenadaPeloIp
}