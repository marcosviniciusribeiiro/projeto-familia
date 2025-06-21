# Como Funciona o Gerenciador de Tarefas?

Este projeto é um **Gerenciador de Tarefas Web**, composto por três páginas principais: _"iniciar.html"_, _"adicionar.html"_ e _"visualizar.html"_.

## Descrição das Páginas

Iniciar.html:
É a página inicial, onde o usuário obtém uma breve explicação sobre o funcionamento do gerenciador de tarefas.

Visualizar.html:
Página responsável por carregar e exibir as tarefas armazenadas no localStorage, organizando-as pelos status "Pendentes" e "Concluídas". O status de cada tarefa é salvo e atualizado conforme as ações do usuário.

Esta página também permite adicionar novas tarefas (botão "+ Tarefas"), marcar tarefas como concluídas e excluir tarefas já realizadas (botão "Excluir").

Adicionar.html:
Página usada para cadastrar novas tarefas. Nela, o usuário preenche o nome da tarefa, nome do responsável, data, hora e nível de prioridade (alta ou baixa). Ao clicar em "Adicionar", a tarefa é salva no localStorage e pode ser visualizada em visualizar.html por meio do botão "Ver Tarefas".

=== Principais Validações ===

1ª Validação:
O usuário não pode adicionar tarefas sem preencher os campos obrigatórios: nome da tarefa, nome do responsável, data, hora e nível de prioridade.

2ª Validação:
A tarefa deve ter no mínimo 5 caracteres, para que fique claro o que precisa ser feito.

3ª Validação:
O nome do usuário deve ter no mínimo 3 caracteres, para identificar quem será responsável pela tarefa.

4ª Validação:
Não é possível criar tarefas com data de conclusão no passado. O sistema só permite datas iguais ou posteriores ao dia atual.

5ª Validação:
Antes de excluir uma tarefa concluída, é exibida uma mensagem de confirmação, para evitar exclusões acidentais. 
