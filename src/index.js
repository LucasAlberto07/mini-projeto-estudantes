const readline = require("readline-sync");
const {
  listarEstudantes,
  adicionarEstudante,
  atualizarEstudante,
  removerEstudante
} = require("./estudantes");

let opcao;
do {
  console.log("\n=== Sistema de Estudantes ===");
  console.log("1 - Listar");
  console.log("2 - Adicionar");
  console.log("3 - Atualizar");
  console.log("4 - Remover");
  console.log("0 - Sair");

  opcao = readline.questionInt("Escolha uma opção: ");

  switch (opcao) {
    case 1:
      listarEstudantes();
      break;
    case 2:
      const id = readline.questionInt("ID: ");
      const nome = readline.question("Nome: ");
      const idade = readline.questionInt("Idade: ");
      const email = readline.question("Email: ");
      adicionarEstudante({ id, nome, idade, email });
      break;
    case 3:
      const idAtualizar = readline.questionInt("Digite o ID do estudante: ");
      const novoNome = readline.question("Novo nome (ou Enter p/ manter): ");
      const novaIdade = readline.questionInt("Nova idade (ou 0 p/ manter): ");
      const novoEmail = readline.question("Novo email (ou Enter p/ manter): ");

      const novosDados = {};
      if (novoNome) novosDados.nome = novoNome;
      if (novaIdade > 0) novosDados.idade = novaIdade;
      if (novoEmail) novosDados.email = novoEmail;

      atualizarEstudante(idAtualizar, novosDados);
      break;
    case 4:
      const idRemover = readline.questionInt("Digite o ID do estudante: ");
      removerEstudante(idRemover);
      break;
  }
} while (opcao !== 0);

console.log("👋 Encerrando o sistema...");

