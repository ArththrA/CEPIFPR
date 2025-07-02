document.getElementById('abBuscar').addEventListener('click', () => {
    const cep = document.getElementById('abCEP').value.replace(/\D/g, '');

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            document.getElementById('abLog').value = data.logradouro;
            document.getElementById('abCom').value = data.complemento;
            document.getElementById('abBai').value = data.bairro;
            document.getElementById('abCity').value = data.localidade;
            document.getElementById('abUF').value = data.uf;
            document.getElementById('abDDD').value = data.ddd;
        })
        .catch(error => {
            alert('Erro ao consultar o CEP.');
            console.error(error);
        });
});

document.getElementById('abSalvar').addEventListener('click', () => {
    const nome = document.getElementById('abNome').value.trim();
    const cep = document.getElementById('abCEP').value.trim();
    const logradouro = document.getElementById('abLog').value;
    const complemento = document.getElementById('abCom').value;
    const bairro = document.getElementById('abBai').value;
    const cidade = document.getElementById('abCity').value;
    const uf = document.getElementById('abUF').value;
    const ddd = document.getElementById('abDDD').value;

    if (!nome || !cep) {
        alert('Preencha pelo menos o nome e o CEP antes de salvar.');
        return;
    }

    const dados = {
        nome,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        uf,
        ddd
    };

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuariosSalvos.push(dados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
    exibirUsuariosSalvos();
});

function exibirUsuariosSalvos() {
    const lista = document.getElementById('abLista');
    lista.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    usuarios.forEach(user => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${user.nome}</strong> - ${user.cep}, ${user.logradouro}, ${user.bairro}, ${user.cidade} - ${user.uf} (${user.ddd})`;
        lista.appendChild(item);
    });
}
