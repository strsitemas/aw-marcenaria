import { prisma } from "@/lib/prisma";
import PortfolioGaleria from "./PortfolioGaleria";

export default async function Portfolio() {
  const projetos = await prisma.projetoPortfolio.findMany({
    where: { publicado: true },
    orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
  });

  return (
    <section
      id="portfolio"
      className="bg-branco-gelo py-20 md:py-32"
      aria-labelledby="portfolio-titulo"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-10 text-center">
          <span className="font-texto text-dourado tracking-[0.3em] text-sm uppercase">
            Portfolio
          </span>
          <h2
            id="portfolio-titulo"
            className="font-titulo text-3xl md:text-4xl text-preto-fosco leading-tight mt-4"
          >
            Projetos que ja entregamos
          </h2>
        </div>

        <PortfolioGaleria projetos={projetos} />
      </div>
    </section>
  );
}
