var componentes = [];

async function buscarComponentes() {
    var busca = await fetch(`/componente/componentes/${sessionStorage.ID_EMPRESA}`)
    var json = await busca.json();
    componentes = await json;

    console.log(componentes);
}