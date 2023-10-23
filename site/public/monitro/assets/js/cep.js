
document.getElementById('input_cep').addEventListener('input', function() {
    const cep = document.getElementById('input_cep').value;

    if (cep.length === 8 && /^\d+$/.test(cep)) {
        buscarEndereco(cep);
    }
});

function buscarEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado');
            } else {
                // Preencha os campos de input com os dados do CEP
                document.getElementById('input_bairro').value = data.bairro;
                document.getElementById('input_cidade').value = data.localidade;
                document.getElementById('input_uf').value = data.uf;
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}