// Função para adicionar uma nova tarefa a partir dos dados do formulário
function adicionar(nome, usuario, data, hora, opcao) {
    nome = nome.trim();
    usuario = usuario.trim();
    opcao = opcao.trim();

    // Validação 1: Campos não podem estar vazios ou só com espaços
    if (!nome || !usuario || !data || !hora || !opcao) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Validação 2: Comprimento mínimo do nome da tarefa
    if (nome.length < 5) {
        alert("A tarefa tem que ter no mínimo 5 letras");
        return;
    }

    // Validação 3: Comprimento mínimo do nome do usuário
    if (usuario.length < 3) {
        alert("O usúario tem que ter no mínimo 3 letras");
        return;
    }

    // Validação 4: A data selecionada não pode ser no passado
    const partesSelecionada = data.split("-").map(Number);
    const dataSelecionada = new Date(partesSelecionada[0], partesSelecionada[1] - 1, partesSelecionada[2]);

    const hoje = new Date();
    const dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    if (dataSelecionada < dataAtual) {
        alert("A data da tarefa não pode ser no passado!");
        return;
    }

    const novaTarefa = {
        id: Date.now(), // Id único para cada tarefa
        nome: nome,
        usuario: usuario,
        data: data,
        hora: hora,
        opcao: opcao,
        concluida: false,
    };

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    document.getElementById("tarefa").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("opcao").value = "";
}

// Redireciona para a página de visualização de tarefas
function irParaVisualizar() {
    location.href = "visualizar.html";
}