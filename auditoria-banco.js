// AUDITORIA de acentuacao no conteudo do banco (tudo que foi digitado pelo CMS).
// Este script NAO altera nada -- so gera um relatorio (auditoria-banco.csv).
// Roda com: node auditoria-banco.js
// (precisa estar na raiz do projeto, onde o Prisma Client ja foi gerado)

const { PrismaClient, Prisma } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const palavras = [
  "nao","voce","sao","esta","ate","tambem","apos","instalacao","impecavel","inicio",
  "conheca","moveis","espaco","unico","portfolio","orcamento","sofisticacao","elegancia",
  "contemporanea","metalico","funcao","solucao","descricao","botao","resolucao","aprovacao",
  "producao","tendencias","formulario","dinamica","evolucao","escalavel","maxima","organicas",
  "regiao","amigaveis","padroes","praticas","integracao","reutilizavel","migracao","documentacao",
  "modulos","rodape","codigo","usuario","proximo","pagina","titulo","dormitorios","paineis",
  "escritorios","garantia","atendimento","projeto","ambiente","closet","cozinha",
  "banheiro","lavanderia","showroom","exclusivo","premium","luxo","interior",
  "moderno","minimalista","artesanal","padrao","qualidade","conforto","elegante","sofisticado",
  "consultoria","acabamento","ferragens","materiais","clientes","catalogo","categoria",
  "publicado","publicacao","informacao","comunicacao","confirmacao","validacao","atualizacao",
];

const regexMojibake = /Ã[\x80-\xBF]|â€[™œ\x9d\x93\x94]|Â[°ª©®]/;

function limpar(valor) {
  return valor.replace(/"/g, '""').slice(0, 120);
}

async function main() {
  const models = Prisma.dmmf.datamodel.models;
  const relatorio = [];

  for (const model of models) {
    const camposTexto = model.fields.filter(
      (f) => f.type === "String" && f.kind === "scalar"
    );
    if (camposTexto.length === 0) continue;

    const nomeModelo = model.name.charAt(0).toLowerCase() + model.name.slice(1);

    let registros;
    try {
      registros = await prisma[nomeModelo].findMany();
    } catch (e) {
      console.log(`AVISO - nao consegui ler o model ${model.name}: ${e.message}`);
      continue;
    }

    for (const registro of registros) {
      for (const campo of camposTexto) {
        const valor = registro[campo.name];
        if (typeof valor !== "string" || !valor) continue;

        if (regexMojibake.test(valor)) {
          relatorio.push({
            modelo: model.name,
            id: registro.id,
            campo: campo.name,
            tipo: "MOJIBAKE",
            trecho: limpar(valor),
          });
        }

        for (const palavra of palavras) {
          const re = new RegExp(`\\b${palavra}\\b`, "i");
          if (re.test(valor)) {
            relatorio.push({
              modelo: model.name,
              id: registro.id,
              campo: campo.name,
              tipo: `SEM_ACENTO (${palavra})`,
              trecho: limpar(valor),
            });
          }
        }
      }
    }
  }

  const linhas = [
    "modelo,id,campo,tipo,trecho",
    ...relatorio.map(
      (r) => `"${r.modelo}","${r.id}","${r.campo}","${r.tipo}","${r.trecho}"`
    ),
  ];
  fs.writeFileSync("auditoria-banco.csv", linhas.join("\n"), "utf8");

  console.log("");
  console.log("Auditoria do banco concluida.");
  console.log(`Ocorrencias encontradas: ${relatorio.length}`);
  console.log("Relatorio salvo em: auditoria-banco.csv");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
