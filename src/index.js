const readline = require("readline-sync");
const {
  listarEstudantes,
  buscarEstudantePorNome,
  adicionarEstudante,
  atualizarEstudante,
  removerEstudante,
  relatorioSituacao
} = require("./estudantes");

let opcao;
do {
  console.log("\n=== 🎓 SISTEMA DE ESTUDANTES ===");
  console.log("1 - Listar todos os estudantes");
  console.log("2 - Buscar estudante por nome");
  console.log("3 - Adicionar estudante");
  console.log("4 - Atualizar estudante");
  console.log("5 - Remover estudante");
  console.log("6 - Relatório de situação");
  console.log("0 - Sair");

  opcao = readline.questionInt("Escolha uma opção: ");

  switch (opcao) {
    case 1:
      listarEstudantes();
      break;
      
    case 2:
      const nomeBusca = readline.question("Digite o nome (ou parte) para buscar: ");
      const resultados = buscarEstudantePorNome(nomeBusca);
      console.log("\n🔍 Resultados da busca:");
      if (resultados.length > 0) {
        resultados.forEach(e => {
          const media = require("./estudantes").calcularMedia(e);
          const situacao = require("./estudantes").determinarSituacao(parseFloat(media));
          console.log(`${e.id} - ${e.nome}, ${e.idade} anos, ${e.email}`);
          console.log(`   Notas: ${e.nota1} | ${e.nota2} | ${e.nota3} | Média: ${media} | Situação: ${situacao}`);
        });
      } else {
        console.log("Nenhum estudante encontrado.");
      }
      break;
      
    case 3:
      console.log("\n➕ ADICIONAR ESTUDANTE");
      const id = readline.questionInt("ID: ");
      const nome = readline.question("Nome: ");
      const idade = readline.questionInt("Idade: ");
      const email = readline.question("Email: ");
      const nota1 = parseFloat(readline.question("Nota 1 (0-10): "));
      const nota2 = parseFloat(readline.question("Nota 2 (0-10): "));
      const nota3 = parseFloat(readline.question("Nota 3 (0-10): "));
      
      adicionarEstudante({ id, nome, idade, email, nota1, nota2, nota3 });
      break;
      
    case 4:
      console.log("\n✏️  ATUALIZAR ESTUDANTE");
      const idAtualizar = readline.questionInt("Digite o ID do estudante: ");
      
      console.log("Deixe em branco para manter o valor atual:");
      const novoNome = readline.question("Novo nome: ");
      const novaIdadeStr = readline.question("Nova idade: ");
      const novoEmail = readline.question("Novo email: ");
      const novaNota1Str = readline.question("Nova nota 1: ");
      const novaNota2Str = readline.question("Nova nota 2: ");
      const novaNota3Str = readline.question("Nova nota 3: ");

      const novosDados = {};
      if (novoNome) novosDados.nome = novoNome;
      if (novaIdadeStr) novosDados.idade = parseInt(novaIdadeStr);
      if (novoEmail) novosDados.email = novoEmail;
      if (novaNota1Str) novosDados.nota1 = parseFloat(novaNota1Str);
      if (novaNota2Str) novosDados.nota2 = parseFloat(novaNota2Str);
      if (novaNota3Str) novosDados.nota3 = parseFloat(novaNota3Str);

      if (Object.keys(novosDados).length > 0) {
        atualizarEstudante(idAtualizar, novosDados);
      } else {
        console.log("Nenhum dado fornecido para atualização.");
      }
      break;
      
    case 5:
      const idRemover = readline.questionInt("Digite o ID do estudante: ");
      removerEstudante(idRemover);
      break;
      
    case 6:
      relatorioSituacao();
      break;
      
    case 0:
      console.log("👋 Encerrando o sistema...");
      break;
      
    default:
      console.log("❌ Opção inválida!");
  }
} while (opcao !== 0);