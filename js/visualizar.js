// Função que cria tarefas iniciais e as salva no localStorage (usada na primeira vez)
function criarTarefas() {
  let tarefasIniciais = [
    {
      nome: "Estudar Javascript",
      usuario: "Josué",
      data: "2025-06-15",
      hora: "16:30",
      concluida: true,
    },
    {
      nome: "Fazer exercício",
      usuario: "João",
      data: "2025-06-20",
      hora: "17:00",
      concluida: true,
    },
    {
      nome: "Ler um Livro",
      usuario: "Marcos",
      data: "2025-06-23",
      hora: "20:30",
      concluida: false,
    },
  ];

  localStorage.setItem("tarefas", JSON.stringify(tarefasIniciais));
}

// Função que cria tarefas iniciais e as salva no localStorage (usada na primeira vez)
function carregarTarefa() {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  // Ordenar por data + hora
  tarefas.sort((a, b) => {
    const dataA = new Date(`${a.data}T${a.hora}`);
    const dataB = new Date(`${b.data}T${b.hora}`);
    return dataA - dataB;
  });

  // Agrupar tarefas por data
  const tarefasPorData = {};
  tarefas.forEach((tarefa) => {
    if (!tarefasPorData[tarefa.data]) {
      tarefasPorData[tarefa.data] = [];
    }
    tarefasPorData[tarefa.data].push(tarefa);
  });

  // Mostrar agrupadas por data
  for (const data in tarefasPorData) {
    // Converter data para pt-BR
    const partes = data.split("-");
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    const cabecalho = document.createElement("h4");
    cabecalho.textContent = `📅 ${dataFormatada}`;
    lista.appendChild(cabecalho);

    tarefasPorData[data].forEach((tarefa) => {
      const index = tarefas.findIndex(
        (t) =>
          t.nome === tarefa.nome &&
          t.usuario === tarefa.usuario &&
          t.data === tarefa.data &&
          t.hora === tarefa.hora
      );
      const li = document.createElement("li");
      const concluidaClass = tarefa.concluida ? "tarefa-concluida" : "";

      li.innerHTML = `
        <label class="list-group-item d-flex gap-3 justify-content-between align-items-start ${concluidaClass}" data-index="${index}">
          <div class="d-flex gap-3">
            <input class="form-check-input flex-shrink-0" type="checkbox"
              onchange="marcarConcluida(${index}, this)"
              ${tarefa.concluida ? "checked" : ""} />
            <span class="pt-1 form-checked-content">
              <h5>Tarefa: ${tarefa.nome}</h5>
              <strong>tarefa do(a): ${tarefa.usuario}</strong>
              <small class="d-block text-body-secondary">hora: ${
                tarefa.hora
              }</small>
            </span>
          </div>
          <p class="mb-1"><b>Importância:</b> ${
            tarefa.opcao === "prioridade"
              ? "Alta Prioridade"
              : "Baixa Prioridade"
          }</p>
          <div class="botoes-excluir" style="${
            tarefa.concluida ? "" : "display: none;"
          }">
            <button class="btn btn-danger btn-sm" onclick="excluirTarefa(${index})">Excluir</button>
          </div>
        </label>`;

      lista.appendChild(li);
    });
  }
}

// Função para marcar/desmarcar uma tarefa como concluída e atualizar o localStorage
function marcarConcluida(index, checkbox) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas[index].concluida = checkbox.checked;
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  const label = checkbox.closest("label");
  const botaoExcluir = label.querySelector(".botoes-excluir");

  // Aplica ou remove a classe visual da tarefa e do botão de excluir
  if (checkbox.checked) {
    label.classList.add("tarefa-concluida");
    botaoExcluir.style.display = "block";
  } else {
    label.classList.remove("tarefa-concluida");
    botaoExcluir.style.display = "none";
  }
}

// Função para excluir uma tarefa específica pelo índice
function excluirTarefa(index) {
  // Validação 5: Previne excluir uma tarefa por acidente
  const confirmar = confirm("Tem certeza que deseja excluir essa tarefa?");
  if (!confirmar) return;

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.splice(index, 1);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  carregarTarefa();
}

// Redireciona para a página de adicionar tarefas
function novaTarefa() {
  location.href = "adicionar.html";
}

// Função executada na inicialização da aplicação
function iniciar() {
  if (!JSON.parse(localStorage.getItem("tarefas"))) {
    criarTarefas();
  }
  carregarTarefa();
}

iniciar();
