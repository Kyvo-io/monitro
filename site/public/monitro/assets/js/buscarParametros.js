var parametros = [];
async function buscarParametros() {
    var buscaParametros = await fetch(`/alertas/alertas`)
    var json = await buscaParametros.json();
    parametros = await json;
   
    console.log(buscaParametros,"oi")
}

