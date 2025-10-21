let estudantes = require("./data");

// Função para calcular média
function calcularMedia(estudante) {
  return ((estudante.nota1 + estudante.nota2 + estudante.nota3) / 3).toFixed(2);
}

// Função para determinar situação
function determinarSituacao(media) {
  if (media >= 7) return "Aprovado";
  if (media >= 5) return "Recuperação";
  return "Reprovado";
}

// VALIDAÇÕES
function validarEmail(email) {
  return email.includes('@') && email.includes('.');
}

function validarNota(nota) {
  return nota >= 0 && nota <= 10;
}

function validarIdade(idade) {
  return idade > 0 && idade < 120;
}

function idExiste(id) {
  return estudantes.some(e => e.id === id);
}

// FUNÇÕES PRINCIPAIS
function listarEstudantes() {
  console.log("\n📋 Lista de Estudantes:");
  estudantes.forEach(e => {
    const media = calcularMedia(e);
    const situacao = determinarSituacao(parseFloat(media));
    console.log(`${e.id} - ${e.nome}, ${e.idade} anos, ${e.email}`);
    console.log(`   Notas: ${e.nota1} | ${e.nota2} | ${e.nota3} | Média: ${media} | Situação: ${situacao}`);
  });
}

function buscarEstudantePorId(id) {
  return estudantes.find(e => e.id === id);
}

// BUSCA PARCIAL POR NOME (como solicitado)
function buscarEstudantePorNome(nome) {
  return estudantes.filter(e => 
    e.nome.toLowerCase().includes(nome.toLowerCase())
  );
}

function adicionarEstudante(estudante) {
  // Validações
  if (!estudante.nome || estudante.nome.trim() === "") {
    console.log("❌ Nome não pode estar vazio.");
    return false;
  }

  if (!validarIdade(estudante.idade)) {
    console.log("❌ Idade deve ser entre 1 e 119 anos.");
    return false;
  }

  if (!validarEmail(estudante.email)) {
    console.log("❌ Email deve ser válido (deve conter '@' e '.').");
    return false;
  }

  if (!validarNota(estudante.nota1) || !validarNota(estudante.nota2) || !validarNota(estudante.nota3)) {
    console.log("❌ Todas as notas devem estar entre 0 e 10.");
    return false;
  }

  if (idExiste(estudante.id)) {
    console.log("❌ Já existe um estudante com esse ID.");
    return false;
  }

  estudantes.push(estudante);
  console.log("✅ Estudante adicionado com sucesso!");
  return true;
}

function atualizarEstudante(id, novosDados) {
  const estudante = buscarEstudantePorId(id);
  if (!estudante) {
    console.log("❌ Estudante não encontrado.");
    return false;
  }

  // Validações para atualização
  if (novosDados.nome !== undefined && novosDados.nome.trim() === "") {
    console.log("❌ Nome não pode estar vazio.");
    return false;
  }

  if (novosDados.idade !== undefined && !validarIdade(novosDados.idade)) {
    console.log("❌ Idade deve ser entre 1 e 119 anos.");
    return false;
  }

  if (novosDados.email !== undefined && !validarEmail(novosDados.email)) {
    console.log("❌ Email deve ser válido (deve conter '@' e '.').");
    return false;
  }

  if ((novosDados.nota1 !== undefined && !validarNota(novosDados.nota1)) ||
      (novosDados.nota2 !== undefined && !validarNota(novosDados.nota2)) ||
      (novosDados.nota3 !== undefined && !validarNota(novosDados.nota3))) {
    console.log("❌ Todas as notas devem estar entre 0 e 10.");
    return false;
  }

  Object.assign(estudante, novosDados);
  console.log("✅ Estudante atualizado com sucesso!");
  return true;
}

function removerEstudante(id) {
  const index = estudantes.findIndex(e => e.id === id);
  if (index !== -1) {
    estudantes.splice(index, 1);
    console.log("✅ Estudante removido!");
    return true;
  } else {
    console.log("❌ Estudante não encontrado.");
    return false;
  }
}

// FUNÇÕES DE RELATÓRIO (como solicitado)
function calcularMediaTurma() {
  if (estudantes.length === 0) return 0;
  
  const somaMedias = estudantes.reduce((total, e) => {
    return total + parseFloat(calcularMedia(e));
  }, 0);
  
  return (somaMedias / estudantes.length).toFixed(2);
}

function melhorEstudante() {
  if (estudantes.length === 0) return null;
  
  return estudantes.reduce((melhor, atual) => {
    const mediaMelhor = parseFloat(calcularMedia(melhor));
    const mediaAtual = parseFloat(calcularMedia(atual));
    return mediaAtual > mediaMelhor ? atual : melhor;
  });
}

function relatorioSituacao() {
  const aprovados = estudantes.filter(e => 
    parseFloat(calcularMedia(e)) >= 7
  );
  
  const recuperacao = estudantes.filter(e => {
    const media = parseFloat(calcularMedia(e));
    return media >= 5 && media < 7;
  });
  
  const reprovados = estudantes.filter(e => 
    parseFloat(calcularMedia(e)) < 5
  );

  console.log("\n📊 RELATÓRIO DE SITUAÇÃO DOS ESTUDANTES");
  console.log("=====================================");
  
  console.log(`\n🎓 APROVADOS (${aprovados.length} estudantes):`);
  aprovados.forEach(e => {
    const media = calcularMedia(e);
    console.log(`   ${e.nome} - Média: ${media}`);
  });

  console.log(`\n⚠️  EM RECUPERAÇÃO (${recuperacao.length} estudantes):`);
  recuperacao.forEach(e => {
    const media = calcularMedia(e);
    console.log(`   ${e.nome} - Média: ${media}`);
  });

  console.log(`\n❌ REPROVADOS (${reprovados.length} estudantes):`);
  reprovados.forEach(e => {
    const media = calcularMedia(e);
    console.log(`   ${e.nome} - Média: ${media}`);
  });

  console.log(`\n📈 Média geral da turma: ${calcularMediaTurma()}`);
  
  const melhor = melhorEstudante();
  if (melhor) {
    console.log(`🏆 Melhor estudante: ${melhor.nome} - Média: ${calcularMedia(melhor)}`);
  }
}

module.exports = {
  listarEstudantes,
  buscarEstudantePorId,
  buscarEstudantePorNome,
  adicionarEstudante,
  atualizarEstudante,
  removerEstudante,
  calcularMediaTurma,
  melhorEstudante,
  relatorioSituacao,
  calcularMedia,
  determinarSituacao
};