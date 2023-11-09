var servidores = []
async function buscarServidoresEmpresa() {
    var busca = await fetch(`/servidor/servidores/${sessionStorage.ID_EMPRESA}`)
    var json = await busca.json();
    servidores = await json;

    console.log(servidores)
}