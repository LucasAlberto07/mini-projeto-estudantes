let estudantes = require("./data");

function listarEstudantes() {
  console.log("\n📋 Lista de Estudantes:");
  estudantes.forEach(e => {
    console.log(`${e.id} - ${e.nome}, ${e.idade} anos, ${e.email}`);
  });
}

function buscarEstudantePorId(id) {
  return estudantes.find(e => e.id === id);
}

function adicionarEstudante(estudante) {
  estudantes.push(estudante);
  console.log("✅ Estudante adicionado com sucesso!");
}

function atualizarEstudante(id, novosDados) {
  const estudante = buscarEstudantePorId(id);
  if (estudante) {
    Object.assign(estudante, novosDados);
    console.log("✅ Estudante atualizado!");
  } else {
    console.log("❌ Estudante não encontrado.");
  }
}

function removerEstudante(id) {
  const index = estudantes.findIndex(e => e.id === id);
  if (index !== -1) {
    estudantes.splice(index, 1);
    console.log("✅ Estudante removido!");
  } else {
    console.log("❌ Estudante não encontrado.");
  }
}

module.exports = {
  listarEstudantes,
  buscarEstudantePorId,
  adicionarEstudante,
  atualizarEstudante,
  removerEstudante,
};

