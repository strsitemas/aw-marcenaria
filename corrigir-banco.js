// Corrige acentuacao faltante no conteudo do banco (CMS).
// Por padrao roda em modo PREVIA (nao grava nada, so mostra o que faria).
// Rode com --aplicar para gravar de verdade.
// Uso: node corrigir-banco.js          (previa)
//      node corrigir-banco.js --aplicar (grava)
//
// Arquivo 100% ASCII de proposito -- palavras acentuadas de destino sao
// montadas via codigo Unicode (\uXXXX), nunca escritas literalmente.

const { PrismaClient, Prisma } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
const aplicar = process.argv.includes("--aplicar");

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const baseParesRaw = [
  ["nao", "n\u00E3o"],
  ["voce", "voc\u00EA"],
  ["tambem", "tamb\u00E9m"],
  ["apos", "ap\u00F3s"],
  ["instalacao", "instala\u00E7\u00E3o"],
  ["impecavel", "impec\u00E1vel"],
  ["inicio", "in\u00EDcio"],
  ["conheca", "conhe\u00E7a"],
  ["moveis", "m\u00F3veis"],
  ["espaco", "espa\u00E7o"],
  ["unico", "\u00FAnico"],
  ["unicos", "\u00FAnicos"],
  ["orcamento", "or\u00E7amento"],
  ["sofisticacao", "sofistica\u00E7\u00E3o"],
  ["elegancia", "eleg\u00E2ncia"],
  ["contemporanea", "contempor\u00E2nea"],
  ["metalico", "met\u00E1lico"],
  ["funcao", "fun\u00E7\u00E3o"],
  ["solucao", "solu\u00E7\u00E3o"],
  ["resolucao", "resolu\u00E7\u00E3o"],
  ["aprovacao", "aprova\u00E7\u00E3o"],
  ["producao", "produ\u00E7\u00E3o"],
  ["tendencias", "tend\u00EAncias"],
  ["formulario", "formul\u00E1rio"],
  ["dinamica", "din\u00E2mica"],
  ["evolucao", "evolu\u00E7\u00E3o"],
  ["escalavel", "escal\u00E1vel"],
  ["maxima", "m\u00E1xima"],
  ["organicas", "org\u00E2nicas"],
  ["regiao", "regi\u00E3o"],
  ["amigaveis", "amig\u00E1veis"],
  ["padroes", "padr\u00F5es"],
  ["praticas", "pr\u00E1ticas"],
  ["integracao", "integra\u00E7\u00E3o"],
  ["reutilizavel", "reutiliz\u00E1vel"],
  ["migracao", "migra\u00E7\u00E3o"],
  ["documentacao", "documenta\u00E7\u00E3o"],
  ["modulos", "m\u00F3dulos"],
  ["rodape", "rodap\u00E9"],
  ["codigo", "c\u00F3digo"],
  ["proximo", "pr\u00F3ximo"],
  ["pagina", "p\u00E1gina"],
  ["dormitorios", "dormit\u00F3rios"],
  ["paineis", "pain\u00E9is"],
  ["escritorios", "escrit\u00F3rios"],
  ["catalogo", "cat\u00E1logo"],
  ["publicacao", "publica\u00E7\u00E3o"],
  ["informacao", "informa\u00E7\u00E3o"],
  ["comunicacao", "comunica\u00E7\u00E3o"],
  ["confirmacao", "confirma\u00E7\u00E3o"],
  ["validacao", "valida\u00E7\u00E3o"],
  ["atualizacao", "atualiza\u00E7\u00E3o"],
  ["padrao", "padr\u00E3o"],
  ["botao", "bot\u00E3o"],
  ["sao", "s\u00E3o"],
  ["precisao", "precis\u00E3o"],
  ["decada", "d\u00E9cada"],
  ["geracao", "gera\u00E7\u00E3o"],
  ["geracoes", "gera\u00E7\u00F5es"],
  ["excelencia", "excel\u00EAncia"],
  ["duraveis", "dur\u00E1veis"],
  ["estetica", "est\u00E9tica"],
  ["esboco", "esbo\u00E7o"],
  ["navegacao", "navega\u00E7\u00E3o"],
  ["indisponivel", "indispon\u00EDvel"],
  ["area", "\u00E1rea"],
  ["ja", "j\u00E1"],
];

