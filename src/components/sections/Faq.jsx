import { prisma } from "@/lib/prisma";
import FaqAccordion from "./FaqAccordion";

export default async function Faq() {
  const itens = await prisma.faqItem.findMany({
    where: { publicado: true },
    orderBy: { ordem: "asc" },
  });

  if (itens.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="bg-branco-gelo py-20 md:py-32"
      aria-labelledby="faq-titulo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <span className="font-texto text-dourado-escuro tracking-[0.3em] text-sm uppercase">
            Duvidas frequentes
          </span>
          <h2
            id="faq-titulo"
            className="font-titulo text-3xl md:text-4xl text-preto-fosco leading-tight mt-4"
          >
            Perguntas que ouvimos com frequencia
          </h2>
        </div>
        <FaqAccordion itens={itens} />
      </div>
    </section>
  );
}