const pares = [];
for (const [de, para] of baseParesRaw) {
  pares.push({ de, para });
  pares.push({ de: cap(de), para: cap(para) });
}
// Correcao reversa: acento antigo pre-1990, deve ser removido
pares.push({ de: "id\u00E9ia", para: "ideia" });
pares.push({ de: "Id\u00E9ia", para: "Ideia" });

const altoRisco = ["titulo", "descricao", "usuario", "portfolio", "esta", "ha"];
const camposIgnorados = ["slug", "email", "senha", "password", "token", "link", "url", "id"];

function campoEhSeguro(nomeCampo) {
  const n = nomeCampo.toLowerCase();
  return !camposIgnorados.some((ign) => n.includes(ign));
}

function aplicarCorrecoes(valor) {
  let novo = valor;
  for (const par of pares) {
    const re = new RegExp(`\\b${par.de}\\b`, "g");
    novo = novo.replace(re, par.para);
  }
  return novo;
}

async function main() {
  const models = Prisma.dmmf.datamodel.models;
  const mudancas = [];
  const revisarManual = [];

  for (const model of models) {
    const camposTexto = model.fields.filter(
      (f) => f.type === "String" && f.kind === "scalar" && campoEhSeguro(f.name)
    );
    if (camposTexto.length === 0) continue;

    const nomeModelo = model.name.charAt(0).toLowerCase() + model.name.slice(1);
    let registros;
    try {
      registros = await prisma[nomeModelo].findMany();
    } catch (e) {
      console.log(`AVISO - nao consegui ler ${model.name}: ${e.message}`);
      continue;
    }

    for (const registro of registros) {
      const dadosAtualizar = {};

      for (const campo of camposTexto) {
        const valor = registro[campo.name];
        if (typeof valor !== "string" || !valor) continue;

        const corrigido = aplicarCorrecoes(valor);
        if (corrigido !== valor) {
          dadosAtualizar[campo.name] = corrigido;
          mudancas.push({
            modelo: model.name,
            id: registro.id,
            campo: campo.name,
            antes: valor.slice(0, 100),
            depois: corrigido.slice(0, 100),
          });
        }

        for (const palavra of altoRisco) {
          const re = new RegExp(`\\b${palavra}\\b`, "i");
          if (re.test(valor)) {
            revisarManual.push({
              modelo: model.name,
              id: registro.id,
              campo: campo.name,
              palavra,
              trecho: valor.slice(0, 100),
            });
          }
        }
      }

      if (aplicar && Object.keys(dadosAtualizar).length > 0) {
        await prisma[nomeModelo].update({
          where: { id: registro.id },
          data: dadosAtualizar,
        });
      }
    }
  }

  function salvarCsv(nomeArquivo, linhas, colunas) {
    const csv = [
      colunas.join(","),
      ...linhas.map((l) =>
        colunas.map((c) => `"${String(l[c] ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");
    fs.writeFileSync(nomeArquivo, csv, "utf8");
  }

  salvarCsv("preview-correcoes-banco.csv", mudancas, ["modelo", "id", "campo", "antes", "depois"]);
  salvarCsv("revisar-manual-banco.csv", revisarManual, ["modelo", "id", "campo", "palavra", "trecho"]);

  console.log("");
  console.log(aplicar ? "MODO APLICAR - alteracoes gravadas no banco." : "MODO PREVIA - nada foi gravado. Rode com --aplicar para gravar de verdade.");
  console.log(`Correcoes automaticas (propostas ou aplicadas): ${mudancas.length}`);
  console.log("Detalhe salvo em: preview-correcoes-banco.csv");
  console.log("");
  console.log(`Ocorrencias de ALTO RISCO (nao tocadas): ${revisarManual.length}`);
  console.log("Detalhe salvo em: revisar-manual-banco.csv");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
